package departamento.unal.dep.Entity;

import java.sql.Date;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Posgrados", uniqueConstraints = {
    @UniqueConstraint(columnNames = "titulo")
})
public class Posgrados {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "titulo", nullable = false, unique = true)
    private String titulo;

    @Column(name = "Fecha_Inscripcion", nullable = false)
    private Date fechaInscripcion;

    @Column(name = "Fecha_Cierre", nullable = false)
    private Date fechaCierre;

    @Column(name = "Contacto", nullable = false, length = 255)
    private String contacto;

    @Column(name = "Link_Informacion", nullable = false, length = 255)
    private String linkInformacion;

    @Column(name = "Link_inscripcion", nullable = false, length = 255)
    private String linkInscripcion;
}
