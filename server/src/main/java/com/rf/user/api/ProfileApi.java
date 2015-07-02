package com.rf.user.api;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Enumeration;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import org.apache.tomcat.util.http.fileupload.FileItemIterator;
import org.apache.tomcat.util.http.fileupload.FileItemStream;
import org.apache.tomcat.util.http.fileupload.servlet.ServletFileUpload;
import org.springframework.stereotype.Component;

@Component
@Path("/protected/profile")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class ProfileApi {

	//@Autowired
	//private UserBusiness userBusiness;

	@POST
	@Path("/uploadImage")
	public void uploadProfileImage(@Context HttpServletRequest req) throws ServletException, IOException {
		try {
			req.setCharacterEncoding("utf-8");
			if (req.getParameter("errorCode") != null) {
				//res.sendError(Integer.parseInt(req.getParameter("errorCode")), req.getParameter("errorMessage"));
				return;
			}
			StringBuilder sb = new StringBuilder("{\"result\": [");
			
			if (req.getHeader("Content-Type") != null
					&& req.getHeader("Content-Type").startsWith("multipart/form-data")) {
				ServletFileUpload upload = new ServletFileUpload();

				FileItemIterator iterator = upload.getItemIterator(req);

				while (iterator.hasNext()) {
					FileItemStream item = iterator.next();
					sb.append("{");
					sb.append("\"fieldName\":\"").append(item.getFieldName()).append("\",");
					if (item.getName() != null) {
						sb.append("\"name\":\"").append(item.getName()).append("\",");
					}
					if (item.getName() != null) {
						sb.append("\"size\":\"").append(size(item.openStream())).append("\"");
					} else {
						sb.append("\"value\":\"").append(read(item.openStream()).replace("\"", "'")).append("\"");
					}
					sb.append("}");
					if (iterator.hasNext()) {
						sb.append(",");
					}
				}
			} else {
				sb.append("{\"size\":\"" + size(req.getInputStream()) + "\"}");
			}

			sb.append("]");
			sb.append(", \"requestHeaders\": {");
			Enumeration<String> headerNames = req.getHeaderNames();
			while (headerNames.hasMoreElements()) {
				String header = headerNames.nextElement();
				sb.append("\"").append(header).append("\":\"").append(req.getHeader(header)).append("\"");
				if (headerNames.hasMoreElements()) {
					sb.append(",");
				}
			}
			sb.append("}}");
			//res.setCharacterEncoding("utf-8");
			//res.getWriter().write(sb.toString());
		} catch (Exception ex) {
			throw new ServletException(ex);
		}
	}

	protected int size(InputStream stream) {
		int length = 0;
		try {
			byte[] buffer = new byte[2048];
			int size;
			while ((size = stream.read(buffer)) != -1) {
				length += size;
			}
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
		return length;

	}

	protected String read(InputStream stream) {
		StringBuilder sb = new StringBuilder();
		BufferedReader reader = new BufferedReader(new InputStreamReader(stream));
		try {
			String line;
			while ((line = reader.readLine()) != null) {
				sb.append(line);
			}
		} catch (IOException e) {
			throw new RuntimeException(e);
		} finally {
			try {
				reader.close();
			} catch (IOException e) {
			}
		}
		return sb.toString();
	}
}
