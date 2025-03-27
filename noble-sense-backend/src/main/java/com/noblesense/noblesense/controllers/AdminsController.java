package com.noblesense.noblesense.controllers;

import com.noblesense.noblesense.dto.UserDTO;
import com.noblesense.noblesense.dto.UsersPage;
import com.noblesense.noblesense.services.AdminService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("/api/v1/admins")
//@PreAuthorize("hasRole('ADMIN')")
public class AdminsController {


    private final AdminService adminService;
    @GetMapping("/search")
    public UsersPage findCustomerByKeyword(//keyword = firstname or lastname
                                           @RequestParam() String keyword,
                                           @RequestParam(value = "page", defaultValue = "0") int page,
                                           @RequestParam(value = "size", defaultValue = "10") int size) {
        return adminService.findUsersByKeywordAndRole(keyword,page,size);
    }

    @GetMapping()
    UsersPage getAllAdmins( @RequestParam(value = "page", defaultValue = "0") int page,
                            @RequestParam(value = "size", defaultValue = "10") int size){
        return this.adminService.getAllAdmins(page,size);
    }
    @GetMapping("/{id}")
    UserDTO getAdminById(@PathVariable String id){
        return this.adminService.getAdminById(id);
    }
    @PutMapping("/{id}")
    public UserDTO updateAdmin(@PathVariable String id, @RequestBody UserDTO admin){
        return this.adminService.updateAdmin(id,admin);
    }
    @DeleteMapping("/{id}")
    public void deleteAdmin(@PathVariable String id){
        this.adminService.deleteAdmin(id);
    }

}
