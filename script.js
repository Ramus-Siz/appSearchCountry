let searchBtn= document.getElementById("seach-button");
let inputContry= document.getElementById("inputContry");
let resultat =document.getElementById("resultat");

function getUrl(e) {
    let countryName=inputContry.value;
    let urlSearch= `https://restcountries.com/v3.1/name/${countryName}`;
    console.log(urlSearch);
    fetchFunction(urlSearch);
    e.preventDefault();
}

function fetchFunction(urlSearch) {
    fetch(urlSearch)
    .then(reponse =>{
        console.log(reponse);
        if(reponse.ok){

            reponse.json().then(data =>{
                console.log(data);
                console.log(Object.keys(data[0].currencies));
                console.log(data[0].currencies[Object.keys(data[0].currencies)].name);
                console.log(data[0].flags.svg);
                console.log(data[0].population);

                resultat.innerHTML= `
                <div class="block-flag">
                <img src= ${data[0].flags.svg} class="img-flag" alt="flag" /> 
                <h3>${data[0].name.common}</h3>
                </div>
                <div class="bloc-data">
                <h3>Capital: <span>${data[0].capital[0]}</span></h3>
                <h3>Continent: <span>${data[0].continents[0]}</span></h3>
                <h3>Population: <span>${data[0].population}</span></h3>
                <h3>Monaie: <span>${Object.keys(data[0].currencies)} ( ${data[0].currencies[Object.keys(data[0].currencies)].name} )</span></h3>
                <h3>Superficie: <span>${data[0].area}</span></h3>

                <h3>Indicatif Tel: <span>${data[0].idd.root}${data[0].idd.suffixes[0]}</span></h3>


                <h3>Langues parlées: <span>${Object.values(data[0].languages).toString().split(",").join(", ")}</span></h3>

                </div>



                `
                



            })
        }
    })
    
}
searchBtn.addEventListener("click", getUrl);