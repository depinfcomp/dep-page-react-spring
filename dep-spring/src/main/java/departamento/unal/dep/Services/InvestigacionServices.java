package departamento.unal.dep.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import departamento.unal.dep.Repository.InvestigacionRepository;
import departamento.unal.dep.Entity.Investigacion;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class InvestigacionServices {

    @Autowired
    private InvestigacionRepository investigacionRepository;

    public ArrayList<Investigacion> getAllInvestigaciones() {
        return (ArrayList<Investigacion>) investigacionRepository.findAll();
    }

    public Investigacion saveInvestigacion(Investigacion investigacion) {
        try {
            return investigacionRepository.save(investigacion);
        } catch (DataIntegrityViolationException e) {
            throw new RuntimeException("el registro ya existe con el nombre");
        }
    }

    public Optional<Investigacion> getInvestigacionById(Long id) {
        return investigacionRepository.findById(id);
    }

    public List<Investigacion> getInvestigacionByNombre(String nombre) {
        return investigacionRepository.findByNombre(nombre);
    }

    public Investigacion updateInvestigacion(Long id, Investigacion investigacionDetails) {
        Optional<Investigacion> investigacion = investigacionRepository.findById(id);
        if (investigacion.isPresent()) {
            Investigacion existingInvestigacion = investigacion.get();
            existingInvestigacion.setNombre(investigacionDetails.getNombre());
            existingInvestigacion.setFullname(investigacionDetails.getFullname());
            existingInvestigacion.setUrl(investigacionDetails.getUrl());
            existingInvestigacion.setGrupolac(investigacionDetails.getGrupolac());
            existingInvestigacion.setImage(investigacionDetails.getImage());
            existingInvestigacion.setTipo(investigacionDetails.getTipo());
            try {
                return investigacionRepository.save(existingInvestigacion);
            } catch (DataIntegrityViolationException e) {
                throw new RuntimeException("actualizacion imposible");
            }

        } else {
            throw new RuntimeException("EnlaceInteres not found with id: " + id);
        }

    }

    public Boolean deleteInvestigacion(Long id) {
        Optional<Investigacion> optionalInvestigacion = investigacionRepository.findById(id);
        if (optionalInvestigacion.isPresent()) {
            investigacionRepository.deleteById(id);
            return true;
        } else {
            throw new RuntimeException("Ingestigacion not found with id: " + id);
        }
    }
}