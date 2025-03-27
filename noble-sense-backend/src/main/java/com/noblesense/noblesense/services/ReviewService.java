package com.noblesense.noblesense.services;

import com.noblesense.noblesense.dto.ProductReviewsDetailsDTO;
import com.noblesense.noblesense.dto.ReviewDTO;

import java.util.List;

public interface ReviewService {
    ReviewDTO addReview(ReviewDTO reviewDto, Long productId);
    void deleteReviewById(Long id);
    ReviewDTO getReviewById(Long id);
    List<ReviewDTO> getReviewsByProductId(Long productId);
    ReviewDTO toggleApproveReview(Long id);

    List<ReviewDTO> getAllReviews();

    ProductReviewsDetailsDTO getProductReviewsDetails(Long productId);
}
