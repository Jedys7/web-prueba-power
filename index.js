document.addEventListener('DOMContentLoaded', function() {
    const hamburgerButton = document.getElementById('hamburger-button');
    const sideMenuContainer = document.getElementById('side-menu-container');
    const mainIframe = document.querySelector('main iframe'); // Selecciona tu iframe

    // Función para abrir/cerrar el menú
    function toggleMenu() {
        sideMenuContainer.classList.toggle('active');
        // Opcional: Bloquear el scroll del body cuando el menú está abierto
        document.body.classList.toggle('no-scroll'); 
    }

    // Escuchar el click en el botón de hamburguesa
    if (hamburgerButton) {
        hamburgerButton.addEventListener('click', toggleMenu);
    }

    // Cerrar el menú al hacer clic en un enlace dentro de él (solo en móvil)
    const menuLinks = sideMenuContainer.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 550) { // Usa el mismo breakpoint que tu CSS
                sideMenuContainer.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    });

    // ==========================================================
    // NUEVA FUNCIONALIDAD: Ajustar altura del iframe dinámicamente
    // Y desplazar la página al inicio del contenido del iframe
    // ==========================================================
    function adjustIframeHeight() {
        if (mainIframe) {
            try {
                if (mainIframe.contentWindow && mainIframe.contentWindow.document.body) {
                    const contentHeight = mainIframe.contentWindow.document.body.scrollHeight;
                    mainIframe.style.height = contentHeight + 'px';
                    
                    // ======================================================
                    // NUEVA LÍNEA: Desplazarse al inicio de la página principal
                    // ======================================================
                    window.scrollTo(0, 0); 
                    // Si quisieras que el scroll sea dentro del IFRAME, usarías:
                    // mainIframe.contentWindow.scrollTo(0, 0);
                    // Pero por tu descripción, parece que quieres el scroll de la ventana principal.
                }
            } catch (e) {
                console.warn("No se pudo ajustar la altura del iframe. Posiblemente debido a la política de mismo origen (Same-Origin Policy).", e);
                mainIframe.style.minHeight = 'calc(100vh - ' + (window.innerWidth <= 550 ? '70px' : '100px') + ')';
            }
        }
    }

    // Llama a la función cuando el iframe haya cargado su contenido
    mainIframe.addEventListener('load', adjustIframeHeight);

    // Llama a la función también si la ventana se redimensiona
    window.addEventListener('resize', adjustIframeHeight);

    // Llama una vez al inicio por si el iframe ya está cargado
    adjustIframeHeight(); 

    // Opcional: CSS para 'no-scroll' (asegúrate de tenerlo en tu CSS o aquí)
    const style = document.createElement('style');
    style.innerHTML = `
        body.no-scroll {
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
});
