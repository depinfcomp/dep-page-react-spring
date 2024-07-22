package departamento.unal.dep.Config;

import departamento.unal.dep.Entity.Docentes;
import departamento.unal.dep.Entity.ModeloPermisos;
import departamento.unal.dep.Entity.EnlacesInteres;
import departamento.unal.dep.Entity.Investigacion;
import departamento.unal.dep.Repository.DocentesRepository;
import departamento.unal.dep.Repository.ModeloPermisosRepository;
import departamento.unal.dep.Repository.NoticiasEventosRepository;
import departamento.unal.dep.Repository.EnlacesInteresRepository;
import departamento.unal.dep.Repository.InvestigacionRepository;
import departamento.unal.dep.Auth.AuthService;
import departamento.unal.dep.Auth.RegisterRequest;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.dao.DataIntegrityViolationException;

import java.util.Arrays;
import java.util.List;

@Configuration
public class DataLoader {

        private final DocentesRepository docentesRepository;
        private final ModeloPermisosRepository modeloPermisosRepository;
        private final EnlacesInteresRepository enlacesInteresRepository;
        private final InvestigacionRepository investigacionRepository;
        private final AuthService authService;

        public DataLoader(DocentesRepository docentesRepository, ModeloPermisosRepository modeloPermisosRepository,
                        NoticiasEventosRepository noticiasEventosRepository, AuthService authService,
                        EnlacesInteresRepository enlacesInteresRepository,
                        InvestigacionRepository investigacionRepository) {
                this.docentesRepository = docentesRepository;
                this.modeloPermisosRepository = modeloPermisosRepository;
                this.authService = authService;
                this.enlacesInteresRepository = enlacesInteresRepository;
                this.investigacionRepository = investigacionRepository;
        }

        @Bean
        public CommandLineRunner loadData() {
                return args -> {
                        List<Docentes> docentes = Arrays.asList(
                                        new Docentes("LUZ ANGELA ARISTIZABAL QUINTERO", "laaristizabalq@unal.edu.co",
                                                        "https://scienti.colciencias.gov.co/cvlac/visualizador/generarCurriculoCv.do?cod_rh=0000219169",
                                                        "Directora"),
                                        new Docentes("MANUELA SAENZ GIRALDO", "msaenzg@unal.edu.co", null,
                                                        "Auxiliar administrativa"),
                                        new Docentes("ALFONSO PIO AGUDELO SALAZAR", "apagudelosa@unal.edu.co",
                                                        "https://scienti.minciencias.gov.co/cvlac/visualizador/generarCurriculoCv.do?cod_rh=0000626481",
                                                        null),
                                        new Docentes("ANA LORENA URIBE HURTADO", "alhurtadou@unal.edu.co",
                                                        "https://scienti.colciencias.gov.co/cvlac/visualizador/generarCurriculoCv.do?cod_rh=0000209252",
                                                        null),
                                        new Docentes("ADRIANA MARIA GIRALDO OSORIO", "amgiraldoo@unal.edu.co",
                                                        "https://scienti.colciencias.gov.co/cvlac/visualizador/generarCurriculoCv.do?cod_rh=0000205052",
                                                        null),
                                        new Docentes("ALBEIRO CUESTA MESA", "alcuestame@unal.edu.co",
                                                        "https://scienti.colciencias.gov.co/cvlac/visualizador/generarCurriculoCv.do?cod_rh=0000147800",
                                                        null),
                                        new Docentes("CARLOS ALBERTO RUIZ VILLA", "caruizvi@unal.edu.co",
                                                        "https://scienti.minciencias.gov.co/cvlac/visualizador/generarCurriculoCv.do?cod_rh=0000376817",
                                                        null),
                                        new Docentes("EDUARDO JOSE VILLEGAS JARAMILLO", "ejvillegasj@unal.edu.co",
                                                        "https://scienti.minciencias.gov.co/cvlac/visualizador/generarCurriculoCv.do?cod_rh=0000625698",
                                                        null),
                                        new Docentes("FRANCISCO JAVIER VALENCIA DUQUE", "fjvalenciad@unal.edu.co",
                                                        "https://scienti.minciencias.gov.co/cvlac/visualizador/generarCurriculoCv.do?cod_rh=0000678180",
                                                        null),
                                        new Docentes("GERMAN AUGUSTO OSORIO ZULUAGA", "gaosorioz@unal.edu.co",
                                                        "https://scienti.colciencias.gov.co/cvlac/visualizador/generarCurriculoCv.do?cod_rh=0000616168",
                                                        null),
                                        new Docentes("LEONARDO BERMON ANGARITA", "lbermona@unal.edu.co",
                                                        "https://scienti.colciencias.gov.co/cvlac/visualizador/generarCurriculoCv.do?cod_rh=0000063487",
                                                        null),
                                        new Docentes("LUZ ARABANY RAMIREZ CASTAÑEDA", "laramirezc@unal.edu.co",
                                                        "https://scienti.colciencias.gov.co/cvlac/visualizador/generarCurriculoCv.do?cod_rh=0001249673",
                                                        null),
                                        new Docentes("MARCELO LÓPEZ TRUJILLO", "malopeztr@unal.edu.co",
                                                        "https://scienti.colciencias.gov.co/cvlac/visualizador/generarCurriculoCv.do?cod_rh=0000221902",
                                                        null),
                                        new Docentes("MARIA HELENA MEJIA SALAZAR", "mhmejiasa@unal.edu.co",
                                                        "http://scienti.colciencias.gov.co:8081/cvlac/visualizador/generarCurriculoCv.do?cod_rh=0000204480",
                                                        null),
                                        new Docentes("MAURICIO OROZCO ALZATE", "morozcoa@unal.edu.co",
                                                        "https://scienti.colciencias.gov.co/cvlac/visualizador/generarCurriculoCv.do?cod_rh=0000207462",
                                                        null),
                                        new Docentes("NESTOR DARIO DUQUE MENDEZ", "ndduqueme@unal.edu.co",
                                                        "https://scienti.minciencias.gov.co/cvlac/visualizador/generarCurriculoCv.do?cod_rh=0000559695",
                                                        null),
                                        new Docentes("VALENTINA TABARES MORALES", "vtabaresm@unal.edu.co",
                                                        "https://scienti.colciencias.gov.co/cvlac/visualizador/generarCurriculoCv.do?cod_rh=0001452566",
                                                        null),
                                        new Docentes("OSCAR HERNAN FRANCO BEDOYA", "ohfrancob@unal.edu.co",
                                                        "https://scienti.minciencias.gov.co/cvlac/visualizador/generarCurriculoCv.do?cod_rh=0000209970",
                                                        null),
                                        new Docentes("LUIS FERNANDO MOTATO ROJAS", "lfmotatoro@unal.edu.co", null,
                                                        null),
                                        new Docentes("LUZ ENITH GUERRERO MENDIETA", "leguerrerom@unal.edu.co",
                                                        "https://scienti.minciencias.gov.co/cvlac/visualizador/generarCurriculoCv.do?cod_rh=0000425427",
                                                        null),
                                        new Docentes("LUZ STELLA CARDONA MEZA", "lscardonam@unal.edu.co",
                                                        "https://scienti.minciencias.gov.co/cvlac/visualizador/generarCurriculoCv.do?cod_rh=0000303410",
                                                        null),
                                        new Docentes("MARIA AMPARO PRIETO TABORDA", "maprietot@unal.edu.co",
                                                        "https://scienti.minciencias.gov.co/cvlac/visualizador/generarCurriculoCv.do?cod_rh=0000174750",
                                                        null),
                                        new Docentes("MÓNICA ROSA LÓPEZ GUAYASAMIN", "mrlopezg@unal.edu.co",
                                                        "https://scienti.minciencias.gov.co/cvlac/visualizador/generarCurriculoCv.do?cod_rh=0002076097",
                                                        null),
                                        new Docentes("LUIS FERNANDO MONTES LOPEZ", "lfmontesl@unal.edu.co",
                                                        "https://scienti.minciencias.gov.co/cvlac/visualizador/generarCurriculoCv.do?cod_rh=0000000249",
                                                        null),
                                        new Docentes("JHEIMER JULIÁN SEPÚLVEDA LÓPEZ", "jjsepulvedal@unal.edu.co",
                                                        "https://scienti.minciencias.gov.co/cvlac/visualizador/generarCurriculoCv.do?cod_rh=0001402721",
                                                        null),
                                        new Docentes("Pruebas", "jullopezm@unal.edu.co", "", null));

                        for (int i = 0; i < docentes.size(); i++) {
                                Docentes docente = docentes.get(i);
                                try {
                                        Docentes savedDocente = docentesRepository.save(docente);
                                        String username = docente.getCorreo().split("@")[0];
                                        String role = "DOCE";
                                        if (docente.getNombre().equals("LUZ ANGELA ARISTIZABAL QUINTERO")) {
                                                role = "DIR";
                                        } else if (docente.getNombre().equals("MANUELA SAENZ GIRALDO")) {
                                                role = "ADMIN";
                                        }

                                        RegisterRequest registerRequest = new RegisterRequest();
                                        registerRequest.setUsername(username);
                                        registerRequest.setPassword(username);
                                        registerRequest.setRole(role);
                                        registerRequest.setDocenteId(savedDocente.getIdDocente());

                                        authService.register(registerRequest);

                                } catch (DataIntegrityViolationException e) {
                                        System.out.println("Registro duplicado: " + docente.getNombre());
                                }
                        }

                        ModeloPermisos modelo1 = new ModeloPermisos("Ausencia Remunerada", "Ausencia Remunerada");
                        try {
                                if (!modeloPermisosRepository.existsByNombreModelo(modelo1.getNombreModelo())) {
                                        modeloPermisosRepository.save(modelo1);
                                }
                        } catch (DataIntegrityViolationException e) {
                                System.out.println("Registro duplicado: " + modelo1.getNombreModelo());
                        }

                        List<EnlacesInteres> enlacesInteres = Arrays.asList(
                                        new EnlacesInteres(null, "Producción Científica",
                                                        "https://horus.unal.edu.co/institution/Universidad%20Nacional%20de%20Colombia/campus/Manizales/faculty/FACULTAD%20DE%20ADMINISTRACI%C3%93N%20-%204/uab/Departamento%20de%20Inform%C3%A1tica%20y%20Computaci%C3%B3n%20-%204",
                                                        EnlacesInteres.Tipo.PUBLIC),
                                        new EnlacesInteres(null, "Congreso De Computación", "https://sco2.org/18ccc/",
                                                        EnlacesInteres.Tipo.PUBLIC));

                        for (EnlacesInteres enlace : enlacesInteres) {
                                try {
                                        enlacesInteresRepository.save(enlace);
                                } catch (DataIntegrityViolationException e) {
                                        System.out.println("Registro duplicado: " + enlace.getText());
                                }
                        }

                        String username = "julian";
                        if (!authService.userExists(username)) {
                                RegisterRequest registerRequest = new RegisterRequest();
                                registerRequest.setUsername(username);
                                registerRequest.setPassword("julian");
                                registerRequest.setRole("DIR");
                                registerRequest.setDocenteId(null);

                                authService.register(registerRequest);

                                System.out.println("Usuario registrado con éxito");
                        } else {
                                System.out.println("Usuario ya existe");
                        }

                        List<Investigacion> investigaciones = Arrays.asList(
                                        // Tipo: GRUPO
                                        new Investigacion("GAIA", "Grupo De Ambientes Inteligentes Adaptativos",
                                                        "https://gaia.manizales.unal.edu.co/grupo_inv/grupo-de-investigacion-en-ambientes-inteligentes-adaptativos-gaia/",
                                                        "https://scienti.minciencias.gov.co/gruplac/jsp/visualiza/visualizagr.jsp?nro=00000000001906",
                                                        "", "GRUPO"),
                                        new Investigacion("TGTI",
                                                        "Teoría y Gestión de Tecnologías de Información",
                                                        "https://tgtiunal.org/",
                                                        "https://scienti.minciencias.gov.co/gruplac/jsp/visualiza/visualizagr.jsp?nro=00000000009853",
                                                        "", "GRUPO"),
                                        new Investigacion("Emprendimiento Empresarial",
                                                        "Emprendimiento Empresarial",
                                                        "",
                                                        "https://scienti.minciencias.gov.co/gruplac/jsp/visualiza/visualizagr.jsp?nro=00000000016635",
                                                        "", "GRUPO"),
                                        // Tipo: SEMILLERO
                                        new Investigacion("Gestion De Contenidos En La Nube",
                                                        "Gestion De Contenidos En La Nube",
                                                        "", "", "", "SEMILLERO"),
                                        new Investigacion("Gamificacion En La Enseñanza De Programacion",
                                                        "Gamificacion En La Enseñanza De Programacion",
                                                        "", "", "", "SEMILLERO"),
                                        new Investigacion("Riesgos En Proyectos De Universidades Publicas",
                                                        "Riesgos En Proyectos De Universidades Publicas",
                                                        "", "", "", "SEMILLERO"),
                                        // Tipo: LABORATORIO
                                        new Investigacion("Redes", "Laboratorio De Redes",
                                                        "", "", "", "LABORATORIO"),
                                        new Investigacion("LIGRED",
                                                        "Laboratorio De Investigacion En Tecnologias Informaticas Para Gestion Diseño y Creacion De Recursos Educativos Digitales",
                                                        "", "", "", "LABORATORIO"),
                                        new Investigacion("GAIA", "GAIA",
                                                        "", "", "", "LABORATORIO"));

                        for (Investigacion investigacion : investigaciones) {
                                try {
                                        investigacionRepository.save(investigacion);
                                } catch (DataIntegrityViolationException e) {
                                        System.out.println("Registro duplicado: " + investigacion.getNombre() + " - "
                                                        + investigacion.getTipo());
                                }
                        }

                };
        }
}
