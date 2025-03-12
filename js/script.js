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
        // Sample responses for the demo
        const botResponses = [
            "I'm here to help! What would you like to know about The Drona?",
            "That's a great question! The Drona can assist with a wide range of tasks including answering questions, providing information, and helping with daily tasks.",
            "I'm designed to learn from our interactions and get better over time.",
            "You can use The Drona on web, mobile, and desktop platforms with our premium plans.",
            "Is there anything else you'd like to know about The Drona?",
            "The Drona is named after the legendary teacher from Indian mythology who was known for his wisdom and guidance.",
            "Our team of AI experts has been developing The Drona for over three years."
        ];
        
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
                    // Get random response
                    const randomIndex = Math.floor(Math.random() * botResponses.length);
                    const botResponse = botResponses[randomIndex];
                    
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
            alert('Thank you for your message! We will get back to you soon.');
            
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
            alert('Thank you for subscribing to our newsletter!');
            
            // Reset form
            newsletterForm.reset();
        });
    }
    
    // Animate elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .pricing-card, .testimonial-card, .about-content, .contact-container');
        
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
    const elementsToAnimate = document.querySelectorAll('.feature-card, .pricing-card, .testimonial-card, .about-content, .contact-container');
    
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run animation on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Run animation on initial load
    animateOnScroll();
}); 