package com.noblesense.noblesense.controllers;

import com.noblesense.noblesense.dto.UpdateUserPassword;
import com.noblesense.noblesense.dto.UserDTO;
import com.noblesense.noblesense.dto.UsersPage;
import com.noblesense.noblesense.services.AuthenticationService;
import com.noblesense.noblesense.services.CustomerService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.Collections;


@AllArgsConstructor
@RestController
@RequestMapping("/api/v1/customers")
public class CustomerController {
    private final CustomerService customerService;
    private final AuthenticationService authService;

    @GetMapping
    public UsersPage findAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ){
        return customerService.getAllCustomers(page,size);
    }
    @GetMapping("/search")
    public UsersPage findCustomerByKeyword(//keyword = firstname or lastname
                                               @RequestParam() String keyword,
                                               @RequestParam(value = "page", defaultValue = "0") int page,
                                               @RequestParam(value = "size", defaultValue = "10") int size) {
        return customerService.findUsersByKeywordAndRole(keyword,page,size);
    }
    @GetMapping("/{id}")
    public UserDTO getCustomerById(@PathVariable String id){
        return this.customerService.getCustomerById(id);
    }
    @PutMapping("/{id}")
    public UserDTO updateCustomer(@PathVariable String id, @RequestBody UserDTO userDTO) {

        return this.customerService.updateCustomer(id,userDTO);
    }
    @DeleteMapping("/{id}")
    public void deleteCustomer(@PathVariable String id){
        this.customerService.deleteCustomer(id);
    }
    @PostMapping("/change-password")
    public ResponseEntity<?> changeUserPassword(@RequestBody UpdateUserPassword request) {
        String resp = authService.updateUserPassword(request);
        return ResponseEntity.ok(Collections.singletonMap("message", resp));
    }


}
