document.addEventListener('DOMContentLoaded', () => {
    const navLinksWithMenu = document.querySelectorAll('li.has-fullscreen-menu a[data-menu-target]');
    const closeButtons = document.querySelectorAll('.fullscreen-menu .close-btn');
    const fullscreenMenus = document.querySelectorAll('.fullscreen-menu');
    const body = document.body;

    // Abrir menú a pantalla completa
    navLinksWithMenu.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Evita la navegación del enlace
            const targetMenuId = link.dataset.menuTarget;
            const targetMenu = document.getElementById(targetMenuId);

            if (targetMenu) {
                targetMenu.classList.add('active');
                body.classList.add('menu-open'); // Añade clase al body para evitar scroll
            }
        });
    });

    // Cerrar menú a pantalla completa
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const parentMenu = button.closest('.fullscreen-menu');
            if (parentMenu) {
                parentMenu.classList.remove('active');
                body.classList.remove('menu-open'); // Remueve clase al body
            }
        });
    });

    // Cerrar menú si se hace clic fuera del menú activo (opcional)
    document.addEventListener('click', (e) => {
        fullscreenMenus.forEach(menu => {
            if (menu.classList.contains('active') && !menu.contains(e.target) && !e.target.closest('li.has-fullscreen-menu a[data-menu-target]')) {
                menu.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });
    });

    // Evitar scroll en el body cuando un menú está abierto
    // Añade la siguiente regla en tu CSS:
    // body.menu-open {
    //     overflow: hidden;
    // }
});
//========================================================================//
//========================================================================//
//========================================================================//
