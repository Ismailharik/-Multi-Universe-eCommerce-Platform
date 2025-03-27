package com.noblesense.noblesense.services;

import com.noblesense.noblesense.dto.ReclamationDTO;
import com.noblesense.noblesense.dto.ReclamationPage;

import java.util.List;

public interface ReclamationService {
    ReclamationDTO addReclamation(ReclamationDTO reclamationDTO);
    ReclamationPage getAllReclamations(int page, int size);
    void deleteReclamation(Long reclamationId);

    ReclamationDTO toggleAnswered(Long reclamationId);
}
