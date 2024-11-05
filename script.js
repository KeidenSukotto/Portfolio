let sections = document.querySelectorAll('section');
let currentSection = 0;
let touchStart = 0;
let isScrolling = false;

function scrollToSection(index) {
    if (index >= 0 && index < sections.length) {
        window.scrollTo({
            top: sections[index].offsetTop,
            behavior: 'smooth'
        });
        currentSection = index;
    }
}

window.addEventListener('wheel', (e) => {
    if (isScrolling) return;

    if (e.deltaY > 0) {
        if (currentSection < sections.length - 1) {
            isScrolling = true;
            scrollToSection(currentSection + 1);
        }
    } else {
        if (currentSection > 0) {
            isScrolling = true;
            scrollToSection(currentSection - 1);
        }
    }

    setTimeout(() => {
        isScrolling = false;
    }, 400);
});

window.addEventListener('touchstart', (e) => {
    touchStart = e.touches[0].clientY;
});

window.addEventListener('touchmove', (e) => {
    e.preventDefault();

    if (isScrolling) return;

    let touchEnd = e.touches[0].clientY;
    if (touchStart - touchEnd > 50) {
        if (currentSection < sections.length - 1) {
            isScrolling = true;
            scrollToSection(currentSection + 1);
        }
    } else if (touchEnd - touchStart > 50) {
        if (currentSection > 0) {
            isScrolling = true;
            scrollToSection(currentSection - 1);
        }
    }

    setTimeout(() => {
        isScrolling = false;
    }, 400);
});

window.addEventListener('keydown', (e) => {
    if (isScrolling) return;

    if (e.key === 'ArrowDown') {
        if (currentSection < sections.length - 1) {
            isScrolling = true;
            scrollToSection(currentSection + 1);
        }
    } else if (e.key === 'ArrowUp') {
        if (currentSection > 0) {
            isScrolling = true;
            scrollToSection(currentSection - 1);
        }
    }

    setTimeout(() => {
        isScrolling = false;
    }, 400);
});

const navLinks = document.querySelectorAll('.navlink a');

function updateActiveLink(sectionInView) {
    navLinks.forEach(link => {
        link.style.fontWeight = 'normal';
        link.style.color = '';
    });

    const activeLink = document.querySelector(`a[href="#${sectionInView.id}"]`);
    if (activeLink) {
        activeLink.style.fontWeight = 'medium';
        activeLink.style.color = 'white';
    }
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            updateActiveLink(entry.target);
        }
    });
}, {
    threshold: 0.5
});

sections.forEach(section => observer.observe(section));
