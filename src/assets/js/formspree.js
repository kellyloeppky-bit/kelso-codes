// Handle Formspree submission with custom success message
const form = document.getElementById('subscribeForm');
const emailInput = document.getElementById('emailInput');
const submitBtn = document.getElementById('submitBtn');
const successMsg = document.getElementById('successMsg');
const errorMsg = document.getElementById('errorMsg');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Reset states
  emailInput.style.borderColor = '';
  errorMsg.style.display = 'none';
  successMsg.style.display = 'none';

  // Disable button during submission
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';

  const formData = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      // Success - hide form and show success message
      form.style.display = 'none';
      successMsg.style.display = 'block';
    } else {
      // Server responded but with an error
      const data = await response.json();
      emailInput.style.borderColor = '#8b4a4a';
      errorMsg.textContent = data.error || 'Something went wrong. Please try again.';
      errorMsg.style.display = 'block';
      submitBtn.disabled = false;
      submitBtn.textContent = 'Follow Along';
    }
  } catch (error) {
    // Network error or other fetch failure
    console.error('Submission error:', error);
    emailInput.style.borderColor = '#8b4a4a';
    errorMsg.textContent = 'Network error. Please check your connection and try again.';
    errorMsg.style.display = 'block';
    submitBtn.disabled = false;
    submitBtn.textContent = 'Follow Along';
  }
});
