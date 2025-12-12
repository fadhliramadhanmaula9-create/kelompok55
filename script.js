/* ===================== LOADING SCREEN ===================== */
window.onload = () => {
    setTimeout(() => {
        const loading = document.getElementById("loadingScreen");
        if (loading) loading.style.opacity = "0";
        setTimeout(() => {
            if (loading) loading.style.display = "none";
        }, 500);
    }, 1200);

    // Inisialisasi AOS jika tersedia
    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 900,
            once: true
        });
    }
};

/* ===================== PARALLAX EFFECT ===================== */
window.addEventListener("scroll", () => {
    const parallax = document.querySelector("[data-parallax]");
    if (parallax) {
        let offset = window.pageYOffset;
        parallax.style.transform = `translateY(${offset * 0.4}px)`;
    }
});

/* ===================== POPUP ===================== */
function openPopup(title, desc) {
    const popup = document.getElementById("popup");
    if (!popup) return;

    popup.style.display = "flex";
    document.getElementById("popup-title").innerText = title;
    document.getElementById("popup-desc").innerText = desc;
}

// Tombol close
const popupClose = document.getElementById("popup-close");
if (popupClose) {
    popupClose.onclick = () => {
        document.getElementById("popup").style.display = "none";
    };
}

// Klik luar popup
const popup = document.getElementById("popup");
if (popup) {
    popup.addEventListener("click", (e) => {
        if (e.target.id === "popup") {
            popup.style.display = "none";
        }
    });
}

/* ===================== SMOOTH SCROLL ===================== */
const exploreBtn = document.getElementById("exploreBtn");
if (exploreBtn) {
    exploreBtn.onclick = () => {
        document.getElementById("gallery").scrollIntoView({ behavior: "smooth" });
    };
}

function scrollToSection(id) {
    const target = document.getElementById(id);
    if (target) target.scrollIntoView({ behavior: "smooth" });
}

/* ===================== MUSIC CONTROL ===================== */
/* ===================== MUSIC CONTROL ===================== */
const music = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");

let musicPlaying = false;

if (music && musicToggle) {

    // Pastikan audio siap
    music.load();

    musicToggle.addEventListener("click", async () => {
        try {
            if (!musicPlaying) {
                await music.play();
                musicToggle.textContent = "🔇 Hentikan Musik";
                musicPlaying = true;
            } else {
                music.pause();
                musicToggle.textContent = "🎧 Putar Musik";
                musicPlaying = false;
            }
        } catch (err) {
            console.log("Browser memblokir audio sebelum berinteraksi:", err);

            // Jika gagal play, coba unmute manual
            music.muted = false;
            await music.play().catch(() => {});
        }
    });
}

/* ===================== DARK MODE ===================== */
const darkModeToggle = document.getElementById("darkModeToggle");

if (darkModeToggle) {
    darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        // Simpan mode ke localStorage
        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
            darkModeToggle.textContent = "☀️";
        } else {
            localStorage.setItem("theme", "light");
            darkModeToggle.textContent = "🌙";
        }
    });
}

// Load tema dari localStorage
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    if (darkModeToggle) darkModeToggle.textContent = "☀️";
}

/* ===================== BACK TO TOP ===================== */
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
    if (backToTop) {
        backToTop.style.display = window.scrollY > 500 ? "block" : "none";
    }
});

if (backToTop) {
    backToTop.onclick = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
}

/* ===================== SEARCH FILTER ===================== */
const searchInput = document.getElementById("searchBar");
if (searchInput) {
    searchInput.addEventListener("keyup", function () {
        let input = this.value.toLowerCase();
        let cards = document.querySelectorAll(".card");

        cards.forEach(card => {
            let title = card.dataset.title.toLowerCase();
            card.style.display = title.includes(input) ? "block" : "none";
        });
    });
}

/* ===================== CATEGORY FILTER ===================== */
const catBtns = document.querySelectorAll('.cat-btn');
const cardsAll = document.querySelectorAll('.card');

catBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const category = btn.dataset.category.toLowerCase();

        cardsAll.forEach(card => {
            const cardCategory = card.dataset.category.toLowerCase();
            card.style.display = (category === 'all' || cardCategory === category)
                ? "block"
                : "none";
        });

        catBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});
