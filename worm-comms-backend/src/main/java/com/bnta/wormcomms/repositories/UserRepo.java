package com.bnta.wormcomms.repositories;

import com.bnta.wormcomms.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepo extends JpaRepository<User, Integer> {
    @Query("SELECT u FROM User u WHERE u.id IN :ids")
    List<User> findAllByIds(List<Integer> ids);
}