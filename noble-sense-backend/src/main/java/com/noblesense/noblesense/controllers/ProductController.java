package com.noblesense.noblesense.controllers;

import com.noblesense.noblesense.dto.ProductDTO;
import com.noblesense.noblesense.dto.ProductPage;
import com.noblesense.noblesense.exceptions.FileStorageException;
import com.noblesense.noblesense.services.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


@AllArgsConstructor
@RestController
@RequestMapping("/api/v1/products")
public class ProductController {

    private final ProductService productService;


    @GetMapping
    public ResponseEntity<ProductPage> getAllProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        ProductPage products = productService.getAllProducts(page, size);
        return ResponseEntity.ok(products);
    }
    @GetMapping("/byCategory/{categoryId}")
    public ProductPage findProductsByCategory(
            @PathVariable Long categoryId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return  productService.findProductsByCategory(page,size,categoryId);
    }
    @GetMapping("/{productId}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable Long productId) {
        ProductDTO product = productService.getProductById(productId);
        return ResponseEntity.ok(product);
    }

    @PostMapping("/{categoryId}")
    public ResponseEntity<ProductDTO> addProduct(@RequestBody ProductDTO productDTO, @PathVariable long categoryId) {
        ProductDTO newProduct = productService.addProduct(productDTO, categoryId);
        return ResponseEntity.status(HttpStatus.CREATED).body(newProduct);
    }


    @DeleteMapping("/{productId}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long productId) {
        productService.deleteProduct(productId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{productId}")
    public ResponseEntity<ProductDTO> updateProduct(@PathVariable Long productId, @RequestBody ProductDTO productDTO) {
        ProductDTO updatedProduct = productService.updateProduct(productId, productDTO);
        return ResponseEntity.ok(updatedProduct);
    }

    @PostMapping("/{productId}/images")
    public ResponseEntity<ProductDTO> addImageToProduct(
            @PathVariable Long productId,
                @RequestParam("file") MultipartFile imageFile
    ) throws FileStorageException {

        ProductDTO updatedProduct = productService.addImagesToProduct(productId, imageFile);
        return ResponseEntity.ok(updatedProduct);
    }

    @DeleteMapping("/{productId}/images")
    public ResponseEntity<ProductDTO> deleteImageFromProduct(
            @PathVariable Long productId,
            @RequestParam("imageUrl") String imageUrl
    ) {
        ProductDTO updatedProduct = productService.deleteImageFromProduct(productId, imageUrl);
        return ResponseEntity.ok(updatedProduct);
    }

    @GetMapping("/new/{parent}")
    public ResponseEntity<List<ProductDTO>> getNewProducts(@PathVariable String parent) {
        return ResponseEntity.ok(productService.getNewProducts(parent));
    }
    @GetMapping("/featured/{parent}")
    public ResponseEntity<List<ProductDTO>> getFeaturedProducts(@PathVariable String parent) {
        return ResponseEntity.ok(productService.getFeaturedProducts(parent));
    }
    @GetMapping("/limited-offers/{parent}")
    public ResponseEntity<List<ProductDTO>> getLimitedOffers(@PathVariable  String parent ) {
        return ResponseEntity.ok(productService.getLimitedOffers(parent));
    }


    /*
    * TOP 3 PRODUCTS
    * */
    @GetMapping("/featured-top3/{parent}")
    public ResponseEntity<List<ProductDTO>> getTop3FeaturedProducts(@PathVariable String parent) {
        return ResponseEntity.ok(productService.getTop3FeaturedProducts(parent));
    }
    // top 3 discount products
    @GetMapping("/discount-top3/{parent}")
    public ResponseEntity<List<ProductDTO>> getTop3DiscountProducts(@PathVariable String parent) {
        return ResponseEntity.ok(productService.getTop3DiscountProducts(parent));
    }
    // top 3 best selling products
    @GetMapping("/best-selling-top3/{parent}")
    public ResponseEntity<List<ProductDTO>> getTop3BestSellingProducts(@PathVariable String parent) {
        return ResponseEntity.ok(productService.getTop3BestSellingProducts(parent));
    }
    /**
     *   filterProducts(category:string,status:string, minPrice:string, maxPrice:string, pageNo:string, sortBy:string): Observable<IProduct[]> {
     *     return this.http.get<IProduct[]>(this.apiUrl + '/filter/' + category + '/' + status + '/' + minPrice + '/' + maxPrice + '/' + pageNo + '/' + sortBy);
     *     }
     */
    @GetMapping("/filter")
    public ResponseEntity<ProductPage> filterProducts(
            @RequestParam(value = "categoryId",required = false)  Long categoryId,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "minPrice",defaultValue = "0") double minPrice,
            @RequestParam(value = "maxPrice",defaultValue = "2000") double maxPrice,
            @RequestParam(value = "pageNo", defaultValue = "0",required = false) Integer pageNo,
            @RequestParam(value = "sortBy",defaultValue = "price", required = false) String sortBy) {
        ProductPage productPage = productService.filterProducts(categoryId, status, minPrice, maxPrice, pageNo, sortBy);

        return ResponseEntity.ok(productPage);
    }


}
