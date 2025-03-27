package com.noblesense.noblesense.repositories;

import com.noblesense.noblesense.dto.OrderStatusCount;
import com.noblesense.noblesense.entities.Order;
import com.noblesense.noblesense.enums.OrderStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;


public interface OrderRepository extends JpaRepository<Order, String> {

    Page<Order> findByOrderStatusOrderByDateDesc(OrderStatus status, Pageable pageable);
    Page<Order> findByDateBetweenAndOrderStatusOrderByDateDesc(Pageable pageable, Date startDate, Date endDate,OrderStatus status);
    /*
     * the first element in the list is COMPLETED
     * the second element in the list is CREATED
     * the first element in the list is PROCESSING
     * */
    @Query("SELECT new com.noblesense.noblesense.dto.OrderStatusCount(o.orderStatus, COUNT(o)) " +
            "FROM Order o " +
            "WHERE o.date BETWEEN :startDate AND :endDate " +
            "GROUP BY o.orderStatus")
    List<OrderStatusCount> countOrdersByStatusInDateRange(
            @Param("startDate") Date startDate,
            @Param("endDate") Date endDate
    );




}
