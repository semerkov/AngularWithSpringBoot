package com.rf.user.business;

import java.util.HashSet;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

import com.rf.user.domain.User;
import com.rf.user.persistence.UserRepository;
import com.rf.util.CastUtil;

@Component
public class UserBusiness {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	public UserBusiness(UserRepository userRepository) {
		super();
		this.userRepository = userRepository;
	}

	public User saveUser(User newUser) {
		if (newUser.getRoles() == null) {
			newUser.setRoles(new HashSet<String>());
		}
		newUser.getRoles().add("user");
		
		validateUser(newUser);
		return userRepository.save(newUser);
	}
	
	public User updateUser(User updatedUser) {
		User oldUser = userRepository.findOne(updatedUser.getId());
		oldUser.setEmail(updatedUser.getEmail());
		oldUser.setLogin(updatedUser.getLogin());
		oldUser.setName(updatedUser.getName());
		
		validateUser(oldUser);
		
		return userRepository.save(oldUser);
	}
	
	public boolean existsUsers() {
		int countResult = userRepository.countUsers();
		return countResult > 0;
	}

	public User load(Long userid) {
		return userRepository.findOne(userid);
	}

	public Boolean delete(Long userid) {
		try {
			userRepository.delete(userid);			
		} catch (Exception e) {
			return false;
		}
		return true;
	}
	
	public Page<User> getPaginatedList(String pageString, String pageSizeString, String sortString) {
		int page = CastUtil.toInt(pageString, 0);
		int pageSize = CastUtil.toInt(pageSizeString, 10);
		
		Pageable pageable = null;
		if (sortString == null) {
			pageable = new PageRequest(page, pageSize);			
		} else {
			Sort sort = new Sort("id");
			pageable = new PageRequest(page, pageSize, sort);
		}
		return userRepository.getPaginatedList(pageable);
	}
	
	public void validateUser(User user) {
		if (StringUtils.isEmpty(user.getName())) {
			throw new IllegalStateException("Name can't be null");
		}
		if (StringUtils.isEmpty(user.getLogin())) {
			throw new IllegalStateException("Login can't be null");
		}
		if (StringUtils.isEmpty(user.getPassword())) {
			throw new IllegalStateException("Password can't be null");
		}
		if (StringUtils.isEmpty(user.getEmail())) {
			throw new IllegalStateException("Email can't be null");
		}
		if (user.getId() == null) {
			User userFound = userRepository.loadByLogin(user.getLogin());
			if (userFound != null) {
				throw new IllegalStateException("The login \"" + user.getLogin() + "\" has already been used");
			}
			
			userFound = userRepository.loadByEmail(user.getEmail());
			if (userFound != null) {
				throw new IllegalStateException("The email \"" + user.getEmail() + "\" has already been used");
			}
			
		}
	}

}
