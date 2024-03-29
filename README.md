# AngularJS + Spring boot with JPA + Spring security Full example
An example of full application with AngularJS 1.3.15 in front end, Spring Boot with JPA (using Hibernate implementation), PostgreSQL DB and Spring security to protect Jersey endpoints.
You can use this example (or boilerplate) to start a real application for production, not only to learn this technologies. Fell free to contribute.
# Features
- AngularJS SPA demonstration with sub modules, router, factory, constants
- Lazy pagination of list
- CRUD of user
- Profile with image upload (Pending)
- Login screen and session control
- Angular Internationalization (en-US and pt-BR) (Pending language selection)
- Server side Internationalization (Pending)
- Bower for javascript dependencies
- Maven for java dependencies
- Grunt for client side build (Pending)

# How to run
- DB -
By default this application uses login 'root', pass 'root' and schema with name 'angular', you can use default info or change in application.properties file the info of your choice.

- Java - 
You can run the application backend by ide executing class rf.com.ServerApplication;
After generate maven artifact you can run using the command line 'java -jar [jarName.jar]';

- Client side - 
The client side is full javascript and html, thus you can run this artifact using Sublime with Server Extension, IDE's like WebStorm, Eclipse or in production Apache server.
