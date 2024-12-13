package com.narcissus.backend.repository.orders;

import com.narcissus.backend.models.orders.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrdersRepository extends JpaRepository<Orders, Long> {
    @Query("SELECT o FROM Orders o WHERE o.userEntity.userId = :userId")
    List<Orders> findOrdersByUserEntityUserId(@Param("userId") Long userId);
}