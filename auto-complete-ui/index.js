import createAutoComplete from "../auto-complete/main.js";
import { cities } from "./cities.js";

let prefixTree = createAutoComplete(cities);

document.body.onload = addAllElements;

function addAllElements() {
    let input = document.createElement("input");
    let divWithHello = document.createElement("div");
    let divWithResult = document.createElement("div");

    input.id = "input";
    input.placeholder = "Type here";
    divWithHello.id = "divWithHello";
    divWithResult.id = "divWithResult";

    let clearDivWithResult = clear => {
        if (clear === "not matches") {
            divWithResult.innerHTML = "No matches. Try find something else";
        } else if (clear === "all") {
            divWithResult.innerHTML = "";
        } else if (clear === "init") {
            divWithResult.innerHTML = "Result will be here";
        } else {
            console.log("SomeError from clearDivWithResult");
        }
    };

    divWithHello.innerHTML =
        "<h1>Hello Stranger! Try find city of your dream here :) Exact string</h1>";
    divWithResult.innerHTML = "Result will be here";

    document.body.appendChild(divWithHello);
    document.body.appendChild(input);
    document.body.appendChild(divWithResult);

    // Track what in input
    input.oninput = function() {
        try {
            if (input.value === "") {
                clearDivWithResult("init");
                return;
            } else {
                clearDivWithResult("all");
                let newDiv = document.createElement("div");
                let result = prefixTree(input.value);
                let resultLength = result.length;
                let listOfResult = result.map(element => `<li>${element}</li>\n`).join("");
                newDiv.innerHTML = `Autocomplete found ${resultLength} element/s <ol>${listOfResult}</ol>`;
                divWithResult.appendChild(newDiv);
            }
        } catch (error) {
            clearDivWithResult("not matches");
        }
    };
}
