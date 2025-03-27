package com.noblesense.noblesense.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@ToString(exclude = "category") // To avoid circular calls in bidirectional relationships
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String sku;
    private String title;

//    private String slug;

//    private String unit;

    @ElementCollection
    private List<String> imageURLs;
    private String parent;
    private double price;
    private double discount;
    private int quantity;
//    private String brand;
    private String status;
    private String productType;
    @Column(columnDefinition = "TEXT")
    private String description;
    @Column(columnDefinition = "TEXT")
    private String additionalInformation;
    private boolean featured;
    private int sellCount;
    @Embedded
    private OfferDate offerDate;
//    @ElementCollection
//    private List<String> tags;
    private String videoId;
    @Column(columnDefinition = "TEXT")
    private String sizes;

    @Embeddable
    @Getter
    @Setter
    public static class OfferDate {
        private Date startDate;
        private Date endDate;
    }
    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Product)) return false;
        return id != null && id.equals(((Product) o).getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}