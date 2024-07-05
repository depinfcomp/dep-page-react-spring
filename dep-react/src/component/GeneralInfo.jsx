import { useState } from "react";
import "../css/infPrograma.css";
import NavMidComponent from "../component/NavMidComponent";
import NavTopComponent from "../component/NavTopComponent";

const GeneralInfo = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <div style={{ maxWidth: "100%", overflowX: "hidden" }}>
        {/* <NavTopComponent />
        <NavMidComponent /> */}
      </div>
      <div className="fcen-programas-all">
        <div className="fcen-descr-container">
          <div className="fcen-description">
            <div className="fcen-description-depmate">
              <div className="fcen-depmate-up-text">
                <div className="fcen-depmate-heading">
                  <h2>Administracion de sistemas informaticos</h2>
                  <div className="fcen-depmate-list">
                    <p>
                      <strong>Facultad:</strong>Administración |
                    </p>
                    <p>
                      <strong>Departamento:</strong>Informática |
                    </p>
                    <p>
                      <strong>Duración:</strong>10 semestres |
                    </p>
                    <p>
                      <strong>Modalidad:</strong>Presencial |
                    </p>
                    <p>
                      <strong>Jornada:</strong>Diurna |
                    </p>
                    <p>
                      <strong>Admisión:</strong>Semestral |
                    </p>
                    <p>
                      <strong>Ubicación:</strong>Campus La Nubia |
                    </p>
                  </div>
                </div>

                <div className="fcen-depmate-perfil">
                  <h3>Naturaleza de la Profesión</h3>
                  <p className="fcen-depmate-uptext-p">
                    El Administrador de Sistemas Informáticos es un profesional
                    con conocimientos científicos, humanísticos, técnicos,
                    lógicos y sistémicos que lo capacitan para formular,
                    diseñar, implementar y auditar políticas, estrategias,
                    planes y programas en el campo de los sistemas de
                    información utilizados en las distintas organizaciones...
                  </p>
                </div>

                <div className="fcen-depmate-perfil">
                  <h3>Perfil del Aspirante y del Egresado</h3>
                  <h4>Aspirante</h4>
                  <p className="fcen-depmate-uptext-p">
                    El aspirante a la carrera de Administración de Sistemas
                    Informáticos debe poseer gran interés en:
                    <ul>
                      <li>
                        Las tecnologías informáticas y su continua
                        actualización.
                      </li>
                      <li>
                        Desarrollar habilidades para generar y plantear
                        alternativas de acción y toma de decisiones.
                      </li>
                      <li>
                        Desplegar habilidades que permitan establecer buenas
                        relaciones interpersonales y comunicación efectiva con
                        su entorno.
                      </li>
                      <li>
                        Buscar la excelencia y calidad en su formación para ser
                        un profesional que contribuya al desarrollo de las
                        organizaciones modernas.
                      </li>
                      <li>
                        Habilidades para establecer adecuadas relaciones
                        interpersonales.
                      </li>
                      <li>
                        Aptitudes para comunicarse efectivamente con los demás,
                        en forma oral y escrita.
                      </li>
                      <li>
                        Interés por la continua actualización, interpretación y
                        evolución del saber profesional.
                      </li>
                      <li>
                        Alto sentido de responsabilidad y sensibilidad social.
                      </li>
                    </ul>
                  </p>
                  <h4>Egresado</h4>
                  <p className="fcen-depmate-uptext-p">
                    El Administrador de Sistemas Informáticos estará en
                    capacidad de:
                    <ul>
                      <li>
                        Conocer y aprovechar los recursos informáticos de tal
                        manera que pueda ponerlos al servicio de los objetivos
                        de la organización.
                      </li>
                      <li>
                        Analizar, diseñar e implementar sistemas de información
                        acorde a las necesidades de las empresas.
                      </li>
                      <li>
                        Propiciar rápidos procesos de adaptación de las
                        organizaciones a los nuevos desarrollos generados por la
                        dinámica de la informática.
                      </li>
                      <li>
                        Administrar el recurso informático de una empresa, de
                        tal manera que permita desarrollar sistemas de
                        información, software y relaciones entre áreas de la
                        organización, de manera confiable, rápida y efectiva.
                      </li>
                      <li>
                        Investigar sobre las teorías, modelos, tendencias y
                        aplicaciones de la tecnología informática para el
                        mejoramiento de la calidad y competitividad de las
                        organizaciones.
                      </li>
                      <li>
                        Desarrollar sistemas de seguridad y auditoría de los
                        sistemas informáticos usados, de tal manera que pueda
                        efectuarse un control eficaz y la protección necesaria
                        de la información estratégica.
                      </li>
                      <li>
                        Realizar asesoría, consultoría y asistencia técnica en
                        las diferentes áreas abordadas por la administración
                        informática.
                      </li>
                      <li>
                        Generar nuevas empresas que en su campo aporten
                        iniciativas en el desarrollo organizacional que
                        contribuyan al progreso económico y social de la región
                        y del país.
                      </li>
                    </ul>
                  </p>
                </div>

                <div className="fcen-depmate-perfil">
                  <h3>Objeto de Estudio</h3>
                  <h4>Misión</h4>
                  <p className="fcen-depmate-uptext-p">
                    Brindar a la región y al país, profesionales en
                    Administración de Sistemas Informáticos, dotados de
                    percepción y sensibilidad social, gran capacidad de
                    discernimiento y síntesis, mentalidad abierta y sensible
                    frente a los cambios, capacidad de emprendimiento...
                  </p>
                  <h4>Objetivos</h4>
                  <p className="fcen-depmate-uptext-p">
                    Formar administradores de sistemas informáticos integrales
                    capaces de adaptarse a los entornos dinámicos y complejos de
                    las organizaciones, respondiendo a sus exigencias en el
                    campo de las tecnologías de información...
                  </p>
                </div>

                <div className="fcen-depmate-perfil">
                  <h3>Campos de Desarrollo y Demanda Profesional</h3>
                  <p className="fcen-depmate-uptext-p">
                    Los profesionales en Administración de Sistemas
                    Informáticos, presentan un campo de desarrollo amplio y
                    complejo en los diferentes sectores de la economía, de la
                    industria, de la manufactura y de las organizaciones en
                    general...
                  </p>
                  <h4>Campos Ocupacionales</h4>
                  <p className="fcen-depmate-uptext-p">
                    <ul>
                      <li>
                        <strong>Directivo y Administrativo:</strong> Para los
                        diferentes campos directivos en lo que respecta a
                        sistemas informáticos y en especial los relacionados con
                        la toma de decisiones.
                      </li>
                      <li>
                        <strong>Investigación:</strong> Implementar nuevos
                        conceptos e innovaciones en informática que generen
                        desarrollo en todos los niveles organizacionales.
                      </li>
                      <li>
                        <strong>Empresarial:</strong> Generar alternativas de
                        soluciones a la problemática presentada en el desarrollo
                        empresarial y de igual manera contribuir al desarrollo
                        social y económico de la organización.
                      </li>
                      <li>
                        <strong>Asesor:</strong> Analizar, evaluar y recomendar
                        estrategias de desarrollo de sistemas que permitan la
                        aplicabilidad de conceptos e innovaciones.
                      </li>
                      <li>
                        <strong>Sistemas:</strong> Analizar, diseñar y
                        establecer sistemáticamente soluciones informáticas a
                        problemas en diferentes áreas.
                      </li>
                    </ul>
                  </p>
                </div>

                <div className="fcen-depmate-contact-container">
                  <p>
                    <strong>Director:</strong>Luz Angela Aristizábal Quintero
                  </p>
                  <p>
                    <strong>Correo electrónico:</strong>{" "}
                    laaristizabalq@unal.edu.co
                  </p>
                  <p>
                    <strong>Dirección:</strong> Campus la Nubia Bloque Q - Piso
                    2
                  </p>
                  <p>
                    <strong>Extensión:</strong> 55764
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="accordion-container">
          <div className="accordion">
            {accordionData.map((item, index) => (
              <div
                className={`accordion-item ${
                  activeIndex === index ? "active" : ""
                }`}
                key={index}
              >
                <div
                  className="accordion-header"
                  onClick={() => toggleAccordion(index)}
                >
                  <div className="accordion-title">
                    <h3>{item.title}</h3>
                  </div>
                  <span className="icon"></span>
                  <svg
                    className="arrow-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M7 10l5 5 5-5z"></path>
                  </svg>
                </div>
                <div className="accordion-content">{item.content}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const accordionData = [
  {
    title: "Normatividad",
    content: (
      <div>
        <ul className="myul">
          <li className="myli">
            <strong>Trabajo de Grado:</strong>{" "}
            <a
              className="myanchors"
              href="http://www.legal.unal.edu.co/rlunal/home/doc.jsp?d_i=39262"
            >
              Resolución CFCEN-80 DE 2010
            </a>
          </li>
        </ul>
        <ul className="myul">
          <li className="myli">
            <strong>Estatuto Estudiantil:</strong>{" "}
            <a
              className="myanchors"
              href="http://www.legal.unal.edu.co/rlunal/home/doc.jsp?d_i=34983"
            >
              Acuerdo 008 de 2008, Consejo Superior Universitario
            </a>
          </li>
        </ul>
        <ul className="myul">
          <li className="myli">
            <strong>Normativa General:</strong>{" "}
            <a
              className="myanchors"
              href="http://www.legal.unal.edu.co/rlunal/home/docindex.jsp"
            >
              Régimen Académico, Reglamento General
            </a>
          </li>
        </ul>
      </div>
    ),
  },

  {
    title: "Calendario Académico",
    content: (
      <div>
        <ul className="myul">
          <li className="myli">
            El calendario académico se publica en el portal de la Universidad y
            en el departamento de admisiones.
          </li>
        </ul>
      </div>
    ),
  },
  {
    title: "Malla curricular",
    content: (
      <div>
        <ul className="myul">
          <li className="myli">
            <strong>Normativa vigente del Plan de Estudio:</strong>{" "}
            <a
              className="myanchors"
              href="http://www.legal.unal.edu.co/rlunal/home/doc.jsp?d_i=98338"
            >
              Acuerdo 98 de 2021 del Consejo de Facultad de Administración
            </a>
          </li>
        </ul>
        <ul className="myul">
          <li className="myli">
            <strong>Malla:</strong>{" "}
            <a
              className="myanchors"
              href="https://mallas.manizales.unal.edu.co/facultades/administracion/sistemas/index.html"
            >
              Administración de Sistemas Informáticos
            </a>
          </li>
        </ul>
      </div>
    ),
  },
];

export default GeneralInfo;
