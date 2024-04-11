let submenu = document.getElementById("submenu");
let submenuMobile = document.getElementById("submenu-mobile");
let screenWidth = window.innerWidth;
let dienstleistungen = document.getElementById("dienstleistungen");
function toggleSubmenu(displayState) {
  screenWidth < 992
    ? (submenuMobile.style.display = displayState)
    : (submenu.style.display = displayState);
}
dienstleistungen.addEventListener("mouseover", function () {
  toggleSubmenu("block");
});

dienstleistungen.addEventListener("mouseout", function (event) {
  if (
    !submenu.contains(event.relatedTarget) &&
    !submenuMobile.contains(event.relatedTarget)
  ) {
    toggleSubmenu("none");
  }
});
[submenu, submenuMobile].forEach(function (menu) {
  menu.addEventListener("mouseleave", function () {
    toggleSubmenu("none");
  });
});

document.getElementById("themeIcon").onclick = function () {
  var element = document.body;
  element.classList.toggle("dark-mode");

  var cardtext = document.getElementsByClassName("card-text");
  var cardtextarray = Array.from(cardtext);
  cardtextarray.forEach(function (i) {
    i.classList.add("card-darkmode");
  });
};
