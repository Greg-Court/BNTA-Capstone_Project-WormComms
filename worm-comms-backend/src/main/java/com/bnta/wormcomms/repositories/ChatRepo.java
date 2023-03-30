package com.bnta.wormcomms.repositories;

import com.bnta.wormcomms.models.Chat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatRepo extends JpaRepository<Chat, Integer> {
    List<Chat> findByParticipantsId(int userId);
}
