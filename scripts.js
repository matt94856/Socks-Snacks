document.addEventListener("DOMContentLoaded", function() {
    // Function to cycle through images
    function cycleImages(card) {
        const images = card.querySelectorAll('img');
        let currentIndex = 0;
        
        setInterval(() => {
            images[currentIndex].classList.add('hidden');
            currentIndex = (currentIndex + 1) % images.length;
            images[currentIndex].classList.remove('hidden');
        }, 3000);
    }

    // Function to add hover effects
    function addHoverEffect(card) {
        card.classList.add('card-hover-effect'); // Use CSS classes for hover effects
    }

    // Function to scroll to subscriptions section
    function scrollToSubscriptions() {
        document.getElementById('subscriptions').scrollIntoView({ behavior: 'smooth' });
    }

    // Apply image cycling and hover effects to all cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        cycleImages(card);
        addHoverEffect(card);

        // Additional text appearance effect on hover
        const text = card.querySelector('.card-content p');
        if (text) {
            text.style.transition = 'opacity 0.5s';
            card.addEventListener('mouseover', () => {
                text.style.opacity = '1';
            });
            card.addEventListener('mouseout', () => {
                text.style.opacity = '0.7';
            });
        }

        // Navigate to product page on click
        card.addEventListener('click', () => {
            const productName = card.querySelector('h3').innerText.toLowerCase().replace(/ /g, '-');
            window.location.href = productName + '.html';
        });

        // Scroll to subscriptions section when clicking on subscription or individual box button
        const button = card.querySelector('.box-button');
        if (button) {
            button.addEventListener('click', scrollToSubscriptions);
        }
    });

    // Scroll to subscriptions section when Start Now button is clicked
    document.getElementById('start-now').addEventListener('click', () => {
        scrollToSubscriptions();
    });

    // Add fade-in effect to hero text
    const heroText = document.querySelector('.hero-text h1');
    if (heroText) {
        heroText.classList.add('fade-in');
    }

    // Fade-in effect for About Us section
    const aboutSections = document.querySelectorAll('.about-section');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    aboutSections.forEach(section => {
        section.classList.add('fade-out'); // Add initial class to apply the fade effect
        observer.observe(section);
    });

    // Contact form handling
    const form = document.querySelector('form');
    if (form) {
        const messageBox = document.createElement('div');
        messageBox.classList.add('message-box');
        form.appendChild(messageBox);

        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const formData = new FormData(form);

            fetch(form.action, {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (response.ok) {
                    messageBox.innerHTML = '<p>Thank you for your message! We will get back to you soon.</p>';
                    messageBox.style.color = 'green';
                    form.reset();
                } else {
                    throw new Error('Network response was not ok.');
                }
            })
            .catch(error => {
                messageBox.innerHTML = '<p>There was a problem sending your message. Please try again later.</p>';
                messageBox.style.color = 'red';
            });
        });
    }

    // Collapse and expand functionality for snacks and socks
    function toggleSelection(event) {
        const target = event.currentTarget;
        const type = target.dataset.type; // 'snack' or 'sock'
        const allOptions = document.querySelectorAll(`.selection-column.${type} img`);

        // Check if image is already selected
        const isSelected = target.classList.contains('selected');

        if (isSelected) {
            // Deselect
            target.classList.remove('selected');
            target.classList.remove('hover-effect'); // Remove hover effect class
            allOptions.forEach(option => {
                option.classList.remove('collapsed');
                option.parentElement.classList.remove('collapsed'); // Remove collapse class from parent
            });

            // Clear the value in the hidden form input
            const formInput = document.querySelector(`#${type}-selection`);
            if (formInput) {
                formInput.value = ''; // Clear selection
            }

            // Expand the section
            const section = document.querySelector(`.selection-column.${type}`);
            section.classList.remove('collapsed');
        } else {
            // Select
            allOptions.forEach(option => {
                option.classList.remove('selected');
                option.classList.remove('hover-effect'); // Remove hover effect class
                option.classList.add('collapsed'); // Collapse all options
            });

            target.classList.add('selected');
            target.classList.add('hover-effect'); // Add hover effect class

            // Set the alt text of the selected image as the value in the hidden form input
            const formInput = document.querySelector(`#${type}-selection`);
            if (formInput) {
                formInput.value = target.alt; // Use alt text for submission
            }

            // Collapse the section
            const section = document.querySelector(`.selection-column.${type}`);
            section.classList.add('collapsed');
        }
    }

    // Add click event listeners to snack and sock images
    document.querySelectorAll('.selection-column.snacks img').forEach(img => {
        img.dataset.type = 'snack';
        img.addEventListener('click', toggleSelection);
    });

    document.querySelectorAll('.selection-column.socks img').forEach(img => {
        img.dataset.type = 'sock';
        img.addEventListener('click', toggleSelection);
    });

    // Remove buttons from Box1.html
    document.querySelectorAll('.box1 .button').forEach(button => {
        button.remove();
    });
});
