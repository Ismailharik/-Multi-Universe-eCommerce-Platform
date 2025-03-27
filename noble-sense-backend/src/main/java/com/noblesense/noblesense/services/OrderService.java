package com.noblesense.noblesense.services;

import com.noblesense.noblesense.dto.OrderDTO;
import com.noblesense.noblesense.dto.OrderStatusCount;
import com.noblesense.noblesense.dto.OrdersPage;
import com.noblesense.noblesense.enums.OrderStatus;
import org.springframework.security.core.Authentication;

import java.util.Date;
import java.util.List;


// Enum for Order status
public interface OrderService {
    OrderDTO createOrder(OrderDTO orderDTO, Authentication authentication);

    OrderDTO getOrderById(String orderId);

    OrdersPage getAllOrders(int page, int size);

    OrderDTO updateOrder(String orderId, OrderDTO orderDTO);


    OrdersPage findByOrderStatusOrderByDateDescPrimaryDishName(OrderStatus status,int page,int size);

    OrdersPage getOrdersByDateRangeAndStatus(int page, int size, Date startDate, Date endDate, OrderStatus orderStatus);
    List<OrderStatusCount> countOrdersByDateRange(Date startDate, Date endDate);
    void cancelOrder(String orderId);

}