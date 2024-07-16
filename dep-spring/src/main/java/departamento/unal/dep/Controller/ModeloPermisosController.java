package departamento.unal.dep.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import departamento.unal.dep.Entity.ModeloPermisos;
import departamento.unal.dep.Services.ModeloPermisosServices;
import java.util.ArrayList;
import java.util.Optional;

@RestController
@RequestMapping("/api/modeloPermisos")
public class ModeloPermisosController {

    @Autowired
    ModeloPermisosServices modeloPermisosServices;

    @GetMapping()
    public ArrayList<ModeloPermisos> getModeloPermisos() {
        return modeloPermisosServices.getModeloPermisos();
    }

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ModeloPermisos saveModeloPermiso(@RequestBody ModeloPermisos modeloPermiso) {
        return modeloPermisosServices.saveModeloPermiso(modeloPermiso);
    }

    @GetMapping(path = "/{id}")
    public Optional<ModeloPermisos> getModeloPermisoById(@PathVariable("id") Long id) {
        return modeloPermisosServices.getModeloPermisoById(id);
    }

    @PutMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ModeloPermisos updateModeloPermisoById(@RequestBody ModeloPermisos modeloPermiso, @PathVariable Long id) {
        try {
            return modeloPermisosServices.updateModeloPermisoById(modeloPermiso, id);
        } catch (RuntimeException e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }

    @DeleteMapping(path = "/{id}")
    @PreAuthorize("isAuthenticated()")
    public Boolean deleteModeloPermiso(@PathVariable("id") Long id) {
        return modeloPermisosServices.deleteModeloPermiso(id);
    }

    public String getModelo(Long id) {
        return modeloPermisosServices.getModeloPermisoById(id).get().getNombreModelo(); 
    }
}