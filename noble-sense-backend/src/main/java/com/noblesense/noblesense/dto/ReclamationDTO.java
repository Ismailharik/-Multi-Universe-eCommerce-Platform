package com.noblesense.noblesense.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReclamationDTO {
    private Long id;
    private String fullName;
    private String email;
    private String phone;
    private String message;
    private boolean isAnswered;
}
