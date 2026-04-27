document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.testimonial-img').forEach(container => {
        const originalContent = container.innerHTML;

        container.addEventListener('click', () => {
            if (container.querySelector('video')) return;

            const videoSrc = container.getAttribute('data-video');
            container.innerHTML = `
                <video autoplay controls>
                    <source src="${videoSrc}" type="video/mp4">
                </video>
            `;

            const video = container.querySelector('video');
            video.addEventListener('ended', () => {
                container.innerHTML = originalContent;
            });
        });
    });
});
