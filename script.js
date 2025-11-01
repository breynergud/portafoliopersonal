// ========================================
// MANEJO DEL FORMULARIO DE CONTACTO
// ========================================

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // Obtener el formulario de contacto por su ID
    const contactForm = document.getElementById('contact-form');
    
    // Agregar un event listener para cuando se envíe el formulario
    contactForm.addEventListener('submit', function(event) {
        // Prevenir el comportamiento por defecto (evitar que la página se recargue)
        event.preventDefault();
        
        // Obtener los valores de los campos del formulario
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Validar que todos los campos estén completos
        if (name && email && message) {
            // Mostrar mensaje en la consola
            console.log('Formulario enviado correctamente');
            console.log('Nombre:', name);
            console.log('Correo:', email);
            console.log('Mensaje:', message);
            
            // Opcional: Mostrar un mensaje de éxito al usuario
            alert('¡Mensaje enviado correctamente! Revisa la consola para ver los detalles.');
            
            // Limpiar el formulario después del envío
            contactForm.reset();
        } else {
            // Si faltan campos, mostrar un mensaje de error
            alert('Por favor, completa todos los campos del formulario.');
        }
    });

    // ========================================
    // MENÚ HAMBURGUESA PARA MÓVILES
    // ========================================
    
    // Obtener el botón del menú y el menú de navegación
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    // Agregar event listener al botón hamburguesa
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            // Alternar clase 'active' en el botón y menú
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Cerrar menú al hacer clic en un enlace (solo en móviles)
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                // Solo cerrar si el menú está activo (en móviles)
                if (window.innerWidth <= 768) {
                    menuToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            });
        });
        
        // Cerrar menú al hacer clic fuera de él
        document.addEventListener('click', function(event) {
            const isClickInsideMenu = navMenu.contains(event.target);
            const isClickOnToggle = menuToggle.contains(event.target);
            
            if (!isClickInsideMenu && !isClickOnToggle && navMenu.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
        
        // Cerrar menú al cambiar el tamaño de la ventana (si se hace más grande)
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // ========================================
    // NAVEGACIÓN SUAVE AL HACER CLIC EN ENLACES
    // ========================================
    
    // Obtener todos los enlaces del menú de navegación
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    // Agregar un event listener a cada enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            // Obtener el atributo href del enlace
            const href = this.getAttribute('href');
            
            // Solo aplicar si el href comienza con #
            if (href.startsWith('#')) {
                // Prevenir el comportamiento por defecto
                event.preventDefault();
                
                // Obtener el elemento de destino usando el ID
                const targetId = href.substring(1); // Eliminar el #
                const targetElement = document.getElementById(targetId);
                
                // Si el elemento existe, hacer scroll suave hasta él
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth', // Scroll suave
                        block: 'start' // Alinear al inicio
                    });
                }
            }
        });
    });

    // ========================================
    // EFECTO DE APARICIÓN AL HACER SCROLL
    // ========================================
    
    // Función para observar elementos y animarlos cuando sean visibles
    const observerOptions = {
        threshold: 0.1, // Disparar cuando el 10% del elemento sea visible
        rootMargin: '0px 0px -50px 0px' // Margen adicional
    };
    
    // Crear un Intersection Observer
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            // Si el elemento es visible
            if (entry.isIntersecting) {
                // Agregar clase para animación
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar todas las tarjetas y secciones
    const animatedElements = document.querySelectorAll('.experience-card, .skill-card, .project-card');
    
    // Configurar estado inicial y observar cada elemento
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
});

