document.addEventListener("DOMContentLoaded", () => {

    const animatedElements = document.querySelectorAll(
        ".fade-in, .slide-left, .zoom-in"
    );

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }

        });

    }, {
        threshold: 0.2
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });

});