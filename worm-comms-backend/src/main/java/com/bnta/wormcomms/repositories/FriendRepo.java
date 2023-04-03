package com.bnta.wormcomms.repositories;

import com.bnta.wormcomms.models.Friend;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FriendRepo extends JpaRepository<Friend,Integer> {
    List<Friend> findAllByUser1_Id(int userId);
}
