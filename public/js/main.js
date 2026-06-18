document.addEventListener('DOMContentLoaded', function() {
  // Add fade-in animation to sections
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    section.classList.add('fade-in');
  });

  // Initialize tooltips
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Auto-hide success alerts after 5 seconds
  const successAlerts = document.querySelectorAll('.alert');
  successAlerts.forEach(alert => {
    setTimeout(() => {
      // Fade out alert nicely using bootstrap close if it exists
      if (alert.classList.contains('show')) {
        const bsAlert = new bootstrap.Alert(alert);
        bsAlert.close();
      }
    }, 5000);
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Mobile menu toggle
  const navbarToggler = document.querySelector('.navbar-toggler');
  if (navbarToggler) {
    navbarToggler.addEventListener('click', function() {
      document.body.classList.toggle('mobile-menu-open');
    });
  }

  // Back to top button
  const backToTopBtn = document.createElement('button');
  backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  backToTopBtn.className = 'btn btn-success back-to-top';
  backToTopBtn.style.position = 'fixed';
  backToTopBtn.style.bottom = '20px';
  backToTopBtn.style.right = '20px';
  backToTopBtn.style.display = 'none';
  backToTopBtn.style.zIndex = '99';
  backToTopBtn.style.width = '42px';
  backToTopBtn.style.height = '42px';
  backToTopBtn.style.borderRadius = '50%';
  backToTopBtn.style.padding = '0';
  document.body.appendChild(backToTopBtn);

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.style.display = 'block';
    } else {
      backToTopBtn.style.display = 'none';
    }
  });

  // Password Visibility Toggle
  const togglePasswordBtns = document.querySelectorAll('.btn-toggle-password');
  togglePasswordBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('data-target');
      const passwordInput = document.getElementById(targetId);
      const icon = this.querySelector('i');
      
      if (passwordInput) {
        if (passwordInput.type === 'password') {
          passwordInput.type = 'text';
          icon.classList.remove('fa-eye');
          icon.classList.add('fa-eye-slash');
        } else {
          passwordInput.type = 'password';
          icon.classList.remove('fa-eye-slash');
          icon.classList.add('fa-eye');
        }
      }
    });
  });

  // Form Validation & Button Spinner
  const forms = document.querySelectorAll('.needs-validation');
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        // Form is valid - display a nice spinner on the submit button
        const submitBtn = form.querySelector('[type="submit"]');
        if (submitBtn) {
          // Store original text
          const originalText = submitBtn.innerHTML;
          submitBtn.disabled = true;
          submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Processing...';
          
          // Re-enable after 6 seconds in case submit hangs or is handled via AJAX/redirect
          setTimeout(() => {
            if (submitBtn.disabled) {
              submitBtn.disabled = false;
              submitBtn.innerHTML = originalText;
            }
          }, 6000);
        }
      }
      form.classList.add('was-validated');
    }, false);
  });

  // Light/Dark Theme Toggle
  const themeToggleBtn = document.getElementById('theme-toggle');
  const darkIcon = document.getElementById('theme-toggle-dark-icon');
  const lightIcon = document.getElementById('theme-toggle-light-icon');

  if (themeToggleBtn && darkIcon && lightIcon) {
    // Function to update the toggler button icons based on current theme
    function updateThemeToggleIcons(theme) {
      if (theme === 'dark') {
        darkIcon.style.display = 'none';
        lightIcon.style.display = 'inline-block';
      } else {
        lightIcon.style.display = 'none';
        darkIcon.style.display = 'inline-block';
      }
    }

    // Initialize state
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    updateThemeToggleIcons(currentTheme);

    // Event listener for click
    themeToggleBtn.addEventListener('click', function() {
      const activeTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeToggleIcons(newTheme);
    });
  }

  // Logout Trigger and Confirmation Modal
  const logoutTriggers = document.querySelectorAll('.btn-logout-trigger');
  const confirmLogoutBtn = document.getElementById('confirm-logout-btn');
  
  if (logoutTriggers.length > 0) {
    const logoutModalElement = document.getElementById('logoutConfirmationModal');
    if (logoutModalElement) {
      const logoutModal = new bootstrap.Modal(logoutModalElement);
      logoutTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
          e.preventDefault();
          logoutModal.show();
        });
      });
    }
  }

  if (confirmLogoutBtn) {
    confirmLogoutBtn.addEventListener('click', function() {
      localStorage.setItem('showLogoutToast', 'true');
    });
  }

  // Check and Display Logout Toast
  if (localStorage.getItem('showLogoutToast') === 'true') {
    localStorage.removeItem('showLogoutToast');
    
    // Create a beautiful toast element dynamically
    const toastContainer = document.createElement('div');
    toastContainer.style.position = 'fixed';
    toastContainer.style.top = '24px';
    toastContainer.style.right = '24px';
    toastContainer.style.zIndex = '9999';
    
    const toast = document.createElement('div');
    toast.className = 'alert alert-success border-0 shadow-lg py-3 px-4 d-flex align-items-center fade-in';
    toast.style.borderRadius = 'var(--radius-md)';
    toast.style.margin = '0';
    toast.style.minWidth = '320px';
    toast.style.backgroundColor = 'var(--card-bg)';
    toast.style.border = '1px solid var(--border-color)';
    toast.innerHTML = `
      <div class="bg-success-subtle rounded-circle p-2 me-3 d-flex align-items-center justify-content-center" style="width: 40px; height: 40px; background-color: var(--accent-subtle) !important;">
        <i class="fas fa-check-circle text-success fs-5"></i>
      </div>
      <div>
        <h6 class="fw-bold mb-0 text-success" style="font-size: 0.95rem;">Success</h6>
        <span class="small text-muted" style="font-size: 0.825rem; color: var(--dark-subtle) !important;">You have logged out successfully.</span>
      </div>
    `;
    
    toastContainer.appendChild(toast);
    document.body.appendChild(toastContainer);
    
    // Remove toast after 4 seconds
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => {
        toastContainer.remove();
      }, 300);
    }, 4000);
  }
});