package departamento.unal.dep.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.ReflectionUtils;
import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;

import departamento.unal.dep.Entity.ProgramasAcademicos;
import departamento.unal.dep.Services.ProgramasAcademicosServices;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Map;
import java.util.Optional;


@RestController
@RequestMapping("/api/programa")
@RequiredArgsConstructor
public class ProgramaController {

    @Autowired
    private final ProgramasAcademicosServices programaServices;

    @GetMapping("/noAuth")
    public List<ProgramasAcademicos> getAllProramas() {
        return programaServices.getAllProgramas();
    }

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ProgramasAcademicos createPrograma(@RequestBody ProgramasAcademicos programa) {
        try {
            for (ProgramasAcademicos prog : programaServices.getProgramaBytitulo(programa.getTitulo())) {
                if (prog.getTitulo().equals(programa.getTitulo())
                        && prog.getTipo().equals(programa.getTipo())) {
                    throw new RuntimeException("El programa con el nombre '" + programa.getTitulo() +
                            "' y tipo '" + programa.getTipo() + "' ya existe.");
                }
            }

            return programaServices.savePrograma(programa);
        } catch (RuntimeException e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public Optional<ProgramasAcademicos> getProgramaById(@PathVariable Long id) {
        return programaServices.getProgramaById(id);
    }

    @GetMapping("/Titulo/{Titulo}")
    public List<ProgramasAcademicos> getProgramaByName(@PathVariable String titulo) {
        return programaServices.getProgramaBytitulo(titulo);
    }
    
    @PutMapping("/{id}")
    public ProgramasAcademicos updatePrograma(@RequestBody Map<String, Object> programa, @PathVariable Long id) {
        try {
            Optional<ProgramasAcademicos> optionalPrograma = programaServices.getProgramaById(id);
            if (optionalPrograma.isPresent()) {
                ProgramasAcademicos existingPrograma = optionalPrograma.get();
                programa.forEach((k, v) -> {
                    Field field = ReflectionUtils.findField(ProgramasAcademicos.class, k);
                    if (field != null) {
                        field.setAccessible(true);
                        ReflectionUtils.setField(field, existingPrograma, v);
                    }
                });
                return programaServices.savePrograma(existingPrograma);
            } else {
                throw new RuntimeException("Programa with ID " + id + " not found");
            }
        } catch (Exception e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public Boolean deletePrograma(@PathVariable Long id) {
        return programaServices.deletePrograma(id);
    }

}
