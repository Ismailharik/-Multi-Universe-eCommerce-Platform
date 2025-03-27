package com.noblesense.noblesense.repositories;

import com.noblesense.noblesense.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface CategoryRepository extends JpaRepository<Category, Long> {
    List<Category> findAllByParent(String parent);
}
