// MAPA COMUNITARIO
const botonIniciarAplicacion = document.querySelector("#iniciar-aplicacion");
const botonCerrarAplicacion = document.querySelector("#cerrar-aplicacion");
const vistaInicioAplicacion = document.querySelector("#aplicacion-inicio");
const panelAplicacion = document.querySelector("#panel-aplicacion");
const escenaMapa = document.querySelector("#mapa-escena");
const capaMapa = document.querySelector("#mapa-capa");
const marcadoresMapa = document.querySelectorAll(".mapa-marcador");
const tarjetasIncidente = document.querySelectorAll("[data-seleccionar]");
const botonesFiltro = document.querySelectorAll("[data-filtro]");
const panelDetalle = document.querySelector("#detalle-incidente");
const botonCerrarDetalle = document.querySelector("#cerrar-detalle");
const botonAcercar = document.querySelector("#acercar-mapa");
const botonAlejar = document.querySelector("#alejar-mapa");
const botonCentrar = document.querySelector("#centrar-mapa");
const contadorReportes = document.querySelector("#contador-reportes");
const mensajeSinResultados = document.querySelector("#sin-resultados");

const detalle = {
    titulo: document.querySelector("#detalle-titulo"),
    hora: document.querySelector("#detalle-hora"),
    estado: document.querySelector("#detalle-estado"),
    ubicacion: document.querySelector("#detalle-ubicacion"),
    descripcion: document.querySelector("#detalle-descripcion"),
    comentarios: document.querySelector("#detalle-comentarios")
};
const avisos = {
    "robo-avenida": {
        tipo: "robo", titulo: "Robo reportado", hora: "26 NOV · 18:42",
        estado: "En revisión", ubicacion: "Av. Central · Sector norte",
        descripcion: "Un usuario compartió un aviso sobre un presunto robo en las inmediaciones de la avenida. La información requiere contrastarse con fuentes oficiales.",
        comentarios: [
            ["Vecino de la zona", "Vi el aviso y considero importante mantener la atención en el entorno."],
            ["Participante de comunidad", "Sería útil confirmar si existe información adicional antes de compartirlo."]
        ]
    },
    "zona-frecuente": {
        tipo: "riesgo", titulo: "Zona con reportes frecuentes", hora: "26 NOV · 18:10",
        estado: "Varios avisos", ubicacion: "Jr. Los Olivos · Sector residencial",
        descripcion: "El sector reúne varios avisos comunitarios registrados en distintos momentos. La marca señala un área de atención y no identifica a personas.",
        comentarios: [
            ["Residente del sector", "En esta zona se han compartido avisos en más de una ocasión."],
            ["Usuario comunitario", "Conviene revisar la información reciente y evitar conclusiones sin confirmar."]
        ]
    },
    "movilizacion": {
        tipo: "movilidad", titulo: "Movilización reportada", hora: "26 NOV · 17:55",
        estado: "Aviso comunitario", ubicacion: "Av. del Parque · Sector oeste",
        descripcion: "Se compartió una referencia general sobre una concentración de personas que podría afectar el desplazamiento por el sector.",
        comentarios: [
            ["Usuario de la comunidad", "El tránsito parecía más lento en las calles cercanas."],
            ["Participante", "Es recomendable consultar información pública de movilidad antes de desplazarse."]
        ]
    },
    "robo-parque": {
        tipo: "robo", titulo: "Robo reportado", hora: "26 NOV · 17:28",
        estado: "En revisión", ubicacion: "Parque vecinal · Sector central",
        descripcion: "Aviso comunitario relacionado con un presunto incidente en las inmediaciones del parque. No contiene información que permita identificar a personas.",
        comentarios: [
            ["Vecino", "El aviso fue compartido para que la comunidad tenga contexto del sector."],
            ["Participante de comunidad", "Es importante no publicar fotografías ni datos personales de terceros."]
        ]
    },
    "aviso-preventivo": {
        tipo: "riesgo", titulo: "Aviso preventivo", hora: "26 NOV · 16:50",
        estado: "Información general", ubicacion: "Plaza vecinal · Sector este",
        descripcion: "Aviso general para llamar la atención sobre el entorno y promover que la información sea consultada con prudencia.",
        comentarios: [
            ["Usuario comunitario", "Gracias por compartir información contextual de la zona."]
        ]
    }
};
const estadoMapa = {
    x: 0, y: 0, escala: 0.82, arrastrando: false,
    inicioX: 0, inicioY: 0, mapaXInicial: 0, mapaYInicial: 0
};
let avisoSeleccionado = null;

function limitarMapa() {
    const ancho = 1800 * estadoMapa.escala;
    const alto = 1300 * estadoMapa.escala;
    estadoMapa.x = Math.min(0, Math.max(escenaMapa.clientWidth - ancho, estadoMapa.x));
    estadoMapa.y = Math.min(0, Math.max(escenaMapa.clientHeight - alto, estadoMapa.y));
}

function actualizarMapa() {
    limitarMapa();
    capaMapa.style.transform =
        "translate(" + estadoMapa.x + "px, " + estadoMapa.y + "px) scale(" + estadoMapa.escala + ")";
}
function centrarMapa() {
    estadoMapa.x = escenaMapa.clientWidth / 2 - 900 * estadoMapa.escala;
    estadoMapa.y = escenaMapa.clientHeight / 2 - 650 * estadoMapa.escala;
    actualizarMapa();
}
function cambiarZoom(diferencia) {
    const anterior = estadoMapa.escala;
    const nueva = Math.min(1.35, Math.max(0.55, anterior + diferencia));
    if (nueva === anterior) return;

    const centroX = escenaMapa.clientWidth / 2;
    const centroY = escenaMapa.clientHeight / 2;
    const puntoX = (centroX - estadoMapa.x) / anterior;
    const puntoY = (centroY - estadoMapa.y) / anterior;

    estadoMapa.escala = nueva;
    estadoMapa.x = centroX - puntoX * nueva;
    estadoMapa.y = centroY - puntoY * nueva;
    actualizarMapa();
}
function mostrarComentarios(comentarios) {
    detalle.comentarios.innerHTML = "";
    comentarios.forEach(function (comentario) {
        const bloque = document.createElement("div");
        const autor = document.createElement("strong");
        const texto = document.createElement("p");
        bloque.className = "comentario";
        autor.textContent = comentario[0];
        texto.textContent = comentario[1];
        bloque.appendChild(autor);
        bloque.appendChild(texto);
        detalle.comentarios.appendChild(bloque);
    });
}
function seleccionarAviso(id) {
    const aviso = avisos[id];
    if (!aviso) return;

    avisoSeleccionado = id;
    detalle.titulo.textContent = aviso.titulo;
    detalle.hora.textContent = aviso.hora;
    detalle.estado.textContent = aviso.estado;
    detalle.ubicacion.textContent = aviso.ubicacion;
    detalle.descripcion.textContent = aviso.descripcion;
    mostrarComentarios(aviso.comentarios);
    panelDetalle.hidden = false;

    marcadoresMapa.forEach(function (marcador) {
        marcador.classList.toggle("seleccionado", marcador.getAttribute("data-incidente") === id);
    });
    tarjetasIncidente.forEach(function (tarjeta) {
        tarjeta.classList.toggle("seleccionado", tarjeta.getAttribute("data-seleccionar") === id);
    });
}
function filtrarAvisos(tipo) {
    let visibles = 0;
    botonesFiltro.forEach(function (boton) {
        const activo = boton.getAttribute("data-filtro") === tipo;
        boton.classList.toggle("filtro-activo", activo);
        boton.setAttribute("aria-pressed", String(activo));
    });

    marcadoresMapa.forEach(function (marcador) {
        const aviso = avisos[marcador.getAttribute("data-incidente")];
        marcador.hidden = tipo !== "todos" && aviso.tipo !== tipo;
        if (!marcador.hidden) visibles += 1;
    });
    tarjetasIncidente.forEach(function (tarjeta) {
        tarjeta.hidden = tipo !== "todos" && tarjeta.getAttribute("data-tipo") !== tipo;
    });

    contadorReportes.textContent = visibles + " avisos";
    mensajeSinResultados.hidden = visibles !== 0;

    if (avisoSeleccionado && tipo !== "todos" && avisos[avisoSeleccionado].tipo !== tipo) {
        panelDetalle.hidden = true;
        avisoSeleccionado = null;
        marcadoresMapa.forEach(function (m) { m.classList.remove("seleccionado"); });
        tarjetasIncidente.forEach(function (t) { t.classList.remove("seleccionado"); });
    }
}
botonIniciarAplicacion.addEventListener("click", function () {
    vistaInicioAplicacion.hidden = true;
    panelAplicacion.hidden = false;
    botonIniciarAplicacion.setAttribute("aria-expanded", "true");
    window.requestAnimationFrame(function () {
        centrarMapa();
        escenaMapa.focus();
    });
});

botonCerrarAplicacion.addEventListener("click", function () {
    panelAplicacion.hidden = true;
    vistaInicioAplicacion.hidden = false;
    botonIniciarAplicacion.setAttribute("aria-expanded", "false");
    panelDetalle.hidden = true;
    avisoSeleccionado = null;
    filtrarAvisos("todos");
    marcadoresMapa.forEach(function (m) { m.classList.remove("seleccionado"); });
    tarjetasIncidente.forEach(function (t) { t.classList.remove("seleccionado"); });
    botonIniciarAplicacion.focus();
});
marcadoresMapa.forEach(function (m) {
    m.addEventListener("click", function () {
        seleccionarAviso(m.getAttribute("data-incidente"));
    });
});
tarjetasIncidente.forEach(function (t) {
    t.addEventListener("click", function () {
        seleccionarAviso(t.getAttribute("data-seleccionar"));
    });
});
botonesFiltro.forEach(function (b) {
    b.addEventListener("click", function () {
        filtrarAvisos(b.getAttribute("data-filtro"));
    });
});

botonCerrarDetalle.addEventListener("click", function () {
    panelDetalle.hidden = true;
    avisoSeleccionado = null;
    marcadoresMapa.forEach(function (m) { m.classList.remove("seleccionado"); });
    tarjetasIncidente.forEach(function (t) { t.classList.remove("seleccionado"); });
});
botonAcercar.addEventListener("click", function () {
    cambiarZoom(0.12);
});
botonAlejar.addEventListener("click", function () {
    cambiarZoom(-0.12);
});
botonCentrar.addEventListener("click", function () {
    centrarMapa();
});
escenaMapa.addEventListener("pointerdown", function (evento) {
    if (evento.target.closest("button")) return;
    estadoMapa.arrastrando = true;
    estadoMapa.inicioX = evento.clientX;
    estadoMapa.inicioY = evento.clientY;
    estadoMapa.mapaXInicial = estadoMapa.x;
    estadoMapa.mapaYInicial = estadoMapa.y;
    escenaMapa.classList.add("arrastrando");
    escenaMapa.setPointerCapture(evento.pointerId);
});

escenaMapa.addEventListener("pointermove", function (evento) {
    if (!estadoMapa.arrastrando) return;
    estadoMapa.x = estadoMapa.mapaXInicial + evento.clientX - estadoMapa.inicioX;
    estadoMapa.y = estadoMapa.mapaYInicial + evento.clientY - estadoMapa.inicioY;
    actualizarMapa();
});

function finalizarArrastre() {
    estadoMapa.arrastrando = false;
    escenaMapa.classList.remove("arrastrando");
}

escenaMapa.addEventListener("pointerup", finalizarArrastre);
escenaMapa.addEventListener("pointercancel", finalizarArrastre);
escenaMapa.addEventListener("lostpointercapture", finalizarArrastre);
escenaMapa.addEventListener("keydown", function (evento) {
    const paso = 55;
    if (evento.key === "ArrowLeft") estadoMapa.x += paso;
    else if (evento.key === "ArrowRight") estadoMapa.x -= paso;
    else if (evento.key === "ArrowUp") estadoMapa.y += paso;
    else if (evento.key === "ArrowDown") estadoMapa.y -= paso;
    else if (evento.key === "+" || evento.key === "=") {
        cambiarZoom(0.12);
        evento.preventDefault();
        return;
    } else if (evento.key === "-") {
        cambiarZoom(-0.12);
        evento.preventDefault();
        return;
    } else return;
    evento.preventDefault();
    actualizarMapa();
});

escenaMapa.addEventListener("wheel", function (evento) {
    evento.preventDefault();
    cambiarZoom(evento.deltaY < 0 ? 0.08 : -0.08);
}, { passive: false });
window.addEventListener("resize", function () {
    if (!panelAplicacion.hidden) centrarMapa();
});
panelAplicacion.hidden = true;
vistaInicioAplicacion.hidden = false;
