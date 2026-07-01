// Stack navigasi untuk melacak riwayat halaman
let screenHistory = ['login-screen']; 

function login() {
    navTo('home');
    document.getElementById('bottom-nav').classList.remove('hidden');
}

function togglePassword() {
    const passwordInput = document.getElementById('password-input');
    const toggleIcon = document.getElementById('toggle-password');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.innerText = '🙈';
    } 
    else {
        passwordInput.type = 'password';
        toggleIcon.innerText = '👁️'; 
    }
}

function logout() {
    screenHistory = ['login-screen'];
    
    // Reset seluruh layar
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById('login-screen').classList.add('active');
    
    // Sembunyikan dan reset bottom nav
    document.getElementById('bottom-nav').classList.add('hidden');
    updateBottomNav('home');
}

// Navigasi menggunakan menu bawah (Bottom Nav)
function navBottom(targetId) {
    // Reset history stack jika klik menu utama
    screenHistory = [targetId + '-screen']; 
    
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(targetId + '-screen').classList.add('active');
    
    updateBottomNav(targetId);
}

// Fungsi utama perpindahan halaman bertumpuk (Push)
function navTo(targetId, title = null) {
    const targetScreenId = targetId + '-screen';
    
    // Jika menuju daftar layanan, ubah judul dinamis
    if (targetId === 'service-list' && title) {
        document.getElementById('service-title').innerText = title;
    }

    // Tambahkan ke riwayat
    screenHistory.push(targetScreenId);
    
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(targetScreenId).classList.add('active');
}

// Fungsi untuk tombol kembali (Pop)
function navBack() {
    if (screenHistory.length > 1) {
        screenHistory.pop(); // Hapus halaman saat ini
        const prevScreenId = screenHistory[screenHistory.length - 1]; // Ambil halaman sebelumnya
        
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById(prevScreenId).classList.add('active');
    }
}

// Fungsi bantu untuk status Bottom Nav
function updateBottomNav(activeId) {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    document.getElementById('nav-' + activeId).classList.add('active');
}

// Fitur Tab di Halaman Aktivitas
function switchTab(tabId, element) {
    // Hilangkan semua class active di tab head
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    // Hilangkan semua class active di tab content
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    
    // Tambahkan active ke yang diklik
    element.classList.add('active');
    document.getElementById(tabId).classList.add('active');
}

// Simulasi Booking
function confirmBooking() {
    alert("Pesanan berhasil dikonfirmasi! Teknisi akan segera diproses.");
    navBottom('activity'); // Langsung alihkan ke halaman aktivitas setelah pesan
}

// Navigasi ke tahap input password
function nextLoginStep() {
    const emailInput = document.getElementById('email-input').value;
    
    // Validasi sederhana agar email tidak kosong
    if (emailInput.trim() === "") {
        alert("Mohon masukkan alamat email terlebih dahulu.");
        return;
    }

    // Tampilkan email yang diketik ke layar selanjutnya
    document.getElementById('user-email-display').innerText = emailInput;
    
    // Sembunyikan langkah 1, tampilkan langkah 2
    document.getElementById('login-step-1').style.display = 'none';
    document.getElementById('login-step-2').style.display = 'flex';
}

// Navigasi kembali ke tahap input email
function prevLoginStep() {
    document.getElementById('login-step-2').style.display = 'none';
    document.getElementById('login-step-1').style.display = 'flex';
    
    // Sembunyikan clue jika user kembali
    document.getElementById('password-hint').style.display = 'none';
}

// Fungsi memunculkan clue lupa password
function showHint() {
    const hintBox = document.getElementById('password-hint');
    
    // Memberikan sedikit efek interaktif (toggle)
    if (hintBox.style.display === 'none' || hintBox.style.display === '') {
        hintBox.style.display = 'block';
    } else {
        // Jika diklik lagi saat sudah muncul, kita bisa menambahkan animasi getar kecil (opsional)
        hintBox.style.transform = 'scale(1.02)';
        setTimeout(() => hintBox.style.transform = 'scale(1)', 150);
    }
}

// Fungsi simulasi proses Login dengan validasi
function login() {
    const passwordInput = document.getElementById('password-input');
    const errorText = document.getElementById('password-error');
    
    // Password simulasi untuk mockup ini
    const correctPassword = "Sibener1";

    if (passwordInput.value === correctPassword) {
        // Jika password BENAR:
        errorText.style.display = 'none';
        passwordInput.classList.remove('shake');
        
        // Pindah ke Beranda
        navTo('home');
        document.getElementById('bottom-nav').classList.remove('hidden');
        
        // Kosongkan input untuk percobaan berikutnya
        passwordInput.value = "";
    } else {
        // Jika password SALAH:
        errorText.style.display = 'block'; // Munculkan teks merah
        
        // Tambahkan efek getar
        passwordInput.classList.remove('shake'); // Reset animasi jika diklik berkali-kali
        void passwordInput.offsetWidth; // Trigger reflow agar animasi bisa berulang
        passwordInput.classList.add('shake');
    }
}

// --- Sistem Auto Slider Banner Promo ---
let currentSlide = 0;
const totalSlides = 3; // Jika kamu nambah gambar jadi 3, ubah angka ini jadi 3

function autoSlide() {
    const slidesWrapper = document.getElementById('promo-slides');
    const dots = document.querySelectorAll('.dot');
    
    // Mencegah error jika elemen tidak ditemukan di halaman
    if (!slidesWrapper) return; 

    // Rumus memutar slide: 0 -> 1 -> 0 -> 1
    currentSlide = (currentSlide + 1) % totalSlides;
    
    // Geser kotak wrapper-nya. Karena 3 gambar, geser -33.33% tiap gambar
    let slidePercentage = 100 / totalSlides;
    slidesWrapper.style.transform = `translateX(-${currentSlide * slidePercentage}%)`;
    
    // Update indikator titik aktif
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentSlide].classList.add('active');
}
setInterval(autoSlide, 3000);

// --- Fungsi Bintang Rating ---
function setRating(ratingValue) {
    const stars = document.querySelectorAll('#rating-stars .star');
    stars.forEach((star, index) => {
        if (index < ratingValue) {
            star.classList.add('active'); // Nyalakan bintang
        } else {
            star.classList.remove('active'); // Matikan bintang
        }
    });
}

// --- Fungsi Simulasi Upload Foto ---
function simulateUpload() {
    const text = document.getElementById('upload-text');
    const img = document.getElementById('uploaded-img');
    const uploadArea = document.getElementById('upload-area');
    
    // Ubah teks seolah-olah sedang mengunggah
    text.innerText = "⏳ Mengunggah foto...";
    
    setTimeout(() => {
        // Setelah 1.5 detik, tampilkan gambar ilustrasi (misal: mesin cuci rusak/sistem IoT)
        text.style.display = 'none';
        img.src = "https://images.unsplash.com/photo-1558227038-f9a0ce6d0cb3?auto=format&fit=crop&w=300&h=200&q=80"; // Foto sirkuit/kabel
        img.style.display = 'block';
        uploadArea.style.border = 'none';
    }, 1500);
}

// --- Fungsi Custom Modal ---
// Ubah fungsi confirmBooking yang lama menjadi ini:
function confirmBooking() {
    const modal = document.getElementById('success-modal');
    modal.classList.add('show');
}

function closeModal() {
    const modal = document.getElementById('success-modal');
    modal.classList.remove('show');
    navBottom('activity'); // Arahkan ke aktivitas setelah ditutup
}