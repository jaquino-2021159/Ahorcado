package com.jorgeaquino.Ahorcado.service;

import com.jorgeaquino.Ahorcado.model.Palabra;
import com.jorgeaquino.Ahorcado.repository.PalabraRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PalabraServiceImpl implements PalabraService {

    private final PalabraRepository palabraRepository;

    public PalabraServiceImpl(PalabraRepository palabraRepository) {
        this.palabraRepository = palabraRepository;
    }

    @Override
    public List<Palabra> getAllPalabras() {
        return palabraRepository.findAll();
    }

    @Override
    public Palabra getPalabraById(Integer id) {
        return palabraRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Palabra no encontrada con ID: " + id));
    }

    @Override
    public Palabra savePalabra(Palabra palabra) {
        if (palabraRepository.findByPalabra(palabra.getPalabra()).isPresent()) {
            throw new RuntimeException("La palabra '" + palabra.getPalabra() + "' ya existe");
        }
        return palabraRepository.save(palabra);
    }

    @Override
    public Palabra updatePalabra(Integer id, Palabra palabra) {
        Palabra existingPalabra = palabraRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Palabra no encontrada con ID: " + id));

        Optional<Palabra> palabraWithSameName = palabraRepository.findByPalabra(palabra.getPalabra());
        if (palabraWithSameName.isPresent() && !palabraWithSameName.get().getCodigoPalabra().equals(id)) {
            throw new RuntimeException("La palabra '" + palabra.getPalabra() + "' ya existe");
        }

        existingPalabra.setPalabra(palabra.getPalabra());
        existingPalabra.setPista1(palabra.getPista1());
        existingPalabra.setPista2(palabra.getPista2());
        existingPalabra.setPista3(palabra.getPista3());
        existingPalabra.setImagen(palabra.getImagen());

        return palabraRepository.save(existingPalabra);
    }

    @Override
    public void deletePalabra(Integer id) {
        if (!palabraRepository.existsById(id)) {
            throw new RuntimeException("Palabra no encontrada con ID: " + id);
        }
        palabraRepository.deleteById(id);
    }
}