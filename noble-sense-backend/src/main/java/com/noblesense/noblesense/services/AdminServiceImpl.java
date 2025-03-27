package com.noblesense.noblesense.services;

import com.noblesense.noblesense.dto.*;
import com.noblesense.noblesense.dto.UsersPage;
import com.noblesense.noblesense.entities.User;
import com.noblesense.noblesense.enums.Role;
import com.noblesense.noblesense.exceptions.UserNotFoundException;
import com.noblesense.noblesense.mappers.Mapper;
import com.noblesense.noblesense.repositories.UserRepository;
import com.noblesense.noblesense.dto.UserDTO;
import lombok.AllArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AdminServiceImpl implements AdminService {

    /*
     * To create admin you have to use register method of Authentication class
     * */
    private final UserRepository adminRepository;
    private final Mapper mapper;

    @Override
    public UserDTO getAdminById(String adminId) {
        User admin = this.adminRepository.findById(adminId).orElseThrow(() -> new UserNotFoundException(adminId));
        return mapper.convertToUserDTO(admin);
    }

    @Override
    public UserDTO updateAdmin(String adminId, UserDTO updatedAdmin) {
        User admin = this.adminRepository.findById(adminId).orElseThrow(() -> new UserNotFoundException(adminId));


        admin.setFullName(updatedAdmin.getFullName());
//        admin.setEmail(updatedAdmin.getEmail()); // shouldn't be updated for security raisons
        admin.setPhone(updatedAdmin.getPhone());
        admin.setActive(updatedAdmin.isActive());

        User savedUser = this.adminRepository.save(admin);
        return mapper.convertToUserDTO(savedUser);
    }

    @Override
    public void deleteAdmin(String adminId) {
        User admin = this.adminRepository.findById(adminId).orElseThrow(() -> new UserNotFoundException(adminId));
        this.adminRepository.delete(admin);
    }

    @Override
    public UsersPage getAllAdmins(int page, int size) {
        PageRequest pr = PageRequest.of(page,size);
        Page<User> all = this.adminRepository.findByRole(pr, Role.ADMIN);


        UsersPage usersPage = new UsersPage();
        usersPage.setUsers(all.map(mapper::convertToUserDTO).toList());
        usersPage.setFirst(all.isFirst());
        usersPage.setLast(all.isLast());
        usersPage.setTotalPages(all.getTotalPages());
        usersPage.setSize(all.getSize());
        usersPage.setPage(all.getNumber());
        return usersPage;
    }

    @Override
    public UserDTO updateAdminPassword(String adminId, String password) {
        return null;
    }

    @Override
    public UsersPage findUsersByKeywordAndRole(String keyword, int page, int size) {

        Pageable pageable = PageRequest.of(page, size);
        UsersPage usersPage = new UsersPage();
        Page<User> all = this.adminRepository.findByFullNameLikeAndRoleLike(pageable, "%" + keyword + "%", Role.ADMIN);
        usersPage.setUsers(all.getContent().stream().map(user -> mapper.convertToUserDTO(user)).toList());
        usersPage.setFirst(all.isFirst());
        usersPage.setLast(all.isLast());
        usersPage.setSize(all.getSize());
        usersPage.setTotalPages(all.getTotalPages());
        usersPage.setPage(all.getNumber());
        return usersPage;
    }


}
