package config;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
 
public class Conexion {

    private static Conexion instancia;
    private Connection conexion;

    public Conexion() {
        conectar(); 
    }

    private void conectar() {
        try {
            Class.forName("com.mysql.jdbc.Driver");
            String url = "jdbc:mysql://localhost:3306/DB_Ahorcado?useSSL=false&allowPublicKeyRetrieval=true";
            String user = "root";
            String password = "admin";

            conexion = DriverManager.getConnection(url, user, password);

        } catch (ClassNotFoundException | SQLException error) {
            StackTraceElement elemento = error.getStackTrace()[0];
            System.out.println("Error en: " + elemento.getClassName() + " línea " + elemento.getLineNumber());
            System.out.println("Mensaje: " + error.getMessage());
            error.printStackTrace();
        }
    }

    public static synchronized Conexion getInstancia() {
        if (instancia == null) {
            instancia = new Conexion();
        }
        return instancia;
    }

    public Connection getConexion() {
        try {
            
            if (conexion == null || conexion.isClosed()) {
                conectar(); 
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return conexion;
    }

    public void setConexion(Connection conexion) {
        this.conexion = conexion;
    }
}
