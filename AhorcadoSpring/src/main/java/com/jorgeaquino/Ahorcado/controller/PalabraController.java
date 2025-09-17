package com.jorgeaquino.Ahorcado.controller;

import com.jorgeaquino.Ahorcado.model.Palabra;
import com.jorgeaquino.Ahorcado.service.PalabraService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/palabras")
public class PalabraController {

    private final PalabraService palabraService;

    public PalabraController(PalabraService palabraService) {
        this.palabraService = palabraService;
    }

    @GetMapping
    public List<Palabra> getAllPalabras() {
        return palabraService.getAllPalabras();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Palabra> getPalabraById(@PathVariable Integer id) {
        try {
            Palabra palabra = palabraService.getPalabraById(id);
            return ResponseEntity.ok(palabra);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PostMapping
    public ResponseEntity<Map<String, String>> createPalabra(@Valid @RequestBody Palabra palabra) {
        Palabra createdPalabra = palabraService.savePalabra(palabra);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Palabra agregada exitosamente con ID: " + createdPalabra.getCodigoPalabra());
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, String>> updatePalabra(@PathVariable Integer id, @Valid @RequestBody Palabra palabra) {
        palabraService.updatePalabra(id, palabra);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Palabra con ID " + id + " actualizada exitosamente");
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deletePalabra(@PathVariable Integer id) {
        palabraService.deletePalabra(id);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Palabra eliminada exitosamente");
        return ResponseEntity.ok(response);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach(error -> {
            String fieldName = ((org.springframework.validation.FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return errors;
    }

    @ResponseStatus(HttpStatus.CONFLICT)
    @ExceptionHandler(RuntimeException.class)
    public Map<String, String> handleConflictExceptions(RuntimeException ex) {
        Map<String, String> errors = new HashMap<>();
        errors.put("error", ex.getMessage());
        return errors;
    }
}