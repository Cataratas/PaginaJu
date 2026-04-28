document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.testimonial-img').forEach(container => {
        const originalContent = container.innerHTML;

        container.addEventListener('click', () => {
            if (container.querySelector('video')) return;

            const videoSrc = container.getAttribute('data-video');
            container.innerHTML = `
                <video autoplay controlsList="nodownload noremoteplayback">
                    <source src="${videoSrc}" type="video/mp4">
                </video>
                <span class="play-btn"></span>
                <div class="controls">
                    <div class="progress-bar">
                        <div class="progress"></div>
                    </div>
                </div>
            `;

            const video = container.querySelector('video');
            const progress = container.querySelector(".progress");
            const progressBar = container.querySelector(".progress-bar");
            const btn = container.querySelector(".play-btn");
            btn.classList.add("loading");

            video.addEventListener('ended', () => {
                container.innerHTML = originalContent;
            });
            video.addEventListener("timeupdate", () => {
                const percent = (video.currentTime / video.duration) * 100;
                progress.style.width = percent + "%";
            });
            progressBar.addEventListener("click", (e) => {
                const rect = progressBar.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const width = rect.width;
                const percent = clickX / width;

                video.currentTime = percent * video.duration;
            });
            video.addEventListener("click", () => {
                if (video.paused) {
                    video.play().then(() => {});
                    btn.classList.remove("play", "pause")
                } else {
                    video.pause();
                    btn.classList.remove("play", "loading")
                    btn.classList.add("pause")
                }
            });
            video.addEventListener("play", () => {
                btn.style.opacity = "0";
            });
            video.addEventListener("pause", () => {
                btn.style.opacity = "1";
                btn.classList.remove("play");
                btn.classList.add("pause");
            });
            video.addEventListener("waiting", () => {
                btn.classList.remove("play", "pause");
                btn.classList.add("loading");
                btn.style.opacity = "1";
            });
            video.addEventListener("playing", () => {
                btn.classList.remove("loading");
                btn.style.opacity = "0";
            });
            btn.addEventListener("click", (e) => {
                e.stopPropagation();

                if (video.paused) video.play().then(() => {});
                else video.pause();
            })
        });
    });
});
