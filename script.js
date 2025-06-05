console.log('PUTINKA METHODS script loaded!');

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed. Initializing animations...');

    const methodCards = document.querySelectorAll('.method-card, .featured-method-card');

    methodCards.forEach((card, index) => {
        // Set initial state for animation
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)'; // Start slightly lower
        // Apply animation with a stagger
        card.style.transition = `opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.15}s, transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.15}s`;

        // Trigger the animation after a short delay to ensure styles are applied
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 50); // Small delay before starting the global animation sequence
    });

    // Example of a more interactive animation: Parallax effect on header (optional)
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            let offset = window.pageYOffset;
            header.style.backgroundPositionY = offset * 0.5 + 'px'; // Adjust multiplier for speed
        });
    }

    // Smooth scroll for anchor links (if you add any later)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Collapsible method cards logic
    const methodTitleTriggers = document.querySelectorAll('.method-title-trigger');

    // --- Live Search Logic ---
    const searchInput = document.getElementById('methodSearch');
    function getAllMethodCards() {
        // Select all elements with .method-card or .featured-method-card, regardless of tag
        return Array.from(document.querySelectorAll('.method-card, .featured-method-card'));
    }
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.trim().toLowerCase();
            const allCards = getAllMethodCards();

            allCards.forEach(card => {
                const titleElement = card.querySelector('.method-title-trigger');
                const contentElement = card.querySelector('.method-content-collapsible');

                const title = (titleElement?.textContent || '').trim().toLowerCase();
                const content = (contentElement?.textContent || '').trim().toLowerCase();
                
                const matchesQuery = !query || title.includes(query) || content.includes(query);

                if (matchesQuery) {
                    card.classList.remove('is-filtered-out');
                    // Ensure 'hide' is also removed if it was somehow still there from previous logic
                    card.classList.remove('hide'); 
                } else {
                    card.classList.add('is-filtered-out');
                }
            });
        });
    } else {
        // It's good practice to keep a non-intrusive error log for critical missing elements
        // but for production, you might remove this or use a more sophisticated logging system.
        // console.error('Search input with ID "methodSearch" not found!'); 
    }

    methodTitleTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const currentCard = this.closest('.method-card, .featured-method-card'); // Ensure it works for both types of cards
            if (!currentCard) {
                console.error('Collapsible card: Could not find parent .method-card or .featured-method-card for a trigger.', this);
                return;
            }

            const content = currentCard.querySelector('.method-content-collapsible');
            const isActive = currentCard.classList.contains('active');

            // Close all other active cards first
            getAllMethodCards().forEach(otherCard => { // Use getAllMethodCards() for consistency and up-to-date list
                if (otherCard !== currentCard && otherCard.classList.contains('active')) {
                    otherCard.classList.remove('active');
                    const otherContent = otherCard.querySelector('.method-content-collapsible');
                    if (otherContent) {
                        otherContent.style.maxHeight = null;
                        otherContent.style.opacity = '0'; // Assuming this matches your CSS for inactive/collapsed
                    }
                }
            });

            // Toggle current card
            if (isActive) {
                currentCard.classList.remove('active');
                if (content) {
                    content.style.maxHeight = null;
                    content.style.opacity = '0';
                }
            } else {
                currentCard.classList.add('active');
                if (content) {
                    content.style.maxHeight = content.scrollHeight + "px";
                    content.style.opacity = '1'; // Assuming this matches your CSS for active/expanded
                }
            }
        });
    });

    console.log('Animations, interactive elements, and collapsible logic initialized.');
});
