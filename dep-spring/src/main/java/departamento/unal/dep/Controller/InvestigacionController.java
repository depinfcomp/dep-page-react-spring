package departamento.unal.dep.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.ReflectionUtils;
import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;

import departamento.unal.dep.Entity.Investigacion;
import departamento.unal.dep.Services.InvestigacionServices;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/investigacion")
@RequiredArgsConstructor
public class InvestigacionController {

    @Autowired
    private final InvestigacionServices investigacionServices;

    @GetMapping("/noAuth")
    public List<Investigacion> getAllInvestigaciones() {
        return investigacionServices.getAllInvestigaciones();
    }

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public Investigacion createInvestigacion(@RequestBody Investigacion investigacion) {
        try {
            for (Investigacion inv : investigacionServices.getInvestigacionByNombre(investigacion.getNombre())) {
                if (inv.getNombre().equals(investigacion.getNombre())
                        && inv.getTipo().equals(investigacion.getTipo())) {
                    throw new RuntimeException("La investigación con el nombre '" + investigacion.getNombre() +
                            "' y tipo '" + investigacion.getTipo() + "' ya existe.");
                }
            }

            return investigacionServices.saveInvestigacion(investigacion);
        } catch (RuntimeException e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public Optional<Investigacion> getInvestigacionById(@PathVariable Long id) {
        return investigacionServices.getInvestigacionById(id);
    }

    @GetMapping("/nombre/{nombre}")
    public List<Investigacion> getInvestigacionByName(@PathVariable String nombre) {
        return investigacionServices.getInvestigacionByNombre(nombre);
    }

    @PutMapping("/{id}")
    public Investigacion updateInvestigacion(@RequestBody Map<String, Object> investigacion, @PathVariable Long id) {
        try {
            Optional<Investigacion> optionalInvestigacion = investigacionServices.getInvestigacionById(id);
            if (optionalInvestigacion.isPresent()) {
                Investigacion existingInvestigacion = optionalInvestigacion.get();
                investigacion.forEach((k, v) -> {
                    Field field = ReflectionUtils.findField(Investigacion.class, k);
                    if (field != null) {
                        field.setAccessible(true);
                        ReflectionUtils.setField(field, existingInvestigacion, v);
                    }
                });
                return investigacionServices.saveInvestigacion(existingInvestigacion);
            } else {
                throw new RuntimeException("NoticiasEventos with ID " + id + " not found");
            }
        } catch (Exception e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public Boolean deleteInvestigacion(@PathVariable Long id) {
        return investigacionServices.deleteInvestigacion(id);
    }
}
