const generateButton = document.getElementById("generate-button");
const arrayContainer = document.getElementById("array-container");
const sortButton = document.getElementById("sort-button");
const speedSlider = document.getElementById("speed-slider");
const comparisonCount = document.getElementById("comparison-count");
const swapCount = document.getElementById("swap-count");
const sizeSlider = document.getElementById("size-slider");
const sizeValue = document.getElementById("size-value");
const speedValue = document.getElementById("speed-value");
console.log(sortButton);
let array = [];

function generateArray() {
    array = [];
    const comparisonCount = document.getElementById("comparison-count");
    const swapCount = document.getElementById("swap-count");

    for (let i = 0; i < Number(sizeSlider.value); i++) {
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

        let swapped = false;

        for (let j = 0; j < array.length - 1 - i; j++) {

            displayArray(j, j + 1, i);

            const delay = 210 - Number(speedSlider.value);

            await new Promise(resolve => setTimeout(resolve, delay));

            comparisonCount.textContent++;

            if (array[j] > array[j + 1]) {
                const temporary = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temporary;

                swapCount.textContent++;

                swapped = true;

                displayArray(j, j + 1, i);

                const delay = 210 - Number(speedSlider.value);

                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }

        if (!swapped) {
            break;
        }
    }

    displayArray(-1, -1, array.length);

    console.log(array);
}
generateButton.addEventListener("click", generateArray);
sortButton.addEventListener("click", bubbleSort);

speedSlider.addEventListener("input", () => {
    const delay = 210 - Number(speedSlider.value);
    speedValue.textContent = delay;
});

