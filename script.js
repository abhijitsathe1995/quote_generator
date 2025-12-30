const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


let apiQuotes = [];

//show loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//hide loading
function complete(){
    loader.hidden = true;
    quoteContainer.hidden = false;
}

//show new Quote
function newQuote(){
    loading();
    //pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    
    //Check if author is blank and replace with 'Unknwon'
    if(!quote.author) {
        authorText.textContent = 'Unknown';
    }
    else {
        authorText.textContent = quote.author;
    }

    //For longer Quotes change the styling
    if(quote.text.length > 120){
        quoteText.classList.add('long-quote');
    } 
    else {
        quoteText.classList.remove('long-quote');
    }

    //set Quote and hide Loader
    quoteText.textContent = quote.text;
    complete();
}

// Get Quotes from API
async function getQuotes() {
    loading();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } 
    catch (e) {
        alert(e);
    }
}


//Tweet a Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// on Load
getQuotes();
