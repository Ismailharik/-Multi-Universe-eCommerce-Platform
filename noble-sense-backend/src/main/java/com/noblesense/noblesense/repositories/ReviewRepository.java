package com.noblesense.noblesense.repositories;

import com.noblesense.noblesense.entities.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByProduct_IdAndIsApprovedTrue(Long productId);
    // reviews by date
    List<Review> findAllByOrderByDateDesc();
}
