package departamento.unal.dep.User;

import java.util.Optional;

import org.hibernate.mapping.List;
import org.springframework.data.jpa.repository.JpaRepository;
import departamento.unal.dep.User.User;

public interface UserRepository extends JpaRepository<User,Integer> {
    Optional<User> findByUsername(String username); 
    Optional<User> findByDocente_IdDocente(Long docenteId);

}