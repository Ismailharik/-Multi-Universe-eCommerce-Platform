package com.noblesense.noblesense.services;


import java.util.Date;
import java.util.Map;

public interface OrderItemService {
     Map<String, Long> getTotalItemsOrderedByProduct(Date startDate, Date endDate);

}
