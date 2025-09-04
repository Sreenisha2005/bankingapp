package com.project1.bankingapp.Service;

import com.project1.bankingapp.Repository.AccountRepository;
import com.project1.bankingapp.entity.Account;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AccountService {
    private final AccountRepository accountRepository;

    public AccountService(AccountRepository accountRepository){
        this.accountRepository = accountRepository;
    }

    public Account createAccount(String name, Double initalDeposit){
        if (accountRepository.existsByAccountHolderName(name)){
            throw new RuntimeException("Account under this name already exists!");
        }
        Account acc1 = new Account();
        acc1.setAccountHolderName(name);
        acc1.setBalance(initalDeposit);
        return accountRepository.save(acc1);
    }

    public Account getAccountDetails(String name) {
        return accountRepository.findByAccountHolderName(name)
                .orElseThrow(() -> new RuntimeException("Account not found!"));
    }

    //Account Id: "+ account.getId()+
    @Transactional
    public Double Deposit(Long id, Double deposit){
        Account account = accountRepository.findById(id).orElseThrow(() -> new RuntimeException("Account not found!"));
        account.setBalance(account.getBalance() + deposit);
        accountRepository.save(account);
        return account.getBalance();
    }

    @Transactional
    public Double Withdraw(Long id, Double amount){
        Account account = accountRepository.findById(id).orElseThrow(() -> new RuntimeException("Account not found!"));
        if (account.getBalance() < amount) throw new RuntimeException("Insufficient funds");
        account.setBalance(account.getBalance() - amount);
        accountRepository.save(account);
        return account.getBalance();
    }

    public Double GetBalance(Long id){
        Account account = accountRepository.findById(id).orElseThrow(() -> new RuntimeException("Account not found!"));
        return account.getBalance();
    }

    @Transactional
    public String Transaction(Long id1, Long id2, Double amount){
        Account senderAccount = accountRepository.findById(id1).orElseThrow(() -> new RuntimeException("Sender Account not found!"));
        Account receiverAccount = accountRepository.findById(id2).orElseThrow(() -> new RuntimeException("Receiver Account not found!"));
        if (senderAccount.getBalance() < amount) throw new RuntimeException("Insufficient funds");
        receiverAccount.setBalance(receiverAccount.getBalance() + amount);
        senderAccount.setBalance(senderAccount.getBalance() - amount);
        accountRepository.save(senderAccount);
        return "Transaction of Rs." + amount + " done successfully";
    }

    public void DeleteAccount(Long id){
        Account account = accountRepository.findById(id).orElseThrow(() -> new RuntimeException("Account not found!"));
        if (account.getBalance() != 0) {throw new RuntimeException("Account cannot be deleted due to existing amount.");}
        else { accountRepository.deleteById(id); }
    }

    public Optional<Account> getAccountById(Long id) {
        return accountRepository.findById(id);
    }
}
