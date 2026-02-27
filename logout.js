const token = localStorage.getItem("token");
const user = localStorage.getItem("userName");
const userName = document.getElementById("userName");
// console.log("userName", user);

// const userDetails = JSON.parse(user);

// console.log("userName", userDetails);
// console.log("token", token);
userName.textContent = user;

if (!token || !user) {
  window.location.href = "index.html";
}

let logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  setTimeout(() => {
    window.location.href = "index.html";
  }, 1000);
};
