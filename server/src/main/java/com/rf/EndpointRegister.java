package com.rf;

import org.glassfish.jersey.media.multipart.MultiPartFeature;
import org.glassfish.jersey.server.ResourceConfig;
import org.springframework.stereotype.Component;

import com.rf.rest.apiutils.GenericExceptionMapper;
import com.rf.security.api.LoginApi;
import com.rf.user.api.ProfileApi;
import com.rf.user.api.UsersApi;

@Component
public class EndpointRegister extends ResourceConfig {

    public EndpointRegister() {
    	register(LoginApi.class);
        register(UsersApi.class);
        register(ProfileApi.class);
        
        // Multipart handler
        register(MultiPartFeature.class);
        //Exception handler
        register(GenericExceptionMapper.class);
    }

}