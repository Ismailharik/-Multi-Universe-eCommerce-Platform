package com.noblesense.noblesense.services;

import com.noblesense.noblesense.dto.UserDTO;
import com.noblesense.noblesense.dto.UsersPage;

public interface CustomerService {
    UserDTO getCustomerById(String customerId);
    UserDTO updateCustomer(String customerId, UserDTO updatedCustomer);
    void deleteCustomer(String customerId);
    UsersPage getAllCustomers(int pageNo, int pageSize);
    UserDTO updateCustomerPassword(String customerId, String password);
    UsersPage findUsersByKeywordAndRole(String keyword, int page, int size);

}
