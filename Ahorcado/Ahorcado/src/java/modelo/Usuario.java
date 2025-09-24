package modelo;
 
 
public class Usuario {
    private int codigoUsuario;
    private String usuario;
    private String contrasena;
 
    public Usuario() {
    }
 
    public Usuario(String usuario, String contrasena) {
        this.usuario = usuario;
        this.contrasena = contrasena;
    }
 
    // Getters y Setters
    public int getCodigoUsuario() {
        return codigoUsuario;
    }
 
    public void setCodigoUsuario(int codigoUsuario) {
        this.codigoUsuario = codigoUsuario;
    }
 
    public String getUsuario() {
        return usuario;
    }
 
    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }
 
    public String getContrasena() {
        return contrasena;
    }
 
    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
    }
}