const generateButton = document.getElementById("generate-button");
const arrayContainer = document.getElementById("array-container");

function generateArray() {
    arrayContainer.innerHTML = "";

    for (let i = 0; i < 30; i++) {
        const value = Math.floor(Math.random() * 100) + 1;

        const bar = document.createElement("div");

        bar.style.height = value * 3 + "px";
        bar.style.width = "10px";
        bar.style.backgroundColor = "blue";

        arrayContainer.appendChild(bar);
    }
}

generateButton.addEventListener("click", generateArray);
