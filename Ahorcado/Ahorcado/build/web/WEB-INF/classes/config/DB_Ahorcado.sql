-- drop database if exists DB_Ahorcado;
create database DB_Ahorcado;
use DB_Ahorcado;

create table palabras (
	codigoPalabra int auto_increment,
	palabra varchar(50),
	pista1 varchar(200),
	pista2 varchar(200),
	pista3 varchar(200),
	primary key PK_codigoPalabra (codigoPalabra)
);

-- PROCEDIMIENTOS ALMACENADOS (PALABRAS) -------------------------
-- AGREGAR PALABRA
Delimiter $$
create procedure sp_AgregarPalabra (
	in palabra varchar(50),
	in pista1 varchar(200),
	in pista2 varchar(200),
	in pista3 varchar(200))
begin
	insert into palabras (palabra, pista1, pista2, pista3)
	values (palabra, pista1, pista2, pista3);
end$$
Delimiter ;
call sp_AgregarPalabra('TELEVISOR', '📺 Prueba', '🏠 Se encuentra comúnmente en salas y dormitorios', '📡 Recibe señales de televisión o cable');
call sp_AgregarPalabra('BIBLIOTECA', '📚 Lugar donde se guardan y consultan libros', '🤫 Espacio donde se debe mantener silencio', '📖 Los estudiantes van aquí a estudiar e investigar');
call sp_AgregarPalabra('MARIPOSAS', '🦋 Insectos con alas coloridas y hermosas', '🌸 Vuelan de flor en flor buscando néctar', '🐛 Pasan por metamorfosis desde oruga hasta adulto');
call sp_AgregarPalabra('INTERNET', '🌐 Red mundial de computadoras conectadas', '💻 Necesario para navegar en páginas web', '📱 Permite comunicación y acceso a información global');
call sp_AgregarPalabra('CASCADA', '💧 Caída de agua desde una altura considerable', '🏔️ Se forma cuando un río encuentra un desnivel', '🌈 A veces forma arcoíris con la luz del sol');

-- LISTAR PALABRAS
Delimiter $$
create procedure sp_ListarPalabras ()
begin
	select * from palabras;
end$$
Delimiter ;

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
	in codPalabra int,
	in palabra varchar(50),
	in pista1 varchar(200),
	in pista2 varchar(200),
	in pista3 varchar(200))
begin
	update palabras set palabra = palabra, pista1 = pista1, pista2 = pista2, pista3 = pista3
		where codigoPalabra = codPalabra;
end$$
Delimiter ;
call sp_EditarPalabra(1, 'COMPUTADORA', '💻 Máquina para procesar información', '⌨️ Se usa con teclado y mouse', '🖥️ Tiene monitor, CPU y otros componentes');
