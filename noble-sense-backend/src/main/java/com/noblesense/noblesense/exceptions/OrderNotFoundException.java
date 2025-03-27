package com.noblesense.noblesense.exceptions;


public class OrderNotFoundException extends RuntimeException {
    public OrderNotFoundException(String orderId) {
        super(String.format("Order with Id: %s is not found",orderId));
    }
}
