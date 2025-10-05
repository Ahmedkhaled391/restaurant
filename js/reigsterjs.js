document.querySelector(".registration form").addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent form submission
  const name = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;
  const error = document.querySelector(".error");

  if (!error.classList.contains("d-none")) {
    error.classList.add("d-none");
  }
  if (name === "" || email === "" || password === "" || confirmPassword === "") {
    error.textContent = "All fields are required";
    error.classList.remove("d-none");
    return;
  }
    if (password !== confirmPassword) {
    error.textContent = "Password and Confirm Password should be the same";
    error.classList.remove("d-none");
    return;
  }
    if (password.length < 8) {
    error.textContent = "Password must be at least 8 characters long";
    error.classList.remove("d-none");
    return;
  }
    // If all validations pass, submit the form (you can replace this with actual form submission logic)
    e.target.submit();
});


