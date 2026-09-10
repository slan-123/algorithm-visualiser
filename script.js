const generateButton = document.getElementById("generate-button");
const arrayContainer = document.getElementById("array-container");
const sortButton = document.getElementById("sort-button");
console.log(sortButton);
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

function displayArray(comparing1 = -1, comparing2 = -1, sortedCount = 0) {
    arrayContainer.innerHTML = "";

    for (let i = 0; i < array.length; i++) {
        const bar = document.createElement("div");

        bar.style.height = array[i] * 3 + "px";

        if (i >= array.length - sortedCount) {
            bar.classList.add("sorted");
        } else if (i === comparing1 || i === comparing2) {
            bar.classList.add("comparing");
        }

        arrayContainer.appendChild(bar);
    }
}
async function bubbleSort() {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - 1; j++) {

            displayArray(j, j + 1);

            await new Promise(resolve => setTimeout(resolve, 50));

            if (array[j] > array[j + 1]) {
                const temporary = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temporary;

                displayArray();

                await new Promise(resolve => setTimeout(resolve, 50));
            }

        }
    }

    displayArray();
    console.log(array);
}
generateButton.addEventListener("click", generateArray);
sortButton.addEventListener("click", bubbleSort);
