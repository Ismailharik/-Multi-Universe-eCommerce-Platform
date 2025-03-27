package com.noblesense.noblesense.entities;

import com.noblesense.noblesense.enums.OrderStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.security.SecureRandom;
import java.util.Date;
import java.util.List;
import java.util.Random;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "_order")
public class Order {
    @Id
    private String id;
    private double totalPrice;
    private double shipCost;
    private Date date;
    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus;
    private String country;
    private String address;
    private String orderNote;
    @ManyToOne
    private User user;
    //order item
    @OneToMany(mappedBy = "order",cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> orderItem;

    @PrePersist
    public void generateId() {
        this.id = generateRandomId();
    }
    private String generateRandomId() {
        int length = 8;
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        Random random = new SecureRandom();
        char[] idChars = new char[length];
        for (int i = 0; i < length; i++) {
            idChars[i] = characters.charAt(random.nextInt(characters.length()));
        }
        return new String(idChars);
    }

}
