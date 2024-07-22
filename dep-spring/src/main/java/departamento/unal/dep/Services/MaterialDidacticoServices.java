package departamento.unal.dep.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import departamento.unal.dep.Repository.MaterialDidacticoRepository;
import departamento.unal.dep.Entity.MaterialDidactico;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class MaterialDidacticoServices {

    @Autowired
    private MaterialDidacticoRepository materialDidacticoRepository;

    public ArrayList<MaterialDidactico> getAllMaterialDidacticos() {
        return (ArrayList<MaterialDidactico>) materialDidacticoRepository.findAll();
    }

    public MaterialDidactico saveMaterialDidactico(MaterialDidactico materialDidactico) {
        try {
            return materialDidacticoRepository.save(materialDidactico);
        } catch (DataIntegrityViolationException e) {
            throw new RuntimeException("El material didáctico ya existe con ese título");
        }
    }

    public Optional<MaterialDidactico> getMaterialDidacticoById(Long id) {
        return materialDidacticoRepository.findById(id);
    }

    public List<MaterialDidactico> getMaterialDidacticoByTitulo(String titulo) {
        return materialDidacticoRepository.findByTitulo(titulo);
    }

    public MaterialDidactico updateMaterialDidactico(Long id, MaterialDidactico materialDidacticoDetails) {
        Optional<MaterialDidactico> materialDidactico = materialDidacticoRepository.findById(id);
        if (materialDidactico.isPresent()) {
            MaterialDidactico existingMaterialDidactico = materialDidactico.get();
            existingMaterialDidactico.setAutor(materialDidacticoDetails.getAutor());
            existingMaterialDidactico.setTitulo(materialDidacticoDetails.getTitulo());
            existingMaterialDidactico.setDescripcion(materialDidacticoDetails.getDescripcion());
            existingMaterialDidactico.setEnlace(materialDidacticoDetails.getEnlace());
            try {
                return materialDidacticoRepository.save(existingMaterialDidactico);
            } catch (DataIntegrityViolationException e) {
                throw new RuntimeException("Actualización imposible");
            }

        } else {
            throw new RuntimeException("MaterialDidactico not found with id: " + id);
        }
    }

    public Boolean deleteMaterialDidactico(Long id) {
        Optional<MaterialDidactico> optionalMaterialDidactico = materialDidacticoRepository.findById(id);
        if (optionalMaterialDidactico.isPresent()) {
            materialDidacticoRepository.deleteById(id);
            return true;
        } else {
            throw new RuntimeException("MaterialDidactico not found with id: " + id);
        }
    }
}
