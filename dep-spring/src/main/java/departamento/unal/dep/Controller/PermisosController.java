package departamento.unal.dep.Controller;

import departamento.unal.dep.Entity.Docentes;
import departamento.unal.dep.Entity.ModeloPermisos;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import departamento.unal.dep.Entity.Permisos;
import departamento.unal.dep.Services.DocentesServices;
import departamento.unal.dep.Services.PermisosServices;
import departamento.unal.dep.Services.ModeloPermisosServices;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/permisos")
public class PermisosController {

    @Autowired
    private PermisosServices permisosServices;

    @Autowired
    private DocentesServices docentesServices;

    @Autowired
    private ModeloPermisosServices modeloPermisosServices;

    @GetMapping
    public List<Permisos> getAllPermisos() {
        return permisosServices.getPermisos();
    }

    @GetMapping("/{id}")
    public Optional<Permisos> getPermisoById(@PathVariable Long id) {
        return permisosServices.getPermisoById(id);
    }

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public Permisos createPermiso(@RequestBody Permisos permiso) {
        return permisosServices.savePermiso(permiso);
    }

    @PostMapping("/nuevoPermiso/{docenteId}/{modeloId}")
    @PreAuthorize("isAuthenticated()")
    public Permisos savePermisos(@PathVariable Long docenteId,
                                 @PathVariable Long modeloId, @RequestBody Permisos permiso) {
        Docentes docente = docentesServices.getDocenteById(docenteId)
                .orElseThrow(() -> new RuntimeException(" not found with id: " + docenteId));

        ModeloPermisos modeloPermiso = modeloPermisosServices.getModeloPermisoById(modeloId)
                .orElseThrow(() -> new RuntimeException(" not found with id: " + modeloId));

        permiso.setDocente(docente);
        permiso.setModeloPermiso(modeloPermiso);

        return permisosServices.savePermiso(permiso);
    }

    @PutMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public Permisos updatePermiso(@RequestBody Permisos permiso, @PathVariable Long id) {
        try {
            return permisosServices.updatePermisoById(permiso, id);
        } catch (RuntimeException e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public Boolean deletePermiso(@PathVariable Long id) {
        return permisosServices.deletePermiso(id);
    }

    @GetMapping("/permisosdocente/{docenteId}")
    public List<Permisos> getPermisosByDocente(@PathVariable Long docenteId) {
        return permisosServices.getPermisosByDocente(docenteId);
    }

    @GetMapping("/permisosmodelo/{modeloId}")
    public List<Permisos> getPermisosByModelo(@PathVariable Long modeloId) {
        return permisosServices.getPermisosByModelo(modeloId);
    }
}
