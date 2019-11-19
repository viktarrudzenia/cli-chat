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

    // Track what in input and append in result
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
                if (resultLength > 50) {
                    window.removeEventListener("scroll", checkScroll);
                    let start = 0;
                    let counter = 50;
                    let listOfResult = "";
                    let currentScroll = window.scrollY;

                    function checkScroll() {
                        if (window.scrollY - currentScroll > 700) {
                            start += 50;
                            counter += 50;
                            currentScroll += 1300;
                            for (let i = start; i < counter && i < resultLength; i++) {
                                listOfResult += `<li>${result[i]}</li>\n`;
                            }
                            clearDivWithResult("all");
                            newDiv.innerHTML = `Autocomplete found ${resultLength} element/s <ol>${listOfResult}</ol>`;
                            divWithResult.appendChild(newDiv);
                        }
                    }

                    for (let i = start; i < counter; i++) {
                        listOfResult += `<li>${result[i]}</li>\n`;
                    }
                    newDiv.innerHTML = `Autocomplete found ${resultLength} element/s <ol>${listOfResult}</ol>`;
                    divWithResult.appendChild(newDiv);

                    // infinite scroll
                    window.addEventListener("scroll", checkScroll);
                } else {
                    let listOfResult = result.map(element => `<li>${element}</li>\n`).join("");
                    newDiv.innerHTML = `Autocomplete found ${resultLength} element/s <ol>${listOfResult}</ol>`;
                    divWithResult.appendChild(newDiv);
                }
            }
        } catch (error) {
            clearDivWithResult("not matches");
        }
    };
}
