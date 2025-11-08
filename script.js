// Simple scroll reveal animation
const elements = document.querySelectorAll('.layer-card, .feature-card');

const revealOnScroll = () => {
  const trigger = window.innerHeight * 0.85;
  elements.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < trigger) {
      el.classList.add('visible');
    }
  });
};

window.addEventListener('scroll', revealOnScroll);

// Add a visible animation effect
elements.forEach(el => {
  el.style.opacity = 0;
  el.style.transform = 'translateY(40px)';
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.transition = 'all 0.8s ease';
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0px)';
    }
  });
});

elements.forEach(el => observer.observe(el));

// Add plan cards to the intersection observer
document.querySelectorAll('.plan-card').forEach(el => observer.observe(el));

// === Login Modal Controls ===
const loginModal = document.getElementById('loginModal');
const closeModal = document.getElementById('closeModal');
const getStartedBtn = document.querySelector('.hero .btn');

getStartedBtn.addEventListener('click', () => {
  loginModal.style.display = 'flex';
});

closeModal.addEventListener('click', () => {
  loginModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === loginModal) {
    loginModal.style.display = 'none';
  }
});

// === Optional: Handle login form submission (AJAX) ===
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(loginForm);
  const response = await fetch('subscribe.php', {
    method: 'POST',
    body: formData
  });

  const result = await response.text();

  // Example: You can customize success/failure feedback
  if (result.toLowerCase().includes('success')) {
    alert('Login successful!');
    loginModal.style.display = 'none';
  } else {
    alert('Invalid credentials or connection issue.');
  }
});


// === Switch between Login and Register forms ===
const showRegisterLink = document.getElementById('showRegister');
const showLoginLink = document.getElementById('showLogin');
const loginSection = document.getElementById('loginSection');
const registerSection = document.getElementById('registerSection');

showRegisterLink.addEventListener('click', (e) => {
  e.preventDefault();
  loginSection.classList.remove('active');
  registerSection.classList.add('active');
});

showLoginLink.addEventListener('click', (e) => {
  e.preventDefault();
  registerSection.classList.remove('active');
  loginSection.classList.add('active');
});

// === Handle registration (POST to get_token.php) ===
const registerForm = document.getElementById('registerForm');
registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const password = document.getElementById('reg_password').value;
  const confirm = document.getElementById('confirm_password').value;
  if (password !== confirm) {
    alert('Passwords do not match.');
    return;
  }

  const formData = new FormData(registerForm);
  const response = await fetch('get_token.php', {
    method: 'POST',
    body: formData
  });

  const result = await response.text();

  if (result.toLowerCase().includes('success')) {
    alert('Account created successfully!');
    registerSection.classList.remove('active');
    loginSection.classList.add('active');
  } else {
    alert('Registration failed. Please check your input.');
  }
});

// === Dynamic Country Selector with Flags ===
const countries = [
  { name: "United States", flag: "🇺🇸" },
  { name: "United Kingdom", flag: "🇬🇧" },
  { name: "Turkey", flag: "🇹🇷" },
  { name: "Germany", flag: "🇩🇪" },
  { name: "Saudi Arabia", flag: "🇸🇦" },
  { name: "United Arab Emirates", flag: "🇦🇪" },
  { name: "France", flag: "🇫🇷" },
  { name: "India", flag: "🇮🇳" },
  { name: "Japan", flag: "🇯🇵" },
  { name: "Canada", flag: "🇨🇦" },
  { name: "Spain", flag: "🇪🇸" },
  { name: "Brazil", flag: "🇧🇷" },
  { name: "Russia", flag: "🇷🇺" },
  { name: "China", flag: "🇨🇳" },
  { name: "Other", flag: "🌍" }
];

const countryDropdown = document.getElementById("countryDropdown");
const selectedCountry = document.getElementById("selectedCountry");
const dropdownMenu = document.getElementById("dropdownMenu");
const countryList = document.getElementById("countryList");
const countrySearch = document.getElementById("countrySearch");
const countryInput = document.getElementById("country");

// Populate list
function renderCountries(list) {
  countryList.innerHTML = "";
  list.forEach(c => {
    const li = document.createElement("li");
    li.innerHTML = `<span class="flag">${c.flag}</span><span>${c.name}</span>`;
    li.addEventListener("click", () => {
      selectedCountry.querySelector(".flag").textContent = c.flag;
      selectedCountry.querySelector(".country-name").textContent = c.name;
      countryInput.value = c.name;
      dropdownMenu.classList.remove("active");
    });
    countryList.appendChild(li);
  });
}

renderCountries(countries);

// Toggle dropdown
selectedCountry.addEventListener("click", () => {
  dropdownMenu.classList.toggle("active");
  countrySearch.value = "";
  renderCountries(countries);
  countrySearch.focus();
});

// Filter on search
countrySearch.addEventListener("input", () => {
  const query = countrySearch.value.toLowerCase();
  const filtered = countries.filter(c => c.name.toLowerCase().includes(query));
  renderCountries(filtered);
});

// Close dropdown on outside click
window.addEventListener("click", (e) => {
  if (!countryDropdown.contains(e.target)) {
    dropdownMenu.classList.remove("active");
  }
});


document.addEventListener("DOMContentLoaded", () => {
  const glowImages = document.querySelectorAll(".glow-image");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.2 });

  glowImages.forEach(img => observer.observe(img));
});
