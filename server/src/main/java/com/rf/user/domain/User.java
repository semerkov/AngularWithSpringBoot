package com.rf.user.domain;

import java.util.Collection;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Entity(name = "auser")
public class User implements UserDetails {

	private static final long serialVersionUID = 590159419097310157L;

	@Id
	@SequenceGenerator(name = "seq_auser", sequenceName = "seq_auser", allocationSize = 1, initialValue = 20)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_auser")
	private Long id;
	@Column(length = 100, nullable = false)
	private String name;
	@Column(length = 50, nullable = false)
	private String login;
	@Column(length = 100, nullable = false)
	private String email;
	@Column(length = 80, nullable = false)
	private String password;
	@ElementCollection(fetch = FetchType.EAGER)
	private Set<String> roles = new HashSet<String>();

	public User() {
		super();
	}

	public User(String login, String passwordHash) {
		this.login = login;
		this.password = passwordHash;
	}

	public User(Long id, String name, String login, String email, String passwordHash) {
		super();
		this.id = id;
		this.name = name;
		this.login = login;
		this.email = email;
		this.password = passwordHash;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLogin() {
		return login;
	}

	public void setLogin(String login) {
		this.login = login;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Override
	public String toString() {
		StringBuilder sb = new StringBuilder();
		sb.append("class User {\n");

		sb.append("  id: ").append(id).append("\n");
		sb.append("  name: ").append(name).append("\n");
		sb.append("  login: ").append(login).append("\n");
		sb.append("  email: ").append(email).append("\n");
		sb.append("  password: ").append(password).append("\n");
		sb.append("}\n");
		return sb.toString();
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		Set<String> roles = this.getRoles();

		if (roles == null) {
			return Collections.emptyList();
		}

		Set<GrantedAuthority> authorities = new HashSet<GrantedAuthority>();
		for (String role : roles) {
			authorities.add(new SimpleGrantedAuthority(role));
		}

		return authorities;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

	public Set<String> getRoles() {
		return roles;
	}

	public void setRoles(Set<String> roles) {
		this.roles = roles;
	}

	@Override
	public String getUsername() {
		return login;
	}
}
