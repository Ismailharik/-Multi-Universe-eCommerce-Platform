package com.noblesense.noblesense.controllers;

import com.noblesense.noblesense.dto.ReclamationDTO;
import com.noblesense.noblesense.dto.ReclamationPage;
import com.noblesense.noblesense.services.ReclamationService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/reclamations")
public class ReclamationController {
    private final ReclamationService reclamationService;

    @GetMapping("")
    public ResponseEntity<ReclamationPage> getAllReclamations(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        ReclamationPage reclamations = reclamationService.getAllReclamations(page, size);
        return ResponseEntity.ok(reclamations);
    }
    @PostMapping("")
    public ResponseEntity<ReclamationDTO> addReclamation(@RequestBody ReclamationDTO reclamationDTO) {
        ReclamationDTO newReclamation = reclamationService.addReclamation(reclamationDTO);
        return ResponseEntity.ok(newReclamation);
    }
    @DeleteMapping("/{reclamationId}")
    public ResponseEntity<Void> deleteReclamation(@PathVariable Long reclamationId) {
        reclamationService.deleteReclamation(reclamationId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("toggle-answered/{reclamationId}")
    public ResponseEntity<ReclamationDTO> toggleAnswered(@PathVariable Long reclamationId) {
        ReclamationDTO reclamationDTO = reclamationService.toggleAnswered(reclamationId);
        return ResponseEntity.ok(reclamationDTO);
    }


}
