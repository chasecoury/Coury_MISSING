// gallery.js
document.addEventListener("DOMContentLoaded", () => {
    console.log("Gallery loaded");

    // Trigger the fade-in effect for the body
    document.body.style.opacity = '1'; // Set opacity to 1 to fade in

    // Start the typing effect after 1 second
    const title = document.querySelector('.title');
    const text = title.textContent; // Get the text content
    title.textContent = ''; // Clear title content

    let index = 0;
    const typingSpeed = 100; // Adjust typing speed here

    const type = () => {
        if (index < text.length) {
            title.textContent += text.charAt(index); // Add one character at a time
            index++;
            setTimeout(type, typingSpeed); // Call type recursively
        }
    };

    // Delay the start of the typing effect by 1000 milliseconds (1 second)
    setTimeout(type, 1000);
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