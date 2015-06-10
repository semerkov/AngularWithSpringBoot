package com.rf;

import org.glassfish.jersey.server.ResourceConfig;
import org.springframework.stereotype.Component;

import com.rf.security.api.LoginApi;
import com.rf.user.api.UsersApi;

@Component
public class EndpointRegister extends ResourceConfig {

    public EndpointRegister() {
    	register(LoginApi.class);
        register(UsersApi.class);
    }

}