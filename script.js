const letters = document.querySelectorAll('.letter');
let isWordRevealed = false;

// Randomly position letters within the visible screen area
letters.forEach(letter => {
    const randomX = Math.random() * (window.innerWidth - letter.clientWidth);
    const randomY = Math.random() * (window.innerHeight - letter.clientHeight);
    letter.style.transform = `translate(${randomX}px, ${randomY}px)`;
});

letters.forEach(letter => {
    letter.addEventListener('mouseover', () => {
        letter.classList.add('visible');
        if (checkAllVisible() && !isWordRevealed) {
            moveToCenter();
        }
    });
});

function checkAllVisible() {
    return Array.from(letters).every(letter => letter.classList.contains('visible'));
}

function moveToCenter() {
    let totalWordWidth = 0;
    const letterWidths = [];

    letters.forEach(letter => {
        const letterRect = letter.getBoundingClientRect();
        letterWidths.push(letterRect.width);
        totalWordWidth += letterRect.width;
    });

    const gap = -10; // Tracking for the word MISSING
    const totalGapWidth = gap * (letters.length - 1);
    const finalWidth = totalWordWidth + totalGapWidth;
    const centerX = (window.innerWidth - finalWidth) / 2;

    // Set a higher Y position
    const centerY = (window.innerHeight - letters[0].getBoundingClientRect().height) / 100; // Adjust this value to change the height

    let currentX = centerX;
    letters.forEach((letter, index) => {
        letter.style.transform = `translate(${currentX}px, ${centerY}px)`;
        currentX += letterWidths[index] + gap;
        letter.classList.add('centered');
    });

    isWordRevealed = true;

    // Automatically fade to black after centering
    setTimeout(fadeToBlack, 1000); // Wait 1 second before fading

    // Start the cursor trail effect once the word is fully revealed
}

startCursorTrail();
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

// Function to fade the page to black
function fadeToBlack() {
    const wordContainer = document.getElementById('word-container');
    wordContainer.style.opacity = '0'; // Fade out the word
    document.body.style.backgroundColor = 'white'; // Change background color to black

    setTimeout(() => {
        window.location.href = "info.html"; // Replace with your desired URL
    }, 1000); // Wait for the fade transition to complete before navigating
}
