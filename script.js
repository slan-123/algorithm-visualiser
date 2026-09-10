const generateButton = document.getElementById("generate-button");
const arrayContainer = document.getElementById("array-container");

function generateArray() {
    arrayContainer.innerHTML = "";

    const array = [];

    for (let i = 0; i < 30; i++) {
        const value = Math.floor(Math.random() * 100) + 1;

        array.push(value);
    }

    for (let i = 0; i < array.length; i++) {
        const bar = document.createElement("div");

        bar.style.height = array[i] * 3 + "px";

        arrayContainer.appendChild(bar);
    }

    console.log(array);
}

generateButton.addEventListener("click", generateArray);
