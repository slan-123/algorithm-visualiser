const generateButton = document.getElementById("generate-button");
const arrayContainer = document.getElementById("array-container");

let array = [];

function generateArray() {
    array = [];

    for (let i = 0; i < 30; i++) {
        const value = Math.floor(Math.random() * 100) + 1;

        array.push(value);
    }

    displayArray();

    console.log(array);
}

function displayArray() {
    arrayContainer.innerHTML = "";

    for (let i = 0; i < array.length; i++) {
        const bar = document.createElement("div");

        bar.style.height = array[i] * 3 + "px";

        arrayContainer.appendChild(bar);
    }
}

generateButton.addEventListener("click", generateArray);
