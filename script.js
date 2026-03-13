// ==========================================
// 1. LANGUAGE LOGIC
// ==========================================
function changeLanguage() {
    const selectedLang = document.getElementById('lang-selector').value;
    localStorage.setItem('bm_language', selectedLang);
    
    const elements = document.querySelectorAll('[data-en]');
    
    elements.forEach(el => {
        if (el.getAttribute(`data-${selectedLang}`)) {
            el.innerText = el.getAttribute(`data-${selectedLang}`);
        }
    });
}

function applySavedLanguage() {
    const savedLang = localStorage.getItem('bm_language');
    if (savedLang) {
        const langSelector = document.getElementById('lang-selector');
        if (langSelector) {
            langSelector.value = savedLang;
        }
        changeLanguage();
    }
}

// Run this instantly
applySavedLanguage();

// ==========================================
// 2. PAYPAL CHECKOUT INTEGRATION
// ==========================================
const paypalContainer = document.getElementById('paypal-button-container');

if (paypalContainer) {
    paypalContainer.innerHTML = ''; 

    paypal.Buttons({
        createOrder: function(data, actions) {
            return actions.order.create({
                purchase_units: [{
                    amount: { value: '29.00' },
                    description: 'YouTube Content Creation Mastery - BM INSIGHTS'
                }]
            });
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
                // Save name for Certificate and Feedback page
                localStorage.setItem('bm_student_name', details.payer.name.given_name + ' ' + details.payer.name.surname);
                
                alert('Payment successful! Thank you, ' + details.payer.name.given_name + '. Welcome to BM INSIGHTS.');
                window.location.href = "success.html"; 
            });
        },
        onError: function(err) {
            console.error('Payment Error:', err);
            alert('There was an error processing your payment. Please try again.');
        }
    }).render('#paypal-button-container'); 
}

// ==========================================
// 3. WHATSAPP CONTACT LOGIC
// ==========================================
function contactSupport() {
    const phone = "254795902869"; // Replace with your actual number
    const msg = encodeURIComponent("Hello BM INSIGHTS! I'm interested in a course but don't have PayPal.");
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
}

// ==========================================
// 4. FEEDBACK SUBMISSION LOGIC
// ==========================================
function submitFeedback() {
    const name = document.getElementById('studentName').value;
    const review = document.getElementById('studentReview').value;
    
    const selectedStar = document.querySelector('input[name="rating"]:checked');
    const ratingValue = selectedStar ? selectedStar.value : "5"; 

    if (!name || !review) {
        alert("Please fill in your name and review before submitting!");
        return;
    }

    const starString = "⭐".repeat(parseInt(ratingValue));
    const phone = "254795902869"; // REPLACE WITH YOUR ACTUAL NUMBER
    const message = `*New Course Feedback!*\n\n*Name:* ${name}\n*Rating:* ${ratingValue}/5 ${starString}\n*Review:* ${review}`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phone}?text=${encodedMessage}`, '_blank');
}