// Configuration de la date cible - 1er mars 2026 à minuit
const targetDate = new Date('2026-03-01 00:00:00').getTime();

// Fonction pour créer les cœurs flottants
function createFloatingHeart() {
    const hearts = ['❤️', '💕', '💖', '💝', '🌹', '✨', '🎈', '💌', '🎀', '🌸'];
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDelay = Math.random() * 3 + 's';
    heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
    
    document.getElementById('floatingHearts').appendChild(heart);
    
    // Supprimer le cœur après l'animation
    setTimeout(() => {
        if (heart.parentNode) {
            heart.remove();
        }
    }, 8000);
}

// Fonction pour créer des confettis lors de la célébration
function createConfetti() {
    const confetti = ['🎉', '🎊', '✨', '🌟', '💫', '🎈', '🎁', '🌈'];
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const confettiElement = document.createElement('div');
            confettiElement.className = 'heart';
            confettiElement.textContent = confetti[Math.floor(Math.random() * confetti.length)];
            confettiElement.style.left = Math.random() * 100 + '%';
            confettiElement.style.animationDelay = '0s';
            confettiElement.style.animationDuration = '3s';
            confettiElement.style.fontSize = (Math.random() * 20 + 15) + 'px';
            
            document.getElementById('floatingHearts').appendChild(confettiElement);
            
            setTimeout(() => {
                if (confettiElement.parentNode) {
                    confettiElement.remove();
                }
            }, 4000);
        }, i * 200);
    }
}

// Fonction principale du compte à rebours
function updateCountdown() {
    const now = new Date().getTime();
    const timeLeft = targetDate - now;
    
    if (timeLeft > 0) {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        // Mise à jour des éléments avec une animation si le nombre change
        updateTimeElement('days', days);
        updateTimeElement('hours', hours);
        updateTimeElement('minutes', minutes);
        updateTimeElement('seconds', seconds);
        
    } else {
        // Le compte à rebours est terminé
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        
        // Afficher la célébration
        document.getElementById('celebration').style.display = 'flex';
        
        // Créer des confettis
        createConfetti();
        
        // Arrêter la création de cœurs flottants normaux
        clearInterval(heartInterval);
        clearInterval(countdownInterval);
    }
}

// Fonction pour mettre à jour un élément de temps avec animation
function updateTimeElement(elementId, newValue) {
    const element = document.getElementById(elementId);
    const currentValue = element.textContent;
    const formattedValue = newValue.toString().padStart(2, '0');
    
    if (currentValue !== formattedValue) {
        element.style.transform = 'scale(1.1)';
        element.style.color = '#ffeb3b';
        
        setTimeout(() => {
            element.textContent = formattedValue;
            element.style.transform = 'scale(1)';
            element.style.color = 'white';
        }, 150);
    }
}

// Fonction pour gérer la visibilité de la page
function handleVisibilityChange() {
    if (document.visibilityState === 'visible') {
        // Redémarrer les animations quand la page redevient visible
        updateCountdown();
    }
}

// Fonction d'initialisation
function init() {
    // Mettre à jour le compte à rebours immédiatement
    updateCountdown();
    
    // Démarrer les intervalles
    window.countdownInterval = setInterval(updateCountdown, 1000);
    window.heartInterval = setInterval(createFloatingHeart, 1200);
    
    // Ajouter quelques cœurs initiaux
    for (let i = 0; i < 5; i++) {
        setTimeout(createFloatingHeart, i * 800);
    }
    
    // Gérer la visibilité de la page
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Gérer le redimensionnement de la fenêtre
    window.addEventListener('resize', function() {
        // Recalculer les positions si nécessaire
        const hearts = document.querySelectorAll('.heart');
        hearts.forEach(heart => {
            if (parseFloat(heart.style.left) > 100) {
                heart.style.left = '95%';
            }
        });
    });
}

// Fonction pour nettoyer les ressources
function cleanup() {
    if (window.countdownInterval) {
        clearInterval(window.countdownInterval);
    }
    if (window.heartInterval) {
        clearInterval(window.heartInterval);
    }
}

// Gérer le déchargement de la page
window.addEventListener('beforeunload', cleanup);

// Démarrer l'application quand le DOM est chargé
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Fonctions utilitaires pour le debugging (optionnel)
function getTimeRemaining() {
    const now = new Date().getTime();
    const timeLeft = targetDate - now;
    return {
        total: timeLeft,
        days: Math.floor(timeLeft / (1000 * 60 * 60 * 24)),
        hours: Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((timeLeft % (1000 * 60)) / 1000)
    };
}

// Fonction pour tester la célébration (pour le développement)
function testCelebration() {
    document.getElementById('celebration').style.display = 'flex';
    createConfetti();
}

// Rendre certaines fonctions disponibles globalement pour le debugging
window.getTimeRemaining = getTimeRemaining;
window.testCelebration = testCelebration;