package com.rf.user.persistence;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.rf.user.domain.User;

public interface UserRepository extends CrudRepository<User, Long> {

	@Query(value = "SELECT count(*) FROM AUSERS ", nativeQuery = true)
	public int countUsers();
	
	@Query(value = "FROM com.rf.user.domain.User u")
	public Page<User> getPaginatedList(Pageable pageable);

}
