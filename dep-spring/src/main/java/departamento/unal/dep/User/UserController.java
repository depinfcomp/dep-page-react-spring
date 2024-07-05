package departamento.unal.dep.User;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import departamento.unal.dep.Entity.Docentes;
import jakarta.transaction.Transactional;

@RestController
@RequestMapping("user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/docente")
    public Docentes getDocenteForUser(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByUsername(userDetails.getUsername()).orElseThrow();
        return user.getDocente();
    }

    @GetMapping("/dir/{username}")
    public User getUserByUsername(@PathVariable String username) {
        User user = userRepository.findByUsername(username).orElseThrow();
        return new User(user.getUsername(), user.getRole()); 
    }

    @Transactional//no funcionan ambas operacional al mismo tiempo
    @DeleteMapping("/dir/{username}")
    public void deleteUserByUsername(@PathVariable String username) {
        User user = userRepository.findByUsername(username).orElseThrow();
        if (user.getDocente() != null) {
            user.setDocente(null); // Desvincular el docente
            userRepository.save(user);
        }
        userRepository.delete(user);
    }

    @GetMapping("/dir/usernames")
    public List<String> getAllUsernames() {
        return userRepository.findAll().stream()
                .map(User::getUsername)
                .collect(Collectors.toList());
    }

    @GetMapping("/dir/allusernames")
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(user -> new UserDTO(user.getUsername(), user.getRole()))
                .collect(Collectors.toList());
    }
    
}

class UserDTO {
    private String username;
    private Role role;

    public UserDTO(String username, Role role) {
        this.username = username;
        this.role = role;
    }

    public String getUsername() {
        return username;
    }

    public Role getRole() {
        return role;
    }
}
