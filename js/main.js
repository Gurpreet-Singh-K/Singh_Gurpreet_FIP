const navLinks = document.querySelectorAll('.bottom-nav a');
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
navLinks.forEach(link => {
  if (link.getAttribute('href') === currentPage) {
    link.classList.add('active');
  }
});

const searchInput = document.querySelector('.search');
const productCards = document.querySelectorAll('.product-card');
if (searchInput && productCards.length) {
  searchInput.placeholder = 'Search products…';
  searchInput.addEventListener('input', () => {
    const term = searchInput.value.trim().toLowerCase();
    productCards.forEach(card => {
      const altText = card.querySelector('img').alt.toLowerCase();
      card.style.display = altText.includes(term) ? '' : 'none';
    });
  });
}

const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', event => {
    event.preventDefault();
    const fields = [
      { selector: '#firstName', name: 'First Name' },
      { selector: '#lastName',  name: 'Last Name' },
      { selector: '#email',     name: 'Email Address',
        validate: val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) },
      { selector: '#message',   name: 'Message' }
    ];
    const errors = [];
    fields.forEach(field => {
      const input = document.querySelector(field.selector);
      const value = input.value.trim();
      if (!value || (field.validate && !field.validate(value))) {
        errors.push(field.name);
      }
    });
    if (errors.length) {
      alert('Please fill out: ' + errors.join(', '));
    } else {
      alert('Thanks for reaching out! We’ve received your message.');
      form.reset();
    }
  });
}

const canImages = document.querySelectorAll('.product-card img');
canImages.forEach(img => {
  img.style.transition = 'box-shadow 0.3s ease';
  img.addEventListener('mouseenter', () => {
    img.style.boxShadow = '0 8px 16px rgba(0,0,0,0.3)';
  });
  img.addEventListener('mouseleave', () => {
    img.style.boxShadow = 'none';
  });
});


const cartLink = Array.from(navLinks).find(a => a.textContent.trim().startsWith('Cart'));
let cartCount = 0;
if (productCards.length && cartLink) {
  const updateCartText = () => {
    cartLink.textContent = `Cart (${cartCount})`;
  };
  productCards.forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
      cartCount++;
      updateCartText();
      const toast = document.createElement('div');
      toast.textContent = 'Added to cart!';
      Object.assign(toast.style, {
        position: 'fixed',
        bottom: '3rem',
        left: '50%',
        transform: 'translateX(-50%)',
        background: '#333333',
        color: '#ffffff',
        padding: '0.5rem 1rem',
        borderRadius: '4px',
        opacity: '0',
        transition: 'opacity 0.3s ease',
        zIndex: '1000'
      });
      document.body.appendChild(toast);
      requestAnimationFrame(() => toast.style.opacity = '1');
      setTimeout(() => {
        toast.style.opacity = '0';
        toast.addEventListener('transitionend', () => toast.remove());
      }, 2000);
    });
  });
}
