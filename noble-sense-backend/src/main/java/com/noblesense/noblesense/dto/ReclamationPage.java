package com.noblesense.noblesense.dto;

import lombok.Data;

import java.util.List;

@Data
public class ReclamationPage {
    private List<ReclamationDTO> reclamations;
    private int totalPages;
    private int page;
    private int size;
    private boolean first;
    private boolean last;
}
