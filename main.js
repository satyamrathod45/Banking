const loginSection = document.getElementById("login-section");
      const menuSection = document.getElementById("menu-section");
      const balanceSection = document.getElementById("balance-section");
      const withdrawSection = document.getElementById("withdraw-section");
      const depositSection = document.getElementById("deposit-section");

      const loginButton = document.getElementById("login-button");
      const checkBalanceButton = document.getElementById(
        "check-balance-button"
      );
      const withdrawButton = document.getElementById("withdraw-button");
      const depositButton = document.getElementById("deposit-button");
      const logoutButton = document.getElementById("logout-button");

      const backButton = document.getElementById("back-button");
      const backWithdrawButton = document.getElementById(
        "back-withdraw-button"
      );
      const backDepositButton = document.getElementById("back-deposit-button");
      // User Data
      const userData = {
        satyamrathod: { pass: "1234", balance: 1000 },
        user: { pass: "1234", balance: 1000 },
      };
      // Backend Handling
      function getPass(username) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            if (userData[username]) {
              resolve(userData[username].pass);
            } else {
              reject("Username not found");
            }
          }, 1000);
        });
      }

      function handleLogin() {
        const username = document.getElementById("username").value;
        const pin = document.getElementById("pin").value;

        if (!username || !pin) {
          alert("Please fill in both fields");
          return;
        }

        getPass(username)
          .then((pass) => {
            if (pin === pass) {
              loginSection.classList.add("hidden");
              menuSection.classList.remove("hidden");
            } else {
              alert("Invalid PIN");
            }
          })
          .catch((err) => {
            console.log(err);
            alert("Invalid username or password");
          });
      }
      loginButton.addEventListener("click", handleLogin);
      //Check Balance block

      function checkBalance(username) {}
      function getBalance(username) {
        return new Promise((resolve, reject) => {
          if (userData[username]) {
            resolve(userData[username].balance);
          } else {
            reject("some issue occurred");
          }
        }, 1000);
      }
      checkBalanceButton.addEventListener("click", function () {
        const username = document.getElementById("username").value;
        getBalance(username)
          .then((balance) => {
            document.getElementById(
              "balance-amount"
            ).textContent = `$${balance}`;
            menuSection.classList.add("hidden");
            balanceSection.classList.remove("hidden");
          })
          .catch((err) => alert(err));
      });
      // Withdraw Money Block

      function withdrawMoney(username, amt) {
        return new Promise((resolve, reject) => {
          if (userData[username]) {
            const userBalance = userData[username].balance;
            if (amt <= userBalance && amt > 0) {
              userData[username].balance -= amt;
              resolve(userData[username].balance);
            } else {
              reject("Insufficient balance");
            }
          } else {
            reject("User not found");
          }
        });
      }

      withdrawButton.addEventListener("click", function () {
        menuSection.classList.add("hidden");
        withdrawSection.classList.remove("hidden");
      });

      function handleWithdraw() {
        const username = document.getElementById("username").value;
        const amount = parseFloat(document.getElementById("withdraw-amount").value);

        if (amount > 0) {
          withdrawMoney(username, amount)
            .then((balance) => {
              alert(`You have successfully withdrawn $${amount}. New balance: $${balance}`);
              withdrawSection.classList.add("hidden");
              menuSection.classList.remove("hidden");
            })
            .catch((err) => alert(err));
        } else {
          alert("Invalid amount");
        }
      }
      document
        .getElementById("withdraw-submit-button")
        .addEventListener("click", handleWithdraw);
      backWithdrawButton.addEventListener("click", function () {
        withdrawSection.classList.add("hidden");
        menuSection.classList.remove("hidden");
      });

      // Deposit Money Block

      function depositMoney(username, amt) {
        return new Promise((resolve, reject) => {
          if (userData[username]) {
            userData[username].balance += amt;
            resolve(userData[username].balance);
          } else {
            reject("User not found");
          }
        });
      }

      depositButton.addEventListener("click", function () {
        menuSection.classList.add("hidden");
        depositSection.classList.remove("hidden");
      });

      function handleDeposit() {
        const username = document.getElementById("username").value;
        const amount = parseFloat(document.getElementById("deposit-amount").value);

        if (amount > 0) {
          depositMoney(username, amount)
            .then((balance) => {
              alert(`You have successfully deposited $${amount}. New balance: $${balance}`);
              depositSection.classList.add("hidden");
              menuSection.classList.remove("hidden");
            })
            .catch((err) => alert(err));
        } else {
          alert("Invalid amount");
        }
      }
      document
        .getElementById("deposit-submit-button")
        .addEventListener("click", handleDeposit);

      backDepositButton.addEventListener("click", function () {
        depositSection.classList.add("hidden");
        menuSection.classList.remove("hidden");
      });

      logoutButton.addEventListener("click", function () {
        menuSection.classList.add("hidden");
        loginSection.classList.remove("hidden");
      });

      backButton.addEventListener("click", function () {
        balanceSection.classList.add("hidden");
        menuSection.classList.remove("hidden");
      });
