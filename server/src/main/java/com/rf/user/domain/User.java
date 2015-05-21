package com.rf.user.domain;

public class User {
	/**
	 * Auto-generated primary key field
	 **/
	private String id = null;
	/**
   **/
	private String name = null;
	/**
   **/
	private String login = null;
	/**
   **/
	private String email = null;
	/**
   **/
	private String password = null;

	public String getId() {
		return id;
	}

	public void setId(String id) {
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
