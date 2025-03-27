package com.noblesense.noblesense.services;


import com.noblesense.noblesense.dto.OrderStatusCount;
import com.noblesense.noblesense.enums.OrderStatus;
import com.noblesense.noblesense.enums.Role;
import com.noblesense.noblesense.exceptions.DuplicateUsernameException;
import com.noblesense.noblesense.exceptions.OrderNotFoundException;
import com.noblesense.noblesense.exceptions.ProductNotFoundException;
import com.noblesense.noblesense.exceptions.UserAuthenticationException;
import com.noblesense.noblesense.mappers.Mapper;
import com.noblesense.noblesense.repositories.OrderRepository;
import com.noblesense.noblesense.repositories.ProductRepository;
import com.noblesense.noblesense.repositories.UserRepository;
import com.noblesense.noblesense.dto.OrderDTO;
import com.noblesense.noblesense.dto.OrdersPage;
import com.noblesense.noblesense.entities.Order;
import com.noblesense.noblesense.entities.OrderItem;
import com.noblesense.noblesense.entities.Product;
import com.noblesense.noblesense.entities.User;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;


@RequiredArgsConstructor
@Service
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;
    private  final UserRepository userRepository;
    private  final ProductRepository productRepository;

    private final Logger logger = LoggerFactory.getLogger(OrderServiceImpl.class);

    private  final Mapper mapper;
    @Transactional
    public OrderDTO createOrder(@Valid OrderDTO orderDTO, Authentication authentication) {
        logger.info("Creating order {}", orderDTO);
        // check first if user already exist
        User customer = userRepository.findByPhone(
                orderDTO.getUser().getPhone()).orElse(null);
        // if user not exist create new user
        if(customer == null){
            var newCustomer = User.builder()
                    .phone(orderDTO.getUser().getPhone())
                    .fullName(orderDTO.getUser().getFullName())
                    .email(orderDTO.getUser().getEmail())
                    .address(orderDTO.getUser().getAddress())
                    .active(true)
                    .role(Role.USER)
                    .build();
            customer = userRepository.save(newCustomer);
        }

        Order order = prepareOrder(orderDTO, customer);
        List<OrderItem> orderItems = processOrderItems(orderDTO, order);

        order.setOrderItem(orderItems);
        order.setTotalPrice(orderItems.stream().mapToDouble(OrderItem::getTotalPrice).sum() + orderDTO.getShipCost()) ;
        order.setShipCost(orderDTO.getShipCost());
        order.setOrderStatus(OrderStatus.CREATED);
        order.setDate(orderDTO.getDate());
        order.setOrderNote(orderDTO.getOrderNote());
        order.setAddress(orderDTO.getAddress());
        order.setCountry(orderDTO.getCountry());
        orderRepository.save(order);

        return mapper.convertToOrderDTO(order);
    }

    private User getUserFromAuthentication(Authentication authentication) {
        String phoneNumber = authentication.getName();
        return userRepository.findByPhone(phoneNumber)
                .orElseThrow(() -> new UserAuthenticationException("Authenticated user not found in database."));
    }

    private Order prepareOrder(OrderDTO orderDTO, User customer) {
        Order order = mapper.convertToOrder(orderDTO);
        order.setUser(customer);
        return order;
    }

    private List<OrderItem> processOrderItems(OrderDTO orderDTO, Order order) {
        return orderDTO.getOrderItems().stream().map(itemDTO -> {
            Product product = getProductFromDTO(itemDTO.getProduct().getId());
            itemDTO.setTotalPrice((product.getPrice()- product.getDiscount()) * itemDTO.getQuantity());
            return mapper.convertToOrderItem(itemDTO, product, order);
        }).toList();
    }

    private Product getProductFromDTO(long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException(id));
    }




    @Override
    public OrderDTO getOrderById(String orderId) {
        logger.info("get order by id {}",orderId);

        Order order = this.orderRepository.findById(orderId).orElseThrow(
                () -> new OrderNotFoundException(orderId)
        );
        return mapper.convertToOrderDTO(order);// now i need to return the order
    }

    @Override
    public OrdersPage getAllOrders(int page, int size) {
        logger.info("get all orders page {} {} ",page,size);

        PageRequest pr = PageRequest.of(page,size);
        Page<Order> all = orderRepository.findAll(pr);

        return getOrdersPage(all);
    }

    @Override       //Only status will be changed
    public OrderDTO updateOrder(String orderId, OrderDTO orderDTO) {
        logger.info("update order with Id : {},",orderId);
        Order order = this.orderRepository.findById(orderId).orElseThrow(() -> new OrderNotFoundException(orderId));
        order.setOrderStatus(orderDTO.getOrderStatus());
        Order saveOder = orderRepository.save(order);
        return mapper.convertToOrderDTO(saveOder);
    }



    @Override
    public void cancelOrder(String orderId) {
        Order order = this.orderRepository.findById(orderId).orElseThrow(() -> new OrderNotFoundException(orderId));
        this.orderRepository.delete(order);//

    }



    @Override
    public OrdersPage findByOrderStatusOrderByDateDescPrimaryDishName(OrderStatus status, int page, int size) {
        logger.info("get all orders page: {} size: {} status {}",page,size,status);
        Page<Order> all = this.orderRepository.findByOrderStatusOrderByDateDesc(
                status,
                PageRequest.of(page, size)
        );
        return getOrdersPage(all);
    }

    @Override
    public OrdersPage getOrdersByDateRangeAndStatus(int page, int size, Date startDate, Date endDate, OrderStatus orderStatus) {
        logger.info("get all orders page: {} size: {} status {} startDate: {} endDate: {}",page,size,orderStatus,startDate,endDate);
        Pageable pageable = PageRequest.of(page,size);
        Page<Order> all = this.orderRepository
                .findByDateBetweenAndOrderStatusOrderByDateDesc(pageable,startDate,endDate,orderStatus);
        return getOrdersPage(all);
    }

    private OrdersPage getOrdersPage(Page<Order> all) {
        List<OrderDTO> orderDTO = all.getContent().stream().map(
                mapper::convertToOrderDTO
        ).toList();

        return OrdersPage.builder()
                .orders(orderDTO)
                .totalPages(all.getTotalPages())
                .first(all.isFirst())
                .last(all.isLast())
                .page(all.getNumber())
                .size(all.getSize())
                .build();
    }

    @Override
    public List<OrderStatusCount> countOrdersByDateRange(Date startDate, Date endDate) {
        return orderRepository.countOrdersByStatusInDateRange(startDate, endDate);
    }

}
