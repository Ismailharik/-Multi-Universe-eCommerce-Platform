package com.noblesense.noblesense.exceptions;

public class CategoryNotFoundException extends RuntimeException {
    public CategoryNotFoundException(long id){
        super(String.format("Category with ID : %s Is not found",id));
    }
}
