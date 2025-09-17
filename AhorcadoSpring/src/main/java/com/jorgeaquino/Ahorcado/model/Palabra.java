package com.jorgeaquino.Ahorcado.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "palabras")
public class Palabra {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "codigoPalabra")
    private Integer codigoPalabra;

    @NotBlank(message = "La palabra no puede estar en blanco")
    @Size(min = 1, max = 50, message = "La palabra debe tener entre 1 y 50 caracteres")
    @Column(name = "palabra")
    private String palabra;

    @Size(max = 200, message = "La pista 1 no puede exceder los 200 caracteres")
    @Column(name = "pista1")
    private String pista1;

    @Size(max = 200, message = "La pista 2 no puede exceder los 200 caracteres")
    @Column(name = "pista2")
    private String pista2;

    @Size(max = 200, message = "La pista 3 no puede exceder los 200 caracteres")
    @Column(name = "pista3")
    private String pista3;

    @Size(max = 200, message = "La URL de la imagen no puede exceder los 200 caracteres")
    @Column(name = "imagen")
    private String imagen;

    // Getters y Setters
    public Integer getCodigoPalabra() {
        return codigoPalabra;
    }

    public void setCodigoPalabra(Integer codigoPalabra) {
        this.codigoPalabra = codigoPalabra;
    }

    public String getPalabra() {
        return palabra;
    }

    public void setPalabra(String palabra) {
        this.palabra = palabra;
    }

    public String getPista1() {
        return pista1;
    }

    public void setPista1(String pista1) {
        this.pista1 = pista1;
    }

    public String getPista2() {
        return pista2;
    }

    public void setPista2(String pista2) {
        this.pista2 = pista2;
    }

    public String getPista3() {
        return pista3;
    }

    public void setPista3(String pista3) {
        this.pista3 = pista3;
    }

    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }
}