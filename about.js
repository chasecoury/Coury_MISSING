// about.js
document.addEventListener("DOMContentLoaded", () => {
    console.log("Gallery loaded");

    // Trigger the fade-in effect for the body
    document.body.style.opacity = '1'; // Set opacity to 1 to fade in

    // Start the typing effect after 1 second
    const title = document.querySelector('.title');
    const titleText = title.textContent; // Get the text content of the title
    title.textContent = ''; // Clear title content

    const description = document.querySelector('.description');
    const descriptionText = description.textContent; // Get the text content of the description
    description.textContent = ''; // Clear description content

    let titleIndex = 0;
    let descriptionIndex = 0;
    const titleTypingSpeed = 100; // Adjust title typing speed here
    const descriptionTypingSpeed = 2; // Adjust description typing speed here

    const typeTitle = () => {
        if (titleIndex < titleText.length) {
            title.textContent += titleText.charAt(titleIndex); // Add one character at a time
            titleIndex++;
            setTimeout(typeTitle, titleTypingSpeed); // Call type recursively
        }
    };

    const typeDescription = () => {
        if (descriptionIndex < descriptionText.length) {
            description.textContent += descriptionText.charAt(descriptionIndex); // Add one character at a time
            descriptionIndex++;
            setTimeout(typeDescription, descriptionTypingSpeed); // Call type recursively
        }
    };

    // Image cycling logic
    let currentImageIndex = 1; // Start with book1
    const totalImages = 19; // Total number of images
    const bookImage = document.getElementById('bookImage');

    const changeImage = () => {
        currentImageIndex = (currentImageIndex % totalImages) + 1; // Cycle through images
        bookImage.src = `book/book${currentImageIndex}.jpg`; // Update image source
    };

    setInterval(changeImage, 300); // Change image every 2 seconds

    // Delay the start of the typing effect by 1000 milliseconds (1 second)
    setTimeout(typeTitle, 1000); // Start typing title after 1 second
    setTimeout(typeDescription, 1000 + (titleText.length * titleTypingSpeed)); // Start typing description after the title
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