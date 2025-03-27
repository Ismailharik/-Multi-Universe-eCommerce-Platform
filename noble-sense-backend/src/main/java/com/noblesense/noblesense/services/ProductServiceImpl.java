package com.noblesense.noblesense.services;

import com.noblesense.noblesense.dto.ProductDTO;
import com.noblesense.noblesense.dto.ProductPage;
import com.noblesense.noblesense.entities.Category;
import com.noblesense.noblesense.entities.Product;
import com.noblesense.noblesense.exceptions.CategoryNotFoundException;
import com.noblesense.noblesense.exceptions.FileStorageException;
import com.noblesense.noblesense.exceptions.ImageNotFoundException;
import com.noblesense.noblesense.exceptions.ProductNotFoundException;
import com.noblesense.noblesense.mappers.Mapper;
import com.noblesense.noblesense.repositories.CategoryRepository;
import com.noblesense.noblesense.repositories.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService{

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final Mapper mapper;
    private final FileStorageService fileStorageService;

    //add logger
    private final Logger logger = LoggerFactory.getLogger(ProductServiceImpl.class);


    @Override
    public ProductPage getAllProducts(int page, int size) {
        PageRequest pr = PageRequest.of(page, size);
        Page<Product> all = productRepository.findAll(pr);
        return getProductPage(all);
    }



    @Override
    public ProductPage findProductsByCategory(int page, int size, long categoryId) {
        Category category=this.categoryRepository.findById(categoryId).orElseThrow(()->new CategoryNotFoundException(categoryId));
        PageRequest pr = PageRequest.of(page, size);
        Page<Product> all = productRepository.findByCategory(pr,category);
        return getProductPage(all);
    }
    @Override
    public ProductPage filterProducts(Long categoryId, String status, double minPrice, double maxPrice, Integer pageNo, String sortBy) {
        PageRequest pageRequest = PageRequest.of(pageNo, 6, Sort.by(sortBy));


        Specification<Product> spec = Specification.where(withCategoryId(categoryId))
                .and(withStatus(status))
                .and(withPriceRange(minPrice, maxPrice));


        //return productPage
        Page<Product> all = productRepository.findAll(spec, pageRequest);
        return getProductPage(all);

    }

    private Specification<Product> withCategoryId(Long categoryId) {
        return (root, query, cb) -> {
            if (categoryId == null) return null;
//            Category category = categoryRepository.findById(categoryId).orElseThrow(
//                    () -> new CategoryNotFoundException(categoryId)
//            );
            return cb.equal(root.get("category").get("id"), categoryId);
//            return cb.equal(root.get("category"), category);
        };
    }

    private Specification<Product> withStatus(String status) {
        return (root, query, criteriaBuilder) -> {
            if (status == null || status.isEmpty()) return null;
            return criteriaBuilder.equal(root.get("status"), status);
        };
    }

    private Specification<Product> withPriceRange(double minPrice, double maxPrice) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.between(root.get("price"), minPrice, maxPrice);
    }

    @Override
    public ProductDTO getProductById(Long productId) throws ProductNotFoundException {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ProductNotFoundException(productId));
        return mapper.convertToProductDTO(product);
    }

    @Override
    public ProductDTO addProduct(ProductDTO productDTO, long categoryId) {
        // Fetching the category by ID. If not found, an exception is thrown.
        logger.info( "add product {} to categoryId {} ", productDTO, categoryId);
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new CategoryNotFoundException(categoryId));

        // Converting the ProductDTO to a Product entity
        Product product = mapper.convertToProduct(productDTO);

        // Setting the category to the product
        product.setCategory(category);

        // Saving the product entity to the database
        Product savedProduct = productRepository.save(product);

        // increase number of products in category
        category.setNumberOfProducts(category.getNumberOfProducts() + 1);
        categoryRepository.save(category);

        // Converting the saved product entity back to ProductDTO
        return mapper.convertToProductDTO(savedProduct);
    }


    @Override
    public void deleteProduct(Long productId) throws ProductNotFoundException {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ProductNotFoundException(productId));
        Category category = product.getCategory();
        category.setNumberOfProducts(category.getNumberOfProducts() - 1);

        // save changes
        categoryRepository.save(category);
        productRepository.delete(product);
    }

    @Override
    public ProductDTO updateProduct(Long productId, ProductDTO productDTO) throws ProductNotFoundException {

        Category category = categoryRepository.findById(productDTO.getCategoryId()).orElseThrow(
                ()->new CategoryNotFoundException(productDTO.getCategoryId())
        );

        Product mappedProduct = mapper.convertToProduct(productDTO);
//        mappedProduct.setUrls(savedProduct.getUrls());// they would not be mapped directly
        mappedProduct.setCategory(category);
        Product updatedProduct = productRepository.save(mappedProduct);
        return mapper.convertToProductDTO(updatedProduct);
    }
    @Override
    public ProductDTO addImagesToProduct(Long productId, MultipartFile imageFile)
            throws ProductNotFoundException, FileStorageException {
        logger.info( "add  to product with id {} ", productId);

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ProductNotFoundException(productId));

        List<String> urls = product.getImageURLs();
        if (urls == null) {
            urls = new ArrayList<>();
        }

        if (imageFile != null && !imageFile.isEmpty()) {
            String originalFileName = imageFile.getOriginalFilename();
            String fileExtension = extractFileExtension(originalFileName);
            String uniqueFileName = generateUniqueFileName() + fileExtension;

            try {
                String fileUrl = fileStorageService.uploadFile(uniqueFileName,imageFile);
                urls.add(fileUrl);
            } catch (IOException e) {
                throw new FileStorageException("Failed to store file " + uniqueFileName);
            }
        }

        product.setImageURLs(urls); // Set the updated list of URLs to the product

        Product savedProduct = productRepository.save(product);
        return mapper.convertToProductDTO(savedProduct);
    }

    private String extractFileExtension(String fileName) {
        return fileName.substring(fileName.lastIndexOf('.'));
    }

    private String generateUniqueFileName() {
        return UUID.randomUUID().toString();
    }

    @Override
    public ProductDTO deleteImageFromProduct(Long productId, String imageUrl) throws ProductNotFoundException, ImageNotFoundException {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ProductNotFoundException(productId));

        List<String> urls = product.getImageURLs();
        if (urls == null || !urls.contains(imageUrl)) {
            throw new ImageNotFoundException("Image URL not found for the product with ID: " + productId);
        }

        // Remove the specified image URL from the list of URLs
        urls.remove(imageUrl);
        fileStorageService.deleteFile(imageUrl);

        Product savedProduct = productRepository.save(product);
        return mapper.convertToProductDTO(savedProduct);
    }

    @Override
    public List<ProductDTO> getNewProducts(String parent) {
        List<Product> products = productRepository.findTop8ByParentOrderByIdDesc(parent);
        return  products.stream().map(mapper::convertToProductDTO).toList();
    }

    @Override
    public List<ProductDTO> getFeaturedProducts(String parent) {
        List<Product> products = productRepository.findAllByFeaturedAndParent(true, parent);
        return  products.stream().map(mapper::convertToProductDTO).toList();
    }

    @Override
    public List<ProductDTO> getLimitedOffers(String parent) {
        logger.info("get limited offers for parent {} ", parent);
            List<Product> products = productRepository.findAllByParentAndStartDateOrEndDate(parent, new Date());
        return products.stream().map(mapper::convertToProductDTO).toList();
    }


    /*
    * TOP 3 PRODUCTS
    * */
    @Override
    public List<ProductDTO> getTop3DiscountProducts(String parent) {
        List<Product> products = productRepository.findTop3ByParentOrderByDiscountDesc(parent);
        return products.stream().map(mapper::convertToProductDTO).toList();
    }
    @Override
    public List<ProductDTO> getTop3FeaturedProducts(String parent) {
        List<Product> products = productRepository.findTop3ByParentAndFeaturedTrue(parent);
        return products.stream().map(mapper::convertToProductDTO).toList();
    }

    @Override
    public List<ProductDTO> getTop3BestSellingProducts(String parent) {
        List<Product> products = productRepository.findTop3ByParentOrderBySellCountDesc(parent);
        return products.stream().map(mapper::convertToProductDTO).toList();
    }



    private ProductPage getProductPage(Page<Product> all) {
        ProductPage productPage = new ProductPage();
        productPage.setProducts((all.map(mapper::convertToProductDTO).toList()));
        productPage.setFirst(all.isFirst());
        productPage.setLast(all.isLast());
        productPage.setTotalPages(all.getTotalPages());
        productPage.setSize(all.getSize());
        productPage.setPage(all.getNumber());
        return productPage;
    }

}