console.log("depositForm element:", document.getElementById("depositForm"));

const baseUrl = "http://localhost:8080/accounts";

console.log("depositForm element:", document.getElementById("depositForm"));
console.log("withdrawForm element:", document.getElementById("withdrawForm"));
console.log("balanceForm element:", document.getElementById("balanceForm"));


// ---------------- CREATE ----------------
const createForm = document.getElementById("createForm");
if (createForm) {
    createForm.addEventListener("submit", async (e) => {
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
}

// ---------------- DEPOSIT ----------------
const depositForm = document.getElementById("depositForm");
if (depositForm) {
    depositForm.addEventListener("submit", async(e) => {
        e.preventDefault();
        console.log("Deposit form submitted");
        let id = document.getElementById("depositId").value;
        let amount = document.getElementById("depositAmount").value;

        let res = await fetch(`${baseUrl}/${id}/deposit?deposit=${amount}`, { method: "POST" });
         if (res.ok) {
            let data = await res.json();
            document.getElementById("depositResult").innerText = `New Balance: ${data}`;
         } else {
            let error = await res.text();
            document.getElementById("depositResult").innerText = `Failed: ${error}`;
         }
    });
}

// ---------------- WITHDRAW ----------------
const withdrawForm = document.getElementById("withdrawForm");
if (withdrawForm) {
    withdrawForm.addEventListener("submit", async (e) => {
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
}


// ---------------- BALANCE ----------------
const balanceForm = document.getElementById("balanceForm");
if (balanceForm) {
    balanceForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      let id = document.getElementById("balanceId").value;

      let res = await fetch(`${baseUrl}/${id}/balance`);
      if (res.ok) {
         let balance = await res.json(); // backend returns a number
         document.getElementById("balanceResult").innerText = `New Balance: ${balance}`;
      } else {
         let error = await res.text();
         document.getElementById("balanceResult").innerText = `Failed: ${error}`;
      }
    });
}

// ---------------- ACCOUNT DETAILS (by name) ----------------
const AccDetailsForm = document.getElementById("AccDetailsForm");
if (AccDetailsForm) {
    AccDetailsForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        let name = document.getElementById("accDetailsName").value;

        try {
            let res = await fetch(`${baseUrl}/details?name=${name}`);

            if (res.ok) {
                let data = await res.json(); // ✅ backend now returns JSON Account object
                document.getElementById("accDetailsResult").innerHTML =
                    `Account Id: ${data.id}<br>
                     Account: ${data.accountHolderName}<br>
                     Balance: ${data.balance}`;
            } else {
                let error = await res.text();
                document.getElementById("accDetailsResult").innerText = `Failed: ${error}`;
            }
        } catch (err) {
            document.getElementById("accDetailsResult").innerText = `Error: ${err.message}`;
        }
    });
}

// ---------------- TRANSFER ----------------
const transactionform = document.getElementById("transactionform");
if (transactionform) {
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
}

// ---------------- DELETE ----------------
const deleteform = document.getElementById("deleteform");
if (deleteform) {
    deleteform.addEventListener("submit", async (e) => {
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
}

