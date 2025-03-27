package com.noblesense.noblesense.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
public class OrdersPage {
    private List<OrderDTO> orders;
    private int totalPages;
    private int page;
    private int size;
    private boolean first;
    private boolean last;
}
