package com.noblesense.noblesense.dto;

import com.noblesense.noblesense.enums.OrderStatus;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderStatusCount {
    private OrderStatus status;
    private Long count;

    public OrderStatusCount(OrderStatus status, Long count) {
        this.status = status;
        this.count = count;
    }

}