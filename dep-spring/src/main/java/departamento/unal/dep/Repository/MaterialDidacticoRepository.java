package departamento.unal.dep.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import departamento.unal.dep.Entity.MaterialDidactico;

import java.util.List;

@Repository
public interface MaterialDidacticoRepository extends JpaRepository<MaterialDidactico, Long> {

    List<MaterialDidactico> findByTitulo(String titulo);
}
