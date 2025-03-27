package com.noblesense.noblesense.exceptions;

import java.util.UUID;

public class UserNotFoundException extends RuntimeException{
    public UserNotFoundException(String id){
        super(String.format("User with Id %s is not found",id));
    }
}
