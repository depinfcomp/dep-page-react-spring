package departamento.unal.dep.Entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "EnlacesInteres", uniqueConstraints = {
    @UniqueConstraint(columnNames = "text")
})
public class EnlacesInteres {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idEnlacesInteres;

    @Column(name = "text", nullable = false, length = 255)
    private String text;

    @Column(name = "url", nullable = true, length = 255)
    private String url;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo", nullable = false)
    private Tipo tipo;

    public enum Tipo {
        PUBLIC,
        PRIVATE
    }
}
