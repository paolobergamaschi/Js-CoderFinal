document.addEventListener("DOMContentLoaded", function () {
    const imagen = document.getElementById("imagen");
    const rangoRojo = document.getElementById("red");
    const rangoVerde = document.getElementById("green");
    const rangoAzul = document.getElementById("blue");
    const entradaArchivo = document.getElementById("seleccionarArchivo");
    
    function cargarImagen(evento) {
        const imagen = document.getElementById("imagen");
        const entradaArchivo = evento.target;
    
        if (entradaArchivo.files && entradaArchivo.files[0]) {
            const lector = new FileReader();
    
            lector.onload = function (e) {
                imagen.src = e.target.result;
                cambiarTamañoImagen(imagen, 300, 200);
            };
    
            lector.readAsDataURL(entradaArchivo.files[0]);
        }
    }
    
    entradaArchivo.addEventListener("change", function (evento) {
        const archivoSeleccionado = evento.target.files[0];
    
        if (archivoSeleccionado) {
            const lector = new FileReader();
    
            lector.onload = function (e) {
                const img = new Image();
                img.src = e.target.result;
    
                img.onload = function () {
                    const lienzo = document.createElement("canvas");
                    const ctx = lienzo.getContext("2d");
                    lienzo.width = img.width;
                    lienzo.height = img.height;
                    ctx.drawImage(img, 0, 0, img.width, img.height);
                    const valorRojo = rangoRojo.value;
                    const valorVerde = rangoVerde.value;
                    const valorAzul = rangoAzul.value;
                    ctx.globalCompositeOperation = "source-over";
                    ctx.fillStyle = `rgba(${valorRojo}, ${valorVerde}, ${valorAzul}, 0.5)`;
                    ctx.fillRect(0, 0, img.width, img.height);
                    imagen.src = lienzo.toDataURL("image/png");
                };
            };
    
            lector.readAsDataURL(archivoSeleccionado);
        }
    });
    
    rangoRojo.addEventListener("input", aplicarFiltro);
    rangoVerde.addEventListener("input", aplicarFiltro);
    rangoAzul.addEventListener("input", aplicarFiltro);
    
    function aplicarFiltro() {
        entradaArchivo.dispatchEvent(new Event("change"));
    }
    
    const entradaNombreImagen = document.getElementById("nombreImagen");
    const botonEnviar = document.getElementById("enviar");
    
    botonEnviar.addEventListener("click", function () {
        const nombreImagen = entradaNombreImagen.value;
        localStorage.setItem("nombreImagen", nombreImagen); 
    });
    
    const nombreGuardado = localStorage.getItem("nombreImagen");
    entradaNombreImagen.value = nombreGuardado;
    
    rangoRojo.addEventListener("input", aplicarFiltro);
    rangoVerde.addEventListener("input", aplicarFiltro);
    rangoAzul.addEventListener("input", aplicarFiltro);
    
    function aplicarFiltro() {
        entradaArchivo.dispatchEvent(new Event("change"));
    }

    const galeriaContainer = document.querySelector(".galeria");
    
    botonEnviar.addEventListener("click", function () {
        const urlImagenActual = document.getElementById("imagen").src;
        const nuevoEnlace = document.createElement("a");
        nuevoEnlace.href = urlImagenActual;
        nuevoEnlace.setAttribute("data-lightbox", "mi-galeria");
        const miniaturaImagen = document.createElement("img");
        miniaturaImagen.src = "miniatura-default.jpg";
        nuevoEnlace.appendChild(miniaturaImagen);
        galeriaContainer.appendChild(nuevoEnlace);
        document.getElementById("imagen").src = "";
        document.getElementById("nombreImagen").value = "";
    });
});
