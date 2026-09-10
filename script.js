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
    comparisonCount.textContent = 0;
    swapCount.textContent = 0;

    const numbers = [];

    for (let i = 1; i <= Number(sizeSlider.value); i++) {
        numbers.push(i);
    }
    
    for (let i = numbers.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
    
        const temporary = numbers[i];
        numbers[i] = numbers[randomIndex];
        numbers[randomIndex] = temporary;
    }
    
    array = numbers;

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
async function quickSort(start = 0, end = array.length - 1) {
    if (start >= end) {
        return;
    }

    const pivotIndex = await partition(start, end);

    await quickSort(start, pivotIndex - 1);
    await quickSort(pivotIndex + 1, end);

    if (start === 0 && end === array.length - 1) {
        displayArray(-1, -1, array.length);
    }
}
async function partition(start, end) {
    const pivot = array[end];

    let smallerIndex = start;

    for (let i = start; i < end; i++) {

        displayArray(i, end);

        await new Promise(resolve =>
            setTimeout(resolve, 210 - Number(speedSlider.value))
        );

        comparisonCount.textContent++;

        if (array[i] < pivot) {

            const temporary = array[smallerIndex];
            array[smallerIndex] = array[i];
            array[i] = temporary;

            swapCount.textContent++;

            displayArray(smallerIndex, i);

            await new Promise(resolve =>
                setTimeout(resolve, 210 - Number(speedSlider.value))
            );

            smallerIndex++;
        }
    }

    const temporary = array[smallerIndex];
    array[smallerIndex] = array[end];
    array[end] = temporary;

    swapCount.textContent++;

    displayArray(smallerIndex, end);

    await new Promise(resolve =>
        setTimeout(resolve, 210 - Number(speedSlider.value))
    );

    return smallerIndex;
}
function getDigit(number, place) {
    return Math.floor(number / Math.pow(10, place)) % 10;
}
function createBuckets() {
    const buckets = [];

    for (let i = 0; i < 10; i++) {
        buckets.push([]);
    }

    return buckets;
}
function displayBuckets(buckets) {
    const bucketContainer = document.getElementById("bucket-container");

    bucketContainer.innerHTML = "";

    for (let i = 0; i < buckets.length; i++) {
        const bucket = document.createElement("div");
        bucket.classList.add("bucket");

        const bucketLabel = document.createElement("div");
        bucketLabel.classList.add("bucket-label");
        bucketLabel.textContent = i;

        const bucketNumbers = document.createElement("div");
        bucketNumbers.classList.add("bucket-numbers");

        for (let j = 0; j < buckets[i].length; j++) {
            const number = document.createElement("div");
            number.classList.add("bucket-number");
            number.textContent = buckets[i][j];

            bucketNumbers.appendChild(number);
        }

        bucket.appendChild(bucketLabel);
        bucket.appendChild(bucketNumbers);

        bucketContainer.appendChild(bucket);
    }
}
function distributeIntoBuckets(numbers, place) {
    const buckets = createBuckets();

    for (let i = 0; i < numbers.length; i++) {
        const digit = getDigit(numbers[i], place);

        buckets[digit].push(numbers[i]);
    }

    return buckets;
}
function collectBuckets(buckets) {
    const result = [];

    for (let i = 0; i < buckets.length; i++) {
        for (let j = 0; j < buckets[i].length; j++) {
            result.push(buckets[i][j]);
        }
    }

    return result;
}
async function radixSort() {
    const maxValue = Math.max(...array);
    const maxDigits = String(maxValue).length;

    for (let place = 0; place < maxDigits; place++) {

        const buckets = distributeIntoBuckets(array, place);

        displayBuckets(buckets);
        
        await new Promise(resolve =>
            setTimeout(resolve, 210 - Number(speedSlider.value))
        );
        
        array = collectBuckets(buckets);    

        displayArray();

        await new Promise(resolve =>
            setTimeout(resolve, 210 - Number(speedSlider.value))
        );
    }

    displayArray(-1, -1, array.length);

    console.log(array);
}
function setSortingState(isSorting) {
    sortButton.disabled = isSorting;
}
sortButton.addEventListener("click", async () => {
    if (sortButton.disabled) {
        return;
    }

    sortButton.disabled = true;

    if (algorithmSelect.value === "bubble") {
        await bubbleSort();
    } else if (algorithmSelect.value === "selection") {
        await selectionSort();
    } else if (algorithmSelect.value === "insertion") {
        await insertionSort();
    } else if (algorithmSelect.value === "merge") {
        await mergeSort();
    } else if (algorithmSelect.value === "quick") {
        await quickSort();
    } else if (algorithmSelect.value === "radix") {
        await radixSort();
    }

    sortButton.disabled = false;
});
sizeSlider.addEventListener("input", () => {
    sizeValue.textContent = sizeSlider.value;
});

speedSlider.addEventListener("input", () => {
    const delay = 210 - Number(speedSlider.value);
    speedValue.textContent = delay;
});
generateButton.addEventListener("click", generateArray);
generateArray();
const algorithmTitle = document.getElementById("algorithm-title");
const algorithmDescription = document.getElementById("algorithm-description");
const algorithmComplexity = document.getElementById("algorithm-complexity");

algorithmSelect.addEventListener("change", () => {
    if (algorithmSelect.value === "bubble") {
        algorithmTitle.textContent = "Bubble Sort";
        algorithmDescription.textContent =
            "Bubble Sort repeatedly compares neighbouring values and swaps them when they are in the wrong order.";
        algorithmComplexity.textContent = "O(n²)";
    } else if (algorithmSelect.value === "selection") {
        algorithmTitle.textContent = "Selection Sort";
        algorithmDescription.textContent =
            "Selection Sort repeatedly finds the smallest value and moves it into its correct position.";
        algorithmComplexity.textContent = "O(n²)";
    } else if (algorithmSelect.value === "insertion") {
        algorithmTitle.textContent = "Insertion Sort";
        algorithmDescription.textContent =
            "Insertion Sort builds the sorted section one value at a time by inserting each value into its correct position.";
        algorithmComplexity.textContent = "O(n²)";
    } else if (algorithmSelect.value === "merge") {
        algorithmTitle.textContent = "Merge Sort";
        algorithmDescription.textContent =
            "Merge Sort splits the array into smaller sections, sorts them, and then merges those sections together.";
        algorithmComplexity.textContent = "O(n log n)";
    } else if (algorithmSelect.value === "quick") {
        algorithmTitle.textContent = "Quick Sort";
        algorithmDescription.textContent =
            "Quick Sort chooses a pivot and rearranges the array so smaller values go before it and larger values go after it.";
        algorithmComplexity.textContent = "O(n log n)";
    } else if (algorithmSelect.value === "radix") {
        algorithmTitle.textContent = "Radix Sort";
        algorithmDescription.textContent =
            "Radix Sort sorts numbers by processing their digits, placing values into buckets based on each digit.";
        algorithmComplexity.textContent = "O(nk)";
    }
});
