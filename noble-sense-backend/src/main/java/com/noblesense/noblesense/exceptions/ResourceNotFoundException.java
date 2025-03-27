package com.noblesense.noblesense.exceptions;

public class ResourceNotFoundException extends RuntimeException{
    public ResourceNotFoundException(String resource,String field ,  String message){
        super( String.format("%s with %s: %s is not found", resource, field,message));
    }
}
