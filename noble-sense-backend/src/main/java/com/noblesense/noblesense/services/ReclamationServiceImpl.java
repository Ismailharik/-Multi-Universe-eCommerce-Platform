package com.noblesense.noblesense.services;

import com.noblesense.noblesense.dto.ReclamationPage;
import com.noblesense.noblesense.exceptions.ResourceNotFoundException;
import com.noblesense.noblesense.repositories.ReclamationRepository;
import com.noblesense.noblesense.dto.ReclamationDTO;
import com.noblesense.noblesense.entities.Reclamation;
import com.noblesense.noblesense.mappers.Mapper;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@RequiredArgsConstructor
@Service
public class ReclamationServiceImpl implements ReclamationService {
    private final ReclamationRepository reclamationRepository;
    private final Mapper mapper;
    private final Logger logger = LoggerFactory.getLogger(ReclamationServiceImpl.class);
    @Override
    public ReclamationDTO addReclamation(ReclamationDTO reclamationDTO) {
        logger.info("addReclamation: {}",reclamationDTO);
        Reclamation reclamation = mapper.convertToReclamation(reclamationDTO);
        reclamation.setDate(new Date());
        Reclamation save = reclamationRepository.save(reclamation);
        return mapper.convertToReclamationDTO(save);
    }

    @Override
    public ReclamationPage getAllReclamations(int page, int size) {
        // page of reclamations
        PageRequest pr = PageRequest.of(page, size, Sort.by("date").descending());
        Page<Reclamation> reclamations = reclamationRepository.findAll(pr);

        ReclamationPage reclamationPage = new ReclamationPage();
        reclamationPage.setReclamations(mapper.convertToReclamationDTOList(reclamations.getContent()));
        reclamationPage.setTotalPages(reclamations.getTotalPages());
        reclamationPage.setPage(reclamations.getNumber());
        reclamationPage.setSize(reclamations.getSize());
        reclamationPage.setFirst(reclamations.isFirst());
        reclamationPage.setLast(reclamations.isLast());
        return reclamationPage;
    }

    @Override
    public void deleteReclamation(Long reclamationId) {
       reclamationRepository.deleteById(reclamationId);
    }

    @Override
    public ReclamationDTO toggleAnswered(Long reclamationId) {
        logger.info("toggleAnswered: {}",reclamationId);

        Reclamation reclamation = reclamationRepository.findById(reclamationId).orElseThrow(
                () -> new ResourceNotFoundException("Reclamation", "id", String.valueOf(reclamationId))
        );
        reclamation.setAnswered(!reclamation.isAnswered());
        Reclamation save = reclamationRepository.save(reclamation);
        return mapper.convertToReclamationDTO(save);
    }
}
