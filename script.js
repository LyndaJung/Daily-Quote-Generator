// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Get references to DOM elements
  const quoteText = document.querySelector(".quote");
  const quoteAuthor = document.querySelector(".author");
  const quoteBtn = document.querySelector(".btn");

  // Function to fetch quote from the API
  function fetchQuote() {
    $.ajax({
      method: "GET",
      url: "https://api.api-ninjas.com/v1/quotes",
      headers: { "X-Api-Key": "Ri0xxSqJ45OvzylcqATxgQ==MPANOEuSkcPJ3Qjs" },
      contentType: "application/json",
      success: function (result) {
        // The API returns an array of quotes, get the first one
        if (result && result.length > 0) {
          quoteText.textContent = `"${result[0].quote}"`;
          quoteAuthor.textContent = `- ${result[0].author}`;
        }
      },
      error: function ajaxError(jqXHR) {
        quoteText.textContent = "Sorry, couldn't fetch a quote.";
        quoteAuthor.textContent = "";
        console.error("Error: ", jqXHR.responseText);
      },
    });
  }

  // Add click event listener to the button
  quoteBtn.addEventListener("click", fetchQuote);

  // Optionally, load a quote when the page first loads
  fetchQuote();
});
