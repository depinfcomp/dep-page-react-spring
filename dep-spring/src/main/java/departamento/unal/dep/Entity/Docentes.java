package departamento.unal.dep.Entity;
import jakarta.persistence.*;
import java.util.ArrayList;
import lombok.*;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import departamento.unal.dep.User.User;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "DocentesTable", uniqueConstraints = {
    @UniqueConstraint(columnNames = "nombre"),
    @UniqueConstraint(columnNames = "correo")
})
public class Docentes {

    public Docentes(String nombre, String correo, String cvlac, String posicion) {
        this.nombre = nombre;
        this.correo = correo;
        this.cvlac = cvlac;
        this.posicion = posicion;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idDocente;

    @Column(name = "nombre", nullable = false, length = 255)
    private String nombre;

    @Column(name = "correo", nullable = false, length = 255)
    private String correo;

    @Column(name = "cvlac", nullable = true, length = 255)
    private String cvlac;

    @Column(name = "posicion", nullable = true, length = 255)
    private String posicion;
    
    @OneToMany(mappedBy = "docente", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Permisos> permisosList = new ArrayList<Permisos>();

    @JsonIgnore
    @OneToOne(mappedBy = "docente", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private User user;
}
