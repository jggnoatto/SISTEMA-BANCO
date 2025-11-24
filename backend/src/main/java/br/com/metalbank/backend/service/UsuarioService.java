package br.com.metalbank.backend.service;

import br.com.metalbank.backend.domain.Conta;
import br.com.metalbank.backend.domain.Usuario;
import br.com.metalbank.backend.dto.CadastroUsuarioDTO;
import br.com.metalbank.backend.dto.LoginDTO;
import br.com.metalbank.backend.dto.UsuarioResponseDTO;
import br.com.metalbank.backend.repository.ContaRepository;
import br.com.metalbank.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ContaRepository contaRepository;


    // Regras de Cadastro

    public UsuarioResponseDTO cadastrar(CadastroUsuarioDTO dados){
        // Verificação se o email ou CPF já existem
        if (usuarioRepository.findByCpf(dados.getCpf()).isPresent()){
            throw new RuntimeException("CPF já cadastrado!");
        }
        if (usuarioRepository.findByEmail(dados.getEmail()).isPresent()){
            throw new RuntimeException("Email já cadastrado!");
        }

        // Converter DTO para Entidade
        Usuario novoUsuario = new Usuario();
        novoUsuario.setNome(dados.getNome());
        novoUsuario.setCpf(dados.getCpf());
        novoUsuario.setEmail(dados.getEmail());
        novoUsuario.setSenha(dados.getSenha());


        // Salva o Usuário
        Usuario usuarioSalvo = usuarioRepository.save(novoUsuario);


        // Criar a Conta automaticamente (Regra de negócio)
        Conta novaConta = new Conta();
        novaConta.setSaldo(BigDecimal.ZERO); // Começa Zerado
        novaConta.setLimiteDiario(new BigDecimal("1000.00"));
        novaConta.setUsuario(usuarioSalvo); // Liga a conta do usuário

        contaRepository.save(novaConta);

        // Retornar o DTO de Resposta (Sem senha)
        return converterParaDTO(usuarioSalvo, novaConta);
    }

    // Regra de Login
    public UsuarioResponseDTO login(LoginDTO dados){
        // Login buscando pelo cpf (RF 1)
        Usuario usuario = usuarioRepository.findByCpf(dados.getCpf())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        // Verificar Bloqueio (RF 8)
        if (usuario.estaBloqueado()){
            throw new RuntimeException("Conta bloqueada temporariamente. Aguarde 5 minutos");
        }

        // Verificar Senha
        if (!usuario.getSenha().equals(dados.getSenha())){
            aumentarTentativasErro(usuario);
            throw new RuntimeException("Senha Incorreta");
        }

        // Se chegou aqui, reseta erros
        resetarTentativas(usuario);

        // Busca a conta para pegar o saldo
        Conta conta = contaRepository.findByUsuarioId(usuario.getId())
                .orElseThrow(() -> new RuntimeException("Usuário sem conta!"));

        return converterParaDTO(usuario, conta);
    }

    // FUNÇÕES AUXILIARES

    private void aumentarTentativasErro(Usuario usuario){
        int novasTentativas = usuario.getTentativasLogin()+1;
        usuario.setTentativasLogin(novasTentativas);

        if (novasTentativas >= 3){
            usuario.setBloqueadoAte(LocalDateTime.now().plusMinutes(5)); // Bloqueia por 5 minutos
            usuario.setTentativasLogin(0);
        }
        usuarioRepository.save(usuario);
    }

    private void resetarTentativas(Usuario usuario){
        if (usuario.getTentativasLogin() > 0 || usuario.getBloqueadoAte() != null){
            usuario.setTentativasLogin(0);
            usuario.setBloqueadoAte(null);
            usuarioRepository.save(usuario);
        }
    }

    // Converter as entidades do banco para o JSON para o frontend
    private UsuarioResponseDTO converterParaDTO(Usuario usuario, Conta conta){
        UsuarioResponseDTO dto = new UsuarioResponseDTO();
        dto.setId(usuario.getId());
        dto.setNome(usuario.getNome());
        dto.setCpf(usuario.getCpf());
        dto.setEmail(usuario.getEmail());
        dto.setSaldo(conta.getSaldo());
        return dto;
    }
}
