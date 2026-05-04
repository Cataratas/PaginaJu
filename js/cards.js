
const track = document.getElementById('testimonial-track');
const indicators = document.getElementById('carousel-indicators');
const cards = track.querySelectorAll('.testimonial-card');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const card = track.querySelector('.testimonial-card');
let currentIndex = 0;

document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const item = button.closest('.faq-item');
        item.classList.toggle('open');
    });
});

prevBtn.addEventListener('click', () => {
    track.scrollBy({ left: -card.offsetWidth - 30, behavior: 'smooth' });
});

nextBtn.addEventListener('click', () => {
    track.scrollBy({ left: card.offsetWidth + 30, behavior: 'smooth' });
});

function createDots() {
    indicators.innerHTML = "";
    const totalSlides = cards.length;
    const isWide = window.innerWidth >= 769;
    const visibleSlides = isWide ? 3 : 1;
    const totalDots = Math.max(totalSlides - visibleSlides + 1, 1);

    for (let i = 0; i < totalDots; i++) {
        const dot = document.createElement("div");
        dot.classList.add("dot");
        if (i === 0) dot.classList.add("active");

        dot.addEventListener("click", () => {
            const cardWidth = cards[0].offsetWidth;
            const gap = parseInt(getComputedStyle(track).gap) || 0;
            const scrollTo = i * (cardWidth + gap);
            currentIndex = i;
            track.scrollTo({ left: scrollTo, behavior: "smooth" });
        });

        indicators.appendChild(dot);
    }
}

function updateActiveDot() {
    const trackRect = track.getBoundingClientRect();
    let closestIndex = 0;
    let closestDistance = Infinity;

    cards.forEach((card, index) => {
        const cardRect = card.getBoundingClientRect();
        const distance = Math.abs(cardRect.left - trackRect.left);
        if (distance < closestDistance) {
        closestIndex = index;
        closestDistance = distance;
        }
    });

    const dots = indicators.querySelectorAll(".dot");
    dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === closestIndex);
    });
}

track.addEventListener("scroll", () => {
    updateActiveDot();
});

window.addEventListener("resize", () => {
    createDots();
});

createDots();
