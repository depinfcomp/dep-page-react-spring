package departamento.unal.dep.Entity;
import jakarta.persistence.*;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "NoticiasEventos", uniqueConstraints = {
        @UniqueConstraint(columnNames = "titulo")
})
public class NoticiasEventos {

    public NoticiasEventos(String titulo, String linkImagen, String visibleInicio, String visibleFin) {
        this.titulo = titulo;
        this.linkImagen = linkImagen;
        this.visibleInicio = visibleInicio;
        this.visibleFin = visibleFin;
    }

    public NoticiasEventos(String titulo, String tipo, String linkImagen, String linkInformacion, String fechaInicio, String fechaFin, String visibleInicio, String visibleFin, String fechaCreacion) {
        this.titulo = titulo;
        this.tipo = tipo;
        this.linkImagen = linkImagen;
        this.linkInformacion = linkInformacion;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.visibleInicio = visibleInicio;
        this.visibleFin = visibleFin;
        this.fechaCreacion = fechaCreacion;
    }

    

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idNoticiaEvento;

    @Column(name = "titulo", nullable = false, length = 255)
    private String titulo;

    @Column(name = "tipo", nullable = false, length = 255)
    private String tipo;

    @Column(name = "linkImagen", nullable = true, length = 255)
    private String linkImagen;

    @Column(name = "linkInformacion", nullable = true, length = 255)
    private String linkInformacion;

    @Column(name = "fechaInicio", nullable = true, length = 255)
    private String fechaInicio;

    @Column(name = "fechaFin", nullable = true, length = 255)
    private String fechaFin;

    @Column(name = "visibleInicio", nullable = true, length = 255)
    private String visibleInicio;

    @Column(name = "visibleFin", nullable = true, length = 255)
    private String visibleFin;

    @Column(name = "fechaCreacion", nullable = false, length = 255)
    private String fechaCreacion;

}
