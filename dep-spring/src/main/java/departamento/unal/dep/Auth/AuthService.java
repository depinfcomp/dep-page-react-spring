package departamento.unal.dep.Auth;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import departamento.unal.dep.User.Role;
import departamento.unal.dep.User.User;
import departamento.unal.dep.User.UserRepository;
import departamento.unal.dep.Entity.Docentes;
import departamento.unal.dep.Repository.DocentesRepository;
import departamento.unal.dep.jwt.JwtService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final DocentesRepository docentesRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthResponse login(LoginRequest request) {
        authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        User user = userRepository.findByUsername(request.getUsername()).orElseThrow();
        String token = jwtService.getToken(user);
        return AuthResponse.builder()
                .token(token)
                .build();
    }

    public AuthResponse register(RegisterRequest request) {
        Role role = Role.valueOf(request.getRole());
        Docentes docente = null;

        if (Role.DOCE.equals(role)) {
            if (request.getDocenteId() != null) {
                docente = docentesRepository.findById(request.getDocenteId()).orElse(null);
                if (docente == null) {
                    throw new IllegalArgumentException("Docente with id " + request.getDocenteId() + " does not exist");
                }

                boolean exists = userRepository.findAll().stream()
                        .anyMatch(user -> user.getDocente() != null
                                && user.getDocente().getIdDocente().equals(request.getDocenteId()));

                if (exists) {
                    throw new IllegalArgumentException(
                            "User with docenteId " + request.getDocenteId() + " already exists");
                }
            } else {
                throw new IllegalArgumentException("DocenteId is required for role DOCE");
            }

            User user = User.builder()
                    .username(request.getUsername())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .role(role)
                    .docente(docente)
                    .build();

            userRepository.save(user);

            return AuthResponse.builder()
                    .token(jwtService.getToken(user))
                    .build();

        }

        User user = User.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(role)
                .build();

        userRepository.save(user);

        return AuthResponse.builder()
                .token(jwtService.getToken(user))
                .build();
    }

    public void changePassword(ChangePasswordRequest request) {
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
    }

    public void changeRole(String username, String newRole, Long docenteId) {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new IllegalArgumentException("User not found"));
        Role currentRole = user.getRole();
        Role updatedRole = Role.valueOf(newRole);

        if (currentRole == Role.DOCE && updatedRole != Role.DOCE) {
            user.setDocente(null);
        } else if (updatedRole == Role.DOCE) {
            if (docenteId != null) {
                Docentes docente = docentesRepository.findById(docenteId).orElse(null);
                if (docente == null) {
                    throw new IllegalArgumentException("Docente with id " + docenteId + " does not exist");
                }
                user.setDocente(docente);
            } else {
                throw new IllegalArgumentException("DocenteId is required for role DOCE");
            }
        }
        user.setRole(updatedRole);
        userRepository.save(user);
    }

    public boolean userExists(String username) {
        return userRepository.findByUsername(username).isPresent();
    }

}