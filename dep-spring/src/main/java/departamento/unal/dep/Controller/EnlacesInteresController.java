package departamento.unal.dep.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import departamento.unal.dep.Entity.EnlacesInteres;
import departamento.unal.dep.Services.EnlacesInteresServices;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/enlacesInteres")
@RequiredArgsConstructor
public class EnlacesInteresController {

    @Autowired
    private final EnlacesInteresServices enlacesInteresServices;

    

    @GetMapping
    public List<EnlacesInteres> getAllEnlacesInteres() {
        return enlacesInteresServices.getAllEnlacesInteres();
    }

    @GetMapping("/noAuth")
    public List<EnlacesInteres> getPublicEnlacesInteres() {
        return enlacesInteresServices.getAllEnlacesInteres().stream()
                .filter(enlace -> enlace.getTipo() == EnlacesInteres.Tipo.PUBLIC)
                .collect(Collectors.toList());
    }

    @PostMapping
    public EnlacesInteres createEnlacesInteres(@RequestBody EnlacesInteres enlacesInteres) {
        try {
            return enlacesInteresServices.saveEnlacesInteres(enlacesInteres);
        } catch (RuntimeException e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public Optional<EnlacesInteres> getEnlacesInteresById(@PathVariable Long id) {
        return enlacesInteresServices.getEnlacesInteresById(id);
    }

    @PutMapping("/{id}")
    public EnlacesInteres updateEnlacesInteresById(@RequestBody EnlacesInteres enlacesInteres, @PathVariable Long id) {
        try {
            return enlacesInteresServices.updateEnlacesInteresById(enlacesInteres, id);
        } catch (RuntimeException e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public Boolean deleteEnlacesInteres(@PathVariable Long id) {
        return enlacesInteresServices.deleteEnlacesInteres(id);
    }

    @GetMapping("/search")
    public List<EnlacesInteres> getEnlacesInteresByText(@RequestParam String text) {
        return enlacesInteresServices.getEnlacesInteresByText(text);
    }
}
