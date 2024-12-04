// Array of fonts to use for glitch effect
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

// Cursor trail effect
function startCursorTrail() {
    document.addEventListener('mousemove', function(event) {
        for (let i = 0; i < 1; i++) {
            const questionMark = document.createElement('span');
            questionMark.innerHTML = '?';
            questionMark.classList.add('cursor-trail');
            
            const offsetX = Math.random() * 25 - 15;
            const offsetY = Math.random() * 30 - 15;

            questionMark.style.left = `${event.clientX + offsetX}px`;
            questionMark.style.top = `${event.clientY + offsetY}px`;
            
            document.body.appendChild(questionMark);

            setTimeout(() => {
                questionMark.remove();
            }, 100);
        }
    });
}

startCursorTrail(); // Start the cursor trail

// Glitch text effect for general text
function glitchText(originalText) {
    const glitchAmount = 0.01; // Only 1% of the characters will glitch
    return originalText.split('').map(char => {
        if (Math.random() < glitchAmount && /[a-zA-Z]/.test(char)) {
            // Create a span for each character to apply the font style
            const span = document.createElement('span');
            const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
            span.style.fontFamily = randomFont; // Set random font
            span.style.lineHeight = '1.2'; // Set line-height to match your CSS
            span.style.display = 'inline-block'; // Ensures spans align properly
            span.innerText = Math.floor(Math.random() * 10); // Replace with a random number
            return span.outerHTML; // Return the span's outer HTML
        }
        return char;
    }).join('');
}

// Glitch effect for question mark (switches between specific characters)
function glitchQuestionMark(originalChar) {
    const glitchChars = ['$', '%', '&', '!', '@', '#'];
    const glitchAmount = 0.05; // 20% chance of glitching the question mark

    if (Math.random() < glitchAmount) {
        return glitchChars[Math.floor(Math.random() * glitchChars.length)];
    }
    return originalChar;
}

function applyGlitchEffect() {
    const errorMessage = document.querySelector('.error-message');
    const infoMessage = document.querySelector('.info-message');
    const linkMessage = document.querySelector('.link-message a');
    const questionMark = document.querySelector('.question-mark');

    // Save original texts to keep the base intact
    const originalErrorMessage = errorMessage.innerText;
    const originalInfoMessage = infoMessage.innerText;
    const originalLinkMessage = linkMessage.innerText;
    const originalQuestionMark = questionMark.innerText;

    setInterval(() => {
        errorMessage.innerHTML = glitchText(originalErrorMessage);
        infoMessage.innerHTML = glitchText(originalInfoMessage);
        linkMessage.innerHTML = glitchText(originalLinkMessage);
        questionMark.innerText = glitchQuestionMark(originalQuestionMark); // Apply glitch to the question mark
    }, 100); // Glitch effect is slower for better readability
}

applyGlitchEffect(); // Start glitch effect

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function createRandomQuestionMark() {
    const questionMark = document.createElement('span');
    questionMark.innerHTML = '.';
    questionMark.classList.add('random-question-mark');
    
    // Set random color and position
    questionMark.style.color = getRandomColor();
    questionMark.style.left = `${Math.random() * window.innerWidth}px`;
    questionMark.style.top = `${Math.random() * window.innerHeight}px`;

    // Append to body and remove after some time
    document.body.appendChild(questionMark);
    
    setTimeout(() => {
        questionMark.remove();
    }, 400); // The question mark will disappear after 2 seconds
}

function startRandomQuestionMarks() {
    setInterval(createRandomQuestionMark, 2); // Create a question mark every 2 milliseconds
}

startRandomQuestionMarks(); // Start the random question marks
