async function loginUser() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const message = document.getElementById("message");

  if (!email || !password) {
    message.innerText = "Please enter email and password";
    message.style.color = "red";
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}/api/accounts/login`, {
      method: "POST",
      headers: normalHeaders(),
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (result.success) {
      localStorage.setItem("access_token", result.data.access);
      localStorage.setItem("refresh_token", result.data.refresh);
      localStorage.setItem("user", JSON.stringify(result.data.user));

      message.innerText = "Login successful";
      message.style.color = "green";

      setTimeout(() => {
        window.location.href = "index.html";
      }, 800);
    } else {
      message.innerText = result.message || "Invalid login";
      message.style.color = "red";
    }
  } catch (error) {
    message.innerText = "Server error. Try again.";
    message.style.color = "red";
    console.error(error);
  }
}