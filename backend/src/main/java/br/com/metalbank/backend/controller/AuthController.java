package br.com.metalbank.backend.controller;

import br.com.metalbank.backend.dto.LoginDTO;
import br.com.metalbank.backend.dto.CadastroUsuarioDTO;
import br.com.metalbank.backend.dto.UsuarioResponseDTO;
import br.com.metalbank.backend.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {


    public boolean senhaForte(String senha) {
        String regex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$";
        return senha.matches(regex);
    }

    @Autowired
    private UsuarioService usuarioService;

    // Endereço: POST http://localhost:8080/auth/login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO dados){
        try {

            // Login padrão de testes
            if (dados.getCpf().equals("11111111111") && dados.getSenha().equals("123")) {
                return ResponseEntity.ok("LOGIN PADRÃO ACEITO");
            }


            // Chama a service para tentar logar
            UsuarioResponseDTO usuarioLogado = usuarioService.login(dados);

            // Se der certo, retorna OK e os dados do usuário
            return ResponseEntity.ok(usuarioLogado);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    // Endereço: POST http://localhost:8080/auth/cadastrar
    @PostMapping("/cadastrar")
    public ResponseEntity<?> cadastrar(@RequestBody CadastroUsuarioDTO dados) {
        try {

            if (!senhaForte(dados.getSenha())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("A senha deve ter no mínimo 8 caracteres, incluir letra maiúscula, minúscula, número e caractere especial.");
            }

            // Chama a Service para cadastrar
            UsuarioResponseDTO usuarioCadastrado = usuarioService.cadastrar(dados);

            // Se der certo retorna 201 (Created)
            return ResponseEntity.status(HttpStatus.CREATED).body(usuarioCadastrado);
        } catch (RuntimeException e) {
            // Se der erro (CPF duplicado, etc) retorna 400 (Bad Request)
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

}
