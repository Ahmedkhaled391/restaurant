document.querySelector(".login form").addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const error = document.querySelector(".error");

  // Reset any previous error
  if(error.classList.contains("d-none") === false){
    error.classList.add("d-none");
  }

  error.textContent = "";

  // ✅ Validate required fields
  if (!email || !password) {
    error.textContent = "All fields are required.";
    error.classList.remove("d-none");
    return;
  }

  // ✅ Get stored users
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // ✅ Find matching user
    const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    error.textContent = "Invalid email or password.";
    error.classList.remove("d-none");
    return;
  }

  // ✅ Store login state
  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("loggedInUser", JSON.stringify(user));

  alert(`Welcome back, ${user.username}!`);
  window.location.href = "../index.html"; // Redirect after successful login
});



console.log(localStorage.getItem("email"));
console.log(localStorage.getItem("password"));