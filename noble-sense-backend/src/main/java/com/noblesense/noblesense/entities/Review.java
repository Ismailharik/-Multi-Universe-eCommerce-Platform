package com.noblesense.noblesense.entities;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Review {
    @Id   @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String description;
    private int starsNumber;
    private String fullName;
    private String email;
    private boolean isApproved;
    private Date date;
    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;
}
