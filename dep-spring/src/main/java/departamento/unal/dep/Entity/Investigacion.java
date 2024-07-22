package departamento.unal.dep.Entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Investigacion", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"nombre", "tipo"})
})
public class Investigacion {

    public Investigacion(String nombre, String fullname, String url, String grupolac,
            String image, String tipo) {
        this.nombre = nombre;
        this.fullname = fullname;
        this.url = url;
        this.grupolac = grupolac;
        this.image = image;
        this.tipo = tipo;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre", nullable = false, length = 255)
    private String nombre;

    @Column(name = "fullname", nullable = true, length = 255)
    private String fullname;

    @Column(name = "url", nullable = true, length = 255)
    private String url;

    @Column(name = "grupolac", nullable = true, length = 255)
    private String grupolac;

    @Column(name = "image", nullable = true, length = 255)
    private String image;

    @Column(name = "tipo", nullable = false)
    private String tipo;

}
