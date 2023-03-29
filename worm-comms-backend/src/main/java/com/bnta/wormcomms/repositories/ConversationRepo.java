package com.bnta.wormcomms.repositories;

import com.bnta.wormcomms.models.Conversation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConversationRepo extends JpaRepository<Conversation, Integer> {
}
