package com.narcissus.backend.repository.product;

import com.narcissus.backend.models.product.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface ReviewRepository extends JpaRepository <Review, Long> {
    @Query("SELECT re FROM Review re WHERE re.product.productId = :productId")
    List<Review> getReviewsByProductId(@Param("productId") Long productId);

    @Modifying
    @Transactional
    @Query("DELETE FROM Review re WHERE re.product.productId = :productId")
    void deleteByProductId(@Param("productId") Long productId);
}
