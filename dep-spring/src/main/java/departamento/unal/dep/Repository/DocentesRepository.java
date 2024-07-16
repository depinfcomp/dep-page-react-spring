package departamento.unal.dep.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import departamento.unal.dep.Entity.Docentes;

import java.util.List;

@Repository
public interface DocentesRepository extends JpaRepository<Docentes, Long> {
    List<Docentes> findByNombre(String nombre);
    Docentes findByIdDocente(Long idDocente);
    Docentes findByPosicion(String posicion);
}

