package Repositories;

import Models.Conversation;
import Models.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConversationRepo extends JpaRepository<Conversation, Integer> {
}
