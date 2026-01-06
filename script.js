// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animation on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.fade-in');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

window.addEventListener('scroll', animateOnScroll);

// Initialize animations on load
document.addEventListener('DOMContentLoaded', () => {
    animateOnScroll();
    
    // Set current year in footer
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});

/**
 * ===========================
 * GESTION DU FORMULAIRE DE CONTACT - Congo Mining
 * ===========================
 * 
 * OPTION 1: EmailJS (RECOMMANDÉ - Gratuit, pas de backend nécessaire)
 * OPTION 2: PHP Backend (Alternative)
 */

// ===========================
// CONFIGURATION
// ===========================

// Décommenter et configurer UNE SEULE option:

// OPTION 1: EmailJS
// 1. Créer un compte gratuit: https://www.emailjs.com/
// 2. Ajouter dans <head> du index.html:
//    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/index.min.js"></script>
// 3. Remplacer les clés ci-dessous

const USE_EMAILJS = false; // Mettre à true pour utiliser EmailJS
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; // Obtenir depuis EmailJS Dashboard
const EMAILJS_SERVICE_ID = 'service_xxxxxxxxx'; // ID du service
const EMAILJS_TEMPLATE_ID = 'template_xxxxxxxxx'; // ID du template

// OPTION 2: PHP Backend
const USE_PHP_BACKEND = true; // Mettre à true pour utiliser PHP

// ===========================
// CODE PRINCIPAL
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('#contact form');
    
    if (!contactForm) {
        console.log('Formulaire de contact non trouvé');
        return;
    }
    
    // Initialiser EmailJS si option sélectionnée
    if (USE_EMAILJS && typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
        console.log('EmailJS initialisé');
    }
    
    // Ajouter un conteneur pour les messages
    const alertContainer = document.createElement('div');
    alertContainer.className = 'alert-container';
    contactForm.insertBefore(alertContainer, contactForm.firstChild);
    
    // Ajouter les styles pour les alertes
    addAlertStyles();
    
    // Gestion de la soumission du formulaire
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Récupérer les valeurs du formulaire
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Valider les champs
        const validation = validateContactForm(name, email, phone, message);
        if (!validation.isValid) {
            showAlert(validation.error, 'error', alertContainer);
            return;
        }
        
        // Préparer les données
        const formData = { name, email, phone, message };
        
        // Bouton d'envoi
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Envoi en cours...';
        
        try {
            let success = false;
            
            if (USE_EMAILJS) {
                success = await sendWithEmailJS(formData);
            } else if (USE_PHP_BACKEND) {
                success = await sendWithPHP(formData);
            }
            
            if (success) {
                showAlert('✓ Votre message a été envoyé avec succès! Nous vous recontacterons rapidement.', 'success', alertContainer);
                contactForm.reset();
                
                // Fermer l'alerte après 5 secondes
                setTimeout(() => {
                    alertContainer.innerHTML = '';
                }, 5000);
            } else {
                showAlert('✗ Une erreur est survenue. Veuillez réessayer.', 'error', alertContainer);
            }
        } catch (error) {
            console.error('Erreur:', error);
            showAlert('✗ Erreur de connexion. Vérifiez votre connexion internet.', 'error', alertContainer);
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
    
    // Validation en temps réel pour l'email
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (this.value && !emailRegex.test(this.value)) {
                this.style.borderColor = '#dc2626';
            } else {
                this.style.borderColor = '';
            }
        });
    }
});

/**
 * Valider le formulaire de contact
 */
function validateContactForm(name, email, phone, message) {
    if (!name) {
        return { isValid: false, error: '⚠ Veuillez entrer votre nom' };
    }
    
    if (!email) {
        return { isValid: false, error: '⚠ Veuillez entrer votre email' };
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return { isValid: false, error: '⚠ Veuillez entrer une adresse email valide' };
    }
    
    if (!message) {
        return { isValid: false, error: '⚠ Veuillez entrer votre message' };
    }
    
    if (message.length < 10) {
        return { isValid: false, error: '⚠ Le message doit contenir au moins 10 caractères' };
    }
    
    return { isValid: true };
}

/**
 * Envoyer avec EmailJS
 */
async function sendWithEmailJS(formData) {
    try {
        const response = await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            {
                to_email: 'congominingcorporationsolution@gmail.com',
                from_name: formData.name,
                from_email: formData.email,
                phone: formData.phone || 'Non fourni',
                message: formData.message,
                reply_to: formData.email
            }
        );
        
        return response.status === 200;
    } catch (error) {
        console.error('Erreur EmailJS:', error);
        return false;
    }
}

/**
 * Envoyer avec PHP backend
 */
async function sendWithPHP(formData) {
    try {
        const response = await fetch('send-email.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        const result = await response.json();
        return result.success || false;
    } catch (error) {
        console.error('Erreur PHP:', error);
        return false;
    }
}

/**
 * Afficher un message d'alerte
 */
function showAlert(message, type, container) {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    
    container.innerHTML = '';
    container.appendChild(alert);
    
    // Animer l'apparition
    alert.style.animation = 'slideDown 0.3s ease';
}

/**
 * Ajouter les styles CSS pour les alertes
 */
function addAlertStyles() {
    if (!document.querySelector('style[data-alert-styles]')) {
        const style = document.createElement('style');
        style.setAttribute('data-alert-styles', 'true');
        style.textContent = `
            .alert-container {
                margin-bottom: 16px;
                min-height: 0;
                transition: all 0.3s ease;
            }
            
            .alert {
                padding: 12px 16px;
                border-radius: 8px;
                font-weight: 500;
                margin-bottom: 0;
                animation: slideDown 0.3s ease;
            }
            
            .alert-success {
                background-color: #d4edda;
                color: #155724;
                border: 1px solid #c3e6cb;
            }
            
            .alert-error {
                background-color: #f8d7da;
                color: #721c24;
                border: 1px solid #f5c6cb;
            }
            
            @keyframes slideDown {
                from {
                    opacity: 0;
                    transform: translateY(-10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

console.log('Script de formulaire chargé avec succès');