document.addEventListener("DOMContentLoaded", function () {
  const quoteText = document.querySelector(".quote");
  const quoteAuthor = document.querySelector(".author");
  const quoteBtn = document.querySelector(".btn");

  function fetchQuote() {
    fetch("http://daily-quote-generator.onrender.com/quotes")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // ZenQuotes returns an array of quotes
        if (Array.isArray(data) && data.length > 0) {
          quoteText.textContent = `"${data[0].q}"`;
          quoteAuthor.textContent = `- ${data[0].a}`;
        } else {
          quoteText.textContent = "No quote found.";
          quoteAuthor.textContent = "";
        }
      })
      .catch((error) => {
        quoteText.textContent = "Sorry, couldn't fetch a quote.";
        quoteAuthor.textContent = "";
        console.error("Fetch error:", error);
      });
  }

  quoteBtn.addEventListener("click", fetchQuote);

  // Fetch a quote when the page loads
  fetchQuote();
});
