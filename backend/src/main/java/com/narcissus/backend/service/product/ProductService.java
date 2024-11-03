package com.narcissus.backend.service.product;

import com.narcissus.backend.dto.product.ProductDto;

import java.util.List;

public interface ProductService {
    List<ProductDto> getAllProducts();
    ProductDto addProduct(ProductDto product);
    ProductDto getDetailsProduct(long id);
    ProductDto updateProduct(long id, ProductDto productDto);
    String deleteProduct(long id);
}
