let searchBtn = document.getElementById("seach-button");
let inputContry = document.getElementById("inputContry");
let resultat = document.getElementById("resultat");

function logKey(e) {
  if (e.which === 13) {
    getUrl();
  } else {
  }
}

function getUrl(e) {
  let countryName = inputContry.value;
  let urlSearch = `https://restcountries.com/v3.1/translation/${countryName}`;
  console.log(urlSearch);
  fetchFunction(urlSearch);
  e.preventDefault();
}

function fetchFunction(urlSearch) {
  fetch(urlSearch).then((reponse) => {
    console.log(reponse);
    if (reponse.ok) {
      reponse.json().then((data) => {
        console.log(data);

        let html = "";

        // console.log(Object.keys(data[0].currencies));
        // console.log(data[0].currencies[Object.keys(data[0].currencies)].name);
        // console.log(data[0].flags.svg);
        // console.log(data[0].population);

        for (let index = 0; index < data.length; index++) {
          html += `
               <div class="items">
               <div class="block-flag">
               <img src= ${
                 data[index].flags.svg
               } class="img-flag" alt="flag" /> 
               <h3> ${data[index].translations.fra.common}</h3>

               </div>
               <div class="bloc-data">
               <h3>Capital : <span>${data[index].capital[0]}</span></h3>
               <h3>Continents : <span>${data[index].continents[0]}</span></h3>
               <h3>Languages : <span>${Object.values(data[index].languages)
                 .toString()
                 .split(",")
                 .join(", ")}</span></h3>
               <h3>Currency : <span>${Object.keys(data[index].currencies)} ( ${
            data[index].currencies[Object.keys(data[index].currencies)].name
          } )</span></h3>
               <h3>Population : <span>${data[index].population}</span></h3>
               <h3>Area : <span>${data[index].area}</span></h3>
               <h3>IDD Tel : <span>${data[index].idd.root}${
            data[index].idd.suffixes[0]
          }</span></h3>

               </div>
               </div>
               
               `;
        }

        resultat.innerHTML = html;
      });
    } else {
      alert(`
                ${inputContry.value} is not a contry name. Search by country’s full name. It can be the common or official name`);
    }
  });
}

searchBtn.addEventListener("click", getUrl);
document.addEventListener("keypress", logKey);
