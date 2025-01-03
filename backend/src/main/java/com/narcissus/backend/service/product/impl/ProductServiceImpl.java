
package com.narcissus.backend.service.product.impl;

import com.narcissus.backend.dto.product.ProductDto;
import com.narcissus.backend.exceptions.NotFoundException;
import com.narcissus.backend.models.product.Product;
import com.narcissus.backend.repository.orders.ConsistOfRepository;
import com.narcissus.backend.repository.product.ProductRepository;
import com.narcissus.backend.repository.product.ReviewRepository;
import com.narcissus.backend.repository.user.UserCartRepository;
import com.narcissus.backend.service.notification.RestockNotificationService;
import com.narcissus.backend.service.product.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.Date;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final ConsistOfRepository consistOfRepository;
    private final UserCartRepository userCartRepository;
    private final ReviewRepository reviewRepository;
    private final RestockNotificationService restockNotificationService;
    private final ExecutorService executorService = Executors.newSingleThreadExecutor();

    @Autowired
    public ProductServiceImpl(ProductRepository productRepository, ConsistOfRepository consistOfRepository, UserCartRepository userCartRepository, ReviewRepository reviewRepository, RestockNotificationService restockNotificationService) {
        this.productRepository = productRepository;
        this.consistOfRepository = consistOfRepository;
        this.userCartRepository = userCartRepository;
        this.reviewRepository = reviewRepository;
        this.restockNotificationService = restockNotificationService;
    }

    @Override
    public List<ProductDto> getAllProducts() {
        List<Product> products = productRepository.findAll();
        return products
                .parallelStream()
                .map(product -> toDto(product, new ProductDto(), false))
                .collect(Collectors.toList());
    }

    @Override
    public ProductDto addProduct(ProductDto productDto, MultipartFile image) throws IOException {
        productDto.setProductImage(image);
        Product product = toEntity(productDto, new Product());
        productRepository.save(product);
        return toDto(product, new ProductDto(), true);
    }

    @Override
    public ProductDto getDetailsProduct(long id) {
        Product product = productRepository.findById(id).orElseThrow(() -> new NotFoundException("Product with ID "+id+" cannot be found"));
        return toDto(product, new ProductDto(), true);
    }

    @Override
    public ProductDto updateProduct(long id, ProductDto productDto, MultipartFile image) throws IOException {
        Product product = productRepository.findById(id).orElseThrow(() -> new NotFoundException("Product with ID "+id+" not found"));

        if (product.getProductStockQuantity() == 0 && productDto.getProductStockQuantity() != 0) {
            restockNotificationService.notifyRestock(product);
        }

        if (productDto != null) {
            if (productDto.getProductName() != null) product.setProductName(productDto.getProductName());
            if (productDto.getProductInfo() != null) product.setProductInfo(productDto.getProductInfo());
            if (productDto.getProductType() != null) product.setProductType(productDto.getProductType());
            if (productDto.getProductStockQuantity() != null) product.setProductStockQuantity(productDto.getProductStockQuantity());
            if (productDto.getProductPrice() != null) product.setProductPrice(productDto.getProductPrice());
            if (productDto.getProductDate() != null) product.setProductDate(productDto.getProductDate());
        }
        if (image != null && !image.isEmpty()) product.setProductImage(image.getBytes());

        productRepository.save(product);

        return toDto(product, new ProductDto(), true);
    }

    @Override
    public String deleteProduct(long id) {
        Product product = productRepository.findById(id).orElseThrow(() -> new NotFoundException("Product with ID "+id+" cannot be found"));
        consistOfRepository.deleteByProductId(product.getProductId());
        userCartRepository.deleteByProductId(product.getProductId());
        reviewRepository.deleteByProductId(product.getProductId());
        productRepository.deleteByProductId(product.getProductId());

        return "The product with id: "+id+" has been deleted";
    }

    @Override
    public String getImage(long id) {
        Product product = productRepository.findById(id).orElseThrow(() -> new NotFoundException("Product with ID "+id+" cannot be found"));
        return Base64.getEncoder().encodeToString(product.getProductImage());
    }

    public ProductDto toDto(Product product, ProductDto productDto, boolean includeImage) {
        productDto.setProductID(product.getProductId());
        productDto.setProductName(product.getProductName());
        productDto.setProductInfo(product.getProductInfo());
        productDto.setProductType(product.getProductType());
        productDto.setProductStockQuantity(product.getProductStockQuantity());
        productDto.setProductPrice(product.getProductPrice());
        if (includeImage) {
            productDto.setProductImageBase64(Base64.getEncoder().encodeToString(product.getProductImage()));
        } else {
            productDto.setProductImageBase64(null);
        }

        return productDto;
    }

    public Product toEntity(ProductDto productDto, Product product) throws IOException {
        product.setProductName(productDto.getProductName());
        product.setProductInfo(productDto.getProductInfo());
        product.setProductType(productDto.getProductType());
        product.setProductStockQuantity(productDto.getProductStockQuantity());
        product.setProductPrice(productDto.getProductPrice());
        product.setProductDate(new Date());
        product.setProductImage(productDto.getProductImage().getBytes());

        return product;
    }
}