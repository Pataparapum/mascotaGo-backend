package com.ApiRest.Api.Controllers;

import com.ApiRest.Api.Entities.Usuario;
import com.ApiRest.Api.Repositories.UsuarioRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/user")
public class UsuarioController {

    private static final Logger log = LoggerFactory.getLogger(UsuarioController.class);

    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping
    public List<Usuario> getUsers() {
        return usuarioRepository.findAll();
    }

    @GetMapping("/{id}")
    public Usuario getUserWithId(@PathVariable Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("No se encontró el ID: " +  id + " en la base de datos"));
    }

    @PostMapping
    public Usuario addNewUser(@RequestBody Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    @PutMapping("/{id}")
    public Usuario updateUser(@RequestBody Usuario datoUsuario , @PathVariable long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("No se encontró el ID: " + id + " en la base de datos"));

        usuario.setNombre(datoUsuario.getNombre());
        usuario.setCorreo(datoUsuario.getCorreo());

        return usuarioRepository.save(usuario);
    }

    @DeleteMapping("/{id}")
    public String delateUser(@PathVariable long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("No se encontró el ID: " + id + " en la base de datos"));
        usuarioRepository.delete(usuario);
        return "El usuario con el ID: " + id + " ha sido eliminado correctamente";
    }
}
