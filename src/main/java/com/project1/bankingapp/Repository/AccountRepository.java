package com.project1.bankingapp.Repository;

import com.project1.bankingapp.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

//here <Account -> the class where db columns are connected, Long -> the type of the @Id>
//JpaRepo gives CRUD(Create, Read, Update, Delete) methods.
public interface AccountRepository extends JpaRepository<Account, Long> {
    Optional<Account> findByAccountHolderName(String accountHolderName);

    boolean existsByAccountHolderName(String accountHolderName);
}
