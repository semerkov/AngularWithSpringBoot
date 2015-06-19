package com.rf.security.model;

/**
 * DTO that wrap the authentication token of user
 * 
 * @author ricardo.faria
 *
 */
public class TokenTransfer {

	private final String token;

	public TokenTransfer(String token) {
		this.token = token;
	}

	public String getToken() {
		return this.token;
	}

}