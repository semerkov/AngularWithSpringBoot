package com.rf;

import java.awt.image.BufferedImage;
import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.FileReader;
import java.io.LineNumberReader;
import java.net.URL;
import java.sql.Connection;
import java.util.List;

import javax.imageio.ImageIO;
import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.rf.user.persistence.UserRepository;

@Component
public class ApplicationStartupListener implements
		ApplicationListener<ContextRefreshedEvent> {

	@Autowired(required = true)
	private UserRepository repository;
	@Autowired
	private EntityManager manager;

	@Transactional
	@Override
	public void onApplicationEvent(final ContextRefreshedEvent event) {

		if (repository.count() == 0) {
			try {
				/*System.out.println("Inserting all users in import.sql");
				
				final ResourceDatabasePopulator rdp = new ResourceDatabasePopulator();
				rdp.addScript(new ClassPathResource("/import.sql"));
				
				manager.getTransaction().begin();
				Connection connection = manager.unwrap(java.sql.Connection.class);
				rdp.populate(connection);
				manager.getTransaction().commit();
				System.out.println("DONE");*/
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}
	
}