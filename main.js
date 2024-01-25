//Fun Activity of the day: the Lucas Sequence!

//Create a web new worker to handle the lucas calculations in generate.js

const lucasWorker = new Worker("generate.js");

//Button click, event listener

document
  .getElementById("calculateButton")
  .addEventListener("click", function () {
    //get the user's input for the index they want to use for worker's calculation

    const indexToCalculate = document.getElementById("indexInput").value;
    lucasWorker.postMessage({ index: parseInt(indexToCalculate) });
  });

//listen for the worker's message
lucasWorker.onmessage = function (event) {
  //display results on UI so user can see it

  const resultContainer = document.getElementById("result-container");
  resultContainer.innerHTML = `Lucas sequence at index ${event.data.index}: ${event.data.result}`;

  // console.log(
  //   `Lucas sequence at index ${event.data.index}: ${event.data.result}`
  // );
};
