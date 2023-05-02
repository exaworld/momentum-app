const quotes = [
    {
        id: 1,
        content: 'The quick brown fox jumps over the lazy dog.'
    },
    {
        id: 2,
        content: 'The best way to predict the future is to invent it.'
    },
    {
        id: 3,
        content: 'No man is an island.'
    }
]


const quotesContainer = document.querySelector("#quotes-container");
const quotesInputBox = document.querySelector("#quote-input");
const displayedQuoteContainer = document.querySelector("#displayed-quote");
const quotesListContainer = document.querySelector("#quotes-list-container");
const quotesEditor = document.querySelector("#quotes-editor");
const updateButton = document.querySelector("#update-button");
const cancelButton = document.querySelector("#cancel-button");
const savedQuotes = JSON.parse(localStorage.getItem("quotes")) || quotes;
const updateQuotes = (updatedQuotes) => {
    localStorage.setItem("quotes", JSON.stringify(updatedQuotes))
}
let i = 0;

//Object when editing the quote. Updated when edit button is clicked.
let isEditingQuote = {
    id: null,
    content: "",
    index: null
}


//Display current featured quote on screen;
const displayQuote = () => {
    const quotesList = JSON.parse(localStorage.getItem("quotes")) || savedQuotes;
    const quoteItem = quotesList[i];
    i = i < quotesList.length - 1 ? i + 1 : 0;
    displayedQuoteContainer.innerHTML = `<div id="${quoteItem.id}">${quoteItem.content}</div>`;
}

displayQuote();
setInterval(displayQuote, 10000)


//Open and close quotes editor
displayedQuoteContainer.addEventListener("click", () => {
    quotesEditor.classList.add("quotes-editor-active");
    //Close editor
    window.addEventListener("click", (e) => {
        const withinQuotesEditor = e.composedPath().includes(quotesEditor)
        const withindisplayedQuoteContainer = e.composedPath().includes(displayedQuoteContainer)

        //if clicked outside the quotes editor or displayed quote, close the editor
        if (!withinQuotesEditor && !withindisplayedQuoteContainer) {
            quotesEditor.classList.remove("quotes-editor-active");
            cancelTextBox();
        }
    })
})

//Create individual element from quotes array argument and append to parent container
const displayAllQuotes = (quotesList) => {
    quotesListContainer.innerHTML = "";
    quotesList.forEach((quote) => {
        const quoteItem = `<div id="${quote.id}" class="quotes-list-item">${quote.content}<i id="edit-quote-${quote.id}" class="fa fa-edit quote-edit-button" style="font-size:24px"></div>`;
        quotesListContainer.innerHTML += quoteItem
    })

    editButtonHandler();
}

const editButtonHandler = () => {
    const quotesList = JSON.parse(localStorage.getItem("quotes")) || quotes;
    const editButtons = document.querySelectorAll(".quote-edit-button");
    editButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            const id = e.target.id.split("-"); //turn id into array
            const quoteId = id[2] //get the last item from id array from id="edit-quote-${quote.id}"
            const quoteItem= quotesList.find((quote) => { return quote.id.toString() === quoteId })
            isEditingQuote = {
                id: quoteId,
                content: quoteItem.content,
                index: quotesList.indexOf(quoteItem)
            }
            quotesInputBox.value = quoteItem.content
            updateButton.innerHTML = "Update"
        })
    })
}

displayAllQuotes(savedQuotes);



// EDIT QUOTES

//Disable SAVE or UPDATE button if characters is less than 15
quotesInputBox.addEventListener("input", () => {
    if (quotesInputBox.value.trim().length > 15) {
        updateButton.classList.remove('button-disabled');
    } else {
        updateButton.classList.add('button-disabled');
    }
})


//Clear isEditing object and quote input value
const cancelTextBox = () => {
    quotesInputBox.value = "";
    updateButton.innerHTML = "Save";
    isEditingQuote = {
        id: null,
        content: "",
        index: null
    }
}

//SAVE new quote or UPDATE existing ones;
updateButton.addEventListener("click", () => {
    const newQuotes = JSON.parse(localStorage.getItem("quotes")) || savedQuotes;
    
    if (quotesInputBox.value.trim().length > 15) {
        if (isEditingQuote.id) {
            newQuotes[isEditingQuote.index] = {
                id: isEditingQuote.id,
                content: quotesInputBox.value
            }
        }
        else {
            newQuotes.push({
                id: newQuotes.length + 1,
                content: quotesInputBox.value
            })
        }
        updateQuotes(newQuotes); //Save newly updated quotes to local storage
        displayAllQuotes(newQuotes); // Display newly updated quotes
        displayQuote();
        cancelTextBox();
    }
})

cancelButton.addEventListener("click", () => {
    cancelTextBox();
    quotesEditor.classList.remove("quotes-editor-active");
})
