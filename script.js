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


(function(){
  const track=document.getElementById('track');
  const set=document.getElementById('cardSet');
  if(!track||!set)return;
  const clone=set.cloneNode(true);
  track.appendChild(clone);

  function adjustLayout(){
    const vw=Math.max(document.documentElement.clientWidth||0,window.innerWidth||0);
    const cards=set.querySelectorAll('.card').length;
    const cardWidth=set.querySelector('.card')?.offsetWidth || 200;
    const totalCardsWidth = cards * (cardWidth + 30); // 20 هو gap تقريبي
    const neededPercent = Math.ceil((totalCardsWidth * 2) / vw * 100); // مضاعفة لأننا نكرر المجموعة

    // نحد أقل شيء بـ200%
    track.style.minWidth = Math.max(neededPercent, 200) + '%';

    if(vw < 640){
      set.style.flex='0 0 auto';
      clone.style.flex='0 0 auto';
    } else if(vw < 900){
      set.style.flex='0 0 auto';
      clone.style.flex='0 0 auto';
    } else {
      set.style.flex='0 0 auto';
      clone.style.flex='0 0 auto';
    }
  }

  function adjustSpeed(){
    const vw=Math.max(document.documentElement.clientWidth||0,window.innerWidth||0);
    let dur=20;
    if(vw<640)dur=10; // بطء أكثر على الشاشات الصغيرة
    else if(vw<900)dur=10;
    document.querySelector('.track').style.animationDuration=dur+'s';
  }

  // تنفيذ أولي
  adjustLayout();
  adjustSpeed();
  window.addEventListener('resize',()=>{
    adjustLayout();
    adjustSpeed();
  });

  // تفاعل البطاقات
  document.querySelectorAll('.card').forEach(card=>{
    card.addEventListener('mousemove',e=>{
      const r=card.getBoundingClientRect();
      const x=(e.clientX-r.left)/r.width-0.5;
      const y=(e.clientY-r.top)/r.height-0.5;
      card.style.transform=`translateY(-6px) scale(1.02) rotateX(${ -y*6 }deg) rotateY(${ x*8 }deg)`;
    });
    card.addEventListener('mouseleave',()=>{card.style.transform=''});
  });
})();




document.addEventListener("DOMContentLoaded", () => {
  const loginModal = document.getElementById('loginModal');
  const closeModal = document.getElementById('closeModal');
  const getStartedBtn = document.querySelector('.hero .btn');

  if (getStartedBtn) {
    getStartedBtn.addEventListener('click', () => {
      loginModal.style.display = 'flex';
    });
  }

  if (closeModal) {
    closeModal.addEventListener('click', () => {
      loginModal.style.display = 'none';
    });
  }

  // ====================
  // Like Buttons
  // ====================
  const likeButtons = document.querySelectorAll(".like-btn");

  likeButtons.forEach(btn => {
    const postCard = btn.closest(".layer-card") || btn.closest(".value-card");
    if (!postCard) return;

    const postId = postCard.dataset.postId;
    if (!postId) return;

    let likes = parseInt(localStorage.getItem(`likes_${postId}`)) || 0;
    btn.querySelector(".like-count").textContent = likes;

    const likedBefore = localStorage.getItem(`liked_${postId}`) === "true";
    if (likedBefore) {
      btn.dataset.liked = "true";
      btn.classList.add("liked");
      const icon = btn.querySelector("i");
      icon.className = "fi fi-sr-heart";
      icon.style.color = "#fff";
    }

    btn.addEventListener("click", () => {
      const liked = btn.dataset.liked === "true";
      const icon = btn.querySelector("i");

      if (!liked) {
        likes++;
        btn.dataset.liked = "true";
        btn.classList.add("liked");
        icon.className = "fi fi-sr-heart";
        icon.style.color = "#fff";
        localStorage.setItem(`liked_${postId}`, "true");
      } else {
        likes--;
        btn.dataset.liked = "false";
        btn.classList.remove("liked");
        icon.className = "fi fi-rr-heart";
        icon.style.color = "";
        localStorage.setItem(`liked_${postId}`, "false");
      }

      btn.querySelector(".like-count").textContent = likes;
      localStorage.setItem(`likes_${postId}`, likes);
    });
  });
});
