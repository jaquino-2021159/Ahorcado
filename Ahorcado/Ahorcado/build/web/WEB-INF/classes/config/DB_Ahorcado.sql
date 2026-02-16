-- drop database if exists DB_Ahorcado;
create database DB_Ahorcado;
use DB_Ahorcado;

create table palabras (
	codigoPalabra int auto_increment,
	palabra varchar(50),
	pista1 varchar(200),
	pista2 varchar(200),
	pista3 varchar(200),
	imagen varchar(200),  
	primary key PK_codigoPalabra (codigoPalabra)
);

create table usuarios (
    codigoUsuario int auto_increment,
    usuario varchar(50) not null,
    contrasena varchar(50) not null,
    primary key PK_codigoUsuario (codigoUsuario)
);

-- PROCEDIMIENTOS ALMACENADOS (PALABRAS) -------------------------
-- AGREGAR PALABRA
Delimiter $$
create procedure sp_AgregarPalabra (
	in palabra varchar(50),
	in pista1 varchar(200),
	in pista2 varchar(200),
	in pista3 varchar(200),
    in imagen varchar(200))
begin
	insert into palabras (palabra, pista1, pista2, pista3, imagen)
	values (palabra, pista1, pista2, pista3, imagen);
end$$
Delimiter ;

-- <-- NUEVO: Rutas de imágenes agregadas a cada llamada
call sp_AgregarPalabra('TELEVISOR', '📺 Dispositivo electrónico para ver programas', '🏠 Se encuentra comúnmente en salas y dormitorios', '📡 Recibe señales de televisión o cable', 'img/Televisor.jpg');
call sp_AgregarPalabra('BIBLIOTECA', '📚 Lugar donde se guardan y consultan libros', '🤫 Espacio donde se debe mantener silencio', '📖 Los estudiantes van aquí a estudiar e investigar', 'img/Biblioteca.jpg');
call sp_AgregarPalabra('MARIPOSAS', '🦋 Insectos con alas coloridas y hermosas', '🌸 Vuelan de flor en flor buscando néctar', '🐛 Pasan por metamorfosis desde oruga hasta adulto', 'img/Maripoosas.jpg');
call sp_AgregarPalabra('INTERNET', '🌐 Red mundial de computadoras conectadas', '💻 Necesario para navegar en páginas web', '📱 Permite comunicación y acceso a información global', 'img/Internet.jpg');
call sp_AgregarPalabra('CASCADA', '💧 Caída de agua desde una altura considerable', '🏔️ Se forma cuando un río encuentra un desnivel', '🌈 A veces forma arcoíris con la luz del sol', 'img/Cascada.png');

-- LISTAR PALABRAS
Delimiter $$
create procedure sp_ListarPalabras ()
begin
	select * from palabras;
end$$
Delimiter ;
call sp_ListarPalabras ();


-- ELIMINAR PALABRA
Delimiter $$
create procedure sp_EliminarPalabra (
	in codPalabra int)
begin
	delete from palabras where codigoPalabra = codPalabra;
end$$
Delimiter ;

-- EDITAR PALABRA
Delimiter $$
create procedure sp_EditarPalabra (
	in in_codPalabra int,
	in in_palabra varchar(50),
	in in_pista1 varchar(200),
	in in_pista2 varchar(200),
	in in_pista3 varchar(200),
    in in_imagen varchar(200)) 
begin
	update palabras
    set palabra = in_palabra, 
		pista1 = in_pista1, 
		pista2 = in_pista2, 
        pista3 = in_pista3,
        imagen = in_imagen 
		where codigoPalabra = in_codPalabra;
end$$
Delimiter ;

-- PROCEDIMIENTOS ALMACENADOS (USUARIOS) -------------------------
-- AGREGAR USUARIO
Delimiter $$
create procedure sp_AgregarUsuario (
    in usu varchar(50),
    in contra varchar(50))
begin
    insert into usuarios (usuario, contrasena)
    values (usu, contra);
end$$
Delimiter ;

call sp_AgregarUsuario('admin', 'admin123');

call sp_AgregarUsuario('jugador1', 'pass1234');

-- VALIDAR USUARIO
Delimiter $$
create procedure sp_ValidarUsuario (
    in usu varchar(50),
    in contra varchar(50))
begin
    select * from usuarios where usuario = usu and contrasena = contra;
end$$
Delimiter ;

call sp_ValidarUsuario('admin', 'admin123');
call sp_ValidarUsuario('jugador1', 'pass1234');