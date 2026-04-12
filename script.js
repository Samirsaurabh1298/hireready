// ===== MOBILE MENU =====
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  const btn = document.querySelector('.hamburger');
  if (!menu) return;
  const isOpen = menu.classList.toggle('open');
  if (btn) btn.setAttribute('aria-expanded', isOpen);
}

// Close mobile menu on outside click
document.addEventListener('click', function (e) {
  const menu = document.getElementById('mobileMenu');
  const hamburger = document.querySelector('.hamburger');
  if (menu && hamburger && menu.classList.contains('open') &&
      !menu.contains(e.target) && !hamburger.contains(e.target)) {
    menu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }
});

// ===== MULTI-STEP FORM =====
const totalSteps = 3;

function setStep(stepNum) {
  // Hide all steps
  document.querySelectorAll('.form-step').forEach(s => s.classList.remove('active'));
  // Show current
  const current = document.getElementById('step' + stepNum);
  if (current) current.classList.add('active');

  // Update progress steps and connectors
  document.querySelectorAll('.progress-step').forEach(el => {
    const n = parseInt(el.dataset.step);
    el.classList.remove('active', 'done');
    el.removeAttribute('aria-current');
    if (n === stepNum) { el.classList.add('active'); el.setAttribute('aria-current', 'step'); }
    if (n < stepNum) el.classList.add('done');
  });
  document.querySelectorAll('.progress-connector').forEach((el, i) => {
    el.classList.toggle('done', i + 1 < stepNum);
  });

  // Scroll to top of form
  const wrapper = document.getElementById('formWrapper');
  if (wrapper) wrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function validateStep(stepNum) {
  let valid = true;

  if (stepNum === 1) {
    valid = requireField('fullName', 'Full name is required') && valid;
    valid = requireEmail('email', 'Valid email is required') && valid;
    valid = requirePhone('phone', 'Valid phone number is required') && valid;
    valid = requireField('currentLocation', 'Current location is required') && valid;
    valid = requireField('preferredLocation', 'Preferred job location is required') && valid;
  }

  if (stepNum === 2) {
    valid = requireField('currentRole', 'Current role is required') && valid;
    valid = requireSelect('experience', 'Please select your experience') && valid;
    valid = requireField('skills', 'Please enter your skills') && valid;
    valid = requireCheckbox('service', 'err-service', 'Please select at least one service') && valid;
  }

  if (stepNum === 3) {
    valid = requireFile('resumeFile', 'err-resumeFile', 'Please upload your resume') && valid;
    // Check if placement support selected
    const services = [...document.querySelectorAll('input[name="service"]:checked')].map(c => c.value);
    if (services.includes('Placement Support')) {
      valid = requireFile('photoFile', 'err-photoFile', 'Photo is required for placement support') && valid;
      valid = requireFile('signatureFile', 'err-signatureFile', 'Signature is required for placement support') && valid;
    }
    valid = requireTerms() && valid;
  }

  return valid;
}

function nextStep(current) {
  if (validateStep(current)) {
    setStep(current + 1);
  }
}

function prevStep(current) {
  setStep(current - 1);
}

// ===== VALIDATION HELPERS =====
function showError(fieldId, errId, msg) {
  const field = document.getElementById(fieldId);
  const err = document.getElementById(errId || 'err-' + fieldId);
  if (field) { field.classList.add('error'); field.setAttribute('aria-invalid', 'true'); }
  if (err) err.textContent = msg;
  return false;
}
function clearError(fieldId, errId) {
  const field = document.getElementById(fieldId);
  const err = document.getElementById(errId || 'err-' + fieldId);
  if (field) { field.classList.remove('error'); field.removeAttribute('aria-invalid'); }
  if (err) err.textContent = '';
}

function requireField(id, msg) {
  const el = document.getElementById(id);
  if (!el) return true;
  if (!el.value.trim()) return showError(id, null, msg);
  clearError(id);
  return true;
}
function requireEmail(id, msg) {
  const el = document.getElementById(id);
  if (!el) return true;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!el.value.trim() || !re.test(el.value)) return showError(id, null, msg);
  clearError(id);
  return true;
}
function requirePhone(id, msg) {
  const el = document.getElementById(id);
  if (!el) return true;
  const re = /^[+\d\s\-()]{7,15}$/;
  if (!el.value.trim() || !re.test(el.value)) return showError(id, null, msg);
  clearError(id);
  return true;
}
function requireSelect(id, msg) {
  const el = document.getElementById(id);
  if (!el) return true;
  if (!el.value) return showError(id, null, msg);
  clearError(id);
  return true;
}
function requireCheckbox(name, errId, msg) {
  const checked = document.querySelectorAll('input[name="' + name + '"]:checked');
  const err = document.getElementById(errId);
  if (checked.length === 0) {
    if (err) err.textContent = msg;
    return false;
  }
  if (err) err.textContent = '';
  return true;
}
function requireFile(id, errId, msg) {
  const el = document.getElementById(id);
  const err = document.getElementById(errId);
  if (!el) return true;
  if (!el.files || el.files.length === 0) {
    if (err) err.textContent = msg;
    return false;
  }
  if (err) err.textContent = '';
  return true;
}
function requireTerms() {
  const el = document.getElementById('termsAccepted');
  const err = document.getElementById('err-terms');
  if (!el || !el.checked) {
    if (err) err.textContent = 'You must accept the terms to proceed.';
    return false;
  }
  if (err) err.textContent = '';
  return true;
}

// ===== PLACEMENT SECTION TOGGLE =====
document.addEventListener('change', function (e) {
  if (e.target.name === 'service') {
    const services = [...document.querySelectorAll('input[name="service"]:checked')].map(c => c.value);
    const section = document.getElementById('placementDocsSection');
    if (section) section.hidden = !services.includes('Placement Support');
  }
});

// ===== REAL-TIME ERROR CLEARING =====
document.addEventListener('input', function (e) {
  if (e.target.matches('.form-group input, .form-group select, .form-group textarea')) {
    clearError(e.target.id);
  }
});
document.addEventListener('change', function (e) {
  if (e.target.matches('.form-group select')) {
    clearError(e.target.id);
  }
});

// ===== FILE UPLOAD LABEL =====
function updateFileLabel(input, labelId) {
  const label = document.getElementById(labelId);
  const container = input.closest('.file-upload');
  if (input.files && input.files[0]) {
    const name = input.files[0].name;
    if (label) label.textContent = '✓ ' + name;
    if (container) container.classList.add('has-file');
  }
}

// ===== FORM SUBMIT =====
const form = document.getElementById('applicationForm');
if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!validateStep(3)) return;

    // Simulate submission (show success)
    // NOTE: Replace the timeout below with a real fetch/POST call:
    // const data = { fullName: val('fullName'), email: val('email'), ... };
    // fetch('/send-lead.php', { method: 'POST', body: JSON.stringify(data) })
    submitBtn(true);
    setTimeout(() => {
      document.getElementById('formWrapper').style.display = 'none';
      const success = document.getElementById('successMsg');
      if (success) {
        success.classList.add('show');
        success.scrollIntoView({ behavior: 'smooth' });
      }
    }, 1200);

  });
}

function val(id) {
  const el = document.getElementById(id);
  return el ? el.value : '';
}
function fileVal(id) {
  const el = document.getElementById(id);
  return el && el.files[0] ? el.files[0].name : 'Not uploaded';
}
function submitBtn(loading) {
  const btn = document.querySelector('.btn-submit');
  if (!btn) return;
  if (loading) {
    btn.textContent = 'Submitting...';
    btn.disabled = true;
  } else {
    btn.textContent = 'Submit Application 🚀';
    btn.disabled = false;
  }
}

// ===== SCROLL ANIMATIONS =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(el => {
    if (el.isIntersecting) {
      el.target.style.opacity = '1';
      el.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.card, .step, .include-item, .terms-item, .visual-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});
