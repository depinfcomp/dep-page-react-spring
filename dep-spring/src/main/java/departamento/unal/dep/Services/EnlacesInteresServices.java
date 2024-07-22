package departamento.unal.dep.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import departamento.unal.dep.Entity.EnlacesInteres;
import departamento.unal.dep.Repository.EnlacesInteresRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class EnlacesInteresServices {

    @Autowired
    EnlacesInteresRepository enlacesInteresRepository;

    public ArrayList<EnlacesInteres> getAllEnlacesInteres() {
        return (ArrayList<EnlacesInteres>) enlacesInteresRepository.findAll();
    }

    public EnlacesInteres saveEnlacesInteres(EnlacesInteres enlacesInteres) {
        try {
            return enlacesInteresRepository.save(enlacesInteres);
        } catch (DataIntegrityViolationException e) {
            throw new RuntimeException("EnlaceInteres with the same text already exists.");
        }
    }

    public Optional<EnlacesInteres> getEnlacesInteresById(Long id) {
        return enlacesInteresRepository.findById(id);
    }

    public List<EnlacesInteres> getEnlacesInteresByText(String text) {
        return enlacesInteresRepository.findByText(text);
    }

    public EnlacesInteres updateEnlacesInteresById(EnlacesInteres request, Long id) {
        Optional<EnlacesInteres> optionalEnlacesInteres = enlacesInteresRepository.findById(id);
        if (optionalEnlacesInteres.isPresent()) {
            EnlacesInteres existingEnlacesInteres = optionalEnlacesInteres.get();
            existingEnlacesInteres.setText(request.getText());
            existingEnlacesInteres.setUrl(request.getUrl());
            existingEnlacesInteres.setTipo(request.getTipo());
            try {
                return enlacesInteresRepository.save(existingEnlacesInteres);
            } catch (DataIntegrityViolationException e) {
                throw new RuntimeException("EnlaceInteres with the same text already exists.");
            }
        } else {
            throw new RuntimeException("EnlaceInteres not found with id: " + id);
        }
    }

    public Boolean deleteEnlacesInteres(Long id) {
        Optional<EnlacesInteres> optionalEnlacesInteres = enlacesInteresRepository.findById(id);
        if (optionalEnlacesInteres.isPresent()) {
            enlacesInteresRepository.deleteById(id);
            return true;
        } else {
            throw new RuntimeException("EnlaceInteres not found with id: " + id);
        }
    }
}
