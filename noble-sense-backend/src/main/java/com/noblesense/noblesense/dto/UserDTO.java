package com.noblesense.noblesense.dto;

import com.noblesense.noblesense.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;



@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO{
    private String id;
    private String fullName;
    private String email;
    private String phone;
    private String country;
    private String address;
    private Role role;
    private boolean active;
}