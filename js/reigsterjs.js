document.querySelector(".registration form").addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document.getElementById("confirm-password").value.trim();
  const error = document.querySelector(".error");

  if(error.classList.contains("d-none") === false){
    error.classList.add("d-none");
  }
  error.textContent = "";

  // ✅ Validate required fields
  if (!name || !email || !password || !confirmPassword) {
    error.textContent = "All fields are required.";
    error.classList.remove("d-none");
    return;
  }

  // ✅ Validate email format
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    error.textContent = "Please enter a valid email address.";
    error.classList.remove("d-none");
    return;
  }

  // ✅ Validate password match
  if (password !== confirmPassword) {
    error.textContent = "Passwords do not match.";
    error.classList.remove("d-none");
    return;
  }

  // ✅ Validate password length
  if (password.length < 8) {
    error.textContent = "Password must be at least 8 characters long.";
    error.classList.remove("d-none");
    return;
  }

  // ✅ Load existing users or create new array
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // ✅ Check if the email is already registered
  if (users.some(u => u.email === email)) {
    error.textContent = "This email is already registered.";
    error.classList.remove("d-none");
    return;
  }

  // ✅ Add new user to the array
  users.push({ username: name, email, password });

  // ✅ Save back to localStorage
  localStorage.setItem("users", JSON.stringify(users));

  alert("Registration successful! You can now log in.");
  window.location.href = "./login.html"; // Redirect to login page after registration
});

