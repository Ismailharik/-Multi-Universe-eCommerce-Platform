package com.noblesense.noblesense.services;

import com.noblesense.noblesense.dto.ProductReviewsDetailsDTO;
import com.noblesense.noblesense.dto.ReviewDTO;
import com.noblesense.noblesense.entities.Product;
import com.noblesense.noblesense.entities.Review;
import com.noblesense.noblesense.exceptions.ProductNotFoundException;
import com.noblesense.noblesense.exceptions.ResourceNotFoundException;
import com.noblesense.noblesense.mappers.Mapper;
import com.noblesense.noblesense.repositories.ProductRepository;
import com.noblesense.noblesense.repositories.ReviewRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
@Service
@AllArgsConstructor
public class ReviewServiceImpl implements ReviewService {
    private final ReviewRepository reviewRepository;
    private final ProductRepository productRepository;
    private final Mapper mapper;
    @Override
    public ReviewDTO addReview(ReviewDTO reviewDto, Long productId) {
        Product product = productRepository.findById(productId).orElseThrow(() -> new ProductNotFoundException(productId));
        Review review = mapper.convertToReview(reviewDto);
        review.setProduct(product);
        review.setDate(new Date());
        reviewRepository.save(review);
        return mapper.convertToReviewDTO(review);
    }

    @Override
    public void deleteReviewById(Long id) {
        Review review = reviewRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Review", "id", String.valueOf(id)));
        reviewRepository.delete(review);
    }

    @Override
    public ReviewDTO getReviewById(Long id) {
        Review review = reviewRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Review", "id", String.valueOf(id)));
        return mapper.convertToReviewDTO(review);
    }

    @Override
    public List<ReviewDTO> getReviewsByProductId(Long productId) {
        List<Review> reviews = reviewRepository.findByProduct_IdAndIsApprovedTrue(productId);
        return mapper.convertToReviewDTOList(reviews);
    }

    @Override
    public ReviewDTO toggleApproveReview(Long id) {
        Review review = reviewRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Review", "id", String.valueOf(id)));
        review.setApproved(!review.isApproved());
        reviewRepository.save(review);
        return mapper.convertToReviewDTO(review);
    }

    @Override
    public List<ReviewDTO> getAllReviews() {
        List<Review> reviews = reviewRepository.findAllByOrderByDateDesc();
        return mapper.convertToReviewDTOList(reviews);
    }

    @Override
    public ProductReviewsDetailsDTO getProductReviewsDetails(Long productId) {
        List<Review> reviews = reviewRepository.findByProduct_IdAndIsApprovedTrue(productId);
        ProductReviewsDetailsDTO details = new ProductReviewsDetailsDTO();
        details.setTotalStars(reviews.size());
        details.setAverageStars(reviews.stream().mapToDouble(Review::getStarsNumber).average().orElse(0));
        details.setFiveStarPercentage(reviews.stream().filter(review -> review.getStarsNumber() == 5).count() * 100.0 / reviews.size());
        details.setFourStarPercentage(reviews.stream().filter(review -> review.getStarsNumber() == 4).count() * 100.0 / reviews.size());
        details.setThreeStarPercentage(reviews.stream().filter(review -> review.getStarsNumber() == 3).count() * 100.0 / reviews.size());
        details.setTwoStarPercentage(reviews.stream().filter(review -> review.getStarsNumber() == 2).count() * 100.0 / reviews.size());
        details.setOneStarPercentage(reviews.stream().filter(review -> review.getStarsNumber() == 1).count() * 100.0 / reviews.size());
        return details;


    }
}
