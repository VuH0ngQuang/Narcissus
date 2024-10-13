package com.narcissus.backend.exceptions;

public class NotFoundException extends RuntimeException{

    public NotFoundException (String message) {
        super(message);
    }
}
