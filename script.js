const form = document.getElementById("loginForm");
const statusEl = document.getElementById("status");

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!email || !password) {
    statusEl.textContent = "Please enter both email and password.";
    statusEl.className = "status error";
    return;
  }

  statusEl.textContent = "Authenticating...";
  statusEl.className = "status";

  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Invalid email or password.");
    }

    localStorage.setItem("shellbark_token", data.token);
    localStorage.setItem("shellbark_user", JSON.stringify(data.user));

    statusEl.textContent = "Login successful. Redirecting...";
    statusEl.className = "status success";

    setTimeout(() => {
      window.location.href = "./dashboard.html";
    }, 600);
  } catch (error) {
    statusEl.textContent = error.message || "Authentication failed.";
    statusEl.className = "status error";
  }
});
