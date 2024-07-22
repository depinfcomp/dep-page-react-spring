package departamento.unal.dep.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import departamento.unal.dep.Repository.ProgramaAcademicoRepository;
import departamento.unal.dep.Entity.ProgramasAcademicos;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProgramasAcademicosServices {

    @Autowired
    private ProgramaAcademicoRepository programaAcademicoRepository;

    public ArrayList<ProgramasAcademicos> getAllProgramas() {
        return (ArrayList<ProgramasAcademicos>) programaAcademicoRepository.findAll();
    }

    public ProgramasAcademicos savePrograma(ProgramasAcademicos programa) {
        try {
            return programaAcademicoRepository.save(programa);
        } catch (DataIntegrityViolationException e) {
            throw new RuntimeException("el registro ya existe con el nombre");
        }
    }

    public Optional<ProgramasAcademicos> getProgramaById(Long id) {
        return programaAcademicoRepository.findById(id);
    }

    public List<ProgramasAcademicos> getProgramaBytitulo(String titulo) {
        return programaAcademicoRepository.findByTitulo(titulo);
    }

    public ProgramasAcademicos updatePrograma(Long id, ProgramasAcademicos programa) {
        Optional<ProgramasAcademicos> programaActual = programaAcademicoRepository.findById(id);
        if (programaActual.isPresent()) {
            ProgramasAcademicos existingPrograma = programaActual.get();
            existingPrograma.setTitulo(programa.getTitulo());
            existingPrograma.setDescripcion(programa.getDescripcion());
            existingPrograma.setContacto(programa.getContacto());
            existingPrograma.setFechaInscripcion(programa.getFechaInscripcion());
            existingPrograma.setFechaCierre(programa.getFechaCierre());
            existingPrograma.setLinkInformacion(programa.getLinkInformacion());
            existingPrograma.setLinkInscripcion(programa.getLinkInscripcion());
            existingPrograma.setTipo(programa.getTipo());

            try {
                return programaAcademicoRepository.save(existingPrograma);
            } catch (DataIntegrityViolationException e) {
                throw new RuntimeException("actualizacion imposible");
            }
        } else {
            throw new RuntimeException("EnlaceInteres not found with id: " + id);
        }
    }

    public Boolean deletePrograma(Long id) {
        Optional<ProgramasAcademicos> programaActual = programaAcademicoRepository.findById(id);
        if (programaActual.isPresent()) {
            programaAcademicoRepository.deleteById(id);
            return true;
        } else {
            throw new RuntimeException("Ingestigacion not found with id: " + id);
        }
    }
}
