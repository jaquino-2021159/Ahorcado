package modelo;
 
import config.Conexion;

import java.sql.Connection;

import java.sql.PreparedStatement;

import java.sql.ResultSet;

import java.sql.SQLException;
 
public class UsuarioDAO {

    Connection con;

    PreparedStatement ps;

    ResultSet rs;
 
    Conexion cn = Conexion.getInstancia();
 
    public Usuario validarUsuario(String usuario, String contrasena) {

        Usuario user = null;

        String sql = "{CALL sp_ValidarUsuario(?, ?)}";
 
        try {

            con = cn.getConexion(); 

            ps = con.prepareStatement(sql);

            ps.setString(1, usuario);

            ps.setString(2, contrasena);

            rs = ps.executeQuery();
 
            if (rs.next()) {

                user = new Usuario();

                user.setCodigoUsuario(rs.getInt("codigoUsuario"));

                user.setUsuario(rs.getString("usuario"));

                user.setContrasena(rs.getString("contrasena"));

            }

        } catch (SQLException e) {

            System.out.println("Error al validar usuario: " + e.getMessage());

        } finally {

            try {

                if (rs != null) rs.close();

                if (ps != null) ps.close();

            } catch (SQLException e) {

                System.out.println("Error al cerrar recursos: " + e.getMessage());

            }

        }

        return user;

    }
 
    public boolean agregarUsuario(Usuario user) {

        String sql = "{CALL sp_AgregarUsuario(?, ?)}";

        try {

            con = cn.getConexion();

            ps = con.prepareStatement(sql);

            ps.setString(1, user.getUsuario());

            ps.setString(2, user.getContrasena());

            ps.executeUpdate();

            return true;

        } catch (SQLException e) {

            System.out.println("Error al agregar usuario: " + e.getMessage());

            return false;

        } finally {

            try {

                if (ps != null) ps.close();

            } catch (SQLException e) {

                System.out.println("Error al cerrar recursos: " + e.getMessage());

            }

        }

    }

}
 