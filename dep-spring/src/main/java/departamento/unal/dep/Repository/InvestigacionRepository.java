package departamento.unal.dep.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import departamento.unal.dep.Entity.Investigacion;

import java.util.List;

@Repository
public interface InvestigacionRepository extends JpaRepository<Investigacion, Long> {

    List<Investigacion> findByNombre(String nombre);
}
