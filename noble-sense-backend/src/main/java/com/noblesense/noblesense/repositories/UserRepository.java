package com.noblesense.noblesense.repositories;

import com.noblesense.noblesense.entities.User;
import com.noblesense.noblesense.enums.Role;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

    Optional<User> findByPhone(String phone);
    Page<User> findAll(Pageable pageable);
    List<User> findByRole(Role admin);
    Page<User> findByRole(Pageable pageable,Role admin);

    Page<User> findByFullNameLikeAndRoleLike(Pageable pageable,String keyword,Role role);

}