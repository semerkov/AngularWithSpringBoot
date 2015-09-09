package com.rf.rest.apiutils;

import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.BadCredentialsException;

@Provider
public class GenericExceptionMapper implements ExceptionMapper<Throwable> {
	
	private static Logger log = LoggerFactory.getLogger(GenericExceptionMapper.class);
	
	@Override 
	public Response toResponse(Throwable ex) {
		ApiErrorResponseMessage response = new ApiErrorResponseMessage();
		setHttpStatus(ex, response);
 
		return Response.status(response.getStatus())
				.entity(response)
				.type(MediaType.APPLICATION_JSON)
				.build();	
	}
 
	private void setHttpStatus(Throwable ex, ApiErrorResponseMessage errorMessage) {
		errorMessage.setMessage(ex.getMessage());
		if(ex instanceof WebApplicationException ) {
			log.error("Error handler", ex);
			errorMessage.setStatus(((WebApplicationException)ex).getResponse().getStatus());
		} else if (ex instanceof BadCredentialsException) {
			errorMessage.setStatus(Response.Status.FORBIDDEN.getStatusCode());
			errorMessage.setMessage("Usuário ou senha incorretos");
		} else {
			errorMessage.setStatus(Response.Status.INTERNAL_SERVER_ERROR.getStatusCode()); //defaults to internal server error 500
		}
	}
}