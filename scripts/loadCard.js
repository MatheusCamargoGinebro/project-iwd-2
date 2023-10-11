var data;

console.log("loadCard.js loeaded");

async function fetchData() {
  try {
    const response = await fetch("http://localhost:5000/loadCards.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const cardData = await response.json();

    data = cardData;
    console.log(cardData);

    var size = cardData.length;
    console.log(size);
    var Content = "<div class='gridarea'>";
    for (var i = 0; i < size; i++) {
        Content += "<div class='object-div' id='card"+i+"'>";

        Content +="<div class='object-img-div'>";

        Content += "<img src='" + cardData[i].cardImageURL +"' alt='Image' />";

        Content += "</div>";

        Content += "<div class='object-title-div'>";

        Content += "<h1>" + cardData[i].cardTitle + "</h1>";

        Content += "</div>";

        Content += "<div class='object-text-div'>";

        Content += "<p>" + cardData[i].cardDescription + "</p>";

        Content += "</div>";

        Content += "</div>";

        /*
    
        <!--< Div onde ficam os cards >-->
          <div class="object-div" id="card0"><!--<OBS: descobrir como vincular a ID ao título para a futura feature de pesquisa por título>-->
            <div class="object-img-div">
              <img src="./imgs/projeto_logo.png" alt="Image" />
            </div>
            <div class="object-title-div">
              <h1>The Ifers</h1>
              <!--< min: 1; max:18 >-->
            </div>
            <div class="object-text-div">
              <p>Os The Ifers são alunos do Instituto Federal que estudam informática integrado ao ensino médio e são conhecidos por sua habilidade em programação. Eles são dedicados, comprometidos com a excelência e têm paixão por tecnologia, buscando constantemente aprender e desenvolver habilidades para criar soluções eficientes e inovadoras.</p>
              <!--< min: 1; max:222 >-->
            </div>
          </div>


          


        </div>
        */
    }
    Content += "</div>";

    document.getElementById("container-data").innerHTML = Content;

  } catch (error) {
    console.error();
  }
}
    
// Chame a função fetchData para iniciar a solicitação
fetchData();
