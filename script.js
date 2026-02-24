const container = document.getElementById("container");
const overlayCon = document.getElementById("overlayCon");
const overlayBtn = document.getElementById("overlayBtn");

overlayBtn.addEventListener("click", () => {
  container.classList.toggle("right-panel-active");

  overlayBtn.classList.remove("btnScaled");
  window.requestAnimationFrame(() => {
    overlayBtn.classList.add("btnScaled");
  });
});

let register = (event) => {
  event.preventDefault();
  const form = event.target;
  const fullName = form.fullName.value.trim();
  // console.log(fullName);
  const email = form.email.value.trim();
  const password = form.password.value.trim();
};
