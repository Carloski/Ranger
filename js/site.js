let btnSubmit = document.getElementById("show-btn").addEventListener("click", getValues);
let btnClear = document.getElementById("clear-btn").addEventListener("click", clearForm);
let myForm = document.getElementById("myForm");
let baseUrl = "developer.nps.gov/api/v1/parks?stateCode=";
let state = document.getElementById("state").val;
let limit = document.getElementbyId("numResults").val;
let key = "1AX6CKlRzxx3D4RjipBxDmi6sN46rhmWBIif60IV";

//curl -X GET "https://developer.nps.gov/api/v1/parks?stateCode=CA&limit=10&api_key=1AX6CKlRzxx3D4RjipBxDmi6sN46rhmWBIif60IV" -H  "accept: application/json"

function clearForm() {
    myForm.reset();
}

function getValues() {
    fetch(`${baseUrl}${state}&limit=${limit}&api_key=${key}`)
        .then(response => response.json())
        .then(data => console.log(data));
}

// function showResults() {
//     alert("Hello There");
// }
