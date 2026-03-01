console.log('https://discord.gg/TGKETWvRwV');

document.addEventListener('DOMContentLoaded', () => {
    console.log('https://discord.gg/TGKETWvRwV');

    const methodCards = document.querySelectorAll('.method-card, .featured-method-card');

    methodCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)'; // Start slightly lower, quicker animation
        card.style.transition = `opacity 0.35s ease-out ${index * 0.07}s, transform 0.35s ease-out ${index * 0.07}s`;

        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 30);
    });

    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            let offset = window.pageYOffset;
            header.style.backgroundPositionY = offset * 0.5 + 'px'; // Adjust multiplier for speed
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    const methodTitleTriggers = document.querySelectorAll('.method-title-trigger');

    const searchInput = document.getElementById('methodSearch');
    function getAllMethodCards() {
        return Array.from(document.querySelectorAll('.method-card, .featured-method-card'));
    }
    if (searchInput) {
        console.log('Search input found:', searchInput); 
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
        console.error('Search input with ID "methodSearch" not found!'); 
    }

    methodTitleTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const currentCard = this.closest('.method-card, .featured-method-card');
            if (!currentCard) {
                console.error('Collapsible card: Could not find parent .method-card or .featured-method-card for a trigger.', this);
                return;
            }

            const isActive = currentCard.classList.contains('active');

            getAllMethodCards().forEach(otherCard => {
                if (otherCard !== currentCard && otherCard.classList.contains('active')) {
                    otherCard.classList.remove('active');
                }
            });

            if (isActive) {
                currentCard.classList.remove('active');
            } else {
                currentCard.classList.add('active');
            }
        });
    });

    console.log('https://discord.gg/TGKETWvRwV');
});
