package departamento.unal.dep.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import departamento.unal.dep.Repository.ModeloPermisosRepository;
import departamento.unal.dep.Entity.ModeloPermisos;
import java.util.ArrayList;
import java.util.Optional;
import org.springframework.dao.DataIntegrityViolationException;

@Service
public class ModeloPermisosServices {

    @Autowired
    ModeloPermisosRepository modeloPermisosRepository;

    public ArrayList<ModeloPermisos> getModeloPermisos() {
        return (ArrayList<ModeloPermisos>) modeloPermisosRepository.findAll();
    }

    public ModeloPermisos saveModeloPermiso(ModeloPermisos modeloPermiso) {
        return modeloPermisosRepository.save(modeloPermiso);
    }

    public Optional<ModeloPermisos> getModeloPermisoById(Long id) {
        return modeloPermisosRepository.findById(id);
    }

    public ModeloPermisos updateModeloPermisoById(ModeloPermisos request, Long id) {
        Optional<ModeloPermisos> optionalModeloPermiso = modeloPermisosRepository.findById(id);
        if (optionalModeloPermiso.isPresent()) {
            ModeloPermisos existingModeloPermiso = optionalModeloPermiso.get();
            existingModeloPermiso.setNombreModelo(request.getNombreModelo());
            existingModeloPermiso.setDescripcionModelo(request.getDescripcionModelo());
            try {
                return modeloPermisosRepository.save(existingModeloPermiso);
            } catch (DataIntegrityViolationException e) {
                throw new RuntimeException("Docente with the same name or email already exists.");
            }
        } else {
            throw new RuntimeException("ModeloPermiso no encontrado con id: " + id);
        }
    }

    public Boolean deleteModeloPermiso(Long id) {
        Optional<ModeloPermisos> optionalModeloPermiso = modeloPermisosRepository.findById(id);
        if (optionalModeloPermiso.isPresent()) {
            modeloPermisosRepository.deleteById(id);
            return true;
        } else {
            throw new RuntimeException("ModeloPermiso no encontrado con id: " + id);
        }
    }
}
