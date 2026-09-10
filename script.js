const generateButton = document.getElementById("generate-button");
const arrayContainer = document.getElementById("array-container");
const sortButton = document.getElementById("sort-button");
const speedSlider = document.getElementById("speed-slider");
const comparisonCount = document.getElementById("comparison-count");
const swapCount = document.getElementById("swap-count");
const sizeSlider = document.getElementById("size-slider");
const sizeValue = document.getElementById("size-value");
const speedValue = document.getElementById("speed-value");
const algorithmSelect = document.getElementById("algorithm-select");
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
async function selectionSort() {
    for (let i = 0; i < array.length - 1; i++) {

        let minimumIndex = i;

        for (let j = i + 1; j < array.length; j++) {

            displayArray(j, minimumIndex, i);

            await new Promise(resolve => setTimeout(resolve, 210 - Number(speedSlider.value)));

            comparisonCount.textContent++;

            if (array[j] < array[minimumIndex]) {
                minimumIndex = j;
            }
        }

        if (minimumIndex !== i) {
            const temporary = array[i];
            array[i] = array[minimumIndex];
            array[minimumIndex] = temporary;

            swapCount.textContent++;

            displayArray(i, minimumIndex, i);

            await new Promise(resolve => setTimeout(resolve, 210 - Number(speedSlider.value)));
        }
    }

    displayArray(-1, -1, array.length);

    console.log(array);
}
async function insertionSort() {
    for (let i = 1; i < array.length; i++) {

        const currentValue = array[i];
        let j = i - 1;

        while (j >= 0 && array[j] > currentValue) {

            displayArray(j, j + 1, i);

            await new Promise(resolve =>
                setTimeout(resolve, 210 - Number(speedSlider.value))
            );

            comparisonCount.textContent++;

            array[j + 1] = array[j];

            j--;

            swapCount.textContent++;

            displayArray(j + 1, j + 2, i);

            await new Promise(resolve =>
                setTimeout(resolve, 210 - Number(speedSlider.value))
            );
        }

        array[j + 1] = currentValue;

        displayArray(-1, -1, i);

        await new Promise(resolve =>
            setTimeout(resolve, 210 - Number(speedSlider.value))
        );
    }

    displayArray(-1, -1, array.length);

    console.log(array);
}
async function mergeSort(start = 0, end = array.length - 1) {
    if (start >= end) {
        return;
    }

    const middle = Math.floor((start + end) / 2);

    await mergeSort(start, middle);
    await mergeSort(middle + 1, end);

    await merge(start, middle, end);

    if (start === 0 && end === array.length - 1) {
        displayArray(-1, -1, array.length);
    }
}
async function merge(start, middle, end) {
    const left = array.slice(start, middle + 1);
    const right = array.slice(middle + 1, end + 1);

    let leftIndex = 0;
    let rightIndex = 0;
    let arrayIndex = start;

    while (leftIndex < left.length && rightIndex < right.length) {

        displayArray(start + leftIndex, middle + 1 + rightIndex);

        await new Promise(resolve =>
            setTimeout(resolve, 210 - Number(speedSlider.value))
        );

        comparisonCount.textContent++;

        if (left[leftIndex] <= right[rightIndex]) {
            array[arrayIndex] = left[leftIndex];
            leftIndex++;
        } else {
            array[arrayIndex] = right[rightIndex];
            rightIndex++;
        }

        arrayIndex++;

        displayArray(start, end);

        await new Promise(resolve =>
            setTimeout(resolve, 210 - Number(speedSlider.value))
        );
    }

    while (leftIndex < left.length) {
        array[arrayIndex] = left[leftIndex];
        leftIndex++;
        arrayIndex++;

        displayArray(start, end);

        await new Promise(resolve =>
            setTimeout(resolve, 210 - Number(speedSlider.value))
        );
    }

    while (rightIndex < right.length) {
        array[arrayIndex] = right[rightIndex];
        rightIndex++;
        arrayIndex++;

        displayArray(start, end);

        await new Promise(resolve =>
            setTimeout(resolve, 210 - Number(speedSlider.value))
        );
    }
}
sortButton.addEventListener("click", () => {
    if (algorithmSelect.value === "bubble") {
        bubbleSort();
    } else if (algorithmSelect.value === "selection") {
        selectionSort();
    } else if (algorithmSelect.value === "insertion") {
        insertionSort();
    } else if (algorithmSelect.value === "merge") {
        mergeSort();
    }
});
sizeSlider.addEventListener("input", () => {
    sizeValue.textContent = sizeSlider.value;
});

speedSlider.addEventListener("input", () => {
    const delay = 210 - Number(speedSlider.value);
    speedValue.textContent = delay;
});
generateButton.addEventListener("click", generateArray);
