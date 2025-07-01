document.addEventListener('DOMContentLoaded', () => {
    const myFrame = document.getElementById('myFrame');

    function adjustIframeHeight() {
        if (myFrame && myFrame.contentWindow && myFrame.contentWindow.document.body) {
            // Espera un momento para asegurar que el contenido esté completamente cargado
            // y que los estilos CSS se hayan aplicado.
            setTimeout(() => {
                myFrame.style.height = 'auto'; // Resetea la altura para recalcular
                myFrame.style.height = myFrame.contentWindow.document.body.scrollHeight + 'px';
            }, 100); // Pequeño retraso para asegurar el renderizado
        }
    }

    // Ajusta la altura cuando el iframe carga inicialmente
    myFrame.onload = adjustIframeHeight;

    // Puedes necesitar reajustar la altura si el contenido dentro del iframe es dinámico
    // o si el tamaño de la ventana cambia (aunque esto es menos común para contenido fijo).
    window.addEventListener('resize', adjustIframeHeight);
});
