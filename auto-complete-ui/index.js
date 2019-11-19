import createAutoComplete from "../auto-complete/main.js";

console.log(createAutoComplete);

// with function
// async function getCitiesJSON() {
//     try {
//         const cities = await fetch(
//             "https://raw.githubusercontent.com/Shastel/autocomplete-tests/master/cities.json"
//         );
//         if (cities.ok) {
//             const citiesJSON = await cities.json();
//             console.log(citiesJSON);
//         }
//     } catch (error) {
//         console.log(error);
//     }
// }
// getCitiesJSON();

// without function
const cities = fetch(
    "https://raw.githubusercontent.com/Shastel/autocomplete-tests/master/cities.json"
)
    .then(cities => cities.json())
    .then(cities => console.log(cities));
