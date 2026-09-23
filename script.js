const generateButton = document.getElementById("generate-button");
const arrayContainer = document.getElementById("array-container");
const sortButton = document.getElementById("sort-button");
const speedSlider = document.getElementById("speed-slider");
const comparisonCount = document.getElementById("comparison-count");
const swapCount = document.getElementById("swap-count");
const timeCount = document.getElementById("time-count");
const sizeSlider = document.getElementById("size-slider");
const sizeValue = document.getElementById("size-value");
const speedValue = document.getElementById("speed-value");
const algorithmSelect = document.getElementById("algorithm-select");
const statusMessage = document.getElementById("status-message");
console.log(sortButton);
let array = [];

function generateArray() {
    array = [];
    comparisonCount.textContent = 0;
    swapCount.textContent = 0;
    timeCount.textContent = "0.00s";
    statusMessage.classList.remove("show");

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

function displayArray(
    comparing1 = -1,
    comparing2 = -1,
    sortedCount = 0,
    pivotIndex = -1,
    minimumIndex = -1,
    mergeStart = -1,
    mergeMiddle = -1,
    mergeEnd = -1,
    bucketPositions = [],
    radixCurrent = -1
) {
    arrayContainer.innerHTML = "";

    for (let i = 0; i < array.length; i++) {
        const bar = document.createElement("div");

        bar.style.height = array[i] * 3 + "px";

        if (bucketPositions[i] !== undefined) {
            bar.style.transform =
                `translate(${bucketPositions[i].x}px, ${bucketPositions[i].y}px)`;
        }

        if (i === radixCurrent) {
            bar.classList.add("radix-current");
        } else if (i >= array.length - sortedCount) {
            bar.classList.add("sorted");
        } else if (i === pivotIndex) {
            bar.classList.add("pivot");
        } else if (i === minimumIndex) {
            bar.classList.add("minimum");
        } else if (
            mergeStart !== -1 &&
            i >= mergeStart &&
            i <= mergeMiddle
        ) {
            bar.classList.add("merge-left");
        } else if (
            mergeMiddle !== -1 &&
            i > mergeMiddle &&
            i <= mergeEnd
        ) {
            bar.classList.add("merge-right");
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
            displayArray(j, -1, i, -1, minimumIndex);

            await new Promise(resolve =>
                setTimeout(resolve, 210 - Number(speedSlider.value))
            );

            comparisonCount.textContent++;

            if (array[j] < array[minimumIndex]) {
                minimumIndex = j;

                displayArray(j, -1, i, -1, minimumIndex);

                await new Promise(resolve =>
                    setTimeout(resolve, 210 - Number(speedSlider.value))
                );
            }
        }

        if (minimumIndex !== i) {
            const temporary = array[i];
            array[i] = array[minimumIndex];
            array[minimumIndex] = temporary;

            swapCount.textContent++;

            displayArray(i, minimumIndex, i);

            await new Promise(resolve =>
                setTimeout(resolve, 210 - Number(speedSlider.value))
            );
        }
    }

    displayArray(-1, -1, array.length);
    console.log(array);
}
async function insertionSort() {
    for (let i = 1; i < array.length; i++) {
        const currentValue = array[i];
        let j = i - 1;

        displayArray(-1, -1, 0, -1, i);

        await new Promise(resolve =>
            setTimeout(resolve, 210 - Number(speedSlider.value))
        );

        while (j >= 0 && array[j] > currentValue) {
            displayArray(j, -1, 0, -1, i);

            await new Promise(resolve =>
                setTimeout(resolve, 210 - Number(speedSlider.value))
            );

            comparisonCount.textContent++;

            array[j + 1] = array[j];
            j--;

            swapCount.textContent++;

            displayArray(j + 1, -1, 0, -1, i);

            await new Promise(resolve =>
                setTimeout(resolve, 210 - Number(speedSlider.value))
            );
        }

        if (j >= 0) {
            comparisonCount.textContent++;
        }

        array[j + 1] = currentValue;

        displayArray(-1, -1, i + 1);

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
        displayArray(
            start + leftIndex,
            middle + 1 + rightIndex,
            0,
            -1,
            -1,
            start,
            middle,
            end
        );

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

        displayArray(
            -1,
            -1,
            0,
            -1,
            -1,
            start,
            middle,
            end
        );

        await new Promise(resolve =>
            setTimeout(resolve, 210 - Number(speedSlider.value))
        );
    }

    while (leftIndex < left.length) {
        array[arrayIndex] = left[leftIndex];

        leftIndex++;
        arrayIndex++;

        displayArray(
            -1,
            -1,
            0,
            -1,
            -1,
            start,
            middle,
            end
        );

        await new Promise(resolve =>
            setTimeout(resolve, 210 - Number(speedSlider.value))
        );
    }

    while (rightIndex < right.length) {
        array[arrayIndex] = right[rightIndex];

        rightIndex++;
        arrayIndex++;

        displayArray(
            -1,
            -1,
            0,
            -1,
            -1,
            start,
            middle,
            end
        );

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
        displayArray(i, -1, 0, end);

        await new Promise(resolve =>
            setTimeout(resolve, 210 - Number(speedSlider.value))
        );

        comparisonCount.textContent++;

        if (array[i] < pivot) {
            const temporary = array[smallerIndex];
            array[smallerIndex] = array[i];
            array[i] = temporary;

            swapCount.textContent++;

            displayArray(smallerIndex, i, 0, end);

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

    displayArray(smallerIndex, -1, 0, smallerIndex);

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
function displayBuckets(buckets, activeBucket = -1) {
    const bucketContainer = document.getElementById("bucket-container");
    bucketContainer.innerHTML = "";

    for (let i = 0; i < buckets.length; i++) {
        const bucket = document.createElement("div");
        bucket.classList.add("bucket");

        if (i === activeBucket) {
            bucket.classList.add("active");
        }

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
function displayRadixBucketPositions(buckets, activeBucket = -1) {
    const bucketPositions = {};

    const bucketSpacing = 38;
    const bucketStartY = 40;

    for (let bucket = 0; bucket < buckets.length; bucket++) {
        for (let i = 0; i < buckets[bucket].length; i++) {
            const value = buckets[bucket][i];

            const arrayIndex = array.indexOf(value);

            if (arrayIndex !== -1) {
                bucketPositions[arrayIndex] = {
                    x: (bucket - 4.5) * 45,
                    y: bucketStartY + bucket * bucketSpacing
                };
            }
        }
    }

    displayArray(
        -1,
        -1,
        0,
        -1,
        -1,
        -1,
        -1,
        -1,
        bucketPositions
    );
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
async function animateRadixRearrangement(buckets) {
    const newArray = collectBuckets(buckets);

    const oldArray = [...array];

    for (let i = 0; i < newArray.length; i++) {
        const currentIndex = oldArray.indexOf(newArray[i]);

        if (currentIndex !== i) {
            const bars = Array.from(arrayContainer.children);

            const oldPositions = bars.map(bar =>
                bar.getBoundingClientRect()
            );

            const temporary = oldArray[i];
            oldArray[i] = oldArray[currentIndex];
            oldArray[currentIndex] = temporary;

            array = [...oldArray];

            displayArray();

            const newBars = Array.from(arrayContainer.children);

            newBars.forEach((bar, index) => {
                const oldPosition = oldPositions[index];
                const newPosition = bar.getBoundingClientRect();

                const deltaX = oldPosition.left - newPosition.left;

                bar.style.transition = "none";
                bar.style.transform = `translateX(${deltaX}px)`;
            });

            arrayContainer.offsetHeight;

            newBars.forEach(bar => {
                bar.style.transition =
                    "height 0.12s ease, background-color 0.12s ease, transform 0.35s ease";

                bar.style.transform = "translateX(0)";
            });

            await new Promise(resolve =>
                setTimeout(resolve, 210 - Number(speedSlider.value))
            );
        }
    }

    array = newArray;
    displayArray();
}
async function animateRadixScanner(index) {
    displayArray(
        -1,
        -1,
        0,
        -1,
        -1,
        -1,
        -1,
        -1,
        [],
        index
    );

    await new Promise(resolve =>
        setTimeout(resolve, 210 - Number(speedSlider.value))
    );
}
async function radixSort() {
    const maxValue = Math.max(...array);
    const maxDigits = String(maxValue).length;

    for (let place = 0; place < maxDigits; place++) {
        const buckets = createBuckets();

        for (let i = 0; i < array.length; i++) {
            await animateRadixScanner(i);

            const digit = getDigit(array[i], place);

            buckets[digit].push(array[i]);

            displayBuckets(buckets, digit);

            await new Promise(resolve =>
                setTimeout(resolve, 210 - Number(speedSlider.value))
            );
        }

Array.from(arrayContainer.children).forEach(bar => {
    bar.classList.remove("radix-current");
});

        displayBuckets(buckets);

        await new Promise(resolve =>
            setTimeout(resolve, 210 - Number(speedSlider.value)
        ));

        await animateRadixRearrangement(buckets);
    }

    displayBuckets([]);

    displayArray(-1, -1, array.length);

    console.log(array);
}
function showSortedMessage() {
    statusMessage.textContent = "✓ Sorted!";
    statusMessage.classList.add("show");
}
function setSortingState(isSorting) {
    sortButton.disabled = isSorting;
    generateButton.disabled = isSorting;
    algorithmSelect.disabled = isSorting;
    sizeSlider.disabled = isSorting;
    speedSlider.disabled = isSorting;
}
sortButton.addEventListener("click", async () => {

    if (sortButton.disabled) {
        return;
    }

    setSortingState(true);

    const startTime = performance.now();

    const timer = setInterval(() => {
        const currentTime = performance.now();
        const elapsedTime = (currentTime - startTime) / 1000;

        timeCount.textContent = elapsedTime.toFixed(2) + "s";
    }, 10);

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

    clearInterval(timer);

    const endTime = performance.now();
    const elapsedTime = (endTime - startTime) / 1000;

    timeCount.textContent = elapsedTime.toFixed(2) + "s";

    setSortingState(false);
    showSortedMessage();

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
const bestComplexity = document.getElementById("best-complexity");
const averageComplexity = document.getElementById("average-complexity");
const worstComplexity = document.getElementById("worst-complexity");

algorithmSelect.addEventListener("change", () => {

    if (algorithmSelect.value === "bubble") {
        algorithmTitle.textContent = "Bubble Sort";
        algorithmDescription.textContent =
            "Bubble Sort repeatedly compares neighbouring values and swaps them when they are in the wrong order.";

        bestComplexity.textContent = "O(n)";
        averageComplexity.textContent = "O(n²)";
        worstComplexity.textContent = "O(n²)";

    } else if (algorithmSelect.value === "selection") {
        algorithmTitle.textContent = "Selection Sort";
        algorithmDescription.textContent =
            "Selection Sort repeatedly finds the smallest value and moves it into its correct position.";

        bestComplexity.textContent = "O(n²)";
        averageComplexity.textContent = "O(n²)";
        worstComplexity.textContent = "O(n²)";

    } else if (algorithmSelect.value === "insertion") {
        algorithmTitle.textContent = "Insertion Sort";
        algorithmDescription.textContent =
            "Insertion Sort builds the sorted section one value at a time by inserting each value into its correct position.";

        bestComplexity.textContent = "O(n)";
        averageComplexity.textContent = "O(n²)";
        worstComplexity.textContent = "O(n²)";

    } else if (algorithmSelect.value === "merge") {
        algorithmTitle.textContent = "Merge Sort";
        algorithmDescription.textContent =
            "Merge Sort splits the array into smaller sections, sorts them, and then merges those sections together.";

        bestComplexity.textContent = "O(n log n)";
        averageComplexity.textContent = "O(n log n)";
        worstComplexity.textContent = "O(n log n)";

    } else if (algorithmSelect.value === "quick") {
        algorithmTitle.textContent = "Quick Sort";
        algorithmDescription.textContent =
            "Quick Sort chooses a pivot and rearranges the array so smaller values go before it and larger values go after it.";

        bestComplexity.textContent = "O(n log n)";
        averageComplexity.textContent = "O(n log n)";
        worstComplexity.textContent = "O(n²)";

    } else if (algorithmSelect.value === "radix") {
        algorithmTitle.textContent = "Radix Sort";
        algorithmDescription.textContent =
            "Radix Sort sorts numbers by processing their digits and placing values into buckets based on each digit.";

        bestComplexity.textContent = "O(nk)";
        averageComplexity.textContent = "O(nk)";
        worstComplexity.textContent = "O(nk)";
    }

});
