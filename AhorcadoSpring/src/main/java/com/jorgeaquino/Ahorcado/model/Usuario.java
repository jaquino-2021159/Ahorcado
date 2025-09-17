package com.jorgeaquino.Ahorcado.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "usuarios")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "codigoUsuario")
    private Integer codigoUsuario;

    @NotBlank(message = "El usuario no puede estar en blanco")
    @Size(min = 1, max = 50, message = "El usuario debe tener entre 1 y 50 caracteres")
    @Column(name = "usuario")
    private String usuario;

    @NotBlank(message = "La contrasena no puede estar en blanco")
    @Size(min = 1, max = 50, message = "La contrasena debe tener entre 1 y 50 caracteres")
    @Column(name = "contrasena")
    private String contrasena;

    // Getters y Setters
    public Integer getCodigoUsuario() {
        return codigoUsuario;
    }

    public void setCodigoUsuario(Integer codigoUsuario) {
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