const menuItems = [
  { id: 'sourdough', name: 'Country Sourdough Loaf', price: 8.50 },
  { id: 'croissant', name: 'Butter Croissant Box', price: 14.00 },
  { id: 'cookies', name: 'Artisan Cookie Dozen', price: 18.00 }
];
const form = document.getElementById('preOrderForm');
const fullNameInput = document.getElementById('fullName');
const emailInput = document.getElementById('email');
const itemSelect = document.getElementById('itemSelect');
const quantityInput = document.getElementById('quantity');
const pickupDateInput = document.getElementById('pickupDate');
const totalEstimateSpan = document.getElementById('totalEstimate');
const successMessage = document.getElementById('formSuccess');
window.addEventListener('DOMContentLoaded', () => {
  const savedName = localStorage.getItem('bakery_customer_name');
  const savedEmail = localStorage.getItem('bakery_customer_email');

  if (savedName) fullNameInput.value = savedName;
  if (savedEmail) emailInput.value = savedEmail;
});
function calculateTotal() {
  const selectedId = itemSelect.value;
  const qty = parseInt(quantityInput.value, 10) || 0;
  
  const selectedProduct = menuItems.find(item => item.id === selectedId);
  
  if (selectedProduct && qty > 0) {
    const total = selectedProduct.price * qty;
    totalEstimateSpan.textContent = total.toFixed(2);
  } else {
    totalEstimateSpan.textContent = '0.00';
  }
}
itemSelect.addEventListener('change', calculateTotal);
quantityInput.addEventListener('input', calculateTotal);
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
function clearErrors() {
  document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
  if (successMessage) successMessage.textContent = '';
}
form.addEventListener('submit', (e) => {
  e.preventDefault();
  clearErrors();
  let isValid = true;
  if (fullNameInput.value.trim() === '') {
    document.getElementById('nameError').textContent = 'Full name is required.';
    isValid = false;
  }

  if (!validateEmail(emailInput.value.trim())) {
    document.getElementById('emailError').textContent = 'Please enter a valid email address.';
    isValid = false;
  }

  if (itemSelect.value === '') {
    document.getElementById('itemError').textContent = 'Please select an item from the menu.';
    isValid = false;
  }

  if (pickupDateInput.value === '') {
    document.getElementById('dateError').textContent = 'Please select a pickup date.';
    isValid = false;
  }

  if (isValid) {
    localStorage.setItem('bakery_customer_name', fullNameInput.value.trim());
    localStorage.setItem('bakery_customer_email', emailInput.value.trim());

    successMessage.textContent = 'Thank you! Your pre-order request has been received.';
    form.reset();
    totalEstimateSpan.textContent = '0.00';
  }
});