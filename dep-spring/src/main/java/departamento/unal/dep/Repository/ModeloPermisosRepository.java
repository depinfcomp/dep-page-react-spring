package departamento.unal.dep.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import departamento.unal.dep.Entity.ModeloPermisos;

@Repository
public interface ModeloPermisosRepository extends JpaRepository<ModeloPermisos, Long> {
    ModeloPermisos findByIdModeloPermiso(Long idModeloPermiso);
    boolean existsByNombreModelo(String nombreModelo);
}
