package departamento.unal.dep.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import departamento.unal.dep.Entity.Permisos;

import java.util.List;

@Repository
public interface PermisosRepository extends JpaRepository<Permisos, Long> {
    List<Permisos> findByDocente_IdDocente(Long docenteId);
    List<Permisos> findByModeloPermiso_IdModeloPermiso(Long modeloId);
}
