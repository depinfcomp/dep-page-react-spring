package departamento.unal.dep.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import departamento.unal.dep.Entity.ProgramasAcademicos;

import java.util.List;

@Repository
public interface ProgramaAcademicoRepository extends JpaRepository<ProgramasAcademicos, Long> {

    List<ProgramasAcademicos> findByTitulo(String titulo);
}
