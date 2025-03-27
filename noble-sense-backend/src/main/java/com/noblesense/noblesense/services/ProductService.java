package com.noblesense.noblesense.services;

import com.noblesense.noblesense.dto.ProductDTO;
import com.noblesense.noblesense.dto.ProductPage;
import com.noblesense.noblesense.exceptions.FileStorageException;
import com.noblesense.noblesense.exceptions.ImageNotFoundException;
import com.noblesense.noblesense.exceptions.ProductNotFoundException;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProductService {
    ProductPage getAllProducts(int page, int size);
    ProductPage findProductsByCategory(int page,int size,long categoryId);
    ProductDTO getProductById(Long productId) throws ProductNotFoundException;
    ProductDTO addProduct(ProductDTO productDTO,long categoryId);
    void deleteProduct(Long productId) throws ProductNotFoundException;
    ProductDTO updateProduct(Long productId, ProductDTO productDTO) throws ProductNotFoundException;
    ProductDTO addImagesToProduct(Long productId, MultipartFile imageFile) throws ProductNotFoundException, FileStorageException;
    ProductDTO deleteImageFromProduct(Long productId, String imageUrl) throws ProductNotFoundException, ImageNotFoundException;
    List<ProductDTO> getNewProducts(String parent);
    List<ProductDTO> getFeaturedProducts(String parent);

    List<ProductDTO> getLimitedOffers(String parent);

    List<ProductDTO> getTop3FeaturedProducts(String parent);
    List<ProductDTO> getTop3DiscountProducts(String parent);

    List<ProductDTO> getTop3BestSellingProducts(String parent);
    ProductPage filterProducts(Long parent, String status, double minPrice, double maxPrice, Integer pageNo, String sortBy);

}