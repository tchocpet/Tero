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


// Handling the form submission and preparing data to send the email

document.getElementById('contact-form').addEventListener('submit', async function(event) {
  event.preventDefault();

  const formData = new FormData(this);

  for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
  }

  try {
      const response = await fetch('http://localhost:3000/send-email', {
          method: 'POST',
          body: formData,
      });

      console.log('Response status:', response.status);
      console.log('Response status text:', response.statusText);

      if (response.ok) {
          const successMessage = await response.json();
          console.log('Response message:', successMessage);
          alert('Email sent successfully!');
      } else {
          // Handle non-200 responses
          const errorText = await response.text();
          console.error('Response error:', errorText);
      }
  } catch (error) {
      // Log fetch error to console but do not alert user
      console.error('Fetch error:', error);
  }
});

