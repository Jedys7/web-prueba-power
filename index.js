document.addEventListener('DOMContentLoaded', function() {
    const hamburgerButton = document.getElementById('hamburger-button'); 
    const sideMenuContainer = document.getElementById('side-menu-container');
    const mainIframe = document.querySelector('main iframe');
    const body = document.body;

    // Crear un overlay para detectar clics fuera del menú
    const overlay = document.createElement('div');
    overlay.classList.add('menu-overlay');
    document.body.appendChild(overlay);

    // Funciones para manejar el menú lateral principal
    function openMenu() {
        sideMenuContainer.classList.add('active');
        body.classList.add('no-scroll');
        overlay.classList.add('active'); // Activar overlay
    }

    function closeMenu() {
        // Asegúrate de que todos los submenús estén cerrados antes de cerrar el principal
        const activeSubmenus = sideMenuContainer.querySelectorAll('.sub-menu.active, .sub-sub-menu.active');
        activeSubmenus.forEach(submenu => {
            submenu.classList.remove('active');
            const backButton = submenu.querySelector('.back-button');
            if (backButton) backButton.classList.remove('active');
        });

        sideMenuContainer.classList.remove('active');
        body.classList.remove('no-scroll');
        overlay.classList.remove('active'); // Desactivar overlay
    }

    // Comportamiento del botón de hamburguesa (hover para desplegar, click para abrir/cerrar)
    if (hamburgerButton) {
        // Para pantallas móviles (ancho <= 550px)
        if (window.innerWidth <= 550) {
            // Desplegar menú al pasar el mouse (hover)
            hamburgerButton.addEventListener('mouseover', openMenu);
            // Cerrar menú al salir el mouse (mouseout) - esto puede ser molesto en móvil, pero es lo pedido.
            // Considera quitarlo si la experiencia de usuario no es buena en dispositivos táctiles.
            hamburgerButton.addEventListener('mouseout', function(event) {
                // Solo cerrar si el mouse sale del botón Y no está entrando al menú lateral
                // Esto es para evitar que el menú se cierre inmediatamente si el mouse se mueve al menú.
                if (!sideMenuContainer.contains(event.relatedTarget) && event.relatedTarget !== hamburgerButton) {
                    closeMenu();
                }
            });

            // También mantener el click para abrir/cerrar como alternativa
            hamburgerButton.addEventListener('click', function(e) {
                e.stopPropagation(); // Evita que el click se propague al overlay
                if (sideMenuContainer.classList.contains('active')) {
                    closeMenu();
                } else {
                    openMenu();
                }
            });
        } else {
            // Comportamiento normal para desktop si lo hubiera (actualmente no hay un menú desplegable)
            // Aquí puedes añadir lógica si el botón de hamburguesa tiene algún efecto en desktop
        }
    }

    // Cerrar menú al hacer clic en el overlay
    overlay.addEventListener('click', closeMenu);

    // ==========================================================
    // Lógica para submenús en el menú lateral (Móvil)
    // ==========================================================
    const menuItemsWithSubmenu = sideMenuContainer.querySelectorAll('.menu > li:has(.sub-menu)');

    menuItemsWithSubmenu.forEach(item => {
        const primaryLink = item.querySelector('a'); // El enlace principal que abre el submenú
        const submenu = item.querySelector('.sub-menu');

        if (primaryLink && submenu) {
            // Manejar clic en el enlace principal para abrir el submenú
            primaryLink.addEventListener('click', function(e) {
                if (window.innerWidth <= 550) { // Solo en móvil
                    e.preventDefault(); // Evita que el enlace navegue
                    e.stopPropagation(); // Evita que el click se propague al overlay
                    submenu.classList.add('active'); // Desliza el submenú para que cubra
                    
                    // Añadir botón de retroceso si no existe
                    let backButton = submenu.querySelector('.back-button');
                    if (!backButton) {
                        backButton = document.createElement('button');
                        backButton.classList.add('back-button');
                        backButton.innerHTML = '&#10094; Atrás'; // Flecha izquierda y texto
                        submenu.prepend(backButton); // Añadir al inicio del submenú
                        
                        backButton.addEventListener('click', (event) => {
                            event.stopPropagation(); // Evita que el click se propague al overlay
                            submenu.classList.remove('active'); // Desliza el submenú de vuelta
                            backButton.classList.remove('active');
                        });
                    }
                    backButton.classList.add('active'); // Mostrar el botón de atrás
                }
            });

            // Lógica para sub-submenús (anidados)
            const subMenuItemsWithSubSubmenu = submenu.querySelectorAll('li:has(.sub-sub-menu)');
            subMenuItemsWithSubSubmenu.forEach(subItem => {
                const subPrimaryLink = subItem.querySelector('a');
                const subSubmenu = subItem.querySelector('.sub-sub-menu');

                if (subPrimaryLink && subSubmenu) {
                    subPrimaryLink.addEventListener('click', function(e) {
                        if (window.innerWidth <= 550) { // Solo en móvil
                            e.preventDefault();
                            e.stopPropagation(); // Evita que el click se propague al overlay
                            subSubmenu.classList.add('active'); // Desliza el sub-submenú para que cubra

                            let subBackButton = subSubmenu.querySelector('.back-button');
                            if (!subBackButton) {
                                subBackButton = document.createElement('button');
                                subBackButton.classList.add('back-button');
                                subBackButton.innerHTML = '&#10094; Atrás';
                                subSubmenu.prepend(subBackButton);
                                
                                subBackButton.addEventListener('click', (event) => {
                                    event.stopPropagation(); // Evita que el click se propague al overlay
                                    subSubmenu.classList.remove('active');
                                    subBackButton.classList.remove('active');
                                });
                            }
                            subBackButton.classList.add('active');
                        }
                    });
                }
            });
        }
    });

    // Cerrar el menú lateral al hacer clic en un enlace que NO tiene submenú
    // o cuando el menú principal está visible y se hace clic en un enlace sin submenú.
    const menuLinks = sideMenuContainer.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 550) {
                // Si el enlace tiene un submenú, la lógica anterior ya lo maneja
                // Solo cerramos el menú principal si el enlace no tiene un submenú o sub-submenú adjunto
                if (!link.closest('li').querySelector('.sub-menu')) { 
                    closeMenu();
                }
                // Si el enlace está dentro de un submenú activo y no tiene más submenús, también cerrar todo
                if (link.closest('.sub-menu.active') && !link.closest('li').querySelector('.sub-sub-menu')) {
                    closeMenu();
                }
            }
        });
    });

    // ==========================================================
    // Lógica del Carrusel (sin cambios, se mantiene del anterior)
    // ==========================================================
    const carouselContainers = document.querySelectorAll('.carousel-container');

    carouselContainers.forEach(container => {
        const carouselSlide = container.querySelector('.carousel-slide');
        const prevButton = container.querySelector('.carousel-button.prev');
        const nextButton = container.querySelector('.carousel-button.next');
        const carouselItems = container.querySelectorAll('.carousel-slide section > article'); 
        
        let currentIndex = 0;
        let itemsPerView = 1; 

        function calculateItemsPerView() {
            if (!carouselItems.length) return;

            const containerWidth = container.offsetWidth;
            
            const itemStyle = getComputedStyle(carouselItems[0]);
            const itemWidthWithMargin = carouselItems[0].offsetWidth + 
                                       parseFloat(itemStyle.marginLeft) + 
                                       parseFloat(itemStyle.marginRight);

            if (window.innerWidth >= 1050) {
                itemsPerView = 3; 
            } else if (window.innerWidth >= 768) {
                itemsPerView = 2; 
            } else {
                itemsPerView = 1; 
            }
            showSlide(currentIndex); 
        }

        function showSlide(index) {
            const totalItems = carouselItems.length;
            
            const maxIndex = Math.ceil(totalItems / itemsPerView) - 1;

            if (index > maxIndex) {
                currentIndex = 0; 
            } else if (index < 0) {
                currentIndex = maxIndex; 
            } else {
                currentIndex = index;
            }

            const itemStyle = getComputedStyle(carouselItems[0]);
            const itemWidthWithMargin = carouselItems[0].offsetWidth + 
                                       parseFloat(itemStyle.marginLeft) + 
                                       parseFloat(itemStyle.marginRight);

            const offset = -currentIndex * (itemWidthWithMargin * itemsPerView);
            carouselSlide.style.transform = `translateX(${offset}px)`;
        }

        prevButton.addEventListener('click', () => {
            showSlide(currentIndex - 1);
        });

        nextButton.addEventListener('click', () => {
            showSlide(currentIndex + 1);
        });

        window.addEventListener('resize', calculateItemsPerView);
        calculateItemsPerView(); 
    });


    // ==========================================================
    // Funcionalidad para ajustar altura del iframe dinámicamente
    // Y desplazar la página al inicio del contenido del iframe
    // ==========================================================
    function adjustIframeHeight() {
        if (mainIframe) {
            try {
                if (mainIframe.contentWindow && mainIframe.contentWindow.document.body) {
                    const contentHeight = mainIframe.contentWindow.document.body.scrollHeight;
                    mainIframe.style.height = contentHeight + 'px';
                    window.scrollTo(0, 0); 
                }
            } catch (e) {
                console.warn("No se pudo ajustar la altura del iframe. Posiblemente debido a la política de mismo origen (Same-Origin Policy).", e);
                mainIframe.style.minHeight = 'calc(100vh - ' + (window.innerWidth <= 550 ? '70px' : '100px') + ')';
            }
        }
    }

    mainIframe.addEventListener('load', adjustIframeHeight);
    window.addEventListener('resize', adjustIframeHeight);
    adjustIframeHeight(); 

    // Añadir estilo para bloquear el scroll del body
    const style = document.createElement('style');
    style.innerHTML = `
        body.no-scroll {
            overflow: hidden;
        }
        .menu-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5); /* Semi-transparente */
            z-index: 990; /* Por debajo del menú lateral pero por encima del contenido */
            display: none; /* Oculto por defecto */
        }
        .menu-overlay.active {
            display: block; /* Visible cuando el menú está activo */
        }
    `;
    document.head.appendChild(style);
});
