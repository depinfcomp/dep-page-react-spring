package departamento.unal.dep.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.ReflectionUtils;
import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;

import departamento.unal.dep.Entity.MaterialDidactico;
import departamento.unal.dep.Services.MaterialDidacticoServices;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/materialDidactico")
@RequiredArgsConstructor
public class MaterialDidacticoController {

    @Autowired
    private final MaterialDidacticoServices materialDidacticoServices;

    @GetMapping("/noAuth")
    public List<MaterialDidactico> getAllMaterialDidacticos() {
        return materialDidacticoServices.getAllMaterialDidacticos();
    }

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public MaterialDidactico createMaterialDidactico(@RequestBody MaterialDidactico materialDidactico) {
        try {
            for (MaterialDidactico mat : materialDidacticoServices.getMaterialDidacticoByTitulo(materialDidactico.getTitulo())) {
                if (mat.getTitulo().equals(materialDidactico.getTitulo())) {
                    throw new RuntimeException("El material didáctico con el título '" + materialDidactico.getTitulo() + "' ya existe.");
                }
            }

            return materialDidacticoServices.saveMaterialDidactico(materialDidactico);
        } catch (RuntimeException e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public Optional<MaterialDidactico> getMaterialDidacticoById(@PathVariable Long id) {
        return materialDidacticoServices.getMaterialDidacticoById(id);
    }

    @GetMapping("/titulo/{titulo}")
    public List<MaterialDidactico> getMaterialDidacticoByTitulo(@PathVariable String titulo) {
        return materialDidacticoServices.getMaterialDidacticoByTitulo(titulo);
    }

    @PutMapping("/{id}")
    public MaterialDidactico updateMaterialDidactico(@RequestBody Map<String, Object> materialDidacticoDetails, @PathVariable Long id) {
        try {
            Optional<MaterialDidactico> optionalMaterialDidactico = materialDidacticoServices.getMaterialDidacticoById(id);
            if (optionalMaterialDidactico.isPresent()) {
                MaterialDidactico existingMaterialDidactico = optionalMaterialDidactico.get();
                materialDidacticoDetails.forEach((k, v) -> {
                    Field field = ReflectionUtils.findField(MaterialDidactico.class, k);
                    if (field != null) {
                        field.setAccessible(true);
                        ReflectionUtils.setField(field, existingMaterialDidactico, v);
                    }
                });
                return materialDidacticoServices.saveMaterialDidactico(existingMaterialDidactico);
            } else {
                throw new RuntimeException("MaterialDidactico con ID " + id + " no encontrado");
            }
        } catch (Exception e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public Boolean deleteMaterialDidactico(@PathVariable Long id) {
        return materialDidacticoServices.deleteMaterialDidactico(id);
    }
}
