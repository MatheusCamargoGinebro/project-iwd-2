document.addEventListener("DOMContentLoaded", function () {
  sessionChecker().then((data) => {
    document.getElementById("mobile-options-list").innerHTML =
      "<li class='side-navbar-li-btn'>" +
      "<a class='side-navbar-btn open' href='http://localhost:5000/'>Home</a>" +
      "</li>";

    document.getElementById("option-list").innerHTML =
      "<li class='li-btn'>" +
      "<a class='menu-btn hover-underline-animation' href='http://localhost:5000/'>Home</a>" +
      "</li>";

    if (data.session) {
      document.getElementById("mobile-options-list").innerHTML +=
        "<li class='side-navbar-li-btn'>" +
        "<a class='side-navbar-btn' href='http://localhost:5000/html/forms.html'>Form</a>" +
        "</li>";

      document.getElementById("option-list").innerHTML +=
        "<li class='li-btn'>" +
        "<a class='menu-btn hover-underline-animation' href='http://localhost:5000/html/forms.html'>Form</a>" +
        "</li>" +
        "<li class='li-btn'>" +
        "<a class='menu-btn hover-underline-animation' href='http://localhost:5000/php/session/logout.php'>Logout</a>" +
        "</li>";
    } else {
      document.getElementById("mobile-options-list").innerHTML +=
        "<li class='side-navbar-li-btn'>" +
        "<a class='side-navbar-btn' href='http://localhost:5000/html/login.html'>Sign in</a>" +
        "</li>" +
        "<li class='side-navbar-li-btn'>";
      "<a class='side-navbar-btn' href='http://localhost:5000/html/register.html'>Sign up</a>" +
        "</li>";

      document.getElementById("option-list").innerHTML +=
        "<li class='li-btn'>" +
        "<a class='menu-btn' href='http://localhost:5000/html/login.html' id='SingIn'>Sign in</a>" +
        "</li>" +
        "<li class='li-btn'>" +
        "<a class='menu-btn' href='http://localhost:5000/html/register.html' id='SingUp'>Sign up</a>" +
        "</li>";
    }
  });
});

async function loadCards() {
  try {
    const response = await fetch(
      "http://localhost:5000/php/database/load/loadCards.php",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    data = await response.json();

    if (data.size != 0) {
      var Content = "<div class='gridarea'>";

      for (let i = 0; i < data.size; i++) {
        Content +=
          "<div class='object-div' id='card" +
          i +
          "'>" +
          "<div class='object-img-div'>" +
          "<img src='" +
          data.cards[i].cardImageURL +
          "' alt='Image' />" +
          "</div>" +
          "<div class='object-title-div'>" +
          "<h1>" +
          data.cards[i].cardTitle +
          "</h1>" +
          "</div>" +
          "<div class='object-text-div'>" +
          "<p>" +
          data.cards[i].cardDescription +
          "</p>" +
          "</div>" +
          "</div>";
      }
      Content += "</div>";

      document.getElementById("container-data").innerHTML = Content;

      for (let i = 0; i < data.size; i++) {
        document
          .getElementById("card" + i)
          .addEventListener("click", function () {
            //
          });
      }
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

loadCards();
