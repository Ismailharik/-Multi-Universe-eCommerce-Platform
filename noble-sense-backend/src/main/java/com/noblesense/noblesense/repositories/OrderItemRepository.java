package com.noblesense.noblesense.repositories;

import com.noblesense.noblesense.entities.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;


public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    @Query("SELECT oi FROM OrderItem oi WHERE oi.order.date BETWEEN :startDate AND :endDate")
    List<Object[]> countTotalItemsOrderedByProduct(@Param("startDate") Date startDate,
                                                   @Param("endDate") Date endDate);
}
