document.addEventListener('DOMContentLoaded', () => {
    const title = document.querySelector('.glitch-title');
    if (title) {
        title.innerText = title.dataset.text;
    }

    const animatedElements = document.querySelectorAll('.animate-on-load');
    animatedElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 150 + 300);
    });
});
