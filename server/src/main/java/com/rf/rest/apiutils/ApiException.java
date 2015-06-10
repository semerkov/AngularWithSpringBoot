package com.rf.rest.apiutils;

public class ApiException extends Exception {
	
	private static final long serialVersionUID = 3025569883369608196L;

	public ApiException(String msg) {
		super(msg);
	}
}
