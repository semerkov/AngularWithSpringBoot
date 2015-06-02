package com.rf.user.domain;

import javax.annotation.Generated;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;

import org.hibernate.annotations.GeneratorType;

@Entity(name = "auser")
public class User {
	@Id
	@SequenceGenerator(name="seq_auser", sequenceName="seq_auser", allocationSize=1, initialValue = 20)
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="seq_auser")
	private Long id;
	@Column(length = 100, nullable = false)
	private String name;
	@Column(length = 50, nullable = false)
	private String login;
	@Column(length = 100, nullable = false)
	private String email;
	@Column(length = 100, nullable = false)
	private String password;

	public User() {
		super();
	}
	
	public User(Long id, String name, String login, String email, String password) {
		super();
		this.id = id;
		this.name = name;
		this.login = login;
		this.email = email;
		this.password = password;
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
}
