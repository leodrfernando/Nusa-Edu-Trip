/**
 * Berkas JavaScript Utama - Nusa EduTrip Landing Page
 * Dirancang dengan logika mendasar tanpa library pihak ketiga.
 */

document.addEventListener("DOMContentLoaded", function() {

    // --- 1. HANDLING HAMBURGER MENU (MOBILE) ---
    const hamburgerBtn = document.getElementById("hamburgerBtn");
    const navMenu = document.getElementById("navMenu");

    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener("click", function() {
            // Memberikan atau menghapus kelas 'active' pada menu navigasi
            navMenu.classList.toggle("active");
        });

        // Menutup menu jika salah satu link di klik (khusus mobile)
        const links = navMenu.getElementsByClassName("nav-link");
        for (let link of links) {
            link.addEventListener("click", function() {
                navMenu.classList.remove("active");
            });
        }
    }

    // --- 2. SMOOTH SCROLL (NAVIGASI HALUS) ---
    const scrollLinks = document.querySelectorAll('.nav-link, .hero-actions a');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Memastikan link mengarah ke id internal halaman web (#something)
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Melakukan scroll secara mulus ke section target
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // --- 3. ANIMASI ELEMENT MUNCUL SAAT DI-SCROLL ---
    const fadeSections = document.querySelectorAll('.fade-in-section');

    function handleScrollAnimation() {
        const triggerBottom = (window.innerHeight / 5) * 4;

        fadeSections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;

            if (sectionTop < triggerBottom) {
                section.classList.add('is-visible');
            }
        });
    }

    // Jalankan saat pertama kali halaman dibuka
    handleScrollAnimation();
    // Jalankan setiap kali user melakukan scroll layar
    window.addEventListener('scroll', handleScrollAnimation);


    // --- 4. FALLBACK PENANGANAN GAMBAR GAGAL DIMUAT ---
    const allImages = document.querySelectorAll('img');
    
    allImages.forEach(img => {
        img.addEventListener('error', function() {
            // Membuat elemen kotak abu-abu pengganti gambar eror
            const fallbackDiv = document.createElement('div');
            fallbackDiv.className = 'img-fallback';
            fallbackDiv.style.width = this.offsetWidth ? this.offsetWidth + 'px' : '100%';
            fallbackDiv.style.height = this.offsetHeight ? this.offsetHeight + 'px' : '150px';
            fallbackDiv.textContent = 'Gambar belum ditambahkan / Gagal memuat';
            
            // Ganti posisi tag img asli dengan kotak pengganti ini
            if (this.parentNode) {
                this.parentNode.replaceChild(fallbackDiv, this);
            }
        });
    });
});