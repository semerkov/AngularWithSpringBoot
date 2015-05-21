package com.rf.user.persistence;

import org.springframework.data.repository.CrudRepository;

import com.rf.user.domain.User;

public interface UserRepository extends CrudRepository<User, Long> {

}
