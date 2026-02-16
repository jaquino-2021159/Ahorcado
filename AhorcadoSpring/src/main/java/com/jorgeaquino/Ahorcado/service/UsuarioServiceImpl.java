package com.jorgeaquino.Ahorcado.service;

import com.jorgeaquino.Ahorcado.model.Usuario;
import com.jorgeaquino.Ahorcado.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioServiceImpl implements UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public UsuarioServiceImpl(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public List<Usuario> getAllUsuarios() {
        return usuarioRepository.findAll();
    }

    @Override
    public Optional<Usuario> getUsuarioById(Integer id) {
        return usuarioRepository.findById(id);
    }

    @Override
    public Usuario saveUsuario(Usuario usuario) {
        if (usuarioRepository.findByUsuario(usuario.getUsuario()).isPresent()) {
            throw new RuntimeException("El usuario '" + usuario.getUsuario() + "' ya existe");
        }
        return usuarioRepository.save(usuario);
    }

    @Override
    public Usuario updateUsuario(Integer id, Usuario usuario) {
        Usuario existingUsuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con ID: " + id));

        Optional<Usuario> usuarioWithSameName = usuarioRepository.findByUsuario(usuario.getUsuario());
        if (usuarioWithSameName.isPresent() && !usuarioWithSameName.get().getCodigoUsuario().equals(id)) {
            throw new RuntimeException("El usuario '" + usuario.getUsuario() + "' ya existe");
        }

        existingUsuario.setUsuario(usuario.getUsuario());
        existingUsuario.setContrasena(usuario.getContrasena());
        return usuarioRepository.save(existingUsuario);
    }

    @Override
    public void deleteUsuario(Integer id) {
        if (!usuarioRepository.existsById(id)) {
            throw new RuntimeException("Usuario no encontrado con ID: " + id);
        }
        usuarioRepository.deleteById(id);
    }
}