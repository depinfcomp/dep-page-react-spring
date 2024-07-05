package departamento.unal.dep.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import departamento.unal.dep.Entity.NoticiasEventos;
import departamento.unal.dep.Services.NoticiasEventosServices;
import java.lang.reflect.Field;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.springframework.util.ReflectionUtils;

@RestController
@RequestMapping("/api/NoticiasEventos")
public class NoticiasEventosController {

    @Autowired
    NoticiasEventosServices noticiasEventosServices;

    @GetMapping("/noAuth")
    public List<NoticiasEventos> getAllNoticiasEventos() {
        return noticiasEventosServices.getNoticiasEventos();
    }

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public NoticiasEventos createNoticiasEventos(@RequestBody Map<String, Object> campos) {
        try {
            NoticiasEventos noticiasEventos = new NoticiasEventos();
            campos.forEach((k, v) -> {
                Field field = ReflectionUtils.findField(NoticiasEventos.class, k);
                if (field != null) {
                    field.setAccessible(true);
                    ReflectionUtils.setField(field, noticiasEventos, v);
                }
            });
            return noticiasEventosServices.saveNoticiasEventos(noticiasEventos);
        } catch (Exception e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public Optional<NoticiasEventos> getNoticiasEventosById(@PathVariable Long id) {
        return noticiasEventosServices.getNoticiasEventosById(id);
    }

    @PutMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public NoticiasEventos updateNoticiasEventos(@RequestBody Map<String, Object> campos, @PathVariable Long id) {
        try {
            Optional<NoticiasEventos> optionalNoticiasEventos = noticiasEventosServices.getNoticiasEventosById(id);
            if (optionalNoticiasEventos.isPresent()) {
                NoticiasEventos existingNoticiasEventos = optionalNoticiasEventos.get();
                campos.forEach((k, v) -> {
                    Field field = ReflectionUtils.findField(NoticiasEventos.class, k);
                    if (field != null) {
                        field.setAccessible(true);
                        ReflectionUtils.setField(field, existingNoticiasEventos, v);
                    }
                });
                return noticiasEventosServices.saveNoticiasEventos(existingNoticiasEventos);
            } else {
                throw new RuntimeException("NoticiasEventos with ID " + id + " not found");
            }
        } catch (Exception e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public Boolean deleteNoticiasEventos(@PathVariable Long id) {
        return noticiasEventosServices.deleteNoticiasEventos(id);
    }

    @GetMapping("/search")
    public List<NoticiasEventos> getNoticiasEventosBytitulo(@RequestParam String nombre) {
        return noticiasEventosServices.getNoticiasEventosBytitulo(nombre);
    }
}
