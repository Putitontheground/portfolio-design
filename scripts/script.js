document.addEventListener('DOMContentLoaded', function () {
    const stackWrappers = document.querySelectorAll('#image-stack-wrapper');
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    console.log("Found stack wrappers:", stackWrappers.length); // Log the count of found wrappers

    stackWrappers.forEach((wrapper, wrapperIndex) => {
        const images = wrapper.querySelectorAll('img');
        const numImages = images.length - 1;

        console.log(`Wrapper ${wrapperIndex + 1}: Found images:`, images.length); // Log per-wrapper image count

        if (isMobile) {
            let currentIndex = 0;
            let autoPlayInterval;

            const startAutoPlay = () => {
                autoPlayInterval = setInterval(() => {
                    images.forEach((img, idx) => {
                        img.style.opacity = idx === currentIndex ? 1 : 0;
                    });
                    currentIndex = (currentIndex + 1) % (numImages + 1);
                }, 2000); // Change image every 2 seconds
            };

            const stopAutoPlay = () => {
                clearInterval(autoPlayInterval);
            };

            startAutoPlay();

            wrapper.addEventListener('touchstart', () => {
                stopAutoPlay();
            });

            wrapper.addEventListener('touchend', () => {
                startAutoPlay();
            });
        } else {
            wrapper.addEventListener('mousemove', function (e) {
                const bounds = this.getBoundingClientRect();
                const x = e.clientX - bounds.left;
                const width = bounds.width;
                const index = Math.floor((x / width) * numImages);

                console.log(`Wrapper ${wrapperIndex + 1}: Mouse at ${x}, index ${index}`); // Log the index being set

                images.forEach((img, idx) => {
                    img.style.opacity = idx <= index ? 1 : 0;
                });
            });

            wrapper.addEventListener('mouseleave', function () {
                console.log(`Wrapper ${wrapperIndex + 1}: Mouse left`); // Log mouse leave
                images.forEach(img => {
                    img.style.opacity = 0;
                });
            });

            wrapper.addEventListener('mouseenter', function () {
                console.log(`Wrapper ${wrapperIndex + 1}: Mouse enter`); // Log mouse enter
                images[0].style.opacity = 1;
            });
        }
    });
});
