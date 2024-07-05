package departamento.unal.dep.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import departamento.unal.dep.Entity.EnlacesInteres;

import java.util.List;

@Repository
public interface EnlacesInteresRepository extends JpaRepository<EnlacesInteres, Long> {
    List<EnlacesInteres> findByText(String text);
    EnlacesInteres findByIdEnlacesInteres(Long idEnlacesInteres);
}


