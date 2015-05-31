package com.rf.user.api;

import javax.ws.rs.Consumes;
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
import org.springframework.data.domain.Page;
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
	public Page<User> getUserList(@QueryParam("email") String email, @QueryParam("id") String id, @QueryParam("password") String password,
			@QueryParam("$size") String size, @QueryParam("login") String login, @QueryParam("$sort") String sort,
			@QueryParam("$page") String page, @QueryParam("name") String name) throws NotFoundException {
		return userBusiness.getPaginatedList(page, size, sort);
	}

	@POST
	@Consumes("application/x-www-form-urlencoded")
	@Path("/")
	public Response postUser(User user) throws NotFoundException {
		boolean saveResult = userBusiness.saveUser(user);
		if (saveResult) {
			return Response.ok().entity(new ApiResponseMessage(ApiResponseMessage.OK, "saved!")).build();
		} else {
			return Response.serverError().entity(new ApiResponseMessage(ApiResponseMessage.ERROR, "failed to save user")).build();
		}
	}

	@GET
	@Path("/{userid}")
	public User getUser(@PathParam("userid") Long userid) throws NotFoundException {
		return userBusiness.load(userid);
	}

	@PUT
	@Path("/{userid}")
	public boolean putUser(@PathParam("userid") String userid, User user) throws NotFoundException {
		return userBusiness.saveUser(user);
	}

	@DELETE
	@Path("/{userid}")
	public Response deleteUser(@PathParam("userid") Long userid) throws NotFoundException {
		boolean result = userBusiness.delete(userid);
		if (result) {
			return Response.ok().entity(new ApiResponseMessage(ApiResponseMessage.OK, "deleted with success!")).build();
		} else {
			return Response.serverError().entity(new ApiResponseMessage(ApiResponseMessage.ERROR, "failed to delete user")).build();
		}
	}
}
