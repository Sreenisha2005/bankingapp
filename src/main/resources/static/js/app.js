const baseUrl = "http://localhost:8080/accounts";

// ---------------- CREATE ----------------
document.getElementById("createForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    let name = document.getElementById("createName").value;
    let deposit = document.getElementById("createDeposit").value;

    let res = await fetch(`${baseUrl}/create?name=${name}&initialDeposit=${deposit}`, { method: "POST" });
    if (res.ok) {
        let account = await res.json(); // Account object
        document.getElementById("createResult").innerText =
            `Account Created: ID=${account.id}, Name=${account.accountHolderName}, Balance=${account.balance}`;
    } else {
        let error = await res.text();
        document.getElementById("createResult").innerText = `Failed: ${error}`;
    }
});

// ---------------- DEPOSIT ----------------
document.getElementById("depositForm").addEventListener("submit", async(e) => {
    e.preventDefault();
    let id = document.getElementById("depositId").value;
    let amount = document.getElementById("depositAmount").value;

    let res = await fetch(`${baseUrl}/${id}/deposit?deposit=${amount}`, { method: "POST" });
    if(res.ok){
        let data = await parseResponse(res);
        let balance = data.balance ?? data;
        document.getElementById("depositResult").innerText = `New Balance: ${balance}`;
    } else {
        let error = await parseResponse(res);
        document.getElementById("depositResult").innerText = `Failed: ${error.message || error}`;
    }
});

// ---------------- WITHDRAW ----------------
document.getElementById("withdrawForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    let id = document.getElementById("withdrawId").value;
    let amount = document.getElementById("withdrawAmount").value;

    let res = await fetch(`${baseUrl}/${id}/withdraw?amount=${amount}`, { method: "POST" });

    if (res.ok) {
        let balance = await res.json(); // backend returns a number
        document.getElementById("withdrawResult").innerText = `New Balance: ${balance}`;
    } else {
        let error = await res.text();
        document.getElementById("withdrawResult").innerText = `Failed: ${error}`;
    }
});


// ---------------- BALANCE ----------------
document.getElementById("balanceForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  let id = document.getElementById("balanceId").value;

  let res = await fetch(`${baseUrl}/${id}/balance`);
  if(res.ok){
    let data = await parseResponse(res);
    let balance = data.balance ?? data;
    document.getElementById("balanceResult").innerText = `Your balance: ${balance}`;
  }
  else {
    let error = await parseResponse(res);
    document.getElementById("balanceResult").innerText = `Failed: ${error.message || error}`;
  }
});

// ---------------- ACCOUNT DETAILS (by name) ----------------
document.getElementById("AccDetailsForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    let name = document.getElementById("accDetailsName").value;

    let res = await fetch(`${baseUrl}/details?name=${name}`);
    if(res.ok){
      let data = await res.json();
      document.getElementById("accDetailsResult").innerHTML =
          `Account Id: ${data.id}<br>
           Account: ${data.name}<br>
           Balance: ${data.balance}`;
    } else {
      let error = await res.text();
      document.getElementById("accDetailsResult").innerText = `Failed: ${error}`;
    }
});

// ---------------- TRANSFER ----------------
document.getElementById("transactionform").addEventListener("submit", async (e) => {
    e.preventDefault();
    let id = document.getElementById("senderId").value;
    let receiverId = document.getElementById("receiverId").value;
    let amount = document.getElementById("transactionAmount").value;

    let res = await fetch(`${baseUrl}/${id}/transfer?id2=${receiverId}&amount=${amount}`, { method: "POST" });
    if (res.ok) {
        let message = await res.text(); // plain String
        document.getElementById("transactionResult").innerText = message;
    } else {
        let error = await res.text();
        document.getElementById("transactionResult").innerText = `Failed: ${error}`;
    }
});

// ---------------- DELETE ----------------
document.getElementById("deleteform").addEventListener("submit", async (e) => {
    e.preventDefault();
    let id = document.getElementById("deleteId").value;

    let res = await fetch(`${baseUrl}/${id}`, { method: "DELETE" });
    if (res.ok) {
        let message = await res.text(); // plain String
        document.getElementById("deleteResult").innerText = message;
    } else {
        let error = await res.text();
        document.getElementById("deleteResult").innerText = `Failed: ${error}`;
    }
});

