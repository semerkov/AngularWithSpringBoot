package com.rf.app;

import org.glassfish.jersey.server.ResourceConfig;
import org.springframework.stereotype.Component;

import com.rf.restserver.user.api.UsersApi;

@Component
public class EndpointRegister extends ResourceConfig {

    public EndpointRegister() {
        register(UsersApi.class);
    }

}