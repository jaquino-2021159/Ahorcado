<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>

<html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Juego del Ahorcado</title>
        <link rel="stylesheet" href="css/estilo.css">
    </head>

    <body>
        <div class="video-background">
            <video autoplay muted loop id="bg-video">
                <source src="img/ahorcado.mp4" type="video/mp4">
                <source src="img/ahorcado.webm" type="video/webm">
            </video>
            <div class="video-overlay"></div>
        </div>


        <div class="contenedor-juego">
            <div class="header">
                <h1 class="titulo-juego"> JUEGO DEL AHORCADO </h1>
                <div class="creditos">Realizado por: <strong>Jorge Aquino</strong></div>
                <div class="fundacion">📚 Fundación Kinal 📚</div>
            </div>

            <div class="info-juego">
                <div class="caja-info">
                    <div class="etiqueta-info">Intentos</div>
                    <div class="valor-info intentos" id="intentos">6</div>
                </div>
                <div class="caja-info">
                    <div class="etiqueta-info">Estado</div>
                    <div class="valor-info" id="estadoJuego">Detenido</div>
                </div>
                <div class="caja-info">
                    <div class="etiqueta-info">Palabra</div>
                    <div class="valor-info" id="numeroPalabra">0/5</div>
                    <div class="caja-info">
                        <div class="etiqueta-info">Tiempo</div>
                        <div class="valor-info" id="cronometro">5:00</div>
                    </div>
                </div>
            </div>

            <div class="contenido-principal">
                <div class="seccion-izquierda">
                    <!-- Visualizador de palabra -->
                    <div class="visualizador-palabra">
                        <div id="visualizadorPalabra" class="letras-palabra"></div>
                    </div>

                    <div class="contenedor-pistas">
                        <h3>💡 Pistas</h3>
                        <div class="pistas">
                            <div class="pista" id="pista1"></div>
                            <div class="pista" id="pista2"></div>
                            <div class="pista" id="pista3"></div>
                        </div>
                    </div>
                </div>

                <div class="seccion-derecha">
                    <div class="contenedor-imagen-ahorcado">
                        <canvas id="canvasAhorcado" width="320" height="280"></canvas>
                    </div>
                </div>
            </div>

            <div class="contenedor-entrada">
                <input type="text" id="entradaLetra" maxlength="1" placeholder="?" disabled>
                <button id="btnAdivinar" disabled>Adivinar</button>
            </div>

            <div class="letras-usadas">
                <h4>❌ Letras incorrectas</h4>
                <div id="letrasUsadas"></div>
            </div>

            <div class="botones-control">
                <button id="btnIniciar">🚀 Iniciar</button>
                <button id="btnPausa" disabled>⏸️ Pausa</button>
                <button id="btnReiniciar">🔄 Reiniciar</button>
                <button id="btnSalir">🚪 Salir</button>
            </div>

            <div id="mensaje" class="mensaje"></div>

            <img id="imagenPalabra" class="imagen-palabra" style="display: none;" alt="Imagen de la palabra">
        </div>
        <script src="js/script.js"></script>
    </body>
</html>