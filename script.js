document.addEventListener('DOMContentLoaded', function() {
  const burgerMenu = document.querySelector('.burger-menu');
  const navList = document.querySelector('.nav-list');
  const body = document.body;
  
  // Create mobile menu elements
  const mobileMenu = document.createElement('div');
  mobileMenu.classList.add('mobile-menu');
  
  const closeMenu = document.createElement('div');
  closeMenu.classList.add('close-menu');
  closeMenu.innerHTML = '&times;';
  
  const mobileNavList = navList.cloneNode(true);
  const phone = document.querySelector('.phone').cloneNode(true);
  
  mobileMenu.appendChild(closeMenu);
  mobileMenu.appendChild(mobileNavList);
  mobileMenu.appendChild(phone);
  document.body.appendChild(mobileMenu);
  
  // Toggle mobile menu
  burgerMenu.addEventListener('click', function() {
    mobileMenu.classList.add('active');
    body.style.overflow = 'hidden';
  });
  
  closeMenu.addEventListener('click', function() {
    mobileMenu.classList.remove('active');
    body.style.overflow = 'auto';
  });
  
  // Close menu when clicking on a link
  mobileNavList.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function() {
      mobileMenu.classList.remove('active');
      body.style.overflow = 'auto';
    });
  });
  
  // Burger menu animation
  burgerMenu.addEventListener('click', function() {
    this.classList.toggle('active');
  });

    // Testimonials slider
    const testimonials = document.querySelectorAll('.testimonial');
    const dotsContainer = document.querySelector('.slider-dots');
    let currentSlide = 0;

    // Create dots
    testimonials.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('slider-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    // Next/prev buttons
    document.querySelector('.slider-next').addEventListener('click', nextSlide);
    document.querySelector('.slider-prev').addEventListener('click', prevSlide);

    function nextSlide() {
        currentSlide = (currentSlide + 1) % testimonials.length;
        updateSlider();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length;
        updateSlider();
    }

    function goToSlide(index) {
        currentSlide = index;
        updateSlider();
    }

    function updateSlider() {
        testimonials.forEach((testimonial, index) => {
            testimonial.classList.toggle('active', index === currentSlide);
        });

        const dots = document.querySelectorAll('.slider-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    // Auto-rotate testimonials
    let slideInterval = setInterval(nextSlide, 5000);

    // Pause on hover
    const slider = document.querySelector('.testimonials-slider');
    slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
    slider.addEventListener('mouseleave', () => {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    });

    // Calculator functionality
    const pricePerKm = 25; // Средняя цена за км
    const distances = {
        'Москва': {
            'Санкт-Петербург': 700,
            'Екатеринбург': 1800,
            'Новосибирск': 3300,
            'Казань': 800,
            'Ростов-на-Дону': 1100,
            'Краснодар': 1350
        },
        'Санкт-Петербург': {
            'Москва': 700,
            'Екатеринбург': 2200,
            'Новосибирск': 3700,
            'Казань': 1500,
            'Ростов-на-Дону': 1900,
            'Краснодар': 2150
        },
        'Екатеринбург': {
            'Москва': 1800,
            'Санкт-Петербург': 2200,
            'Новосибирск': 1500,
            'Казань': 1000,
            'Ростов-на-Дону': 2000,
            'Краснодар': 2250
        },
        'Новосибирск': {
            'Москва': 3300,
            'Санкт-Петербург': 3700,
            'Екатеринбург': 1500,
            'Казань': 2500,
            'Ростов-на-Дону': 3500,
            'Краснодар': 3750
        },
        'Казань': {
            'Москва': 800,
            'Санкт-Петербург': 1500,
            'Екатеринбург': 1000,
            'Новосибирск': 2500,
            'Ростов-на-Дону': 1300,
            'Краснодар': 1550
        },
        'Ростов-на-Дону': {
            'Москва': 1100,
            'Санкт-Петербург': 1900,
            'Екатеринбург': 2000,
            'Новосибирск': 3500,
            'Казань': 1300,
            'Краснодар': 250
        },
        'Краснодар': {
            'Москва': 1350,
            'Санкт-Петербург': 2150,
            'Екатеринбург': 2250,
            'Новосибирск': 3750,
            'Казань': 1550,
            'Ростов-на-Дону': 250
        }
    };

    document.getElementById('calculate-btn').addEventListener('click', function() {
        const fromCity = document.getElementById('from-city').value;
        const toCity = document.getElementById('to-city').value;
        const weight = parseFloat(document.getElementById('weight').value) || 0;
        const volume = parseFloat(document.getElementById('volume').value) || 0;

        if (!fromCity || !toCity) {
            alert('Пожалуйста, выберите города отправления и назначения');
            return;
        }

        if (fromCity === toCity) {
            alert('Города отправления и назначения не должны совпадать');
            return;
        }

        const distance = distances[fromCity][toCity];
        let basePrice = distance * pricePerKm;

        // Корректировка цены в зависимости от веса и объема
        if (weight > 1000) { // Если груз тяжелый
            basePrice *= 1.2;
        }
        
        if (volume > 10) { // Если груз объемный
            basePrice *= 1.3;
        }

        // Минимальная стоимость перевозки
        basePrice = Math.max(basePrice, 5000);

        const resultElement = document.getElementById('calculation-result');
        resultElement.innerHTML = `
            <h3>Примерная стоимость перевозки</h3>
            <p><strong>Маршрут:</strong> ${fromCity} → ${toCity}</p>
            <p><strong>Расстояние:</strong> ${distance} км</p>
            <p><strong>Вес груза:</strong> ${weight} кг</p>
            <p><strong>Объем груза:</strong> ${volume} м³</p>
            <p class="price"><strong>Стоимость:</strong> ${Math.round(basePrice).toLocaleString('ru-RU')} руб.</p>
            <p class="note">* Точную стоимость уточняйте у менеджера</p>
        `;
        resultElement.style.display = 'block';
    });

    // Modal window
    const modal = document.getElementById('order-modal');
    const openModalBtn = document.getElementById('header-btn');
    const closeModalBtn = document.querySelector('.modal-close');

    openModalBtn.addEventListener('click', function() {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });

    closeModalBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Form submission
    document.getElementById('feedback-form').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Спасибо за вашу заявку! Мы свяжемся с вами в ближайшее время.');
        this.reset();
    });

    document.getElementById('order-form').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Спасибо за вашу заявку на перевозку! Наш менеджер свяжется с вами для уточнения деталей.');
        this.reset();
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Sticky header on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header-top');
        if (window.scrollY > 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });
});