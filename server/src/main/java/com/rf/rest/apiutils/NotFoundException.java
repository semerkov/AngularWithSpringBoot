package com.rf.rest.apiutils;

public class NotFoundException extends ApiException {

	private static final long serialVersionUID = -4192885852362010662L;

	public NotFoundException (String msg) {
		super(msg);
	}
}
