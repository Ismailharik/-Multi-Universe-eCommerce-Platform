package com.noblesense.noblesense.services;

import com.noblesense.noblesense.repositories.OrderItemRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@AllArgsConstructor

@Service
public class OrderItemServiceImpl implements OrderItemService {

    private OrderItemRepository orderItemRepository;

    public Map<String, Long> getTotalItemsOrderedByProduct(Date startDate, Date endDate) {
        List<Object[]> results = orderItemRepository.countTotalItemsOrderedByProduct(startDate, endDate);
        Map<String, Long> productCounts = new HashMap<>();
        for (Object[] result : results) {
            String productName = (String) result[0];
            Long count = (Long) result[1];
            productCounts.put(productName, count);
        }
        return productCounts;
    }
}
