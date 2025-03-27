package com.noblesense.noblesense.dto;

import com.noblesense.noblesense.enums.OrderStatus;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.Date;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class OrderDTO {

    private String id;
    private double totalPrice;
    private double shipCost;
    private Date date;
    private OrderStatus orderStatus;
    private UserDTO user;
    //order item
    @NotNull(message = "Order items cannot be null")
    private List<OrderItemDTO> orderItems;

    private String orderNote;
    private String address;
    private String country;
}
