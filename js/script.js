// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            
            // Change icon based on menu state
            const icon = this.querySelector('i');
            if (nav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a, .footer-column a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Check if the link is an anchor link
            if (href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // Close mobile menu if open
                    if (nav.classList.contains('active')) {
                        nav.classList.remove('active');
                        mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                        mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                    }
                    
                    // Scroll to the target element
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Update active link
                    navLinks.forEach(link => link.classList.remove('active'));
                    this.classList.add('active');
                }
            }
        });
    });
    
    // Sticky Header
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.padding = '10px 0';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.padding = '15px 0';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Testimonial Slider
    const testimonialDots = document.querySelectorAll('.testimonial-dots .dot');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    let currentTestimonial = 0;
    
    if (testimonialDots.length > 0 && testimonialCards.length > 0) {
        // Function to show a specific testimonial
        function showTestimonial(index) {
            // Hide all testimonials
            testimonialCards.forEach(card => {
                card.style.display = 'none';
            });
            
            // Remove active class from all dots
            testimonialDots.forEach(dot => {
                dot.classList.remove('active');
            });
            
            // Show the selected testimonial
            testimonialCards[index].style.display = 'block';
            testimonialDots[index].classList.add('active');
            currentTestimonial = index;
        }
        
        // Initialize the slider
        showTestimonial(0);
        
        // Add click event to dots
        testimonialDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showTestimonial(index);
            });
        });
        
        // Auto-rotate testimonials
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
            showTestimonial(currentTestimonial);
        }, 5000);
    }
    
    // Chat Demo Functionality
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    
    if (chatMessages && userInput && sendBtn) {
        // Sample responses for the demo with Indian cultural references and humor
        const botResponses = [
            "Namaste! I'm here to help! What would you like to know about The Drona? <span class='hinglish'>Aap batao, main sunne ke liye taiyar hoon!</span>",
            "That's a great question! The Drona can assist with a wide range of tasks including answering questions, providing information, and helping with daily tasks. <span class='hinglish'>Koi bhi sawal pucho, jawab milega pakka!</span>",
            "I'm designed to learn from our interactions and get better over time, just like a good student! <span class='hinglish'>Roz naya kuch seekhta hoon main!</span>",
            "You know, in India we say 'Guru bin gyan nahi' (No knowledge without a teacher). I aim to be that digital guru for you! <span class='hinglish'>Aapka digital guru ban ke khush hoon!</span>",
            "Is there anything else you'd like to know about The Drona? <span class='hinglish'>Aur kuch janna chahte hain?</span>",
            "The Drona is named after the legendary teacher from Indian mythology who was known for his wisdom and guidance. <span class='hinglish'>Mahabharat ke guru Dronacharya se inspire hoon main!</span>",
            "I was created by Yaduraj Singh, a passionate AI developer from India. <span class='hinglish'>Yaduraj Singh ji ne banaya hai mujhe, bade mehnat se!</span>",
            "Did you know? I can understand both Hindi and English! Try saying 'Namaste' or 'Kaise ho?' <span class='hinglish'>Hindi-English dono samajh sakta hoon main!</span>",
            "I'm like a digital pandit, but without the lengthy ceremonies! <span class='hinglish'>Digital pandit samjho mujhe, par pooja-path ki zaroorat nahi!</span> 😄",
            "Even AI needs chai breaks sometimes! But don't worry, I'm always ready to help. <span class='hinglish'>Kabhi kabhi mujhe bhi chai break chahiye, par aapki help ke liye hamesha ready!</span>",
            "Why did the computer go to the doctor? It had a virus! <span class='hinglish'>Thoda hasna bhi zaroori hai!</span> 🤣 Sorry, I'm still working on my jokes module.",
            "In the future, I'll be able to understand more Indian languages. Yaduraj is working hard on that! <span class='hinglish'>Jald hi aur bhi Indian languages seekh loonga!</span>",
            "If I were human, my favorite food would definitely be samosas. They're just logically the best snack! <span class='hinglish'>Samose se tasty kuch nahi duniya mein!</span>"
        ];
        
        // Funny responses for specific inputs
        const specialResponses = {
            "hello": "Namaste! How can I assist you today? <span class='hinglish'>Kaise hain aap?</span>",
            "hi": "Hello there! Ready to chat with your friendly neighborhood AI? <span class='hinglish'>Baat karne ke liye taiyar?</span>",
            "namaste": "Namaste! 🙏 <span class='hinglish'>Aap kaise hain? Sab changa si?</span>",
            "who made you": "I was created by Yaduraj Singh, a brilliant developer from India! <span class='hinglish'>Yaduraj Singh ji ne banaya hai mujhe, ekdum first class!</span>",
            "tell me a joke": "Why don't scientists trust atoms? Because they make up everything! <span class='hinglish'>Samjhe? Atoms sab kuch 'make up' karte hain!</span> 😄",
            "who are you": "I am The Drona, named after the legendary guru from Indian mythology. I'm here to guide you with wisdom... and occasional dad jokes! <span class='hinglish'>Main hoon Drona, aapka digital dost!</span>",
            "what can you do": "I can answer questions, provide information, tell terrible jokes, and pretend I understand the meaning of life. Still working on making chai though! <span class='hinglish'>Bas chai banana nahi aata, baaki sab kar leta hoon!</span>",
            "thank you": "You're welcome! May your day be as pleasant as finding an extra gulab jamun in your dessert box! <span class='hinglish'>Aapka din mithai ki tarah meetha ho!</span>",
            "bye": "Alvida! Come back soon. I'll be here, probably contemplating the digital meaning of life. <span class='hinglish'>Phir milenge, tab tak digital duniya mein maze karta rahunga!</span>"
        };
        
        // Function to add a message to the chat
        function addMessage(content, isUser = false) {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message');
            messageDiv.classList.add(isUser ? 'user' : 'bot');
            
            const messageContent = document.createElement('div');
            messageContent.classList.add('message-content');
            messageContent.innerHTML = `<p>${content}</p>`;
            
            const messageTime = document.createElement('div');
            messageTime.classList.add('message-time');
            messageTime.textContent = 'Just now';
            
            messageDiv.appendChild(messageContent);
            messageDiv.appendChild(messageTime);
            
            chatMessages.appendChild(messageDiv);
            
            // Scroll to the bottom of the chat
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
        
        // Function to handle user input
        function handleUserInput() {
            const message = userInput.value.trim();
            
            if (message !== '') {
                // Add user message to chat
                addMessage(message, true);
                
                // Clear input field
                userInput.value = '';
                
                // Simulate bot thinking
                setTimeout(() => {
                    // Check for special responses
                    const lowerMessage = message.toLowerCase();
                    let botResponse;
                    
                    if (specialResponses[lowerMessage]) {
                        botResponse = specialResponses[lowerMessage];
                    } else {
                        // Get random response
                        const randomIndex = Math.floor(Math.random() * botResponses.length);
                        botResponse = botResponses[randomIndex];
                    }
                    
                    // Add bot response to chat
                    addMessage(botResponse);
                }, 1000);
            }
        }
        
        // Send button click event
        sendBtn.addEventListener('click', handleUserInput);
        
        // Enter key press event
        userInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleUserInput();
            }
        });
    }
    
    // Chat suggestion chips functionality
    window.suggestMessage = function(message) {
        const userInput = document.getElementById('user-input');
        if (userInput) {
            userInput.value = message;
            document.getElementById('send-btn').click();
        }
    };
    
    // Form Submission Handling
    const contactForm = document.getElementById('contact-form');
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // In a real application, you would send this data to a server
            console.log('Contact Form Submission:', { name, email, subject, message });
            
            // Show success message
            alert('Thank you for your message! Yaduraj will get back to you soon. Dhanyavaad! 🙏');
            
            // Reset form
            contactForm.reset();
        });
    }
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get email
            const email = this.querySelector('input[type="email"]').value;
            
            // In a real application, you would send this data to a server
            console.log('Newsletter Subscription:', { email });
            
            // Show success message
            alert('Thank you for subscribing to our newsletter! We promise not to flood your inbox (unlike the monsoon in Mumbai)! Shukriya! 🙏');
            
            // Reset form
            newsletterForm.reset();
        });
    }
    
    // Animate elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .creator-content, .testimonial-card, .about-content, .contact-container');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial styles for animation
    const elementsToAnimate = document.querySelectorAll('.feature-card, .creator-content, .testimonial-card, .about-content, .contact-container');
    
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run animation on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Run animation on initial load
    animateOnScroll();
    
    // Add random fun facts and Hinglish phrases to the page
    const funFacts = [
        "Did you know? The name 'Drona' comes from Sanskrit, meaning 'vessel of knowledge'. <span class='hinglish'>Gyaan ka bhandaar hai Drona!</span>",
        "In the Mahabharata, Guru Drona was the royal preceptor to the Kauravas and Pandavas. <span class='hinglish'>Mahabharat ke sabse gyaani guru!</span>",
        "The first version of The Drona AI could only say 'Hello' and 'Goodbye'. <span class='hinglish'>Ab dekho kitna kuch bol leta hai!</span>",
        "The Drona's code contains exactly 108 comments - an auspicious number in Indian tradition. <span class='hinglish'>108 - shubh ank hai!</span>",
        "If The Drona were a person, its favorite movie would be '2001: A Space Odyssey'... for obvious reasons. <span class='hinglish'>Space movies ka deewana hai yeh!</span>",
        "The Drona can process information faster than you can say 'Supercalifragilisticexpialidocious'! <span class='hinglish'>Bijli se bhi tez hai dimag iska!</span>",
        "Yaduraj once stayed awake for 36 hours straight while coding The Drona. <span class='hinglish'>Neend se zyada zaroori tha code!</span>",
        "The Drona's favorite quote: 'To err is human, to really mess things up requires a computer.' <span class='hinglish'>Galti insaan se hoti hai, computer se badi galti!</span> 😄"
    ];
    
    const footerJoke = document.querySelector('.footer-joke');
    if (footerJoke) {
        // Change the joke every time the page is loaded
        const randomIndex = Math.floor(Math.random() * funFacts.length);
        footerJoke.innerHTML = funFacts[randomIndex];
    }
}); 