const RegisterUsers = JSON.parse(localStorage.getItem("RegisterUsers")) || [];
const currentUser = JSON.parse(localStorage.getItem('currentUser')) || []; // Store user data

// Handle form submission (Login/Registration)
document.getElementById("signUpForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const id = Date.now(); // Generate a unique ID
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const user = {
    id,
    username,
    email,
    password
  };
  for (let i = 0; i < RegisterUsers.length; i++) {
    if (RegisterUsers[i].email === email) {
      alert("Email already exists");
      return;
    } else if (RegisterUsers[i].username === username) {
      alert("Username already exists");
      return;
    }
  }
  RegisterUsers.push(user);
  localStorage.setItem("RegisterUsers", JSON.stringify(RegisterUsers));
  alert("User registered successfully!");
  window.location.href= "login.html"; 
  document.getElementById("profile-section").style.display = "block";
  document.getElementById("login-form").style.display = "none";
});

