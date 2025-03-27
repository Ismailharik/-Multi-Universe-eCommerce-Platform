package com.noblesense.noblesense.exceptions;

public class ProductNotFoundException extends RuntimeException {
    public ProductNotFoundException(long id){
        super(String.format("Product with Id: %s is not found",id));
    }
}
