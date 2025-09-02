package com.project1.bankingapp.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter
    private Long id;

    @Setter
    @Getter
    private String accountHolderName;

    @Getter
    @Setter
    private Double balance;

//    public Account(String AccountHolderName, Long id, Double balance) {
//        this.accountHolderName = getAccountHolderName();
//        this.id = getId();
//        this.balance = getBalance();
//    }
}
