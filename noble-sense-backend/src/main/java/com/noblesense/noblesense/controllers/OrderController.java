package com.noblesense.noblesense.controllers;

import com.noblesense.noblesense.dto.OrderDTO;
import com.noblesense.noblesense.dto.OrderStatusCount;
import com.noblesense.noblesense.dto.OrdersPage;
import com.noblesense.noblesense.enums.OrderStatus;
import com.noblesense.noblesense.services.OrderService;
import lombok.AllArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;


@RestController
@RequestMapping("/api/v1/orders")
@AllArgsConstructor
public class OrderController {

    private final OrderService orderService;



    @PostMapping("")
    public ResponseEntity<OrderDTO> createOrder(@RequestBody OrderDTO orderDTO, Authentication authentication) {
        OrderDTO createdOrder = orderService.createOrder(orderDTO, authentication);
        return new ResponseEntity<>(createdOrder, HttpStatus.CREATED);
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<OrderDTO> getOrderById(@PathVariable String orderId) {
        OrderDTO orderDTO = orderService.getOrderById(orderId);
        return new ResponseEntity<>(orderDTO, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<OrdersPage> getAllOrders(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        OrdersPage ordersPage = orderService.getAllOrders(page, size);
        return new ResponseEntity<>(ordersPage, HttpStatus.OK);
    }

    @PutMapping("/{orderId}")
    public ResponseEntity<OrderDTO> updateOrder(
            @PathVariable String orderId,
            @RequestBody OrderDTO orderDTO
    ) {
        OrderDTO updatedOrder = orderService.updateOrder(orderId, orderDTO);
        return new ResponseEntity<>(updatedOrder, HttpStatus.OK);
    }


    @GetMapping("/status/{status}")
    // this api search by order status and sort data by date then by primaryOrder

    public ResponseEntity<OrdersPage> findByOrderStatusOrderByDateDateAscPrimaryDishName(
            @PathVariable OrderStatus status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ){
        OrdersPage ordersPage = orderService.findByOrderStatusOrderByDateDescPrimaryDishName(status, page, size);
        return new ResponseEntity<>(ordersPage, HttpStatus.OK);
    }
    @GetMapping("/filter")
    public ResponseEntity<OrdersPage> getOrdersByDateRangeAndStatus(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size,
            @RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date startDate,
            @RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date endDate,
            @RequestParam(value = "status", required = false) OrderStatus orderStatus
    ) {
        OrdersPage ordersPage = orderService.getOrdersByDateRangeAndStatus(page, size, startDate, endDate, orderStatus);
        return new ResponseEntity<>(ordersPage, HttpStatus.OK);
    }
    @GetMapping("/count")
    public ResponseEntity<List<OrderStatusCount>> countOrdersByDateRangeAndStatus(
            @RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date startDate,
            @RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date endDate
    ) {
        List<OrderStatusCount> orderCount = orderService.countOrdersByDateRange(startDate, endDate);
        return new ResponseEntity<>(orderCount, HttpStatus.OK);
    }


    @DeleteMapping("/{orderId}")
    public void cancelOrder(@PathVariable String orderId) {
        orderService.cancelOrder(orderId);
    }


}