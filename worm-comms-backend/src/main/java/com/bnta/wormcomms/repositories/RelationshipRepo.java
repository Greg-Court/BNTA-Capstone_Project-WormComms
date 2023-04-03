package com.bnta.wormcomms.repositories;

import com.bnta.wormcomms.models.Relationship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RelationshipRepo extends JpaRepository<Relationship,Integer> {
    List<Relationship> findAllByUser1_Id(int userId);
}
