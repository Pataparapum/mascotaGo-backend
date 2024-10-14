package com.ApiRest.Api.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ApiRest.Api.Entities.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {}
