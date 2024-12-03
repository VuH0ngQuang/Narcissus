package com.narcissus.backend.service.orders;

import com.narcissus.backend.dto.orders.ConsistOfDto;
import com.narcissus.backend.dto.orders.OrdersDto;
import com.narcissus.backend.models.product.Product;

import java.util.List;
import java.util.Set;

public interface OrdersService {
    OrdersDto createOrders (Set<ConsistOfDto> consistOfDtos,String token) throws Exception;
    OrdersDto getDetailsOrders (long id);
    List<OrdersDto> getAll();
//    OrdersDto updateOrders (long id, OrdersDto ordersDto);
//    String deleteOrders (long id);
}
