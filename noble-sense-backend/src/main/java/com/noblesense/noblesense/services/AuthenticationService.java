package com.noblesense.noblesense.services;

import com.noblesense.noblesense.config.JwtService;
import com.noblesense.noblesense.dto.*;
import com.noblesense.noblesense.entities.Token;
import com.noblesense.noblesense.entities.User;
import com.noblesense.noblesense.enums.TokenType;
import com.noblesense.noblesense.exceptions.DuplicateUsernameException;
import com.noblesense.noblesense.exceptions.InvalidCredentialsException;
import com.noblesense.noblesense.exceptions.InvalidTokenException;
import com.noblesense.noblesense.exceptions.UserNotFoundException;
import com.noblesense.noblesense.repositories.TokenRepository;
import com.noblesense.noblesense.repositories.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.logging.Logger;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    private final Logger logger = Logger.getLogger(AuthenticationService.class.getName());

    public AuthenticationResponse register(RegisterRequest request) throws DuplicateUsernameException {
        logger.info(String.format("adding new user %s with balance", request.getPhone()));
        var user = User.builder()
                .fullName(request.getFullName())
                .address(request.getAddress())
                .phone(request.getPhone())
                .active(request.isActive())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .email(request.getEmail())
                .build();
        User savedUser;
        try {
             //sql can throw duplicate key exception
             savedUser = userRepository.save(user);
        } catch (DataIntegrityViolationException e) {
            throw new DuplicateUsernameException(request.getPhone());
        }

        var jwtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        saveUserToken(savedUser, jwtToken);
        return AuthenticationResponse.builder()
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        logger.info(String.format("Authenticating user ", request.toString()));
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getPhone(),
                        request.getPassword()
                )
        );
        var user = userRepository.findByPhone(request.getPhone())
                .orElseThrow();

        var jwtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        revokeAllUserTokens(user);
        saveUserToken(user, jwtToken);
        return AuthenticationResponse.builder()
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .fullName(user.getFullName())
                .build();
    }

    private void saveUserToken(User user, String jwtToken) {

        var token = Token.builder()
                .user(user)
                .token(jwtToken)
                .tokenType(TokenType.BEARER)
                .expired(false)
                .revoked(false)
                .build();
        tokenRepository.save(token);
    }

    private void revokeAllUserTokens(User user) {
        var validUserTokens = tokenRepository.findAllValidTokenByUser(user.getId());
        if (validUserTokens.isEmpty())
            return;
        tokenRepository.deleteAll(validUserTokens);
    }


    public AuthenticationResponse refreshToken(String refreshToken) {
        String userPhone = jwtService.extractUsername(refreshToken);
        if (userPhone == null) {
            throw new InvalidTokenException("Invalid refresh token");
        }

        User user = userRepository.findByPhone(userPhone)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        if (jwtService.isTokenValid(refreshToken, user)) {
            String newAccessToken = jwtService.generateToken(user);
            revokeAllUserTokens(user);
            saveUserToken(user, newAccessToken);

            return AuthenticationResponse.builder()
                    .accessToken(newAccessToken)
                    .refreshToken(refreshToken)
                    .fullName(user.getFullName())
                    .build();
        } else {
            throw new InvalidTokenException("Invalid refresh token");
        }
    }

    // If someone want to change it's password by Itself
    public void changePassword(ChangePasswordRequest request) {
        var user = userRepository.findByPhone(request.getPhone())
                .orElseThrow(
                        ()-> new UserNotFoundException(request.getPhone())
                );


        if (isPasswordValid(request.getOldPassword(), user.getPassword())) {
            user.setPassword(passwordEncoder.encode(request.getNewPassword()));
            userRepository.save(user);
            // have to logout the user after he changed the password
//            this.revokeAllUserTokens(user);
        }else{
            throw new InvalidCredentialsException("Old password is incorrect");
        }

    }

    public boolean isPasswordValid(String password, String oldPassword) {
        return passwordEncoder.matches(password, oldPassword);
    }
    //If the admin want to change the password for someone
    public String updateUserPassword(UpdateUserPassword request) {
        User user = userRepository.findByPhone(request.getPhone()).orElseThrow(
                ()-> new UserNotFoundException(request.getPhone())
        );
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        userRepository.save(user);

        return "Password updated successfully.";

    }
}