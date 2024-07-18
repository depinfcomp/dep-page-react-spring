package departamento.unal.dep.Controller;

import departamento.unal.dep.Entity.Docentes;
import departamento.unal.dep.Entity.ModeloPermisos;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import departamento.unal.dep.Entity.Permisos;
import departamento.unal.dep.Services.DocentesServices;
import departamento.unal.dep.Services.PermisosServices;
import departamento.unal.dep.Services.ModeloPermisosServices;

import java.sql.Date;
import java.util.ArrayList;
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
    public ResponseEntity<?> createPermiso(@RequestBody Permisos permiso) {
        try {
            Permisos nuevoPermiso = permisosServices.savePermiso(permiso);
            return ResponseEntity.ok(nuevoPermiso);
        } catch (RuntimeException e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/nuevoPermiso/{docenteId}/{modeloId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> savePermisos(@PathVariable Long docenteId,
            @PathVariable Long modeloId, @RequestBody Permisos permiso) {
        try {
            Docentes docente = docentesServices.getDocenteById(docenteId)
                    .orElseThrow(() -> new RuntimeException("Docente no encontrado con id: " + docenteId));
            ModeloPermisos modeloPermiso = modeloPermisosServices.getModeloPermisoById(modeloId)
                    .orElseThrow(() -> new RuntimeException("ModeloPermiso no encontrado con id: " + modeloId));

            permiso.setDocente(docente);
            permiso.setModeloPermiso(modeloPermiso);

            Permisos nuevoPermiso = permisosServices.savePermiso(permiso);
            return ResponseEntity.ok(nuevoPermiso);
        } catch (RuntimeException e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Error: " + e.getMessage());
        }
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
    public List<permisosDocenteDto> getPermisosByDocente(@PathVariable Long docenteId) {
        List<permisosDocenteDto> permisosDtoList = new ArrayList<>();
        for (Permisos it : permisosServices.getPermisosByDocente(docenteId)) {
            String nombreModelo = modeloPermisosServices
                    .getModeloPermisoById(it.getModeloPermiso().getIdModeloPermiso())
                    .map(ModeloPermisos::getNombreModelo)
                    .orElse("Modelo no encontrado");

            permisosDocenteDto dto = new permisosDocenteDto(
                    it.getIdPermisos(),
                    nombreModelo,
                    it.getEstadoPermisos(),
                    it.getFechaSolicitud(),
                    it.getFechaAutoriza(),
                    it.getConsecutivoPermisos(),
                    it.getDescripcionPermisos(),
                    it.getDirectorPermisos());
            permisosDtoList.add(dto);
        }
        return permisosDtoList;
    }

    @GetMapping("/permisosmodelo/{modeloId}")
    public List<Permisos> getPermisosByModelo(@PathVariable Long modeloId) {
        return permisosServices.getPermisosByModelo(modeloId);
    }
}

class permisosDocenteDto {
    private Long idPermisos;
    private String nombreModelo;
    private String estadoPermisos;
    private Date fechaSolicitud;
    private Date fechaAutoriza;
    private String consecutivoPermisos;
    private String descripcionPermisos;
    private String directorPermisos;

    public permisosDocenteDto(Long idPermisos, String nombreModelo, String estadoPermisos, Date fechaSolicitud,
            Date fechaAutoriza, String consecutivoPermisos, String descripcionPermisos, String directorPermisos) {
        this.idPermisos = idPermisos;
        this.nombreModelo = nombreModelo;
        this.estadoPermisos = estadoPermisos;
        this.fechaSolicitud = fechaSolicitud;
        this.fechaAutoriza = fechaAutoriza;
        this.consecutivoPermisos = consecutivoPermisos;
        this.descripcionPermisos = descripcionPermisos;
        this.directorPermisos = directorPermisos;
    }

    public Long getIdPermisos() {
        return idPermisos;
    }

    public String getNombreModelo() {
        return nombreModelo;
    }

    public String getEstadoPermisos() {
        return estadoPermisos;
    }

    public Date getFechaSolicitud() {
        return fechaSolicitud;
    }

    public Date getFechaAutoriza() {
        return fechaAutoriza;
    }

    public String getConsecutivoPermisos() {
        return consecutivoPermisos;
    }

    public String getDescripcionPermisos() {
        return descripcionPermisos;
    }

    public String getDirectorPermisos() {
        return directorPermisos;
    }

}