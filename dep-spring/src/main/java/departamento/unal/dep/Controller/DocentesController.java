package departamento.unal.dep.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import departamento.unal.dep.Entity.Docentes;
import departamento.unal.dep.Repository.DocentesRepository;
import departamento.unal.dep.Services.DocentesServices;
import departamento.unal.dep.User.UserRepository;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/docentes")
@RequiredArgsConstructor
public class DocentesController {

    private final DocentesRepository docentesRepository;
    private final UserRepository userRepository;

    @Autowired
    DocentesServices docentesServices;

    @GetMapping
    public List<Docentes> getAllDocentes() {
        return docentesServices.getDocentes();
    }

    @GetMapping("/noAuth")
    public List<DocenteDTO> getAllDocentesDTO() {
        return docentesRepository.findAll().stream()
                .map(Docentes -> new DocenteDTO(Docentes.getIdDocente(),
                        Docentes.getNombre(),
                        Docentes.getCorreo(),
                        Docentes.getPosicion(),
                        Docentes.getCvlac()))
                .collect(Collectors.toList());
    }

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public Docentes createDocente(@RequestBody Docentes docente) {
        try {
            return docentesServices.saveDocente(docente);
        } catch (RuntimeException e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public Optional<Docentes> getDocenteById(@PathVariable Long id) {
        return docentesServices.getDocenteById(id);
    }

    @PutMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public Docentes updateDocenteById(@RequestBody Docentes docente, @PathVariable Long id) {
        try {
            return docentesServices.updateDocenteById(docente, id);
        } catch (RuntimeException e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public Boolean deleteDocente(@PathVariable Long id) {
        return docentesServices.deleteDocente(id);
    }

    @GetMapping("/search")
    public List<Docentes> getDocenteByNombre(@RequestParam String nombre) {
        return docentesServices.getDocenteByNombre(nombre);
    }

    @GetMapping("/sin-usuario")
    public List<Docentes> getDocentesSinUsuario() {
        List<Docentes> docentes = docentesRepository.findAll();
        return docentes.stream()
                .filter(docente -> userRepository.findByDocente_IdDocente(docente.getIdDocente()).isEmpty())
                .collect(Collectors.toList());
    }

}

class DocenteDTO {
    private Long idDocente;
    private String nombre;
    private String correo;
    private String posicion;
    private String cvlac;

    public DocenteDTO(Long idDocente, String nombre, String correo, String posicion, String cvlac) {
        this.idDocente = idDocente;
        this.nombre = nombre;
        this.correo = correo;
        this.posicion = posicion;
        this.cvlac = cvlac;
    }

    public Long getIdDocente() {
        return idDocente;
    }

    public String getNombre() {
        return nombre;
    }

    public String getCorreo() {
        return correo;
    }

    public String getposicion() {
        return posicion;
    }

    public String getcvlac(){
        return cvlac;
    }

}