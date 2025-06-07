console.log('PUTINKA METHODS script loaded!');

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed. Initializing animations...');

    const methodCards = document.querySelectorAll('.method-card, .featured-method-card');

    methodCards.forEach((card, index) => {
        // Set initial state for animation
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)'; // Start slightly lower, quicker animation
        // Apply animation with a stagger
        card.style.transition = `opacity 0.35s ease-out ${index * 0.07}s, transform 0.35s ease-out ${index * 0.07}s`;

        // Trigger the animation after a short delay to ensure styles are applied
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 30); // Reduced delay
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
        console.log('Search input found:', searchInput); // Debug: Check if search input is found
        searchInput.addEventListener('input', function() {
            const query = this.value.trim().toLowerCase();
            console.log('Search query:', query); // Debug: Check the current query

            const allCards = getAllMethodCards();
            console.log(`Found ${allCards.length} method cards for searching.`); // Debug: Check card count

            allCards.forEach((card, index) => {
                const titleElement = card.querySelector('.method-title-trigger');
                const contentElement = card.querySelector('.method-content-collapsible');

                const title = (titleElement?.textContent || '').trim().toLowerCase();
                const content = (contentElement?.textContent || '').trim().toLowerCase();
                
                console.log(`Card ${index}: Title='${title.substring(0,30)}...', Content='${content.substring(0, 30)}...'`); // Debug: Details for each card (content shortened)

                const matchesQuery = !query || title.includes(query) || content.includes(query);
                console.log(`Card ${index} ('${title.substring(0,15)}...'): Matches query '${query}'? ${matchesQuery}`); // Debug: Check match result

                if (matchesQuery) {
                    card.classList.remove('hide');
                } else {
                    card.classList.add('hide');
                }
            });
        });
    } else {
        console.error('Search input with ID "methodSearch" not found!'); // Debug: Log if search input is missing
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
            // const content = currentCard.querySelector('.method-content-collapsible'); // Moved declaration down to avoid redeclaration

            // Close all other active cards first
            getAllMethodCards().forEach(otherCard => {
                if (otherCard !== currentCard && otherCard.classList.contains('active')) {
                    otherCard.classList.remove('active');
                    const otherContent = otherCard.querySelector('.method-content-collapsible');
                    if (otherContent) {
                        otherContent.style.maxHeight = null; // CSS handles opacity/transform via .active class
                    }
                }
            });

            // Toggle current card
            // 'content' variable is already defined in the outer scope of this function
            if (isActive) {
                currentCard.classList.remove('active');
                if (content) {
                    content.style.maxHeight = null; // CSS handles opacity/transform
                }
            } else {
                currentCard.classList.add('active');
                if (content) {
                    // Set maxHeight for transition. CSS handles opacity/transform.
                    // Use requestAnimationFrame to ensure .active class styles are applied before calculating scrollHeight
                    requestAnimationFrame(() => {
                         content.style.maxHeight = content.scrollHeight + "px";
                    });
                }
            }
        });
    });

    console.log('Animations, interactive elements, and collapsible logic initialized.');
});
