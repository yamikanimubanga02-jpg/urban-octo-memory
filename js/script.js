document.addEventListener("DOMContentLoaded", () => {
    /* ==========================================================================
       FEATURE 1 (Compulsory): Contact Form Validation & Preview
       Validates user input and creates a local preview using textContent.
       ========================================================================== */
    const contactForm = document.getElementById("contact-form");
    const fullNameInput = document.getElementById("full-name");
    const emailInput = document.getElementById("email-address");
    const messageInput = document.getElementById("message");

    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
    const messageError = document.getElementById("message-error");
    const previewBox = document.getElementById("form-preview");

    // Regular Expression for Basic Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    contactForm.addEventListener("submit", (event) => {
        // Prevent default submission to keep everything local
        event.preventDefault();

        // Clear existing errors & previews
        nameError.textContent = "";
        emailError.textContent = "";
        messageError.textContent = "";
        previewBox.classList.add("hidden");
        previewBox.innerHTML = "";

        let isValid = true;

        // Validate Full Name (non-empty & non-whitespace)
        const nameVal = fullNameInput.value.trim();
        if (nameVal === "") {
            nameError.textContent = "Please enter your full name (cannot be blank).";
            isValid = false;
        }

        // Validate Email Address
        const emailVal = emailInput.value.trim();
        if (emailVal === "" || !emailRegex.test(emailVal)) {
            emailError.textContent = "Please enter a valid email address.";
            isValid = false;
        }

        // Validate Message (non-empty & non-whitespace)
        const messageVal = messageInput.value.trim();
        if (messageVal === "") {
            messageError.textContent = "Please enter a message (cannot be blank).";
            isValid = false;
        }

        // Display validated preview if all fields pass
        if (isValid) {
            const previewHeading = document.createElement("h3");
            previewHeading.textContent = "Submission Demonstration Preview";

            const statusNote = document.createElement("p");
            statusNote.innerHTML = "<strong>Status:</strong> Your input was validated locally. <em>(No message was sent)</em>";

            const nameP = document.createElement("p");
            nameP.textContent = `Name: ${nameVal}`;

            const emailP = document.createElement("p");
            emailP.textContent = `Email: ${emailVal}`;

            const msgP = document.createElement("p");
            msgP.textContent = `Message: ${messageVal}`;

            previewBox.appendChild(previewHeading);
            previewBox.appendChild(statusNote);
            previewBox.appendChild(nameP);
            previewBox.appendChild(emailP);
            previewBox.appendChild(msgP);

            previewBox.classList.remove("hidden");
            contactForm.reset();
        }
    });

    /* ==========================================================================
       FEATURE 2 (Option): Theme Switch (Light/Dark Mode)
       Switches theme attribute on document elements dynamically.
       ========================================================================== */
    const themeBtn = document.getElementById("theme-toggle-btn");
    let currentTheme = "light";

    themeBtn.addEventListener("click", () => {
        if (currentTheme === "light") {
            document.documentElement.setAttribute("data-theme", "dark");
            themeBtn.textContent = "☀️ Light Theme";
            currentTheme = "dark";
        } else {
            document.documentElement.removeAttribute("data-theme");
            themeBtn.textContent = "🌙 Dark Theme";
            currentTheme = "light";
        }
    });

    /* ==========================================================================
       FEATURE 3 (Option): Gallery Viewer (Photo Switcher with Bounds Checking)
       Cycles through photo arrays with Next and Previous buttons.
       ========================================================================== */
    const photos = [
        {
            src: "images/photo1.jpg",
            alt: "Workspace desk setup featuring a laptop and programming tools",
            caption: "Workspace: My programming and study environment."
        },
        {
            src: "images/photo2.jpg",
            alt: "Mulungushi University campus grounds and study area",
            caption: "Campus Life: Learning and collaborating at Mulungushi University."
        },
        {
            src: "images/photo3.jpg",
            alt: "Audio production workstation software on screen",
            caption: "Creative Studio: Music production and audio composition."
        }
    ];

    let currentPhotoIndex = 0;
    const galleryImg = document.getElementById("gallery-img");
    const galleryCaption = document.getElementById("gallery-caption");
    const photoCounter = document.getElementById("photo-counter");
    const prevBtn = document.getElementById("prev-photo-btn");
    const nextBtn = document.getElementById("next-photo-btn");

    function updateGallery(index) {
        galleryImg.src = photos[index].src;
        galleryImg.alt = photos[index].alt;
        galleryCaption.textContent = photos[index].caption;
        photoCounter.textContent = `Photo ${index + 1} of ${photos.length}`;
    }

    prevBtn.addEventListener("click", () => {
        currentPhotoIndex--;
        if (currentPhotoIndex < 0) {
            currentPhotoIndex = photos.length - 1; // Wrap to last photo
        }
        updateGallery(currentPhotoIndex);
    });

    nextBtn.addEventListener("click", () => {
        currentPhotoIndex++;
        if (currentPhotoIndex >= photos.length) {
            currentPhotoIndex = 0; // Wrap to first photo
        }
        updateGallery(currentPhotoIndex);
    });

    /* ==========================================================================
       FEATURE 4 (Option): Mobile Navigation Menu Toggle
       Opens and closes the mobile menu bar on narrow viewports.
       ========================================================================== */
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const navbar = document.getElementById("navbar");

    mobileMenuBtn.addEventListener("click", () => {
        navbar.classList.toggle("active");
    });

    // Close mobile menu when a navigation link is clicked
    const navLinks = navbar.querySelectorAll("a");
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navbar.classList.remove("active");
        });
    });
});