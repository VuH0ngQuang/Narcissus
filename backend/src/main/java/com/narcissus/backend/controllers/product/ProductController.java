package com.narcissus.backend.controllers.product;

import com.narcissus.backend.dto.product.ProductDto;
import com.narcissus.backend.dto.product.ReviewDto;
import com.narcissus.backend.service.product.ProductService;
import com.narcissus.backend.service.product.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    private final ProductService productService;
    private final ReviewService reviewService;

    @Autowired
    public ProductController(ProductService productService, ReviewService reviewService) {
        this.productService = productService;
        this.reviewService = reviewService;
    }

    //Product
    @GetMapping("/all")
    public ResponseEntity<List<ProductDto>> getAllProducts() {
        return new ResponseEntity<>(productService.getAllProducts(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDto> getProductById(@PathVariable long id) {
        return new ResponseEntity<> (productService.getDetailsProduct(id), HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<ProductDto> addProduct(@RequestPart("product") ProductDto productDto,
                                                 @RequestPart("image") MultipartFile image) throws IOException {
        return new ResponseEntity<>(productService.addProduct(productDto, image), HttpStatus.CREATED);
    }

    @PostMapping("/update/{id}")
    public ResponseEntity<ProductDto> updateProduct(@PathVariable long id,
                                                    @RequestPart("product") ProductDto productDto,
                                                    @RequestPart(value = "image") MultipartFile image) throws IOException {
        return new ResponseEntity<>(productService.updateProduct(id, productDto, image), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable long id) {
        return new ResponseEntity<>(productService.deleteProduct(id), HttpStatus.OK);
    }

    //Image
    @GetMapping("/getImage/{id}")
    public ResponseEntity<String> getImage(@PathVariable long id){
        return new ResponseEntity<>(productService.getImage(id), HttpStatus.OK);
    }

    //Review

    @GetMapping("/review/getAll/{id}")
    public ResponseEntity<List<ReviewDto>> getReview(@PathVariable long id) {
        return new ResponseEntity<>(reviewService.getReview(id), HttpStatus.OK);
    }

    @PostMapping("/review/add/{id}")
    public ResponseEntity<ReviewDto> addReview(@RequestBody ReviewDto reviewDto, @PathVariable long id, @RequestHeader("Authorization") String token) {
        return new ResponseEntity<>(reviewService.addReview(token, id, reviewDto), HttpStatus.OK);
    }

}
