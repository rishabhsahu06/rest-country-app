let imgFlag = document.querySelector(".img-flag");
let countryNameHeading = document.querySelector(".countryName");
let population = document.querySelector(".population");
let nativeName = document.querySelector(".native-name");
let region = document.querySelector(".region");
let subRegion = document.querySelector(".sub-region");
let capital = document.querySelector(".capital");
let topLevelDomian = document.querySelector(".top-level-domain");
let languages = document.querySelector(".languages");
let currencies = document.querySelector(".currencies");
let borderCountriesBoundary = document.querySelector(".border-countries")
// console.log(imgFlag)
let countryName = new URLSearchParams(location.search).get("name");
console.log(countryName);
fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true
`)
  .then((res) => res.json())
  .then(([country]) => {
    console.log(Object.values(country.name.nativeName)[0].common);
    imgFlag.src = country.flags.svg;
    countryNameHeading.innerText = country.name.common;
    if (country.name.nativeName) {
      nativeName.innerText = Object.values(country.name.nativeName)[0].common;
    } else {
      nativeName.innerText = country.name.common;
    }
    if (country.currencies) {
      currencies.innerText = Object.values(country.currencies).map(
        (curr) => curr.name).join(", ");
    }
    if(country.languages){
        languages.innerText = Object.values(country.languages).join(", ")
    }
    if(country.subregion){
        subRegion.innerText = country.subregion;
    }

    if(country.capital){
        capital.innerText = country.capital?.[0];
    }
    if(country.borders){
        country.borders.map((br)=>{
               console.log(br)
               fetch (`https://restcountries.com/v3.1/alpha/${br}`).then((resp)=>resp.json())
            .then(([data])=>{
                console.log(data)
                let borderCountry = document.createElement("a")
                borderCountry.innerText = data.name.common
                // console.log(borderCountry)
                borderCountry.href = `country.html?name=${data.name.common}`
                borderCountriesBoundary.append(borderCountry)


            })
                
            
        })
    }

    population.innerText = country.population.toLocaleString("en-IN");
    region.innerText = country.region;
   
    capital.innerText = country.capital?.[0];
    topLevelDomian.innerText = country.tld.join(", ");

  });
