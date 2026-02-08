// for the timer page section 2
let totalSeconds = 134; // 2 minutes 14 seconds
let currentSeconds = totalSeconds;
let timerInterval = null;

function goToTimer() {
    // Hide section 1, show section 2
    document.getElementById('section1').classList.remove('active');
    document.getElementById('section2').classList.add('active');
    
    // Start the timer automatically
    startTimer();
}

function updateDisplay() {
    const minutes = Math.floor(currentSeconds / 60);
    const seconds = currentSeconds % 60;
    const display = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    const timerElement = document.getElementById('timer');
    timerElement.textContent = display;

    // Change color based on time remaining
    timerElement.classList.remove('warning', 'critical');
    if (currentSeconds <= 10) {
        timerElement.classList.add('critical');
    } else if (currentSeconds <= 30) {
        timerElement.classList.add('warning');
    }
}

function startTimer() {
    timerInterval = setInterval(() => {
        currentSeconds--;
        updateDisplay();

        if (currentSeconds <= 0) {
            clearInterval(timerInterval);
            goToFinalLetter();
        }
    }, 1000);
}

function goToFinalLetter() {
    // Hide section 2, show section 3
    document.getElementById('section2').classList.remove('active');
    document.getElementById('section3').classList.add('active');
}

function goToLetter() {
    // Hide section 3, show section 4
    document.getElementById('section3').classList.remove('active');
    document.getElementById('section4').classList.add('active');
}

// Initialize display
updateDisplay();

// For the letter page section 4
const cards = document.querySelectorAll('.card');
        const backBtn = document.getElementById('backBtn');
        const nextBtn = document.getElementById('nextBtn');
        const indicator = document.getElementById('indicator');
        
        let currentIndex = 0;
        const totalCards = cards.length;

        function updateCards() {
            cards.forEach((card, index) => {
                // Remove all animation classes
                card.classList.remove('exit-left', 'exit-right');
                
                // Calculate position relative to current card
                const position = index - currentIndex;
                
                if (position < 0) {
                    // Cards that have been passed (hidden)
                    card.style.zIndex = 0;
                    card.style.transform = 'translateY(0) scale(1)';
                    card.style.opacity = '0';
                } else if (position === 0) {
                    // Current card (top)
                    card.style.zIndex = 3;
                    card.style.transform = 'translateY(0) scale(1)';
                    card.style.opacity = '1';
                } else if (position === 1) {
                    // Next card (middle)
                    card.style.zIndex = 2;
                    card.style.transform = 'translateY(10px) scale(0.95)';
                    card.style.opacity = '0.7';
                } else if (position === 2) {
                    // Card after next (bottom)
                    card.style.zIndex = 1;
                    card.style.transform = 'translateY(20px) scale(0.9)';
                    card.style.opacity = '0.5';
                } else {
                    // Cards further away (hidden)
                    card.style.zIndex = 0;
                    card.style.transform = 'translateY(20px) scale(0.9)';
                    card.style.opacity = '0';
                }
            });

            // Update buttons
            backBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex === totalCards - 1;
            
            // Update indicator
            indicator.textContent = `Card ${currentIndex + 1} of ${totalCards}`;
        }

        nextBtn.addEventListener('click', () => {
            if (currentIndex < totalCards - 1) {
                // Animate current card out
                cards[currentIndex].classList.add('exit-left');
                
                currentIndex++;
                
                setTimeout(() => {
                    updateCards();
                }, 50);
            }
        });

        backBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                
                // Bring back the previous card
                cards[currentIndex].classList.remove('exit-left');
                
                setTimeout(() => {
                    updateCards();
                }, 50);
            }
        });

    // Initialize
    updateCards();