
package com.narcissus.backend.service.product.impl;

import com.narcissus.backend.dto.product.ProductDto;
import com.narcissus.backend.exceptions.NotFoundException;
import com.narcissus.backend.models.product.Product;
import com.narcissus.backend.repository.product.ProductRepository;
import com.narcissus.backend.service.product.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;

    @Autowired
    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public List<ProductDto> getAllProducts() {
        List<Product> products = productRepository.findAll();
        return products.stream().map(product -> toDto(product, new ProductDto())).collect(Collectors.toList());
    }

    @Override
    public ProductDto addProduct(ProductDto productDto, MultipartFile image) throws IOException {
        productDto.setProductImage(image);
        Product product = toEntity(productDto, new Product());
        productRepository.save(product);
        return toDto(product, new ProductDto());
    }

    @Override
    public ProductDto getDetailsProduct(long id) {
        Product product = productRepository.findById(id).orElseThrow(() -> new NotFoundException("Product with ID "+id+" cannot be found"));
        return toDto(product, new ProductDto());
    }

    @Override
    public ProductDto updateProduct(long id, ProductDto productDto, MultipartFile image) throws IOException {
        Product product = productRepository.findById(id).orElseThrow(() -> new NotFoundException("Product with ID "+id+" not found"));

        if (productDto.getProductName() != null) product.setProductName(productDto.getProductName());
        if (productDto.getProductInfo() != null) product.setProductInfo(productDto.getProductInfo());
        if (productDto.getProductStockQuantity() != null) product.setProductStockQuantity(productDto.getProductStockQuantity());
        if (productDto.getProductPrice() != null) product.setProductPrice(productDto.getProductPrice());
        if (productDto.getProductDate() != null) product.setProductDate(productDto.getProductDate());
        if (image != null && !image.isEmpty()) product.setProductImage(image.getBytes());

        productRepository.save(product);

        return toDto(product, new ProductDto());
    }

    @Override
    public String deleteProduct(long id) {
        Product product = productRepository.findById(id).orElseThrow(() -> new NotFoundException("Product with ID "+id+" cannot be found"));
        productRepository.delete(product);
        return "The product with id: "+id+" has been deleted";
    }

    public ProductDto toDto(Product product, ProductDto productDto) {
        productDto.setProductID(product.getProductID());
        productDto.setProductName(product.getProductName());
        productDto.setProductInfo(product.getProductInfo());
        productDto.setProductStockQuantity(product.getProductStockQuantity());
        productDto.setProductPrice(product.getProductPrice());
        productDto.setProductImageBase64(Base64.getEncoder().encodeToString(product.getProductImage()));

        return productDto;
    }

    public Product toEntity(ProductDto productDto, Product product) throws IOException {
        product.setProductName(productDto.getProductName());
        product.setProductInfo(productDto.getProductInfo());
        product.setProductStockQuantity(productDto.getProductStockQuantity());
        product.setProductPrice(productDto.getProductPrice());
        product.setProductDate(new Date());
        product.setProductImage(productDto.getProductImage().getBytes());

        return product;
    }
}