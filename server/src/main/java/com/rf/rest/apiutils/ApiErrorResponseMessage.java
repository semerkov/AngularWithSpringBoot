package com.rf.rest.apiutils;

@javax.xml.bind.annotation.XmlRootElement
public class ApiErrorResponseMessage extends ApiResponseMessage {
	
	private int status;	
	
	public ApiErrorResponseMessage(){}
	
	public ApiErrorResponseMessage(int status, String message){
		this(status, message, null);
	}
	
	public ApiErrorResponseMessage(int status, String message, Object object){
		super(ApiResponseMessage.ERROR, message, object);
		this.status = status;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

}
