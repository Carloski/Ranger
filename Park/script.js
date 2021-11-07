'use strict';

function formatQueryParams(params) {
    const queryItems = Object.keys(params).map(key => `${[encodeURIComponent(key)]}=${encodeURIComponent(params[key])}`);
    return queryItems.join('&');
}

function showParks(responseJson, maxResults) {
    console.log(responseJson);

    $('.error-message').empty();
    $('.results-list').empty();

    for (let i = 0; i < responseJson.data.length & i < maxResults; i++) {
        $('.results-list').append(`<li>
      <h3>${responseJson.data[i].fullName}</h3>
      <a href="${responseJson.data[i].url}" target="blank"><p>${responseJson.data[i].url}</p></a>
      <p>${responseJson.data[i].description}</p>
      <p>${responseJson.data[i].directionsInfo} <a href="${responseJson.data[i].directionsUrl}" target="blank">Click for Directions</a></p>
      
      </li><br><br>`);
    }
    $('#results').removeClass('hidden');
}

function getParks(baseUrl, stateArr, maxResults, apiKey) {

    const params = {
        stateCode: stateArr,
        limit: maxResults
    }

    const queryString = formatQueryParams(params);
    const url = baseUrl + '?' + queryString + '&api_key=' + apiKey;
    console.log(url);


    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => showParks(responseJson, maxResults))
        .catch(err => {
            $('.js-error').text(`Something went wrong: ${err.message}`);
        });
}


function watchForm() {
    $('.js-form').on('submit', function () {
        event.preventDefault();
        const baseUrl = 'https://developer.nps.gov/api/v1/parks'
        const stateArr = $('#js-state').val().split(",");
        const maxResults = $('#numResults').val();

        const apiKey = '1AX6CKlRzxx3D4RjipBxDmi6sN46rhmWBIif60IV'
        getParks(baseUrl, stateArr, maxResults, apiKey);
    })
}

$(watchForm);

// ----------------------------------------INSTRUCTION--------------------------------------------------

/* SAMPLE:
https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=1AX6CKlRzxx3D4RjipBxDmi6sN46rhmWBIif60IV */

// Review The National Parks Services API documentation and create an API key.


// Review the API Guide on Authentication for ways to pass your API key as part of the request.


// Review the /parks endpoint and data model to understand how it works.


// -------------------------------------DISPLAY
// The parks in the given state must be displayed on the page. Include at least:
// Full name (fullName)
// Description (description)
// Website URL (url)
// Directions URL (directionsUrl)

// The user must be able to make multiple searches and see only the results for the current search.

// -------------------------------------EXTRA CREDIT
// As a stretch goal, try adding the park's address to the results. (directionsInfo)

// -------------------------------------API DOCUMENTATION
// Each API request contains:
// Resource Endpoint
// Query String Parameters
// HTTP Request Header with an API Key

/* For example, consider the following URL:
https://developer.nps.gov/api/v1/alerts?parkCode=acad,dena

In the above request, two of the three necessary components are represented.
Resource Endpoint - https://developer.nps.gov/api/v1/alerts
Query String Parameters - parkCode=acad,dena
However, just pasting that URL in a browser address bar won't return any results as you also need to send your API key in the HTTP request header. In order to learn more about that, be sure to read the API Guides page about authentication. Also, test out queries and learn more about the API in the API Documentation section of this website.

Good luck with your programming project and thanks for using NPS data. */