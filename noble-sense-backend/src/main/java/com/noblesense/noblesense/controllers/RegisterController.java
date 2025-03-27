package com.noblesense.noblesense.controllers;

import com.noblesense.noblesense.dto.AuthenticationResponse;
import com.noblesense.noblesense.dto.RegisterRequest;
import com.noblesense.noblesense.services.AuthenticationService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/v1/register-users")
@RequiredArgsConstructor
public class RegisterController {
    private final AuthenticationService service;

    @PostMapping("")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ) {
        return ResponseEntity.ok(service.register(request));
    }

}

