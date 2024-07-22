package departamento.unal.dep.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import departamento.unal.dep.Entity.NoticiasEventos;

import java.util.List;

@Repository
public interface NoticiasEventosRepository extends JpaRepository<NoticiasEventos, Long>{
    
    List<NoticiasEventos> findBytitulo(String titulo);
    NoticiasEventos findByidNoticiaEvento(Long idNoticiaEvento);
    boolean existsByTitulo(String titulo);

}
