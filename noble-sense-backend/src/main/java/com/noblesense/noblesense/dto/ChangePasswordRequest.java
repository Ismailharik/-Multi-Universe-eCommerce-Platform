package com.noblesense.noblesense.dto;


import lombok.Data;

@Data
public class ChangePasswordRequest {
    private String oldPassword;
    private String newPassword;
    private String phone;
}
