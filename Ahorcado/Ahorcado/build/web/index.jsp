<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Ingreso al Ahorcado</title>
        <link rel="stylesheet" href="css/login.css">
    </head>
    <body>
        <div class="contenedor-login">
            <h1 class="titulo">🔐 Ingreso al Juego</h1>
            <form method="post" action="Validacion">
                <div class="campo">
                    <label for="usuario">Usuario:</label>
                    <input type="text" id="usuario" name="usuario" required>
                </div>
                <div class="campo">
                    <label for="contrasena">Contraseña:</label>
                    <input type="password" id="contrasena" name="contrasena" required>
                </div>
                <button type="submit" class="boton">Ingresar</button>
            </form>

            <%
                String error = (String) request.getAttribute("error");
                if (error != null) {
            %>
            <p class="error">❌ <%= error %></p>
            <%
                }
            %>
        </div>
    </body>
</html>