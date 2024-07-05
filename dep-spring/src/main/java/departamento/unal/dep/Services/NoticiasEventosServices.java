package departamento.unal.dep.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;


import departamento.unal.dep.Repository.NoticiasEventosRepository;
import jakarta.persistence.EntityNotFoundException;
import departamento.unal.dep.Entity.NoticiasEventos;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class NoticiasEventosServices {

    @Autowired
    NoticiasEventosRepository NoticiasEventosRepository;

    public ArrayList<NoticiasEventos> getNoticiasEventos() {
        return (ArrayList<NoticiasEventos>) NoticiasEventosRepository.findAll();
    }

    public NoticiasEventos saveNoticiasEventos(NoticiasEventos act) {
        try {
            return NoticiasEventosRepository.save(act);
        } catch (DataIntegrityViolationException e) {
            throw new RuntimeException("NoticiasEventos with the same name already exists.");
        }
    }

    public Optional<NoticiasEventos> getNoticiasEventosById(Long id) {
        return NoticiasEventosRepository.findById(id);
    }

    public List<NoticiasEventos> getNoticiasEventosBytitulo(String titulo) {
        return NoticiasEventosRepository.findBytitulo(titulo);
    }

    public NoticiasEventos updateNoticiasEventos(NoticiasEventos request, Long id) {
        Optional<NoticiasEventos> optionalNoticiasEventos = NoticiasEventosRepository.findById(id);
        
        if (optionalNoticiasEventos.isPresent()) {
            NoticiasEventos existingNoticiasEventos = optionalNoticiasEventos.get();
            
            // Actualizar campos sólo si se han proporcionado valores nuevos en la solicitud
            if (request.getTitulo() != null) {
                existingNoticiasEventos.setTitulo(request.getTitulo());
            }
            if (request.getLinkImagen() != null) {
                existingNoticiasEventos.setLinkImagen(request.getLinkImagen());
            }
            if (request.getLinkInformacion() != null) {
                existingNoticiasEventos.setLinkInformacion(request.getLinkInformacion());
            }
            if (request.getFechaInicio() != null) {
                existingNoticiasEventos.setFechaInicio(request.getFechaInicio());
            }
            if (request.getFechaFin() != null) {
                existingNoticiasEventos.setFechaFin(request.getFechaFin());
            }
            if (request.getVisibleInicio() != null) {
                existingNoticiasEventos.setVisibleInicio(request.getVisibleInicio());
            }
            if (request.getVisibleFin() != null) {
                existingNoticiasEventos.setVisibleFin(request.getVisibleFin());
            }

            return NoticiasEventosRepository.save(existingNoticiasEventos);
        } else {
            // Manejar el caso cuando no se encuentra el ID
            throw new EntityNotFoundException("NoticiasEventos with ID " + id + " not found");
        }
    }

    public Boolean deleteNoticiasEventos(Long id) {
        Optional<NoticiasEventos> optionalNoticiasEventos = NoticiasEventosRepository.findById(id);
        if (optionalNoticiasEventos.isPresent()) {
            NoticiasEventosRepository.deleteById(id);
            return true;
        } else {
            throw new RuntimeException("NoticiasEventos not found with id: " + id);
        }
    }

}
