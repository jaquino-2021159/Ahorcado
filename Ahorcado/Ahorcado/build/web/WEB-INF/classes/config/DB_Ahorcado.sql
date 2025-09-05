-- drop database if exists DB_Ahorcado;
create database DB_Ahorcado;
use DB_Ahorcado;

-- TABLA PALABRAS AHORCADO
create table PalabrasAhorcado (
    codigoPalabra int auto_increment,
    palabra varchar(50) not null unique,
    pista1 varchar(150) not null,
    pista2 varchar(150) not null,
    pista3 varchar(150) not null,
    estado enum('activa', 'inactiva') default 'activa',
    primary key PK_codigoPalabra (codigoPalabra)
);

-- PROCEDIMIENTOS ALMACENADOS (PALABRAS AHORCADO) -------------------------
-- AGREGAR PALABRA
Delimiter $
create procedure sp_AgregarPalabraAhorcado (
    in palabraNueva varchar(50),
    in primeraPista varchar(150),
    in segundaPista varchar(150),
    in terceraPista varchar(150))
begin
    insert into PalabrasAhorcado (palabra, pista1, pista2, pista3)
    values (upper(palabraNueva), primeraPista, segundaPista, terceraPista);
end$
Delimiter ;

call sp_AgregarPalabraAhorcado('TELEVISOR', 'Dispositivo electrónico para ver programas', 'Se encuentra comúnmente en salas y dormitorios', 'Recibe señales de televisión o cable');
call sp_AgregarPalabraAhorcado('BIBLIOTECA', 'Lugar donde se guardan y consultan libros', 'Espacio donde se debe mantener silencio', 'Los estudiantes van aquí a estudiar e investigar');
call sp_AgregarPalabraAhorcado('MARIPOSAS', 'Insectos con alas coloridas y hermosas', 'Vuelan de flor en flor buscando néctar', 'Pasan por metamorfosis desde oruga hasta adulto');
call sp_AgregarPalabraAhorcado('INTERNET', 'Red mundial de computadoras conectadas', 'Necesario para navegar en páginas web', 'Permite comunicación y acceso a información global');
call sp_AgregarPalabraAhorcado('CASCADA', 'Caída de agua desde una altura considerable', 'Se forma cuando un río encuentra un desnivel', 'A veces forma arcoíris con la luz del sol');

-- LISTAR PALABRAS
Delimiter $$
create procedure sp_ListarPalabrasAhorcado ()
begin
    select p.codigoPalabra, p.palabra, p.pista1, p.pista2, p.pista3, p.estado
    from PalabrasAhorcado p;
end$$
Delimiter ;
call sp_ListarPalabrasAhorcado();

-- ELIMINAR PALABRA
Delimiter $$
create procedure sp_EliminarPalabraAhorcado (
    in codPalabra int)
begin
    delete from PalabrasAhorcado where codigoPalabra = codPalabra;
end$$
Delimiter ;
call sp_EliminarPalabraAhorcado(3);

-- BUSCAR PALABRA
Delimiter $$
create procedure sp_BuscarPalabraAhorcado (
    in codPalabra int)
begin
    select p.codigoPalabra, p.palabra, p.pista1, p.pista2, p.pista3, p.estado
    from PalabrasAhorcado p
    where p.codigoPalabra = codPalabra;
end$$
Delimiter ;
call sp_BuscarPalabraAhorcado(2);

-- EDITAR PALABRA
Delimiter $
create procedure sp_EditarPalabraAhorcado (
    in codPalabra int,
    in palabraNueva varchar(50),
    in pista1Nueva varchar(150),
    in pista2Nueva varchar(150),
    in pista3Nueva varchar(150),
    in estadoNuevo enum('activa', 'inactiva'))
begin
    update PalabrasAhorcado p
    set p.palabra = palabraNueva,
        p.pista1 = pista1Nueva,
        p.pista2 = pista2Nueva,
        p.pista3 = pista3Nueva,
        p.estado = estadoNuevo
    where p.codigoPalabra = codPalabra;
end$
Delimiter ;
call sp_EditarPalabraAhorcado(1, 'TELEVISOR', 'Dispositivo electrónico para ver programas', 'Se encuentra comúnmente en salas y dormitorios', 'Recibe señales de televisión o cable', 'activa');
