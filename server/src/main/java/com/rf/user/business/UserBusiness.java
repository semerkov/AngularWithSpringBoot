package com.rf.user.business;

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

	public User saveUser(User user) {
		return userRepository.save(user);
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

}
