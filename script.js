/* ============================================
   SAVE THE BEES - Interactive Features
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    initializeButtons();
    initializeObserver();
});

/* Initialize Button Functionality */
function initializeButtons() {
    const shareBtn = document.querySelector('.btn-primary');
    const learnMoreBtn = document.querySelector('.btn-secondary');

    if (shareBtn) {
        shareBtn.addEventListener('click', function() {
            shareContent();
        });
    }

    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', function() {
            scrollToSection('solutions-section');
        });
    }
}

/* Share Content Function */
function shareContent() {
    const shareText = "Save the Bees - Let your garden grow wild and help protect our pollinators! 🐝 Simple actions, lasting impact. Learn how you can help at Save the Bees campaign.";
    
    if (navigator.share) {
        navigator.share({
            title: 'Save the Bees',
            text: shareText,
            url: window.location.href
        }).catch(err => {
            // User cancelled or error occurred
            console.log('Share cancelled or error:', err);
            fallbackShare(shareText);
        });
    } else {
        fallbackShare(shareText);
    }
}

/* Fallback Share Function */
function fallbackShare(text) {
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(shareUrl, '_blank', 'width=550,height=420');
}

/* Smooth Scroll to Section */
function scrollToSection(sectionClass) {
    const section = document.querySelector('.' + sectionClass);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

/* Intersection Observer for Fade-in Effects */
function initializeObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe solution elements
    const solutions = document.querySelectorAll('.solution');
    const cards = document.querySelectorAll('.card');

    solutions.forEach(solution => {
        solution.style.opacity = '0';
        solution.style.transform = 'translateY(20px)';
        solution.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(solution);
    });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

/* Keyboard Navigation Enhancement */
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        // Close any open modals if they exist
        console.log('Escape key pressed');
    }
});
