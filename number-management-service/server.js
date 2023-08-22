const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 8008;
const REQUEST_TIMEOUT = 300; // setting it to 300ms to ensure response is returned within 500ms

function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  const middleIndex = Math.floor(arr.length / 2);
  const leftHalf = arr.slice(0, middleIndex);
  const rightHalf = arr.slice(middleIndex);

  return merge(mergeSort(leftHalf), mergeSort(rightHalf));
}

function merge(left, right) {
  let result = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }

  while (leftIndex < left.length) {
    result.push(left[leftIndex]);
    leftIndex++;
  }

  while (rightIndex < right.length) {
    result.push(right[rightIndex]);
    rightIndex++;
  }

  return result;
}

app.get("/numbers", async (req, res) => {
  const { url: urls } = req.query;
  if (!urls || urls.length === 0) {
    return res.send(`{"numbers":[]}`);
  }

  const promises = urls.map((url) => fetchNumbers(url));
  const results = await Promise.allSettled(promises);

  let allNumbers = [];
  for (let result of results) {
    if (result.status === "fulfilled" && result.value) {
      allNumbers = allNumbers.concat(result.value);
    }
  }

  // Dedupe
  const uniqueNumbers = [...new Set(allNumbers)];

  // Sort using mergeSort
  const sortedNumbers = mergeSort(uniqueNumbers);

  res.send(`{"numbers":[${sortedNumbers.join(",")}]}`);
});

async function fetchNumbers(url) {
  try {
    const response = await axios.get(url, {
      timeout: REQUEST_TIMEOUT,
    });

    if (response.data && response.data.numbers) {
      return response.data.numbers;
    }
  } catch (error) {
    console.error(error);
  }
  return [];
}

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
