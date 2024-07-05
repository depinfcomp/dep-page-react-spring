document.addEventListener("DOMContentLoaded", function () {
    var enlaces = document.querySelectorAll(".nav.navbar-nav.dropdown-menu li");
    var menus = document.querySelectorAll(".menu");

    enlaces.forEach(function (enlace, index) {
        enlace.addEventListener("mouseenter", function () {
            // Oculta todos los menús
            menus.forEach(function (menu) {
                menu.style.display = "none";
            });

            // Muestra el menú correspondiente
            menus[index].style.display = "block";
        });

        // Agregar evento mouseleave para ocultar el menú al salir del enlace
        enlace.addEventListener("mouseleave", function () {
            // Ocultar todos los menús
            menus.forEach(function (menu) {
                menu.style.display = "none";
            });
        });
    });

    // Agregar evento clic al documento para cerrar el menú cuando se hace clic en cualquier parte de la página
    document.addEventListener("click", function () {
        // Ocultar todos los menús
        menus.forEach(function (menu) {
            menu.style.display = "none";
        });
    });
});


//segundo menu

document.addEventListener("DOMContentLoaded", function () {
    // Elementos de los menús y sus contenedores
    var departamentoDropdown = document.getElementById("departamentoDropdown");
    var departamentoMenu = document.getElementById("departamentoMenu");
    var curricularDropdown = document.getElementById("curricularDropdown");
    var curricularMenu = document.getElementById("curricularMenu");
    var investigacionDropdown = document.getElementById("investigacionDropdown");
    var investigacionMenu = document.getElementById("investigacionMenu");
    var extensionDropdown = document.getElementById("extensionDropdown");
    var extensionMenu = document.getElementById("extensionMenu");
    var sedesDropdown = document.getElementById("sedesDropdown");
    var sedesMenu = document.getElementById("sedesMenu");

    // Eventos para mostrar/ocultar menús al pasar el mouse sobre los elementos
    departamentoDropdown.addEventListener("mouseenter", function () {
        departamentoMenu.style.display = "block";
    });
    departamentoDropdown.addEventListener("mouseleave", function () {
        departamentoMenu.style.display = "none";
    });

    curricularDropdown.addEventListener("mouseenter", function () {
        curricularMenu.style.display = "block";
    });
    curricularDropdown.addEventListener("mouseleave", function () {
        curricularMenu.style.display = "none";
    });

    investigacionDropdown.addEventListener("mouseenter", function () {
        investigacionMenu.style.display = "block";
    });
    investigacionDropdown.addEventListener("mouseleave", function () {
        investigacionMenu.style.display = "none";
    });

    extensionDropdown.addEventListener("mouseenter", function () {
        extensionMenu.style.display = "block";
    });
    extensionDropdown.addEventListener("mouseleave", function () {
        extensionMenu.style.display = "none";
    });
    sedesDropdown.addEventListener("mouseenter", function () {
        sedesMenu.style.display = "block";
    });
    sedesDropdown.addEventListener("mouseleave", function () {
        sedesMenu.style.display = "none";
    });

    // Cerrar los menús si se hace clic en cualquier parte de la página
    document.addEventListener("click", function () {
        departamentoMenu.style.display = "none";
        curricularMenu.style.display = "none";
        investigacionMenu.style.display = "none";
        extensionMenu.style.display = "none";
        sedesMenu.style.display = "none";
    });

    // Evitar que el clic en los menús se propague y cierre inmediatamente el menú
    departamentoMenu.addEventListener("click", function (e) {
        e.stopPropagation();
    });
    curricularMenu.addEventListener("click", function (e) {
        e.stopPropagation();
    });
    investigacionMenu.addEventListener("click", function (e) {
        e.stopPropagation();
    });
    extensionMenu.addEventListener("click", function (e) {
        e.stopPropagation();
    });
    sedesMenu.addEventListener("click", function (e) {
        e.stopPropagation();
    });
});
