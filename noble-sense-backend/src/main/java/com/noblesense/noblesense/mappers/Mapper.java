package com.noblesense.noblesense.mappers;

import com.noblesense.noblesense.dto.*;
import com.noblesense.noblesense.entities.*;
import com.noblesense.noblesense.entities.*;
import com.noblesense.noblesense.exceptions.CategoryNotFoundException;
import com.noblesense.noblesense.repositories.CategoryRepository;
import com.noblesense.noblesense.dto.*;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class Mapper {

    private final Logger logger = LoggerFactory.getLogger(Mapper.class);

    private final CategoryRepository categoryRepository;

    /*
    * I use BeanUtils to copy primitive classes attributes,
    * and I map by my self instances
    *
    * */

    public User convertToUser(UserDTO userDTO){
        User user = new User();
        BeanUtils.copyProperties(userDTO,user);
        return user;
    }
    /******************
    * USERS MAPPERS
    ******************/
    // User to UserDTO
    public UserDTO convertToUserDTO(User user){
        UserDTO userDTO = new UserDTO();
        BeanUtils.copyProperties(user,userDTO);
        return userDTO;
    }
    // UserDTO to User
    /*****************
    * PRODUCTS MAPPERS
    *****************/

    // Product to ProductDTO
    public ProductDTO convertToProductDTO(Product product){
        logger.info("convertToProductDTO: "+product);
        ProductDTO dto = new ProductDTO();
        BeanUtils.copyProperties(product, dto);
        dto.setImageURLs(product.getImageURLs());

        if (product.getOfferDate() != null) {
            ProductDTO.OfferDateDTO offerDateDTO = new ProductDTO.OfferDateDTO();
            offerDateDTO.setStartDate(product.getOfferDate().getStartDate());
            offerDateDTO.setEndDate(product.getOfferDate().getEndDate());
            dto.setOfferDate(offerDateDTO);
        }
        dto.setCategoryId(product.getCategory().getId());
        return dto;
    }
    // ProductDTO to Product
    public Product convertToProduct(ProductDTO dto){
        logger.info("convertToProduct: "+dto);
        Product product = new Product();
        BeanUtils.copyProperties(dto, product);
        product.setImageURLs(dto.getImageURLs());


        if (dto.getCategoryId() != null) {
            Category category = categoryRepository.findById(dto.getCategoryId()).orElseThrow(() -> new CategoryNotFoundException(dto.getCategoryId()));
            product.setCategory(category);
        }
        if (dto.getOfferDate() != null) {
            Product.OfferDate offerDate = new Product.OfferDate();
            offerDate.setStartDate(dto.getOfferDate().getStartDate());
            offerDate.setEndDate(dto.getOfferDate().getEndDate());
            product.setOfferDate(offerDate);
        }

        return product;
    }

    /*****************
     * CATEGORY MAPPERS
     *****************/
    // Category to CategoryDTO
    public CategoryDTO convertToCategoryDTO(Category category){
        CategoryDTO categoryDTO = new CategoryDTO();
        BeanUtils.copyProperties(category,categoryDTO);
        return categoryDTO;
    }
    // CategoryDTO to Category
    public Category convertToCategory(CategoryDTO categoryDTO){
        Category category= new Category();
        BeanUtils.copyProperties(categoryDTO,category);
        return category;
    }
    /*****************
     * Orders MAPPERS
     *****************/
    // Order to OrderDTO

    public OrderDTO convertToOrderDTO(Order order) {

        OrderDTO orderDTO =new OrderDTO();
        BeanUtils.copyProperties(order, orderDTO);
        orderDTO.setOrderItems(
            order.getOrderItem().stream().map(
                orderItem -> convertToOrderItemDTO(orderItem)
                    ).toList()
                );
        orderDTO.setUser(this.convertToUserDTO(order.getUser()));
        return orderDTO;
    }

    // OrderDTO to Order
    public Order convertToOrder(OrderDTO orderDTO){
        Order order = new Order();
        BeanUtils.copyProperties(orderDTO,order);
        return order;
    }
    public OrderItemDTO convertToOrderItemDTO(OrderItem orderItem){

        OrderItemDTO orderItemDTO = new OrderItemDTO();
        BeanUtils.copyProperties(orderItem,orderItemDTO);
        orderItemDTO.setProduct(this.convertToProductDTO(orderItem.getProduct()));
        return orderItemDTO;
    }


    public OrderItem convertToOrderItem(OrderItemDTO orderItemDTO, Product product, Order savedOrder){
        OrderItem orderItem = new OrderItem();
        BeanUtils.copyProperties(orderItemDTO,orderItem);
        orderItem.setProduct(product);
        orderItem.setOrder(savedOrder);
        return orderItem;
    }


    /*****************
     * HOME SLIDER MAPPERS
     *****************/

    // Convert HomeSlider to HomeSliderDTO
    public HomeSliderDTO convertToHomeSliderDTO(HomeSlider homeSlider) {
        HomeSliderDTO homeSliderDTO = new HomeSliderDTO();
        BeanUtils.copyProperties(homeSlider, homeSliderDTO);


        if (homeSlider.getPreTitle()!=null){
            HomeSliderDTO.PreTitleDto preTitle = new HomeSliderDTO.PreTitleDto();
            BeanUtils.copyProperties(homeSlider.getPreTitle(), preTitle);
            homeSliderDTO.setPreTitle(preTitle);
        }
        if (homeSlider.getSubtitle()!=null){
            HomeSliderDTO.SubtitleDto subtitle = new HomeSliderDTO.SubtitleDto();
            BeanUtils.copyProperties(homeSlider.getSubtitle(), subtitle);
            homeSliderDTO.setSubtitle(subtitle);
        }
        return homeSliderDTO;
    }

    // Convert HomeSliderDTO to HomeSlider
    public HomeSlider convertToHomeSlider(HomeSliderDTO homeSliderDTO) {
        HomeSlider homeSlider = new HomeSlider();
        BeanUtils.copyProperties(homeSliderDTO, homeSlider);

        if (homeSliderDTO.getPreTitle()!=null){
            HomeSlider.PreTitle preTitle = new HomeSlider.PreTitle();
            BeanUtils.copyProperties(homeSliderDTO.getPreTitle(), preTitle);
            homeSlider.setPreTitle(preTitle);
        }
        if (homeSliderDTO.getSubtitle()!=null){
            HomeSlider.Subtitle subtitle = new HomeSlider.Subtitle();
            BeanUtils.copyProperties(homeSliderDTO.getSubtitle(), subtitle);
            homeSlider.setSubtitle(subtitle);
        }
        return homeSlider;
    }

    /*****************
     * REVIEW MAPPERS
     *****************/

    // Review to ReviewDTO
    public ReviewDTO convertToReviewDTO(Review review) {
        ReviewDTO reviewDTO = new ReviewDTO();
        BeanUtils.copyProperties(review, reviewDTO);
        return reviewDTO;
    }
    // ReviewDTO to Review
    public Review convertToReview(ReviewDTO reviewDTO) {
        Review review = new Review();
        BeanUtils.copyProperties(reviewDTO, review);
        return review;
    }
    // List<Review> to List<ReviewDTO>
    public List<ReviewDTO> convertToReviewDTOList(List<Review> reviews) {
        return reviews.stream().map( review -> {
            ReviewDTO reviewDTO = new ReviewDTO();
            BeanUtils.copyProperties(review, reviewDTO);
            reviewDTO.setProduct(this.convertToProductDTO(review.getProduct()));
            return reviewDTO;
        }).toList();
    }

    /*****************
     * REVIEW MAPPERS
     *****************/
    // Reclamation to ReclamationDTO
    public ReclamationDTO convertToReclamationDTO(Reclamation reclamation) {
        ReclamationDTO reclamationDTO = new ReclamationDTO();
        BeanUtils.copyProperties(reclamation, reclamationDTO);
        return reclamationDTO;
    }
    // ReclamationDTO to Reclamation
    public Reclamation convertToReclamation(ReclamationDTO reclamationDTO) {
        Reclamation reclamation = new Reclamation();
        BeanUtils.copyProperties(reclamationDTO, reclamation);
        return reclamation;
    }

    public List<ReclamationDTO> convertToReclamationDTOList(List<Reclamation> reclamations) {
        return reclamations.stream().map( reclamation -> {
            ReclamationDTO reclamationDTO = new ReclamationDTO();
            BeanUtils.copyProperties(reclamation, reclamationDTO);
            return reclamationDTO;
        }).toList();
    }
}
