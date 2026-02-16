window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loader").style.display = "none";
    document.getElementById("page-content").classList.remove("d-none");
  }, 2800);
});
