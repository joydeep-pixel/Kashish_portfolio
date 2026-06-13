// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const navLinksItems = document.querySelectorAll(".nav-links li");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
});

navLinksItems.forEach((item) => {
  item.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
  });
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Navbar Background Change on Scroll
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(15, 15, 26, 0.98)";
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.3)";
  } else {
    navbar.style.background = "rgba(15, 15, 26, 0.95)";
    navbar.style.boxShadow = "none";
  }
});

// Portfolio Filter Functionality
const filterBtns = document.querySelectorAll(".filter-btn");
const portfolioItems = document.querySelectorAll(".portfolio-item");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove active class from all buttons
    filterBtns.forEach((b) => b.classList.remove("active"));
    // Add active class to clicked button
    btn.classList.add("active");

    const filterValue = btn.getAttribute("data-filter");

    portfolioItems.forEach((item) => {
      const itemCategory = item.getAttribute("data-category");

      if (filterValue === "all" || filterValue === itemCategory) {
        item.style.display = "block";
        item.style.animation = "fadeIn 0.5s ease forwards";
      } else {
        item.style.display = "none";
      }
    });
  });
});

// Add fadeIn animation keyframes dynamically
const style = document.createElement("style");
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: scale(0.9);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
`;
document.head.appendChild(style);

// Contact Form Handling
const contactForm = document.getElementById("contactForm");

// contactForm.addEventListener('submit', (e) => {
//     e.preventDefault();

//     // Get form data
//     const formData = new FormData(contactForm);
//     const data = Object.fromEntries(formData);

//     // Simple validation
//     if (!data.name || !data.email || !data.message) {
//         showNotification('Please fill in all fields!', 'error');
//         return;
//     }

//     // Email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(data.email)) {
//         showNotification('Please enter a valid email address!', 'error');
//         return;
//     }

//     // Simulate form submission
//     const submitBtn = contactForm.querySelector('button[type="submit"]');
//     const originalText = submitBtn.textContent;
//     submitBtn.textContent = 'Sending...';
//     submitBtn.disabled = true;

//     setTimeout(() => {
//         showNotification('Message sent successfully! I will get back to you soon.', 'success');
//         contactForm.reset();
//         submitBtn.textContent = originalText;
//         submitBtn.disabled = false;
//     }, 1500);
// });

// Notification System
function showNotification(message, type) {
  // Remove existing notifications
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === "success" ? "#00b894" : "#d63031"};
        color: white;
        border-radius: 10px;
        display: flex;
        align-items: center;
        gap: 1rem;
        z-index: 10000;
        animation: slideIn 0.3s ease forwards;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    `;

  // Add animation keyframes if not exists
  if (!document.querySelector("#notification-styles")) {
    const styleSheet = document.createElement("style");
    styleSheet.id = "notification-styles";
    styleSheet.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
            .notification button {
                background: none;
                border: none;
                color: white;
                font-size: 1.2rem;
                cursor: pointer;
            }
        `;
    document.head.appendChild(styleSheet);
  }

  document.body.appendChild(notification);

  // Auto remove after 5 seconds
  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease forwards";
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 5000);
}

// Scroll Reveal Animation
const revealElements = document.querySelectorAll(
  ".service-card, .portfolio-item, .contact-info, .contact-form",
);

const revealOnScroll = () => {
  const windowHeight = window.innerHeight;

  revealElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const revealPoint = 150;

    if (elementTop < windowHeight - revealPoint) {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }
  });
};

// Initialize scroll reveal
window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// Add initial styles for scroll reveal
const revealStyle = document.createElement("style");
revealStyle.textContent = `
    .service-card, .portfolio-item, .contact-info, .contact-form {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
`;
document.head.appendChild(revealStyle);

// Active Navigation Link on Scroll
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (window.scrollY >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach((a) => {
    a.classList.remove("active");
    if (a.getAttribute("href") === `#${current}`) {
      a.classList.add("active");
    }
  });
});

// Typing Effect for Hero Section (Optional Enhancement)
const heroText = document.querySelector(".hero-content h1");
if (heroText) {
  const text = heroText.textContent;
  heroText.textContent = "";
  heroText.style.borderRight = "3px solid var(--primary-color)";

  let i = 0;
  const typeWriter = () => {
    if (i < text.length) {
      heroText.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 50);
    } else {
      setTimeout(() => {
        heroText.style.borderRight = "none";
      }, 2000);
    }
  };

  // Start typing effect after a delay
  setTimeout(typeWriter, 500);
}

// Counter Animation for Stats (if you want to add stats later)
function animateCounter(element, target, duration) {
  let start = 0;
  const increment = target / (duration / 16);

  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target + "+";
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start);
    }
  }, 16);
}

// Lazy Loading for Images
const images = document.querySelectorAll("img[data-src]");
const imageOptions = {
  threshold: 0,
  rootMargin: "0px 0px 50px 0px",
};

const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.onload = () => {
        img.style.opacity = "1";
      };
      observer.unobserve(img);
    }
  });
}, imageOptions);

images.forEach((img) => {
  img.style.opacity = "0";
  img.style.transition = "opacity 0.5s ease";
  imageObserver.observe(img);
});

// Preloader (Optional)
window.addEventListener("load", () => {
  const preloader = document.querySelector(".preloader");
  if (preloader) {
    preloader.style.opacity = "0";
    preloader.style.visibility = "hidden";
    setTimeout(() => {
      preloader.remove();
    }, 300);
  }
});

// console.log('Portfolio website loaded successfully!');
// const galleryModal = document.getElementById("galleryModal");
// const galleryGrid = document.getElementById("galleryGrid");
// const galleryTitle = document.getElementById("galleryTitle");

// document.addEventListener("DOMContentLoaded", () => {
//   const galleryModal = document.getElementById("galleryModal");
//   const galleryGrid = document.getElementById("galleryGrid");
//   const galleryTitle = document.getElementById("galleryTitle");

//   const galleries = {
//     posters: ["/posters/img1.jpeg", "images/poster1.jpg", "images/poster2.jpg"],
//     thumbnails: ["images/thumb1.jpg", "images/thumb2.jpg"],
//     videos: ["videos/video1.mp4"],
//   };

//   window.openGallery = function (type) {
//     galleryGrid.innerHTML = "";
//     galleryTitle.textContent = type.toUpperCase();

//     galleries[type].forEach((src) => {
//       if (type === "videos") {
//         const video = document.createElement("video");
//         video.src = src;
//         video.controls = true;
//         galleryGrid.appendChild(video);
//       } else {
//         const img = document.createElement("img");
//         img.src = src;
//         galleryGrid.appendChild(img);
//       }
//     });

//     galleryModal.classList.add("active");
//   };

//   window.closeGallery = function () {
//     galleryModal.classList.remove("active");
//   };

//   galleryModal.addEventListener("click", (e) => {
//     if (e.target === galleryModal) closeGallery();
//   });
// });

const galleryModal = document.getElementById("galleryModal");
const galleryGrid = document.getElementById("galleryGrid");
const galleryTitle = document.getElementById("galleryTitle");
const imageViewer = document.getElementById("imageViewer");
const viewerImage = document.getElementById("viewerImage");

let galleries = {
  posters: [],
  banners: [],
  thumbnails: [],
  videos: [],
};

async function loadGalleryData() {
  try {
    const response = await fetch("/data/gallery.json", { cache: "no-store" });
    if (!response.ok) throw new Error("Gallery data not found");
    galleries = await response.json();
  } catch (error) {
    console.error("Could not load gallery data:", error);
  }
}

loadGalleryData();

function getMediaSrc(item, type) {
  if (typeof item === "string") return item;

  if (type === "videos") {
    return item.video_file || item.video_url || item.video || item.url || "";
  }

  return item.image || item.url || "";
}

function getYouTubeEmbedUrl(url) {
  if (!url) return "";

  const watchMatch = url.match(/[?&]v=([^&]+)/);
  const shortMatch = url.match(/youtu\.be\/([^?&]+)/);

  if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`;
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`;

  return url;
}

function isYouTubeUrl(url) {
  return /youtube\.com|youtu\.be/.test(url);
}

function stopAllVideos() {
  const videos = document.querySelectorAll(".gallery-grid video");
  videos.forEach((video) => {
    video.pause();
    video.currentTime = 0;
  });
}

function openGallery(type) {
  galleryGrid.innerHTML = "";
  galleryTitle.textContent = type.toUpperCase();

  const items = galleries[type] || [];

  if (items.length === 0) {
    galleryGrid.innerHTML = "<p>No items added yet.</p>";
    galleryModal.classList.add("active");
    return;
  }

  items.forEach((item) => {
    const src = getMediaSrc(item, type);
    if (!src) return;

    if (type === "videos") {
      if (isYouTubeUrl(src)) {
        const iframe = document.createElement("iframe");
        iframe.src = getYouTubeEmbedUrl(src);
        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
        iframe.allowFullscreen = true;
        iframe.style.width = "100%";
        iframe.style.minHeight = "320px";
        iframe.style.border = "0";
        iframe.style.borderRadius = "12px";
        galleryGrid.appendChild(iframe);
      } else {
        const video = document.createElement("video");
        video.src = src;
        video.controls = true;
        video.playsInline = true;
        video.style.width = "100%";
        video.style.maxHeight = "70vh";
        video.style.objectFit = "contain";
        galleryGrid.appendChild(video);
      }
    } else {
      const img = document.createElement("img");
      img.src = src;

      img.addEventListener("click", () => {
        viewerImage.src = src;
        imageViewer.classList.add("active");
      });

      galleryGrid.appendChild(img);
    }
  });

  galleryModal.classList.add("active");
}

function closeGallery() {
  stopAllVideos(); // 🔥 stops audio
  galleryModal.classList.remove("active");
}

function closeImageViewer() {
  imageViewer.classList.remove("active");
  viewerImage.src = "";
}

// Close gallery when clicking background
galleryModal.addEventListener("click", (e) => {
  if (e.target === galleryModal) {
    closeGallery();
  }
});

// Close fullscreen image on background click
imageViewer.addEventListener("click", (e) => {
  if (e.target === imageViewer) {
    closeImageViewer();
  }
});
