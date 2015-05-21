package com.rf.user.business;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.rf.user.domain.User;
import com.rf.user.persistence.UserRepository;

@Component
public class UserBusiness {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	public UserBusiness(UserRepository userRepository) {
		super();
		this.userRepository = userRepository;
	}

	public boolean saveUser(User user) {
		user = userRepository.save(user);
		if (user.getId() > 0) {
			return true;
		}
		return false;
	}

}
