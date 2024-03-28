const flashcards = [];
let currentCard = 0;
const termInput = document.getElementById('term-input');
const definitionInput = document.getElementById('definition-input');
const termDisplay = document.getElementById('term-display');
const definitionDisplay = document.getElementById('definition-display');
const compilationDiv = document.getElementById('compilation');
const addBtn = document.getElementById('addBtn');
const exportBtn = document.getElementById('exportBtn');
const toggleBtn = document.getElementById('toggleBtn');

function addFlashcard(term, definition) {
    const flashcard = { term, definition };
    flashcards.push(flashcard);
    createFlashcardElement(flashcard);
    updateCompilation();
}

function createFlashcardElement(flashcard) {
    const flashcardContainer = document.createElement('div');
    flashcardContainer.classList.add('flashcard');
    const cardFront = document.createElement('div');
    cardFront.classList.add('card-front');
    cardFront.textContent = flashcard.term;
    const cardBack = document.createElement('div');
    cardBack.classList.add('card-back');
    cardBack.textContent = flashcard.definition;
    flashcardContainer.appendChild(cardFront);
    flashcardContainer.appendChild(cardBack);
    document.getElementById('flashcard-display-container').appendChild(flashcardContainer);
    alignFlashcards();
}

function updateCompilation() {
    
}

function alignFlashcards() {
    const flashcardContainer = document.getElementById('flashcard-display-container');
    const flashcards = flashcardContainer.querySelectorAll('.flashcard');
    const numCards = flashcards.length;
    const containerWidth = flashcardContainer.offsetWidth;
    const cardWidth = containerWidth / Math.min(numCards, 5) - 15; // Subtracting margin
    
    flashcards.forEach((flashcard, index) => {
        flashcard.style.width = cardWidth + "px";

        // Adjust font size based on text length
        const termLength = flashcard.querySelector('.card-front').textContent.length;
        const definitionLength = flashcard.querySelector('.card-back').textContent.length;
        const maxLength = Math.max(termLength, definitionLength);
        const baseFontSize = 16; // Base font size in pixels
        const maxFontSize = 12; // Maximum font size in pixels
        const scaleFactor = 0.8; // Scaling factor for font size

        let fontSize = baseFontSize;
        if (maxLength > 15) {
            fontSize = Math.max(baseFontSize - (maxLength - 15) * scaleFactor, maxFontSize);
        }
        
        flashcard.style.fontSize = fontSize + "px";
    });
}

addBtn.addEventListener('click', () => {
    const term = termInput.value.trim();
    const definition = definitionInput.value.trim();
    if (term !== '' && definition !== '') {
        addFlashcard(term, definition);
        termInput.value = '';
        definitionInput.value = '';
    } else {
        alert('Please enter both term and definition.');
    }
});

exportBtn.addEventListener('click', () => {
    // Logic to export flashcards as PDF
    // This part would require a library like jsPDF
    // However, it's beyond the scope of this simple example.
    alert('PDF export functionality will be implemented later.');
});

toggleBtn.addEventListener('click', () => {
    const columnCount = 1; // Number of columns
    const cardsPerColumn = Math.ceil(flashcards.length / columnCount);
    
    let compilationContent = "<div class='columns'>";
    for (let i = 0; i < columnCount; i++) {
        compilationContent += "<div class='column'>";
        for (let j = i * cardsPerColumn; j < Math.min((i + 1) * cardsPerColumn, flashcards.length); j++) {
            const flashcard = flashcards[j];
            compilationContent += `<p>${j + 1}. <strong> ${flashcard.term} </strong><strong><br></strong> ${flashcard.definition}</p>`;
        }
        compilationContent += "</div>";
    }
    compilationContent += "</div>";
    
    const compilationWindow = window.open('', 'Compilation', 'width=800,height=600');
    compilationWindow.document.body.innerHTML = `<h2>Compilation of Terms and Definitions:</h2>${compilationContent}`;

    // CSS to style the columns
    compilationWindow.document.head.innerHTML = `
        <style>
            .columns {
                display: flex;
            }
            .column {
                flex: 1;
                padding: 10px;
            }
        </style>
    `;
});



// Flip the card when clicked
document.addEventListener('click', (event) => {
    if (event.target.closest('.flashcard')) {
        const card = event.target.closest('.flashcard');
        card.classList.toggle('flipped');
    }
});

updateCompilation(); // Display initial compilation
