package com.rf.security;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.transaction.annotation.Transactional;

import com.rf.security.model.SessionUser;
import com.rf.user.persistence.UserRepository;

public class CustomUserDetailsService implements UserDetailsService {

	@Autowired
	private UserRepository userRepository;

	@Transactional(readOnly = true)
	@Override
	public UserDetails loadUserByUsername(final String username) throws UsernameNotFoundException {

		com.rf.user.domain.User user = userRepository.loadByLogin(username);
		List<GrantedAuthority> authorities = buildUserAuthority(user.getRoles());

		return buildUserForAuthentication(user, authorities);

	}

	private SessionUser buildUserForAuthentication(com.rf.user.domain.User user, List<GrantedAuthority> authorities) {
		SessionUser sessionUser = new SessionUser(user.getUsername(), user.getPassword(), authorities);
		sessionUser.setEmail(user.getEmail());
		sessionUser.setFirstName(user.getFirstName());
		sessionUser.setId(user.getId());
		sessionUser.setProfileImage(null);
		
		return sessionUser;
	}

	private List<GrantedAuthority> buildUserAuthority(Set<String> userRoles) {

		Set<GrantedAuthority> setAuths = new HashSet<GrantedAuthority>();
		for (String userRole : userRoles) {
			setAuths.add(new SimpleGrantedAuthority(userRole));
		}

		return new ArrayList<GrantedAuthority>(setAuths);
	}
}