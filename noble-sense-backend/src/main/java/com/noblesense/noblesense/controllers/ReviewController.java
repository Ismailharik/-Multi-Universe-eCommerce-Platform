package com.noblesense.noblesense.controllers;

import com.noblesense.noblesense.dto.ProductReviewsDetailsDTO;
import com.noblesense.noblesense.dto.ReviewDTO;
import com.noblesense.noblesense.services.ReviewService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/v1/reviews")
public class ReviewController {
    private final ReviewService reviewService;

    @PostMapping("/{productId}")
    public ReviewDTO addReview(@RequestBody ReviewDTO reviewDto, @PathVariable Long productId) {
        return reviewService.addReview(reviewDto, productId);
    }
    @GetMapping("/{id}")
    public ReviewDTO getReviewById(@PathVariable Long id) {
        return reviewService.getReviewById(id);
    }
    // approved reviews by product id
    @GetMapping("/product/{productId}")
    public List<ReviewDTO> getReviewsByProductId(@PathVariable Long productId) {
        return reviewService.getReviewsByProductId(productId);
    }
    @PutMapping("/toggle-approve/{id}")
    public ReviewDTO toggleApproveReview(@PathVariable Long id) {
        return reviewService.toggleApproveReview(id);
    }
    @DeleteMapping("/{id}")
    public void deleteReviewById(@PathVariable Long id) {
        reviewService.deleteReviewById(id);
    }
    @GetMapping()
    public List<ReviewDTO> getAllReviews() {
        return reviewService.getAllReviews();
    }
    @GetMapping("/product-reviews-details/{productId}")
    public ProductReviewsDetailsDTO getProductReviewsDetails(@PathVariable Long productId) {
        return reviewService.getProductReviewsDetails(productId);
    }
}
