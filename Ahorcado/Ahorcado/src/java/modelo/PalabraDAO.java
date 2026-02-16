package modelo;

import config.Conexion;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class PalabraDAO {

    private Conexion cn = Conexion.getInstancia();
    private Connection con;

    private CallableStatement cs;
    private ResultSet rs;

    public List listar() {
        ArrayList<Palabra> lista = new ArrayList<>();
        String sql = "call sp_ListarPalabras()";
        try {
            con = cn.getConexion();
            cs = con.prepareCall(sql);
            rs = cs.executeQuery();
            while (rs.next()) {
                Palabra palabra = new Palabra();
                palabra.setCodigoPalabra(rs.getInt("codigoPalabra"));
                palabra.setPalabra(rs.getString("palabra"));
                palabra.setPista1(rs.getString("pista1"));
                palabra.setPista2(rs.getString("pista2"));
                palabra.setPista3(rs.getString("pista3"));
                palabra.setImagen(rs.getString("imagen")); 

                lista.add(palabra);
            }
        } catch (SQLException e) {
            System.out.println("Error al listar: " + e.getMessage());
        }
        return lista;
    }

    public int agregar(Palabra palabra) {
        String sql = "call sp_AgregarPalabra(?, ?, ?, ?)";
        try {
            con = cn.getConexion();
            cs = con.prepareCall(sql);
            cs.setString(1, palabra.getPalabra());
            cs.setString(2, palabra.getPista1());
            cs.setString(3, palabra.getPista2());
            cs.setString(4, palabra.getPista3());
            cs.setString(5, palabra.getImagen()); 
            cs.executeUpdate();
        } catch (SQLException e) {
            System.out.println("Error al agregar: " + e.getMessage());
        }
        return 1;
    }

    public int actualizar(Palabra palabra) {
        String sql = "call sp_EditarPalabra(?, ?, ?, ?, ?)";
        try {
            con = cn.getConexion();
            cs = con.prepareCall(sql);
            cs.setInt(1, palabra.getCodigoPalabra());
            cs.setString(2, palabra.getPalabra());
            cs.setString(3, palabra.getPista1());
            cs.setString(4, palabra.getPista2());
            cs.setString(5, palabra.getPista3());
            cs.setString(6, palabra.getImagen()); 

            cs.executeUpdate();
        } catch (SQLException e) {
            System.out.println("Error al actualizar: " + e.getMessage());
        }
        return 1;
    }

    public void delete(int id) {
        String sql = "call sp_EliminarPalabra(?)";
        try {
            con = cn.getConexion();
            cs = con.prepareCall(sql);
            cs.setInt(1, id);
            cs.executeUpdate();
        } catch (SQLException e) {
            System.out.println("Error al eliminar: " + e.getMessage());
        }
    }
}
