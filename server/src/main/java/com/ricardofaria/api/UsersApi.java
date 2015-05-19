package com.ricardofaria.api;

import com.ricardofaria.api.NotFoundException;
import com.ricardofaria.model.*;
import com.wordnik.swagger.annotations.*;

import java.util.List;

import javax.ws.rs.core.Response;
import javax.ws.rs.*;

@Path("/users")
@Api(value = "/users", description = "the users API")
@Produces({"application/json"})
public class UsersApi {
  
  @GET
  @Path("/")
  @ApiOperation(value = "Loads a list of User", notes = "Loads a list of User", response = User.class, responseContainer = "List")
  @ApiResponses(value = { 
    @ApiResponse(code = 400, message = "400 status response") })

  public Response getUserList(@ApiParam(value = "Allows to filter the collections of result by the value of field email") @QueryParam("email") String email,
    @ApiParam(value = "Allows to filter the collections of result by the value of field id") @QueryParam("id") String id,
    @ApiParam(value = "Allows to filter the collections of result by the value of field password") @QueryParam("password") String password,
    @ApiParam(value = "Size of the page to retrieve. Integer value") @QueryParam("$size") String $size,
    @ApiParam(value = "Allows to filter the collections of result by the value of field login") @QueryParam("login") String login,
    @ApiParam(value = "Order in which to retrieve the results. Mutliple sort criteria can be passed. Example: sort=age ASC,height DESC") @QueryParam("$sort") String $sort,
    @ApiParam(value = "Number of the page to retrieve. Integer value.") @QueryParam("$page") String $page,
    @ApiParam(value = "Allows to filter the collections of result by the value of field name") @QueryParam("name") String name)
      throws NotFoundException {
      // do some magic!
      return Response.ok().entity(new ApiResponseMessage(ApiResponseMessage.OK, "magic!")).build();
  }

  
  @POST
  @Path("/")
  @ApiOperation(value = "Adds a User", notes = "Adds a User", response = User.class)
  @ApiResponses(value = {  })

  public Response postUserList(@ApiParam(value = ""  ) User body)
      throws NotFoundException {
      // do some magic!
      return Response.ok().entity(new ApiResponseMessage(ApiResponseMessage.OK, "magic!")).build();
  }

  
  @GET
  @Path("/{userid}")
  @ApiOperation(value = "Loads a User", notes = "Loads a User", response = User.class)
  @ApiResponses(value = { 
    @ApiResponse(code = 400, message = "400 status response") })

  public Response getUser(@ApiParam(value = "Identifier of the User",required=true ) @PathParam("userid") String userid)
      throws NotFoundException {
      // do some magic!
      return Response.ok().entity(new ApiResponseMessage(ApiResponseMessage.OK, "magic!")).build();
  }

  
  @PUT
  @Path("/{userid}")
  @ApiOperation(value = "Stores a User", notes = "Stores a User", response = User.class)
  @ApiResponses(value = {  })

  public Response putUser(@ApiParam(value = "Identifier of the User",required=true ) @PathParam("userid") String userid,
    @ApiParam(value = ""  ) User body)
      throws NotFoundException {
      // do some magic!
      return Response.ok().entity(new ApiResponseMessage(ApiResponseMessage.OK, "magic!")).build();
  }

  
  @DELETE
  @Path("/{userid}")
  @ApiOperation(value = "Deletes a User", notes = "Deletes a User", response = Void.class)
  @ApiResponses(value = {  })

  public Response deleteUser(@ApiParam(value = "Identifier of the User",required=true ) @PathParam("userid") String userid)
      throws NotFoundException {
      // do some magic!
      return Response.ok().entity(new ApiResponseMessage(ApiResponseMessage.OK, "magic!")).build();
  }

  
}
