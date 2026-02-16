package com.jorgeaquino.Ahorcado.repository;

import com.jorgeaquino.Ahorcado.model.Palabra;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PalabraRepository extends JpaRepository<Palabra, Integer> {
    Optional<Palabra> findByPalabra(String palabra);
}