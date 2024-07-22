package departamento.unal.dep.Entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "MaterialDidactico", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"titulo"})
})
public class MaterialDidactico {

    public MaterialDidactico(String autor, String titulo, String descripcion, String enlace) {
        this.autor = autor;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.enlace = enlace;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "autor", nullable = false, length = 255)
    private String autor;

    @Column(name = "titulo", nullable = false, length = 255)
    private String titulo;

    @Column(name = "descripcion", nullable = true, length = 255)
    private String descripcion;

    @Column(name = "enlace", nullable = true, length = 255)
    private String enlace;
}
