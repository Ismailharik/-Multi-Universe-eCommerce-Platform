package com.noblesense.noblesense.services;

import com.noblesense.noblesense.dto.UsersPage;
import com.noblesense.noblesense.dto.UserDTO;

public interface AdminService {
    UserDTO getAdminById(String adminId);
    UserDTO updateAdmin(String adminId, UserDTO updatedAdmin);
    void deleteAdmin(String adminId);
    UsersPage getAllAdmins(int page, int size);
    public UserDTO updateAdminPassword(String adminId, String password);
   UsersPage findUsersByKeywordAndRole(String keyword,int page,int size);
}
