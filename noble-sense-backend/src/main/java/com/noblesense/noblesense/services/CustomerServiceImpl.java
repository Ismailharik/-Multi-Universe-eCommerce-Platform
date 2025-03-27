package com.noblesense.noblesense.services;


import com.noblesense.noblesense.dto.UserDTO;
import com.noblesense.noblesense.dto.UsersPage;
import com.noblesense.noblesense.entities.User;
import com.noblesense.noblesense.enums.Role;
import com.noblesense.noblesense.exceptions.UserNotFoundException;
import com.noblesense.noblesense.mappers.Mapper;
import com.noblesense.noblesense.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import org.springframework.stereotype.Service;


@Service
@AllArgsConstructor
public class CustomerServiceImpl implements CustomerService {
    private final UserRepository customerRepository;
    private  final Mapper mapper;
    private static final Logger logger = LoggerFactory.getLogger(CustomerServiceImpl.class);

    @Override
    public UserDTO getCustomerById(String customerId) {
        User user = this.customerRepository.findById(
                customerId).orElseThrow(() -> new UserNotFoundException(customerId)
        );
        return mapper.convertToUserDTO(user);
    }

    @Override
    public UserDTO updateCustomer(String customerId, UserDTO updatedCustomer) {
        logger.info(String.format("updating user with id: %s user: %s ",customerId, updatedCustomer));

        User customer = this.customerRepository.findById(
                customerId).orElseThrow(()-> new UserNotFoundException(customerId)
        );
        User mappedUser= mapper.convertToUser(updatedCustomer);


        // those user identifiers can't be changed
        mappedUser.setId(customer.getId());
        mappedUser.setPhone(customer.getPhone());
        mappedUser.setTokens(customer.getTokens());
        mappedUser.setPassword(customer.getPassword());

        User savedCustomer=null;
        try {
         savedCustomer = this.customerRepository.save(mappedUser);
        }catch (Exception e){
            System.out.println(e.getMessage());
        }



        return mapper.convertToUserDTO(savedCustomer);
    }


    @Override
    public UserDTO updateCustomerPassword(String customerId, String password) {

        /*
         * In this case I have to call auth service
         * May I will delete user and re authenticate him
         */
       return null;
    }

    @Override
    public UsersPage findUsersByKeywordAndRole(String keyword,int page, int size) {
        this.logger.info(String.format("find user by keyword keyword: %s page: %d size %d",keyword,page,size));

        Pageable pageable = PageRequest.of(page, size);
        UsersPage usersPage = new UsersPage();
        Page<User> all= this.customerRepository.findByFullNameLikeAndRoleLike(pageable,"%"+keyword+"%",Role.USER);
        usersPage.setUsers(all.getContent().stream().map(user -> mapper.convertToUserDTO(user)).toList());
        usersPage.setFirst(all.isFirst());
        usersPage.setLast(all.isLast());
        usersPage.setSize(all.getSize());
        usersPage.setTotalPages(all.getTotalPages());
        usersPage.setPage(all.getNumber());
        return usersPage;
    }



    @Override
    public void deleteCustomer(String customerId) {
        User customer = this.customerRepository.findById(
                customerId).orElseThrow(()-> new UserNotFoundException(customerId)
        );
        this.customerRepository.delete(customer);
    }

    @Override
    public UsersPage getAllCustomers(int page, int size) {
        PageRequest pr = PageRequest.of(page,size);
        Page<User> all = customerRepository.findByRole(pr, Role.USER);

        UsersPage usersPage = new UsersPage();
        usersPage.setUsers(all.map(mapper::convertToUserDTO).toList());
        usersPage.setFirst(all.isFirst());
        usersPage.setLast(all.isLast());
        usersPage.setTotalPages(all.getTotalPages());
        usersPage.setSize(all.getSize());
        usersPage.setPage(all.getNumber());
        return usersPage;
    }


}
