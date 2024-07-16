package departamento.unal.dep.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import departamento.unal.dep.Repository.DocentesRepository;
import departamento.unal.dep.Entity.Docentes;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class DocentesServices {
    @Autowired
    DocentesRepository docentesRepository;

    public ArrayList<Docentes> getDocentes() {
        return (ArrayList<Docentes>) docentesRepository.findAll();
    }

    public Docentes saveDocente(Docentes act) {
        try {
            return docentesRepository.save(act);
        } catch (DataIntegrityViolationException e) {
            throw new RuntimeException("Docente with the same name or email already exists.");
        }
    }

    public Optional<Docentes> getDocenteById(Long id) {
        return docentesRepository.findById(id);
    }

    public Optional<Docentes> getDocenteByPosicion(String posicion){
        return Optional.ofNullable(docentesRepository.findByPosicion(posicion));
    }

    public List<Docentes> getDocenteByNombre(String nombre) {
        return docentesRepository.findByNombre(nombre);
    }

    public Docentes updateDocenteById(Docentes request, Long id) {
        Optional<Docentes> optionalDocente = docentesRepository.findById(id);
        if (optionalDocente.isPresent()) {
            Docentes existingDocente = optionalDocente.get();
            existingDocente.setNombre(request.getNombre());
            existingDocente.setCorreo(request.getCorreo());
            existingDocente.setCvlac(request.getCvlac());
            existingDocente.setPosicion(request.getPosicion());
            try {
                return docentesRepository.save(existingDocente);
            } catch (DataIntegrityViolationException e) {
                throw new RuntimeException("Docente with the same name or email already exists.");
            }
        } else {
            throw new RuntimeException("Docente not found with id: " + id);
        }
    }

    public Boolean deleteDocente(Long id) {
        Optional<Docentes> optionalDocente = docentesRepository.findById(id);
        if (optionalDocente.isPresent()) {
            docentesRepository.deleteById(id);
            return true;
        } else {
            throw new RuntimeException("Docente not found with id: " + id);
        }
    }
}
