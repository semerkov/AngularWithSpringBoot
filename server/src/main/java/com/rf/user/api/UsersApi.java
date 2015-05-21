/*
 * Copyright 2012-2013 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.rf.user.api;

import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.rf.rest.apiutils.ApiResponseMessage;
import com.rf.rest.apiutils.NotFoundException;
import com.rf.user.business.UserBusiness;
import com.rf.user.domain.User;

@Component
@Path("/users")
@Produces({ "application/json" })
public class UsersApi {
	
	@Autowired
	private UserBusiness userBusiness;

	@GET
	@Path("/")
	public Response getUserList(@QueryParam("email") String email,
			@QueryParam("id") String id,
			@QueryParam("password") String password,
			@QueryParam("$size") String $size,
			@QueryParam("login") String login,
			@QueryParam("$sort") String $sort,
			@QueryParam("$page") String $page, @QueryParam("name") String name)
			throws NotFoundException {
		// do some magic!
		return Response
				.ok()
				.entity(new ApiResponseMessage(ApiResponseMessage.OK, "magic!"))
				.build();
	}

	@POST
	@Path("/")
	public Response postUserList(User user)
			throws NotFoundException {
		boolean saveResult = userBusiness.saveUser(user);
		if (saveResult) {
			return Response
					.ok()
					.entity(new ApiResponseMessage(ApiResponseMessage.OK, "saved!"))
					.build();			
		} else {
			return Response
					.serverError()
					.entity(new ApiResponseMessage(ApiResponseMessage.ERROR, "failed to save user"))
					.build();	
		}
	}

	@GET
	@Path("/{userid}")
	public Response getUser(
			@PathParam("userid") String userid)
			throws NotFoundException {
		// do some magic!
		return Response
				.ok()
				.entity(new ApiResponseMessage(ApiResponseMessage.OK, "magic!"))
				.build();
	}

	@PUT
	@Path("/{userid}")
	public Response putUser(
			@PathParam("userid") String userid, User user) throws NotFoundException {
		// do some magic!
		return Response
				.ok()
				.entity(new ApiResponseMessage(ApiResponseMessage.OK, "magic!"))
				.build();
	}

	@DELETE
	@Path("/{userid}")
	public Response deleteUser(
			@PathParam("userid") String userid)
			throws NotFoundException {
		// do some magic!
		return Response
				.ok()
				.entity(new ApiResponseMessage(ApiResponseMessage.OK, "magic!"))
				.build();
	}
}
