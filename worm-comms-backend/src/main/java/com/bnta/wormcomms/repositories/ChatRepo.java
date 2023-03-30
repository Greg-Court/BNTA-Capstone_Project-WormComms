package com.bnta.wormcomms.repositories;

import com.bnta.wormcomms.models.Chat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatRepo extends JpaRepository<Chat, Integer> {
}
