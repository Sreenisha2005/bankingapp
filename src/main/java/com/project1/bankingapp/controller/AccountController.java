package com.project1.bankingapp.controller;

import com.project1.bankingapp.Service.AccountService;
import com.project1.bankingapp.entity.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/accounts")
public class AccountController {

    @Autowired
    private final AccountService accountService;

    public AccountController(AccountService accountService){
        this.accountService = accountService;
    }

    @PostMapping("/create")
    public ResponseEntity<?> createAcc(@RequestParam String name, @RequestParam Double initialDeposit){
        try {
            Account acc = accountService.createAccount(name, initialDeposit);
            return ResponseEntity.ok(acc);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage()); // just the message
        }
    }

    @PostMapping("/{id}/deposit")
    public ResponseEntity<?> deposit(@PathVariable Long id, @RequestParam Double deposit){
        try {
            Double deposit1 = accountService.Deposit(id, deposit);
            return ResponseEntity.ok(deposit1);
        }
        catch (RuntimeException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/{id}/withdraw")
    public ResponseEntity<?> withdraw(@PathVariable Long id, @RequestParam Double amount){
        try {
            Double withdraw = accountService.Withdraw(id, amount);
            return ResponseEntity.ok(withdraw);
        }
        catch (RuntimeException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}/balance")
    public ResponseEntity<?> getBalance(@PathVariable Long id){
        try {
            Double balance = accountService.GetBalance(id);
            return ResponseEntity.ok(balance);
        }
        catch (RuntimeException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/details")
    public ResponseEntity<Account> accDetails(@RequestParam String name) {
        Account account = accountService.getAccountDetails(name);
        return ResponseEntity.ok(account);
    }

    @PostMapping("/{id}/transfer")
    public String transfer(@PathVariable Long id, @RequestParam Long id2, @RequestParam Double amount){
        return accountService.Transaction(id, id2, amount);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id){
        try {
            accountService.DeleteAccount(id);
            return ResponseEntity.ok("Account Deleted Successfully!");
        }
        catch (RuntimeException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
