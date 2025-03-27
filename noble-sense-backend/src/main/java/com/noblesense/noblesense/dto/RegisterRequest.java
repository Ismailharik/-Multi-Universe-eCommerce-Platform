package com.noblesense.noblesense.dto;

import com.noblesense.noblesense.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    private String fullName;
    private String phone;
    private String address;
    private String password;
    private boolean active;
    private String email;
    private Role role;
}
