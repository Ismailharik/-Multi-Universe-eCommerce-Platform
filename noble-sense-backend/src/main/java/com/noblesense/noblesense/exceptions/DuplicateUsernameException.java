package com.noblesense.noblesense.exceptions;



public class DuplicateUsernameException extends RuntimeException{

    public DuplicateUsernameException(String phone){
        super(String.format("Phone %s is already exist",phone));
    }
}
