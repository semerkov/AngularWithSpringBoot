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
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import com.rf.rest.apiutils.ApiResponseMessage;
import com.rf.rest.apiutils.NotFoundException;
import com.rf.user.business.UserBusiness;
import com.rf.user.domain.User;

@Component
@Path("/protected/users")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
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
	@Path("/")
	public Response postUser(User user) throws NotFoundException {
		try {
			User userSaved = userBusiness.saveUser(user);
			return Response.ok().entity(new ApiResponseMessage(ApiResponseMessage.OK, "User saved!", userSaved)).build();
		} catch (Exception e) {
			return Response.serverError().entity(new ApiResponseMessage(ApiResponseMessage.ERROR, "Failed to save user: " + e.getMessage())).build();			
		}
	}

	@GET
	@Path("/{userid}")
	public User getUser(@PathParam("userid") Long userid) throws NotFoundException {
		try {
			return userBusiness.load(userid);			
		} catch (Exception e) {
			throw new NotFoundException("User not found");
		}
	}

	@PUT
	@Path("/{userid}")
	public Response putUser(@PathParam("userid") String userid, User user) {
		try {
			user.setId(Long.valueOf(userid));
			User userSaved = userBusiness.updateUser(user);
			return Response.ok().entity(new ApiResponseMessage(ApiResponseMessage.OK, "User updated!", userSaved)).build();
		} catch (Exception e) {
			return Response.serverError().entity(new ApiResponseMessage(ApiResponseMessage.ERROR, "Failed to update user: " + e.getMessage())).build();
		}
	}

	@DELETE
	@Path("/{userid}")
	public Response deleteUser(@PathParam("userid") Long userid) {
		try {
			userBusiness.delete(userid);
			return Response.ok().entity(new ApiResponseMessage(ApiResponseMessage.OK, "User deleted with success!")).build();
		} catch (Exception e) {
			return Response.serverError().entity(new ApiResponseMessage(ApiResponseMessage.ERROR, "Failed to delete user: " + e.getMessage())).build();			
		}
	}
}
