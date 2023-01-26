async function getData() {
  let response = await fetch("https://jsonplaceholder.typicode.com/comments");
  let jsonResponse = await rawResponse.json();
  console.log(jsonResponse);
}

getData();
