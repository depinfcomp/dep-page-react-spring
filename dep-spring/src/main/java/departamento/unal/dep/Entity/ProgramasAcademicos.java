package departamento.unal.dep.Entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Programas", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"Tipo","titulo"})
})
public class ProgramasAcademicos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "titulo", nullable = false)
    private String titulo;

    @Column(name = "Fecha_Inscripcion", nullable = false)
    private String fechaInscripcion;

    @Column(name = "Fecha_Cierre", nullable = false)
    private String fechaCierre;

    @Column(name = "Contacto", nullable = false, length = 255)
    private String contacto;

    @Column(name = "Link_Informacion", nullable = false, length = 255)
    private String linkInformacion;

    @Column(name = "Link_inscripcion", nullable = false, length = 255)
    private String linkInscripcion;

    @Column(name = "Descripcion", nullable = false, length = 255)
    private String descripcion;

    @Column(name = "Tipo", nullable = false, length = 255)
    private String tipo;

    @Column(name = "Image", nullable = false, length = 255)
    private String image;
}
