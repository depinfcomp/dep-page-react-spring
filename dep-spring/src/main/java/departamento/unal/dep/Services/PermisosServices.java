package departamento.unal.dep.Services;

import departamento.unal.dep.Entity.Docentes;
import departamento.unal.dep.Entity.ModeloPermisos;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import departamento.unal.dep.Repository.PermisosRepository;
import departamento.unal.dep.Entity.Permisos;
import departamento.unal.dep.Repository.DocentesRepository;
import departamento.unal.dep.Repository.ModeloPermisosRepository;

import java.util.List;
import java.util.Optional;
import org.springframework.dao.DataIntegrityViolationException;

@Service
public class PermisosServices {

    @Autowired
    private PermisosRepository permisosRepository;

    @Autowired
    private DocentesRepository docentesRepository;

    @Autowired
    private ModeloPermisosRepository modeloPermisosRepository;

    public List<Permisos> getPermisos() {
        return permisosRepository.findAll();
    }

    public Optional<Permisos> getPermisoById(Long id) {
        return permisosRepository.findById(id);
    }

    public Permisos savePermiso(Permisos permiso) {

        if (permiso.getDocente() == null || permiso.getModeloPermiso() == null) {
            throw new IllegalArgumentException("Docente and ModeloPermiso must not be null");
        }

        // Verificar si el docente y el modelo existen
        Docentes docente = docentesRepository.findById(permiso.getDocente().getIdDocente())
                .orElseThrow(() -> new RuntimeException("Docente no existe"));
        ModeloPermisos modeloPermiso = modeloPermisosRepository.findById(permiso.getModeloPermiso().getIdModeloPermiso())
                .orElseThrow(() -> new RuntimeException("ModeloPermiso no existe"));

        // Asignar docente y modelo al permiso
        permiso.setDocente(docente);
        permiso.setModeloPermiso(modeloPermiso);

        return permisosRepository.save(permiso);
    }

    public Permisos updatePermisoById(Permisos permiso, Long id) {
        Optional<Permisos> optionalPermiso = permisosRepository.findById(id);
        if (optionalPermiso.isPresent()) {
            Permisos existingPermiso = optionalPermiso.get();
            existingPermiso.setEstadoPermisos(permiso.getEstadoPermisos());
            existingPermiso.setFechaSolicitud(permiso.getFechaSolicitud());
            existingPermiso.setFechaAutoriza(permiso.getFechaAutoriza());
            existingPermiso.setConsecutivoPermisos(permiso.getConsecutivoPermisos());
            existingPermiso.setDescripcionPermisos(permiso.getDescripcionPermisos());
            existingPermiso.setDirectorPermisos(permiso.getDirectorPermisos());
            try {
                return permisosRepository.save(existingPermiso);
            } catch (DataIntegrityViolationException e) {
                throw new RuntimeException("Docente with the same name or email already exists.");
            }
        } else {
            throw new RuntimeException("Permiso no encontrado con id: " + id);
        }
    }

    public Boolean deletePermiso(Long id) {
        Optional<Permisos> optionalPermiso = permisosRepository.findById(id);
        if (optionalPermiso.isPresent()) {
            permisosRepository.deleteById(id);
            return true;
        } else {
            throw new RuntimeException("Permiso no encontrado con id: " + id);
        }
    }

    public List<Permisos> getPermisosByDocente(Long docenteId) {
        return permisosRepository.findByDocente_IdDocente(docenteId);
    }

    public List<Permisos> getPermisosByModelo(Long modeloId) {
        return permisosRepository.findByModeloPermiso_IdModeloPermiso(modeloId);
    }

    public List<Docentes> getAllDocentes() {
        return docentesRepository.findAll();
    }

    public List<ModeloPermisos> getAllModelos() {
        return modeloPermisosRepository.findAll();
    }
}
