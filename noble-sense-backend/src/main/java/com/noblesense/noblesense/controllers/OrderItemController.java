package com.noblesense.noblesense.controllers;

import com.noblesense.noblesense.services.OrderItemService;
import lombok.AllArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.Map;


@RequestMapping("/api/v1/order-items")
@RestController()
@AllArgsConstructor
public class OrderItemController {
    private OrderItemService orderItemService;

    @GetMapping("/product-count")
    public ResponseEntity<Map<String, Long>> getProductCounts(
            @RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date startDate,
            @RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date endDate) {

        Map<String, Long> productCounts = orderItemService.getTotalItemsOrderedByProduct(startDate, endDate);
        return ResponseEntity.ok(productCounts);
    }
}
