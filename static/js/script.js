// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // File upload display
    const fileInput = document.getElementById('resumeFile');
    const fileDisplay = document.querySelector('.file-upload-display span');
    
    if (fileInput && fileDisplay) {
        fileInput.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                fileDisplay.textContent = this.files[0].name;
                fileDisplay.style.color = '#1e3a8a';
            } else {
                fileDisplay.textContent = 'Choose PDF file or drag and drop';
                fileDisplay.style.color = '#6b7280';
            }
        });
    }
    
    // Form submission
    const resumeForm = document.getElementById('resumeForm');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const errorMessage = document.getElementById('errorMessage');
    const resultsSection = document.getElementById('resultsSection');
    
    if (resumeForm) {
        resumeForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Hide previous results and errors
            hideElement(errorMessage);
            hideElement(resultsSection);
            
            // Show loading spinner
            showElement(loadingSpinner);
            
            // Disable submit button
            const submitBtn = resumeForm.querySelector('.submit-btn');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Analyzing...</span>';
            
            try {
                const formData = new FormData(resumeForm);
                
                const response = await fetch('/analyze', {
                    method: 'POST',
                    body: formData
                });
                
                const result = await response.json();
                
                if (result.success) {
                    displayResults(result);
                } else {
                    showError(result.error || 'An error occurred during analysis.');
                }
                
            } catch (error) {
                console.error('Error:', error);
                showError('Network error. Please check your connection and try again.');
            } finally {
                // Hide loading spinner and re-enable button
                hideElement(loadingSpinner);
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-search"></i><span>Analyze Resume</span>';
            }
        });
    }
    
    // FAQ item interactions
    document.querySelectorAll('.faq-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
});

// Helper functions
function showElement(element) {
    if (element) {
        element.style.display = 'block';
    }
}

function hideElement(element) {
    if (element) {
        element.style.display = 'none';
    }
}

function showError(message) {
    const errorMessage = document.getElementById('errorMessage');
    if (errorMessage) {
        errorMessage.querySelector('span').textContent = message;
        showElement(errorMessage);
        
        // Scroll to error message
        errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

function displayResults(result) {
    const resultsSection = document.getElementById('resultsSection');
    const analysisResult = document.getElementById('analysisResult');
    const matchChart = document.getElementById('matchChart');
    
    if (resultsSection && analysisResult) {
        // Display analysis text
        analysisResult.innerHTML = formatAnalysisText(result.analysis);
        
        // Display chart if available
        if (matchChart && result.chart) {
            matchChart.src = `data:image/png;base64,${result.chart}`;
            matchChart.alt = `Match Percentage: ${result.match_percentage}%`;
        }
        
        // Show results section
        showElement(resultsSection);
        
        // Scroll to results
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Add animation to results
        resultsSection.style.opacity = '0';
        resultsSection.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            resultsSection.style.transition = 'all 0.5s ease';
            resultsSection.style.opacity = '1';
            resultsSection.style.transform = 'translateY(0)';
        }, 100);
    }
}

function formatAnalysisText(text) {
    // Basic formatting for the analysis text
    return text
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n/g, '<br>')
        .replace(/^/, '<p>')
        .replace(/$/, '</p>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>');
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    }
});

// Add loading animation to buttons
document.querySelectorAll('button, .cta-button').forEach(button => {
    button.addEventListener('click', function() {
        if (!this.disabled) {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        }
    });
});

// Intersection Observer for animations
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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.offerings-text, .analyzer-form, .faq-text');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});

// Form validation
function validateForm() {
    const jobDescription = document.getElementById('jobDescription').value.trim();
    const resumeFile = document.getElementById('resumeFile').files[0];
    
    if (!jobDescription) {
        showError('Please enter a job description.');
        return false;
    }
    
    if (!resumeFile) {
        showError('Please upload a resume file.');
        return false;
    }
    
    if (resumeFile.type !== 'application/pdf') {
        showError('Please upload a PDF file.');
        return false;
    }
    
    if (resumeFile.size > 16 * 1024 * 1024) { // 16MB limit
        showError('File size must be less than 16MB.');
        return false;
    }
    
    return true;
}

// Drag and drop functionality
const fileUploadWrapper = document.querySelector('.file-upload-wrapper');
const fileUploadDisplay = document.querySelector('.file-upload-display');

if (fileUploadWrapper && fileUploadDisplay) {
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        fileUploadWrapper.addEventListener(eventName, preventDefaults, false);
    });
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    ['dragenter', 'dragover'].forEach(eventName => {
        fileUploadWrapper.addEventListener(eventName, highlight, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        fileUploadWrapper.addEventListener(eventName, unhighlight, false);
    });
    
    function highlight() {
        fileUploadDisplay.style.borderColor = '#1e3a8a';
        fileUploadDisplay.style.background = '#f0f9ff';
    }
    
    function unhighlight() {
        fileUploadDisplay.style.borderColor = '#d1d5db';
        fileUploadDisplay.style.background = '';
    }
    
    fileUploadWrapper.addEventListener('drop', handleDrop, false);
    
    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        
        if (files.length > 0) {
            const fileInput = document.getElementById('resumeFile');
            fileInput.files = files;
            
            // Trigger change event
            const event = new Event('change', { bubbles: true });
            fileInput.dispatchEvent(event);
        }
    }
}