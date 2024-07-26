document.addEventListener("DOMContentLoaded", function() {
    const cards = document.querySelectorAll('.card');

    // Function to cycle through images
    function cycleImages(card) {
        const images = card.querySelectorAll('img');
        let currentIndex = 0;
        
        setInterval(() => {
            // Hide current image
            images[currentIndex].classList.add('hidden');
            // Show next image
            currentIndex = (currentIndex + 1) % images.length;
            images[currentIndex].classList.remove('hidden');
        }, 3000);
    }

    // Function to add hover effects
    function addHoverEffect(card) {
        card.addEventListener('mouseover', () => {
            card.style.transform = 'scale(1.05)';
            card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseout', () => {
            card.style.transform = 'scale(1)';
            card.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
        });
    }

    // Function to scroll to subscriptions section
    function scrollToSubscriptions() {
        console.log('Scrolling to subscriptions'); // Debugging log
        document.getElementById('subscriptions').scrollIntoView({ behavior: 'smooth' });
    }

    // Apply image cycling and hover effects to all cards
    cards.forEach(card => {
        cycleImages(card);
        addHoverEffect(card);

        // Additional text appearance effect on hover
        const text = card.querySelector('.card-content p');
        text.style.transition = 'opacity 0.5s';
        card.addEventListener('mouseover', () => {
            text.style.opacity = '1';
        });
        card.addEventListener('mouseout', () => {
            text.style.opacity = '0.7';
        });

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
    heroText.classList.add('fade-in');

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
});
