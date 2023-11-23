console.log("indexScripts.js loeaded");

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

    console.log("Data: ", data);

    if (data.size == 0) {
      console.log("0 cards :(");
    } else {
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

        console.log("Card " + i + " loaded");
      }
      Content += "</div>";

      document.getElementById("container-data").innerHTML = Content;
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

loadCards();