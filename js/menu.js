// MENÚ RESPONSIVE
const botonMenu = document.querySelector(".menu-boton");
const menuPrincipal = document.querySelector("#menu-principal");
const enlacesMenu = document.querySelectorAll("#menu-principal a");
const consultaMovil = window.matchMedia("(max-width: 760px)");
function cambiarMenu(abrir) {
    menuPrincipal.classList.toggle("abierto", abrir);
    botonMenu.setAttribute("aria-expanded", String(abrir));
    botonMenu.setAttribute(
        "aria-label",
        abrir ? "Cerrar menú" : "Abrir menú"
    );
}
if (botonMenu && menuPrincipal) {
    botonMenu.addEventListener("click", function () {
        const estaAbierto = botonMenu.getAttribute("aria-expanded") === "true";
        cambiarMenu(!estaAbierto);
    });
    enlacesMenu.forEach(function (enlace) {
        enlace.addEventListener("click", function () {
            if (consultaMovil.matches) {
                cambiarMenu(false);
            }
        });
    });
    document.addEventListener("keydown", function (evento) {
        const estaAbierto = botonMenu.getAttribute("aria-expanded") === "true";

        if (evento.key === "Escape" && estaAbierto) {
            cambiarMenu(false);
            botonMenu.focus();
        }
    });
    consultaMovil.addEventListener("change", function (evento) {
        if (!evento.matches) {
            cambiarMenu(false);
        }
    });
    cambiarMenu(false);
}
