package com.jorgeaquino.Ahorcado.service;

import com.jorgeaquino.Ahorcado.model.Palabra;
import java.util.List;

public interface PalabraService {
    List<Palabra> getAllPalabras();
    Palabra getPalabraById(Integer id);
    Palabra savePalabra(Palabra palabra);
    Palabra updatePalabra(Integer id, Palabra palabra);
    void deletePalabra(Integer id);
}