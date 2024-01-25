function lucasSequence(n) {
  if (n === 0) return 2;
  if (n === 1) return 1;

  let a = 2;
  let b = 1;
  let result;

  for (let i = 2; i <= n; i++) {
    result = a + b;
    a = b;
    b = result;
  }

  return result;
}

// Listen for messages from the main thread
onmessage = function (event) {
  const index = event.data.index;
  const result = lucasSequence(index);

  // Send the result back to the main thread
  postMessage({ index, result });
};
