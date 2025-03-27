package com.noblesense.noblesense.repositories;

import com.noblesense.noblesense.entities.Category;
import com.noblesense.noblesense.entities.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {
        Page<Product> findByCategory(Pageable pageable, Category category);
        List<Product> findTop8ByParentOrderByIdDesc(String parent);
        List<Product> findAllByFeaturedAndParent(boolean featured, String parent);
        @Query("SELECT p FROM Product p WHERE p.parent = :parent AND " +
                "(p.offerDate.startDate <= :currentDate AND p.offerDate.endDate >= :currentDate)")
        List<Product> findAllByParentAndStartDateOrEndDate(@Param("parent") String parent, @Param("currentDate") Date currentDate);
        List<Product> findTop3ByParentOrderByDiscountDesc(String parent);
        List<Product> findTop3ByParentOrderBySellCountDesc(String parent);
        List<Product> findTop3ByParentAndFeaturedTrue(String parent);


}
