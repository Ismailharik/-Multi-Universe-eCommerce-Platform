package com.noblesense.noblesense.controllers;

import com.noblesense.noblesense.dto.*;
import com.noblesense.noblesense.dto.AuthenticationResponse;
import com.noblesense.noblesense.exceptions.InvalidTokenException;
import com.noblesense.noblesense.exceptions.UserNotFoundException;
import com.noblesense.noblesense.services.AuthenticationService;
import com.noblesense.noblesense.dto.AuthenticationRequest;
import com.noblesense.noblesense.dto.ChangePasswordRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;

//    It replaced to RegisterController
//    @PostMapping("/register")
//    public ResponseEntity<AuthenticationResponse> register(
//            @RequestBody RegisterRequest request
//    ) {
//        return ResponseEntity.ok(service.register(request));
//    }
    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ) {
        return ResponseEntity.ok(service.authenticate(request));
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(@RequestHeader(name = "REFRESH_TOKEN") String refreshToken) {
        try {
            AuthenticationResponse response = service.refreshToken(refreshToken);
            return ResponseEntity.ok(response);
        } catch (InvalidTokenException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("User not found");
        }
    }
    @PostMapping("/change-password")
    public void changePassword(
            @RequestBody ChangePasswordRequest request
    ) {
        service.changePassword(request);
    }




}
