package com.noblesense.noblesense.exceptions;
import org.springframework.http.HttpStatus;
import java.time.ZonedDateTime;


public record ErrorMessage(String message, HttpStatus httpStatus, ZonedDateTime timestamp) {
    //you can define your own methods
}
