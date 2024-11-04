package com.narcissus.backend.service.product;

import com.narcissus.backend.dto.product.ProductDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ProductService {
    List<ProductDto> getAllProducts();
    ProductDto addProduct(ProductDto product, MultipartFile image) throws IOException;
    ProductDto getDetailsProduct(long id);
    ProductDto updateProduct(long id, ProductDto productDto, MultipartFile image) throws IOException;
    String deleteProduct(long id);
}
