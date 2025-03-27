package com.noblesense.noblesense.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;
    private String parent;
    @Column(length = 60)
    private String name;
    @Column(length = 100)
    private String img;
    private int numberOfProducts;
//    private String status
    @OneToMany(mappedBy = "category")
    private List<Product> products;
}
