package com.rf.security.model;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

/**
 * This user represents a DTO of UserDetails from spring security that wrap system information like presentation name and profileImage
 * @author ricardo.faria
 *
 */
public class SessionUser extends User {

	private static final long serialVersionUID = 3079810911423397424L;
	private Long id;
	private String firstName;
	private String email;
	private String profileImage;
	
	public SessionUser(String username, String password, Collection<? extends GrantedAuthority> authorities) {
		super(username, password, authorities);
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getProfileImage() {
		return profileImage;
	}

	public void setProfileImage(String profileImage) {
		this.profileImage = profileImage;
	}

}
