let palabraActual = '';
let datosPalabraActual = {};
let letrasAdivinadas = [];
let intentosFallidos = 0;
let intentosMaximos = 6;
let juegoActivo = false;
let juegoPausado = false;
let indicePalabraActual = 0;
let palabrasCompletadas = [];

const palabrasBaseDeDatos = [
    {
        palabra: 'TELEVISOR',
        pistas: [
            '📺 Dispositivo electrónico para ver programas',
            '🏠 Se encuentra comúnmente en salas y dormitorios',
            '📡 Recibe señales de televisión o cable'
        ],
        imagen: 'img/Televisor.jpg'
    },
    {
        palabra: 'BIBLIOTECA',
        pistas: [
            '📚 Lugar donde se guardan y consultan libros',
            '🤫 Espacio donde se debe mantener silencio',
            '📖 Los estudiantes van aquí a estudiar e investigar'
        ],
        imagen: 'img/Biblioteca.jpg'
    },
    {
        palabra: 'MARIPOSAS',
        pistas: [
            '🦋 Insectos con alas coloridas y hermosas',
            '🌸 Vuelan de flor en flor buscando néctar',
            '🐛 Pasan por metamorfosis desde oruga hasta adulto'
        ],
        imagen: 'img/Maripoosas.jpg'
    },
    {
        palabra: 'INTERNET',
        pistas: [
            '🌐 Red mundial de computadoras conectadas',
            '💻 Necesario para navegar en páginas web',
            '📱 Permite comunicación y acceso a información global'
        ],
        imagen: 'img/Internet.jpg'
    },
    {
        palabra: 'CASCADA',
        pistas: [
            '💧 Caída de agua desde una altura considerable',
            '🏔️ Se forma cuando un río encuentra un desnivel',
            '🌈 A veces forma arcoíris con la luz del sol'
        ],
        imagen: 'img/Cascada.png'
    }
];

const imagenesAhorcado = [
    'img/1.jpg', // 0 errores
    'img/2.jpg', // 1 error
    'img/3.jpg', // 2 errores
    'img/4.jpg', // 3 errores
    'img/5.jpg', // 4 errores
    'img/6.jpg', // 5 errores
    'img/7.jpg'  // 6 errores (juego perdido)
];

const visualizadorPalabra = document.getElementById('visualizadorPalabra');
const elementoIntentos = document.getElementById('intentos');
const elementoEstadoJuego = document.getElementById('estadoJuego');
const elementoNumeroPalabra = document.getElementById('numeroPalabra');
const entradaLetra = document.getElementById('entradaLetra');
const elementoLetrasUsadas = document.getElementById('letrasUsadas');
const elementoMensaje = document.getElementById('mensaje');
const imagenPalabra = document.getElementById('imagenPalabra');
const pista1 = document.getElementById('pista1');
const pista2 = document.getElementById('pista2');
const pista3 = document.getElementById('pista3');
const canvasAhorcado = document.getElementById('canvasAhorcado');
const ctx = canvasAhorcado.getContext('2d');

const btnIniciar = document.getElementById('btnIniciar');
const btnPausa = document.getElementById('btnPausa');
const btnReiniciar = document.getElementById('btnReiniciar');
const btnSalir = document.getElementById('btnSalir');
const btnAdivinar = document.getElementById('btnAdivinar');

let imagenAhorcadoActual = new Image();
let imagenPalabraGanada = new Image();
let mostrandoImagenPalabra = false;

function configurarCanvas() {
    const rect = canvasAhorcado.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvasAhorcado.width = rect.width * dpr;
    canvasAhorcado.height = rect.height * dpr;

    ctx.scale(dpr, dpr);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
}

entradaLetra.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        adivinarLetra();
    }
});

entradaLetra.addEventListener('input', function (e) {
    this.value = this.value.toUpperCase().replace(/[^A-ZÁÉÍÓÚÑ]/g, '');
});

window.addEventListener('resize', function () {
    configurarCanvas();
    mostrarImagenAhorcado();
});

function inicializarJuego() {
    configurarCanvas();
    actualizarIU();
    mostrarImagenAhorcado();
    mostrarMensaje('¡Presiona "Iniciar" para comenzar el juego!', 'info');
}

function iniciarJuego() {
    if (!juegoActivo) {
        juegoActivo = true;
        juegoPausado = false;
        indicePalabraActual = 0;
        palabrasCompletadas = [];
        seleccionarSiguientePalabra();
        actualizarIU();
        mostrarMensaje('¡Juego iniciado! ¡Buena suerte!', 'exito');
    } else if (juegoPausado) {
        reanudarJuego();
    }
}

function seleccionarSiguientePalabra() {
    if (palabrasCompletadas.length === palabrasBaseDeDatos.length) {
        palabrasCompletadas = [];
        indicePalabraActual = 0;
    }

    while (palabrasCompletadas.includes(indicePalabraActual) &&
            palabrasCompletadas.length < palabrasBaseDeDatos.length) {
        indicePalabraActual = (indicePalabraActual + 1) % palabrasBaseDeDatos.length;
    }

    datosPalabraActual = palabrasBaseDeDatos[indicePalabraActual];
    palabraActual = datosPalabraActual.palabra;
    letrasAdivinadas = [];
    intentosFallidos = 0;
    mostrandoImagenPalabra = false;

    mostrarPalabra();
    mostrarPistas();
    ocultarImagenPalabra();
    actualizarLetrasUsadas();
    mostrarImagenAhorcado();
    entradaLetra.value = '';
    entradaLetra.focus();
}

function mostrarPalabra() {
    visualizadorPalabra.innerHTML = '';

    for (let i = 0; i < palabraActual.length; i++) {
        const letra = palabraActual[i];
        const divLetra = document.createElement('div');
        divLetra.className = 'letra';

        if (letrasAdivinadas.includes(letra)) {
            divLetra.textContent = letra;
            divLetra.classList.add('adivinada');
        } else {
            divLetra.textContent = '_';
        }

        divLetra.style.animationDelay = `${i * 0.1}s`;
        visualizadorPalabra.appendChild(divLetra);
    }
}

function mostrarPistas() {
    pista1.textContent = datosPalabraActual.pistas[0];
    pista2.textContent = datosPalabraActual.pistas[1];
    pista3.textContent = datosPalabraActual.pistas[2];
}

function ocultarImagenPalabra() {
    imagenPalabra.src = '';
    imagenPalabra.alt = 'Imagen oculta';
    imagenPalabra.style.display = 'none';
}

function mostrarImagenAhorcado() {
    const rect = canvasAhorcado.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);

    const dibujarImagen = (imagen) => {
        const canvasWidth = rect.width;
        const canvasHeight = rect.height;

        let drawWidth = imagen.naturalWidth;
        let drawHeight = imagen.naturalHeight;

        const scaleX = canvasWidth / drawWidth;
        const scaleY = canvasHeight / drawHeight;
        const scale = Math.min(scaleX, scaleY) * 0.85;

        drawWidth = imagen.naturalWidth * scale;
        drawHeight = imagen.naturalHeight * scale;

        const x = (canvasWidth - drawWidth) / 2;
        const y = (canvasHeight - drawHeight) / 2;

        ctx.drawImage(imagen, x, y, drawWidth, drawHeight);
    };

    if (mostrandoImagenPalabra) {
        imagenPalabraGanada.src = datosPalabraActual.imagen;
        imagenPalabraGanada.onload = function () {
            if (this.complete && this.naturalHeight !== 0) {
                dibujarImagen(this);
            }
        };
        imagenPalabraGanada.onerror = function () {
            ctx.fillStyle = '#666';
            ctx.font = '16px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('¡Palabra completada!', rect.width / 2, rect.height / 2);
        };
    } else {
        imagenAhorcadoActual.src = imagenesAhorcado[intentosFallidos];
        imagenAhorcadoActual.onload = function () {
            if (this.complete && this.naturalHeight !== 0) {
                dibujarImagen(this);
            }
        };
        imagenAhorcadoActual.onerror = function () {
            dibujarAhorcadoSimple();
        };
    }
}

function dibujarAhorcadoSimple() {
    const rect = canvasAhorcado.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    ctx.strokeStyle = '#333';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';

    if (intentosFallidos >= 1) {
        ctx.beginPath();
        ctx.moveTo(centerX - 60, centerY + 100);
        ctx.lineTo(centerX + 60, centerY + 100);
        ctx.stroke();
    }

    if (intentosFallidos >= 2) {
        ctx.beginPath();
        ctx.moveTo(centerX - 40, centerY + 100);
        ctx.lineTo(centerX - 40, centerY - 80);
        ctx.stroke();
    }

    if (intentosFallidos >= 3) {
        ctx.beginPath();
        ctx.moveTo(centerX - 40, centerY - 80);
        ctx.lineTo(centerX + 20, centerY - 80);
        ctx.stroke();
    }

    if (intentosFallidos >= 4) {
        ctx.beginPath();
        ctx.moveTo(centerX + 20, centerY - 80);
        ctx.lineTo(centerX + 20, centerY - 60);
        ctx.stroke();
    }

    if (intentosFallidos >= 5) {
        ctx.beginPath();
        ctx.arc(centerX + 20, centerY - 45, 15, 0, 2 * Math.PI);
        ctx.stroke();
    }

    if (intentosFallidos >= 6) {
        ctx.beginPath();
        ctx.moveTo(centerX + 20, centerY - 30);
        ctx.lineTo(centerX + 20, centerY + 30);
        ctx.stroke();
    }
}
function adivinarLetra() {
    if (!juegoActivo || juegoPausado) {
        mostrarMensaje('El juego no está activo o está en pausa', 'advertencia');
        return;
    }

    const letra = entradaLetra.value.toUpperCase().trim();

    if (!letra) {
        mostrarMensaje('Por favor, ingresa una letra', 'advertencia');
        entradaLetra.focus();
        return;
    }

    if (!/^[A-ZÁÉÍÓÚÑ]$/.test(letra)) {
        mostrarMensaje('Por favor, ingresa solo letras válidas', 'error');
        entradaLetra.focus();
        return;
    }

    if (letrasAdivinadas.includes(letra)) {
        mostrarMensaje(`Ya has usado la letra "${letra}"`, 'advertencia');
        entradaLetra.focus();
        return;
    }

    letrasAdivinadas.push(letra);
    entradaLetra.value = '';

    if (palabraActual.includes(letra)) {
        const cantidadLetras = (palabraActual.match(new RegExp(letra, 'g')) || []).length;
        mostrarMensaje(`¡Excelente! La letra "${letra}" aparece ${cantidadLetras} ${cantidadLetras === 1 ? 'vez' : 'veces'}`, 'exito');
        mostrarPalabra();

        if (palabraCompleta()) {
            ganarJuego();
            return;
        }
    } else {
        intentosFallidos++;
        mostrarImagenAhorcado();
        const intentosRestantes = intentosMaximos - intentosFallidos;
        mostrarMensaje(`La letra "${letra}" no está en la palabra. Te quedan ${intentosRestantes} intento${intentosRestantes !== 1 ? 's' : ''}`, 'error');

        if (intentosFallidos >= intentosMaximos) {
            perderJuego();
            return;
        }
    }

    actualizarLetrasUsadas();
    actualizarIU();
    entradaLetra.focus();
}

function palabraCompleta() {
    return palabraActual.split('').every(letra => letrasAdivinadas.includes(letra));
}

function ganarJuego() {
    juegoActivo = false;
    mostrandoImagenPalabra = true;
    palabrasCompletadas.push(indicePalabraActual);

    const imagenGanadora = new Image();
    imagenGanadora.src = datosPalabraActual.imagen;

    imagenGanadora.onload = () => {
        const rect = canvasAhorcado.getBoundingClientRect();
        const dibujarImagen = (imagen) => {
            const canvasWidth = rect.width;
            const canvasHeight = rect.height;
            let drawWidth = imagen.naturalWidth;
            let drawHeight = imagen.naturalHeight;
            const scale = Math.min(canvasWidth / drawWidth, canvasHeight / drawHeight) * 0.85;
            drawWidth = imagen.naturalWidth * scale;
            drawHeight = imagen.naturalHeight * scale;
            const x = (canvasWidth - drawWidth) / 2;
            const y = (canvasHeight - drawHeight) / 2;
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            ctx.drawImage(imagen, x, y, drawWidth, drawHeight);
        };
        dibujarImagen(imagenGanadora);

        const palabrasRestantes = palabrasBaseDeDatos.length - palabrasCompletadas.length;
        mostrarMensaje(`¡Felicitaciones! Adivinaste "${palabraActual}". Quedan ${palabrasRestantes} palabra${palabrasRestantes !== 1 ? 's' : ''}`, 'exito');
        elementoEstadoJuego.textContent = 'Ganaste';

        setTimeout(() => {
            if (palabrasCompletadas.length < palabrasBaseDeDatos.length) {
                do {
                    indicePalabraActual = (indicePalabraActual + 1) % palabrasBaseDeDatos.length;
                } while (palabrasCompletadas.includes(indicePalabraActual));

                seleccionarSiguientePalabra();
                juegoActivo = true;
                mostrarMensaje('¡Nueva palabra! ¡Continúa jugando!', 'info');
                elementoEstadoJuego.textContent = 'Jugando';
            } else {
                mostrarMensaje('¡Felicitaciones! ¡Has completado todas las palabras! 🎉', 'exito');
                elementoEstadoJuego.textContent = 'Completado';
                setTimeout(() => {
                    if (confirm('¿Quieres jugar de nuevo con todas las palabras?')) {
                        reiniciarJuego();
                    }
                }, 3000);
            }
            actualizarIU();
        }, 4000);
    };

    imagenGanadora.onerror = () => {
        const palabrasRestantes = palabrasBaseDeDatos.length - palabrasCompletadas.length;
        mostrarMensaje(`¡Felicitaciones! Adivinaste "${palabraActual}". Quedan ${palabrasRestantes} palabra${palabrasRestantes !== 1 ? 's' : ''}`, 'exito');
        elementoEstadoJuego.textContent = 'Ganaste';

        setTimeout(() => {
            if (palabrasCompletadas.length < palabrasBaseDeDatos.length) {
                do {
                    indicePalabraActual = (indicePalabraActual + 1) % palabrasBaseDeDatos.length;
                } while (palabrasCompletadas.includes(indicePalabraActual));
                seleccionarSiguientePalabra();
                juegoActivo = true;
                mostrarMensaje('¡Nueva palabra! ¡Continúa jugando!', 'info');
                elementoEstadoJuego.textContent = 'Jugando';
            } else {
                mostrarMensaje('¡Felicitaciones! ¡Has completado todas las palabras! 🎉', 'exito');
                elementoEstadoJuego.textContent = 'Completado';
                setTimeout(() => {
                    if (confirm('¿Quieres jugar de nuevo con todas las palabras?')) {
                        reiniciarJuego();
                    }
                }, 3000);
            }
            actualizarIU();
        }, 4000);
    };
}

function perderJuego() {
    juegoActivo = false;
    mostrarMensaje(`¡Juego terminado! 😞 La palabra era: "${palabraActual}"`, 'error');
    elementoEstadoJuego.textContent = 'Perdiste';
    actualizarIU();

    setTimeout(() => {
        if (confirm('¿Quieres continuar con la siguiente palabra?')) {
            if (palabrasCompletadas.length < palabrasBaseDeDatos.length - 1) {
                do {
                    indicePalabraActual = (indicePalabraActual + 1) % palabrasBaseDeDatos.length;
                } while (palabrasCompletadas.includes(indicePalabraActual));

                seleccionarSiguientePalabra();
                juegoActivo = true;
                elementoEstadoJuego.textContent = 'Jugando';
                actualizarIU();
            } else {
                reiniciarJuego();
            }
        }
    }, 2000);
}

function pausarJuego() {
    if (juegoActivo && !juegoPausado) {
        juegoPausado = true;
        document.querySelector('.contenedor-juego').classList.add('juego-pausado');
        mostrarMensaje('Juego pausado ⏸️', 'info');
        elementoEstadoJuego.textContent = 'Pausado';
        btnPausa.textContent = '▶️ Reanudar';
    } else if (juegoActivo && juegoPausado) {
        reanudarJuego();
    }
}

function reanudarJuego() {
    if (juegoActivo && juegoPausado) {
        juegoPausado = false;
        document.querySelector('.contenedor-juego').classList.remove('juego-pausado');
        mostrarMensaje('¡Juego reanudado! ▶️', 'exito');
        elementoEstadoJuego.textContent = 'Jugando';
        btnPausa.textContent = '⏸️ Pausa';
        entradaLetra.focus();
    }
}
function reiniciarJuego() {
    juegoActivo = true;
    juegoPausado = false;
    indicePalabraActual = 0;
    palabrasCompletadas = [];
    mostrandoImagenPalabra = false;

    document.querySelector('.contenedor-juego').classList.remove('juego-pausado');
    btnPausa.textContent = '⏸️ Pausa';

    seleccionarSiguientePalabra();
    actualizarIU();
    mostrarMensaje('Juego reiniciado 🔄', 'info');
    elementoEstadoJuego.textContent = 'Jugando';
}

function salirJuego() {
    if (confirm('¿Estás seguro de que quieres salir del juego?')) {
        juegoActivo = false;
        juegoPausado = false;
        palabraActual = '';
        letrasAdivinadas = [];
        intentosFallidos = 0;
        indicePalabraActual = 0;
        palabrasCompletadas = [];
        mostrandoImagenPalabra = false;

        document.querySelector('.contenedor-juego').classList.remove('juego-pausado');
        btnPausa.textContent = '⏸️ Pausa';

        visualizadorPalabra.innerHTML = '';
        elementoLetrasUsadas.innerHTML = '';
        pista1.textContent = '';
        pista2.textContent = '';
        pista3.textContent = '';
        imagenPalabra.src = '';
        imagenPalabra.style.display = 'none';

        actualizarIU();
        mostrarImagenAhorcado();
        mostrarMensaje('Has salido del juego. ¡Gracias por jugar! 👋', 'info');
        elementoEstadoJuego.textContent = 'Detenido';

        window.location.href = 'index.jsp';
    }
}

function actualizarLetrasUsadas() {
    elementoLetrasUsadas.innerHTML = '';
    const letrasIncorrectas = letrasAdivinadas.filter(letra => !palabraActual.includes(letra));

    letrasIncorrectas.forEach((letra, index) => {
        const spanLetra = document.createElement('span');
        spanLetra.className = 'letra-usada';
        spanLetra.textContent = letra;
        spanLetra.style.animationDelay = `${index * 0.1}s`;
        elementoLetrasUsadas.appendChild(spanLetra);
    });
}

function actualizarIU() {
    elementoIntentos.textContent = intentosMaximos - intentosFallidos;
    elementoNumeroPalabra.textContent = `${palabrasCompletadas.length + 1}/${palabrasBaseDeDatos.length}`;

    btnIniciar.disabled = juegoActivo && !juegoPausado;
    btnPausa.disabled = !juegoActivo;
    btnReiniciar.disabled = false;
    btnSalir.disabled = false;
    btnAdivinar.disabled = !juegoActivo || juegoPausado;
    entradaLetra.disabled = !juegoActivo || juegoPausado;

    if (!juegoActivo) {
        btnIniciar.textContent = '🎮 Iniciar';
    } else if (juegoPausado) {
        btnIniciar.textContent = '▶️ Reanudar';
    } else {
        btnIniciar.textContent = '🎮 Iniciado';
    }
}

function mostrarMensaje(texto, tipo = 'info') {
    elementoMensaje.textContent = texto;
    elementoMensaje.className = `mensaje ${tipo}`;

    clearTimeout(window.mensajeTimeout);

    if (!['exito', 'error'].includes(tipo)) {
        window.mensajeTimeout = setTimeout(() => {
            elementoMensaje.textContent = '';
            elementoMensaje.className = 'mensaje';
        }, 4000);
}
}

function configurarAtajosDeTeclado() {
    document.addEventListener('keydown', function (e) {
        if (document.activeElement !== entradaLetra || ['Escape', 'F1', 'F2', 'F3', 'F4'].includes(e.key)) {
            switch (e.key) {
                case 'F1':
                case 's':
                case 'S':
                    e.preventDefault();
                    if (!juegoActivo)
                        iniciarJuego();
                    break;
                case 'F2':
                case 'p':
                case 'P':
                    e.preventDefault();
                    if (juegoActivo)
                        pausarJuego();
                    break;
                case 'F3':
                case 'r':
                case 'R':
                    e.preventDefault();
                    reiniciarJuego();
                    break;
                case 'Escape':
                case 'F4':
                    e.preventDefault();
                    salirJuego();
                    break;
                case ' ':
                    if (document.activeElement !== entradaLetra) {
                        e.preventDefault();
                        entradaLetra.focus();
                    }
                    break;
            }
        }
    });
}

function manejarErrorJuego(error, contexto = '') {
    mostrarMensaje('Ha ocurrido un error. El juego se reiniciará automáticamente.', 'error');

    setTimeout(() => {
        try {
            reiniciarJuego();
        } catch (errorReinicio) {
            mostrarMensaje('Error crítico. Por favor, recarga la página.', 'error');
        }
    }, 3000);
}
function validarImagenes() {
    let imagenesCargadas = 0;
    let imagenesConError = 0;
    const totalImagenes = palabrasBaseDeDatos.length + imagenesAhorcado.length;

    palabrasBaseDeDatos.forEach((datosPalabra, indice) => {
        const img = new Image();
        img.onload = function () {
            imagenesCargadas++;
            verificarCargaCompleta();
        };
        img.onerror = function () {
            imagenesConError++;
            verificarCargaCompleta();
        };
        img.src = datosPalabra.imagen;
    });

    imagenesAhorcado.forEach((rutaImagen) => {
        const img = new Image();
        img.onload = function () {
            imagenesCargadas++;
            verificarCargaCompleta();
        };
        img.onerror = function () {
            imagenesConError++;
            verificarCargaCompleta();
        };
        img.src = rutaImagen;
    });

    function verificarCargaCompleta() {
        if (imagenesCargadas + imagenesConError === totalImagenes) {
            if (imagenesConError > 0) {
                mostrarMensaje(`Algunas imágenes no se pudieron cargar (${imagenesConError}/${totalImagenes})`, 'advertencia');
            }
        }
    }
}

function inicializarJuegoCompleto() {
    try {
        configurarCanvas();
        configurarAtajosDeTeclado();
        validarImagenes();
        inicializarJuego();
    } catch (error) {
        manejarErrorJuego(error, 'durante la inicialización');
    }
}

window.addEventListener('error', function (e) {
    manejarErrorJuego(e.error, 'error global');
});

window.addEventListener('unhandledrejection', function (e) {
    manejarErrorJuego(e.reason, 'promesa rechazada');
});

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('btnIniciar').addEventListener('click', iniciarJuego);
    document.getElementById('btnPausa').addEventListener('click', pausarJuego);
    document.getElementById('btnReiniciar').addEventListener('click', reiniciarJuego);
    document.getElementById('btnSalir').addEventListener('click', salirJuego);
    document.getElementById('btnAdivinar').addEventListener('click', adivinarLetra);

    inicializarJuegoCompleto();
});

window.addEventListener('resize', debounce(function () {
    configurarCanvas();
    mostrarImagenAhorcado();
}, 250));

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function obtenerEstadisticas() {
    return {
        palabraActual: palabraActual,
        letrasAdivinadas: letrasAdivinadas.length,
        intentosFallidos: intentosFallidos,
        intentosRestantes: intentosMaximos - intentosFallidos,
        palabrasCompletadas: palabrasCompletadas.length,
        totalPalabras: palabrasBaseDeDatos.length,
        porcentajeCompletado: Math.round((palabrasCompletadas.length / palabrasBaseDeDatos.length) * 100),
        juegoActivo: juegoActivo,
        juegoPausado: juegoPausado
    };
}

window.estadisticasJuego = obtenerEstadisticas;