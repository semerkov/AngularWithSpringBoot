package com.rf;

import java.net.URI;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Paths;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.rf.user.persistence.UserRepository;

@Component
public class ApplicationStartupListener implements ApplicationListener<ContextRefreshedEvent> {

	@Autowired(required = true)
	private UserRepository repository;
	@Autowired
	private EntityManager manager;

	@Transactional
	@Override
	public void onApplicationEvent(final ContextRefreshedEvent event) {

		if (repository.count() == 0) {
			try {
				System.out.println("Inserting all users in import.sql");

				URI uri = ApplicationStartupListener.class.getResource("/import.sql").toURI();
				for (String line : Files.readAllLines(Paths.get(uri), Charset.defaultCharset())) {
					Query query = manager.createNativeQuery(line);
					query.executeUpdate();
				}

				System.out.println("DONE");
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}

}