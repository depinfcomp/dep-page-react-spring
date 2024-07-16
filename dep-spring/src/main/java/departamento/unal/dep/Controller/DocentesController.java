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

    // @PostMapping
    // @PreAuthorize("isAuthenticated()")
    // public Docentes createDocente(@RequestBody Docentes docente) {
    // try {
    // return docentesServices.saveDocente(docente);
    // } catch (RuntimeException e) {
    // throw new RuntimeException("Error: " + e.getMessage());
    // }
    // }

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public Docentes createDocente(@RequestBody Docentes docente) {
        // Limitar un solo Director o Directora
        if (docente.getPosicion().equals("Director") || docente.getPosicion().equals("Directora")) {
            Optional<Docentes> existingDirector = docentesServices.getDocenteByPosicion("Director");
            Optional<Docentes> existingDirectora = docentesServices.getDocenteByPosicion("Directora");

            if (existingDirector.isPresent() || existingDirectora.isPresent()) {
                throw new RuntimeException("Error: Ya existe un Director o Directora.");
            }
        }

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

    @GetMapping("/posicion/{posicion}")
    public Optional<DirectorDTO> getDocenteByPosicion(@PathVariable String posicion) {
        Optional<Docentes> docenteOpt = docentesServices.getDocenteByPosicion(posicion);

        if (docenteOpt.isPresent()) {
            Docentes docente = docenteOpt.get();
            DirectorDTO directorDTO = new DirectorDTO(docente.getNombre(), docente.getCorreo());
            return Optional.of(directorDTO);
        } else {
            return Optional.empty();
        }
    }

    @GetMapping("/posicion")
    public Optional<DirectorDTO> getDocenteDirector() {
        // Toca ser inclusivo ...
        Optional<Docentes> docenteOpt = docentesServices.getDocenteByPosicion("Director");

        if (!docenteOpt.isPresent()) {
            docenteOpt = docentesServices.getDocenteByPosicion("Directora");
        }

        if (docenteOpt.isPresent()) {
            Docentes docente = docenteOpt.get();
            DirectorDTO directorDTO = new DirectorDTO(docente.getNombre(), docente.getCorreo());
            return Optional.of(directorDTO);
        } else {
            return Optional.empty();
        }
    }

    // @PutMapping("/{id}")
    // @PreAuthorize("isAuthenticated()")
    // public Docentes updateDocenteById(@RequestBody Docentes docente,
    // @PathVariable Long id) {
    // try {
    // return docentesServices.updateDocenteById(docente, id);
    // } catch (RuntimeException e) {
    // throw new RuntimeException("Error: " + e.getMessage());
    // }
    // }

    @PutMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public Docentes updateDocenteById(@RequestBody Docentes docente, @PathVariable Long id) {
        // Limitar un solo Director o Directora
        if (docente.getPosicion().equals("Director") || docente.getPosicion().equals("Directora")) {
            // Check if a Director or Directora already exists
            Optional<DirectorDTO> existingDirector = getDocenteDirector();

            // If an existing Director or Directora is present and it's not the one being
            // updated, throw an error
            if (existingDirector.isPresent() && !(existingDirector.get().getNombre().equals(docente.getNombre()))) {
                throw new RuntimeException("Error: Ya existe un " + docente.getPosicion());
            }
        }

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

    public String getcvlac() {
        return cvlac;
    }

}

class DirectorDTO {
    private String nombre;
    private String correo;

    public DirectorDTO(String nombre, String correo) {
        this.nombre = nombre;
        this.correo = correo;
    }

    public String getNombre() {
        return nombre;
    }

    public String getCorreo() {
        return correo;
    }

}