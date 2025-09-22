 (function () {
      const navToggle = document.getElementById('navToggle');
      const nav = document.querySelector('header nav');

      navToggle.addEventListener('click', () => {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', !isExpanded);
        nav.classList.toggle('is-open');

        // Optional: Change the icon
        const icon = navToggle.querySelector('i');
        if (nav.classList.contains('is-open')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-xmark');
        } else {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      });

      // Close nav when a link is clicked
      document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
          nav.classList.remove('is-open');
          navToggle.setAttribute('aria-expanded', 'false');
          navToggle.querySelector('i').classList.remove('fa-xmark');
          navToggle.querySelector('i').classList.add('fa-bars');
        });
      });
    })();
    // Dark mode toggle with persistence
    (function () {
      const toggle = document.getElementById('darkToggle');
      const body = document.body;
      const saved = localStorage.getItem('prefers-dark');
      if (saved === '1') { body.classList.add('dark'); toggle.innerHTML = '<i class="fa-solid fa-sun"></i>'; toggle.setAttribute('aria-pressed', 'true'); }

      toggle.addEventListener('click', () => {
        const isDark = body.classList.toggle('dark');
        toggle.innerHTML = isDark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
        toggle.setAttribute('aria-pressed', isDark ? 'true' : 'false');
        localStorage.setItem('prefers-dark', isDark ? '1' : '0');
      });
    })();



    (() => {
      const url = 'https://script.google.com/macros/s/AKfycbzlgbfnID506vv3WSpURb1n1nQvm7lqYNiFkehvpQwZasB_o_evpinLwVP0nkjGq6HW/exec';
      const form = document.forms['contact-form'];
      const modal = document.getElementById('response-modal');
      const modalStatus = document.getElementById('modal-status');

    
      window.showModal = (message) => {
        modalStatus.textContent = message;
        modal.style.display = 'flex';
        modal.style.color = "#1e0707ff";
        modal.style.fontWeight = "bold";
      
      };

      // Function to close the modal
      window.closeModal = () => {
        modal.style.display = 'none';
      };

      form.onsubmit = async e => {
        e.preventDefault();
        showModal('Sending…'); // Show modal with sending message

        try {
          const res = await fetch(url, { method: 'POST', body: new FormData(form) });
          if (res.ok) {
            showModal('Message sent successfully — thank you!  😄 ');
            form.reset(); 
          } else {
            const errorText = await res.text();
            showModal(`There was an issue sending your message. Please try again later. 😔 ${errorText ? `(${errorText})` : ''}`);
          }
        } catch (err) {
          console.error(err);
          showModal('Error sending message. Please check your script URL and CORS settings. 😟');
        }
      };

      
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeModal();
        }
      });

      // Optional: Close modal if Escape key is pressed
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
          closeModal();
        }
      });

    })();