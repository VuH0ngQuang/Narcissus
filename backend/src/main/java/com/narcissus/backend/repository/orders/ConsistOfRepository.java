package com.narcissus.backend.repository.orders;

import com.narcissus.backend.models.orders.ConsistOf;
import com.narcissus.backend.models.orders.ConsistOfKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface ConsistOfRepository extends JpaRepository<ConsistOf, ConsistOfKey> {
    @Modifying
    @Transactional
    @Query("DELETE FROM ConsistOf c WHERE c.product.productId = :productId")
    void deleteByProductId(@Param("productId") Long productId);
}
