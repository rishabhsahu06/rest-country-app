let countriesContainer = document.querySelector(".countries-container");
let filter = document.querySelector(".filter");
let searchInput = document.querySelector(".input");
let allCountriesData;

fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data) => {
    countriesLoad(data);
    allCountriesData = data;
  });

filter.addEventListener("change", (e) => {
  // console.log(e.target.value)
  fetch(`https://restcountries.com/v3.1/${filter.value}`)
    .then((res) => res.json())
    .then((data) => {
      data.forEach((country) => {
        // console.log(country);
        let countryCard = document.createElement("a");
        countryCard.classList.add("country-card");
        //   console.log(countryCard)
        countryCard.href = `/country.html?name=${country.name.common}`;

        let cardHTML = `
        <img src="${country.flags.svg}" alt="">
        <div class="card-content">
         <h3>${country.name.common}</h3>
         <p><b>Population:-</b>${country.population.toLocaleString("en-IN")}</p>
         <p><b>Region:-</b>${country.region}</p>
         <p><b>Capital:-</b>${country.capital?.[0]}</p>
        </div>`;

        countryCard.innerHTML = cardHTML;
        countriesContainer.append(countryCard);

        filter.addEventListener("change", (e) => {
          // console.log(e.target.value);
        });
      });
    });
});

function countriesLoad(data) {
  countriesContainer.innerHTML = "";
  data.forEach((country) => {
    console.log(country);
    let countryCard = document.createElement("a");
    countryCard.classList.add("country-card");
    //   console.log(countryCard)
    countryCard.href = `/country.html?name=${country.name.common}`;

    let cardHTML = `
        <img src="${country.flags.svg}" alt="">
        <div class="card-content">
         <h3>${country.name.common}</h3>
         <p><b>Population:-</b>${country.population.toLocaleString("en-IN")}</p>
         <p><b>Region:-</b>${country.region}</p>
         <p><b>Capital:-</b>${country.capital?.[0]}</p>
        </div>`;

    countryCard.innerHTML = cardHTML;
    countriesContainer.append(countryCard);

    filter.addEventListener("change", (e) => {
      console.log(e.target.value);
    });
  });
}

searchInput.addEventListener("input", (e) => {
  // console.log(e.target.value)
  // console.log(allCountriesData)
  let filteredCountry = allCountriesData.filter((country) =>
    country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
  );
  // console.log(filteredCountry)
  countriesLoad(filteredCountry);
});
