window.onload = function () {
    document.body.classList.add('fade-in'); // Add fade-in class on load

    // Ensure the lines have correct punctuation on initial load
    updateLines('#poem-lost');
    updateLines('#poem-surrender');
    updateLines('#poem-meaning');

    // Initiate typewriter effect on titles after 1 second
    setTimeout(() => typeWriterEffect('.title'), 1000); // Start after 1 second

    // Set up intersection observer for quote visibility
    const quoteContainer = document.querySelector('.quote-container');
    const linksContainer = document.querySelector('.links-container');

    // Callback for intersection observer
    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                quoteContainer.classList.add('quote-visible'); // Add the class when links are visible
            }
        });
    };

    // Create an intersection observer
    const observer = new IntersectionObserver(observerCallback, {
        root: null, // Use the viewport as the root
        threshold: 0.1 // Trigger when at least 10% of the links container is visible
    });

    // Observe the links container
    observer.observe(linksContainer);
};

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

function typeWriterEffect(selector) {
    const titles = document.querySelectorAll(selector);
    const delay = 100; // Delay in milliseconds for typing effect

    titles.forEach((title) => {
        const text = title.innerHTML;
        title.innerHTML = ''; // Clear the title text initially
        title.style.visibility = 'visible'; // Make title visible
        let i = 0; // Counter for the current character index

        function type() {
            if (i < text.length) {
                title.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, delay); // Call type function again after delay
            }
        }

        type(); // Start typing immediately for all titles
    });
}

let dragSource = null;
let draggingOverElement = null;

function handleDragStart(e) {
    dragSource = this;
    e.target.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';

    if (this !== dragSource && this !== draggingOverElement && this.parentNode === dragSource.parentNode) {
        draggingOverElement = this;

        // Swap the current hovered element and the dragging element in real-time
        let temp = dragSource.innerHTML;
        let tempFont = dragSource.style.fontFamily; // Store font

        // Update the dragged element with the hovered element's content and font
        dragSource.innerHTML = this.innerHTML;
        dragSource.style.fontFamily = this.style.fontFamily; // Keep the swapped font

        // Swap back
        this.innerHTML = temp;
        this.style.fontFamily = tempFont; // Restore the original font

        // Update dragSource to the newly swapped element
        dragSource = this;
    }
}

function handleDrop(e) {
    e.stopPropagation();
    draggingOverElement = null; // Clear the reference when dropped

    // Ensure last line of each poem ends with a period and others with commas
    updateLines('#poem-lost');
    updateLines('#poem-surrender');
    updateLines('#poem-meaning');
}

function updateLines(poemId) {
    const lines = document.querySelectorAll(`${poemId} .line`);
    if (lines.length > 0) {
        lines.forEach((line, index) => {
            const trimmedLine = line.innerHTML.trim();
            // Check if it's the last line
            if (index === lines.length - 1) {
                // Last line should end with a period
                if (!trimmedLine.endsWith('.')) {
                    line.innerHTML = trimmedLine.replace(/[,]+$/, '') + '.'; // Remove any trailing commas and add period to last line
                }
            } else {
                // Other lines should end with a comma
                if (!trimmedLine.endsWith(',')) {
                    line.innerHTML = trimmedLine.replace(/[.]+$/, '') + ','; // Remove any trailing periods and add comma to other lines
                }
            }
        });
    }
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
    draggingOverElement = null; // Clear the reference when dragging ends
}

document.querySelectorAll('#poem-lost .line, #poem-surrender .line, #poem-meaning .line').forEach(line => {
    // Set random font for each line on initial load
    line.style.fontFamily = getRandomFont();

    line.addEventListener('dragstart', handleDragStart, false);
    line.addEventListener('dragover', handleDragOver, false);
    line.addEventListener('drop', handleDrop, false);
    line.addEventListener('dragend', handleDragEnd, false);
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

