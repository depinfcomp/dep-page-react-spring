package departamento.unal.dep.Entity;
import jakarta.persistence.*;
import java.util.ArrayList;
import lombok.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "ModeloPermisosTable")
public class ModeloPermisos {

    public ModeloPermisos(String nombreModelo, String descripcionModelo) {
        this.nombreModelo = nombreModelo;
        this.descripcionModelo = descripcionModelo;
    }
    
    

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idModeloPermiso;

    @Column(name= "nombre_modelo", nullable = false, length = 255)
    private String nombreModelo;

    @Column(name= "descripcion_modelo", nullable = false, length = 255)
    private String descripcionModelo;
    
    @OneToMany(mappedBy = "modeloPermiso", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Permisos> permisosList = new ArrayList<Permisos>();
}
//    @OneToMany(mappedBy = "modeloPermiso", fetch = FetchType.LAZY)
//    @JsonManagedReference(value = "modelo-permisos")
//    @OneToMany(cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
//    @JoinColumn(name = "id_modelo_permiso", referencedColumnName = "idModeloPermiso")
//    private List<Permisos> permisosList ;
    
    
    
//    @OneToMany(mappedBy = "modeloPermiso", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//    @JsonManagedReference
//    private List<Permisos> permisosList = new ArrayList<>();

