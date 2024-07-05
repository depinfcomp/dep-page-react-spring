package departamento.unal.dep.Entity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "PermisosTable")
public class Permisos {

    @JsonIgnore
    @ManyToOne(cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
    @JoinColumn(name = "id_docente")
    private Docentes docente;
   
    @JsonIgnore
    @ManyToOne(cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
    @JoinColumn(name = "id_modelo_permiso")
    private ModeloPermisos modeloPermiso;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idPermisos;

    @Column(name = "estado_permisos", nullable = false, length = 255)
    private String estadoPermisos;

    @Column(name = "fecha_solicitud", nullable = false)
    private Date fechaSolicitud;

    @Column(name = "fecha_autoriza", nullable = true)
    private Date fechaAutoriza;

    @Column(name = "consecutivo_permisos", nullable = true, length = 255)
    private String consecutivoPermisos;

    @Column(name = "descripcion_permisos", nullable = false, length = 255)
    private String descripcionPermisos;

    @Column(name = "director_permisos", nullable = false, length = 255)
    private String directorPermisos;
    
    }