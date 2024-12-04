document.addEventListener('DOMContentLoaded', () => {
    const gridItems = Array.from(document.querySelectorAll('.grid-item')); // Select all grid items

    // Shuffle function to randomize array order
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Hide all grid items initially
    gridItems.forEach(item => item.style.visibility = 'hidden');

    // Load images in a random order
    function loadImagesRandomly() {
        const shuffledItems = shuffle(gridItems); // Shuffle the grid items
        shuffledItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.visibility = 'visible'; // Make the item visible
            }, index * 50); // Faster load
        });
    }

    loadImagesRandomly(); // Start loading images

    // Typewriter effect for the header, top, and bottom text
    const headerText = "HAVE YOU SEEN";
    const topText = "Animals go missing, people get lost, and items fall out of the hands of their former owners.";
    const bottomText = "But what is it like to not feel whole? To be missing?";
    
    // List of fonts
    const fonts = [
        'Arial',
        'Bebas Neue',
        'Coolvetica',
        'Ek Mukta',
        'Fredoka',
        'Grantha Sangam MN',
        'Helvetica Neue',
        'Microsoft Sans Serif',
        'Montserrat',
        'Myriad Pro',
        'Source Code Pro',
        'Times New Roman',
        'Verdana',
        'Vinice'
    ];

    function getRandomFont() {
        return fonts[Math.floor(Math.random() * fonts.length)];
    }

    function typeWriter(element, text, index, callback, isHeader = false) {
        if (index < text.length) {
            const span = document.createElement('span');
            if (isHeader) {
                span.style.fontFamily = 'Arial'; // Set font to Arial for the header
                span.style.fontWeight = 'bold';  // Make the header bold
            } else {
                span.style.fontFamily = getRandomFont(); // Assign random font to each character for other texts
            }
            span.innerHTML = text.charAt(index);
            element.appendChild(span);
            index++;
            setTimeout(() => typeWriter(element, text, index, callback, isHeader), 50); // Adjust typing speed here
        } else if (callback) {
            callback(); // Call the callback if provided
        }
    }

    const typewriterHeader = document.getElementById('typewriter-header');
    const typewriterTop = document.getElementById('typewriter-top');
    const typewriterBottom = document.getElementById('typewriter-bottom');

    // Start typing effect for header text, then top, then bottom
    typeWriter(typewriterHeader, headerText, 0, () => {
        typeWriter(typewriterTop, topText, 0, () => {
            typeWriter(typewriterBottom, bottomText, 0);
        }, false); // Pass false for top and bottom texts
    }, true); // Pass true for the header text
});

// Cursor trail effect
function startCursorTrail() {
    document.addEventListener('mousemove', function(event) {
        for (let i = 0; i < 1; i++) {
            const questionMark = document.createElement('span');
            questionMark.innerHTML = '?';
            questionMark.classList.add('cursor-trail');
            
            const offsetX = Math.random() * 25 - 15;
            const offsetY = Math.random() * 30 - 15;

            // Use pageX and pageY for the cursor position
            questionMark.style.left = `${event.pageX + offsetX}px`;
            questionMark.style.top = `${event.pageY + offsetY}px`;
            
            document.body.appendChild(questionMark);

            setTimeout(() => {
                questionMark.remove();
            }, 100);
        }
    });
}

startCursorTrail(); // Start the cursor trail effect
