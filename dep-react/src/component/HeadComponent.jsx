import "../css/accesibilidad.css"
import "../css/phone.css"
import "../css/printer.css"
import "../css/reset.css"
import "../css/small.css"
import "../css/styleMenu.css"
import "../css/tablet.css"

import "../css/bootstrap-theme.min.css"
import "../css/bootstrap.min.css"

import "../css/unal.css"

import "../../public/js/jquery.js"

import "../../public/js/unal.js"

//import "../../public/js/accesibilidad.js"
//import "../../public/js/script.js"

import { Link } from "react-router-dom";


// import {Docentes,Administrativos} from "../component/DocAdmiComponent";
// import NavTopComponent from "../component/NavTopComponent";
// import NavMidComponent from "../component/NavMidComponent";
// import NoticiasComponent from "../component/NoticiasComponent";

const HeadComponent = () => {
    return (
        <div className="head-container" >
            <div id="services">
                <div className="indicator hidden-xs"></div>
                <ul className="dropdown-menu">
                    <li>
                        <a href="http://correo.unal.edu.co" target="_blank">
                            <img src="images/icnServEmail.png" width="32" height="32" alt="Correo Electrónico" />
                            Correo Electrónico
                        </a>
                    </li>
                    <li>
                        <a href="https://dninfoa.unal.edu.co" target="_blank">
                            <img src="images/icnServSia.png" width="32" height="32" alt="Dirección Nacional de Información Académica" />
                            DNINFOA - SIA
                        </a>
                    </li>
                    <li>
                        <a href="http://bibliotecas.unal.edu.co" target="_blank">
                            <img src="images/icnServLibrary.png" width="32" height="32" alt="Biblioteca" />
                            Bibliotecas
                        </a>
                    </li>
                    <li>
                        <a href="http://personal.unal.edu.co" target="_blank">
                            <img src="images/icnServCall.png" width="32" height="32" alt="Convocatorias" />
                            Convocatorias
                        </a>
                    </li>
                    <li>
                        <a href="http://identidad.unal.edu.co">
                            <img src="images/icnServIdentidad.png" width="32" height="32" alt="Identidad UNAL" />
                            Identidad UNAL
                        </a>
                    </li>
                </ul>
            </div>
            <header id="unalTop">
                <div className="logo">
                    <a href="http://unal.edu.co">
                        <svg width="93%" height="93%">
                            <image xlinkHref="images/escudoUnal.svg" width="100%" height="100%" className="hidden-print" />
                        </svg>
                        {/* <img src="images/escudoUnal.png" width="93%" height="auto" className="hidden-print" alt="Escudo Unal" />
                        <img src="images/escudoUnal_black.png" className="visible-print" alt="Escudo Unal Black" /> */}
                    </a>
                </div>
                <div className="seal">
                    <img className="hidden-print" alt="Escudo de la República de Colombia" src="images/sealColombia.png" width="66" height="66" />
                    <img className="visible-print" alt="Escudo de la República de Colombia" src="images/sealColombia_black.png" width="66" height="66" />
                </div>
                <div className="firstMenu">
                    <button className="navbar-toggle collapsed" type="button" data-toggle="collapse" data-target="#bs-navbar" aria-controls="bs-navbar" aria-expanded="false">
                        <span className="icon-bar"></span><span className="icon-bar"></span><span className="icon-bar"></span>
                    </button>
                    {/*seccion de idiomas de pagina*/}
                    {/* <div className="btn-group languageMenu hidden-xs">
                        <div className="btn btn-default dropdown-toggle" data-toggle="dropdown">es<span className="caret"></span></div>
                        <ul className="dropdown-menu">
                            <li><a href="index.html#">EN - English</a></li>
                            <li><a href="index.html#">GUC - Wayuunaiki</a></li>
                            <li><a href="index.html#">PBB - Nasa yuwe</a></li>
                        </ul>
                    </div> */}
                    <ul className="socialLinks hidden-xs">
                        <li>
                            <a href="https://www.facebook.com/UNALOficial" target="_blank" className="facebook" title="Página oficial en Facebook"></a>
                        </li>
                        <li>
                            <a href="https://twitter.com/UNALOficial" target="_blank" className="twitter" title="Cuenta oficial en Twitter"></a>
                        </li>
                        <li>
                            <a href="https://www.youtube.com/channel/UCnE6Zj2llVxcvL5I38B0Ceg" target="_blank" className="youtube" title="Canal oficial de Youtube"></a>
                        </li>
                    </ul>
                    <div className="navbar-default">
                        <nav id="profiles" className="desktop-only">
                            <ul className="nav navbar-nav dropdown-menu">
                                <li className="item_Aspirantes"><a href="https://aspirantes.unal.edu.co/">Aspirantes</a></li>
                                <li className="item_Estudiantes"><a href="https://estudiantes.unal.edu.co/">Estudiantes</a></li>
                                <li className="item_Egresados"><a href="https://egresados.unal.edu.co/">Egresados</a></li>
                                <li className="item_Docentes"><a href="https://docentes.unal.edu.co/">Docentes</a></li>
                                <li className="item_Administrativos"><a href="https://administrativos.unal.edu.co/">Administrativos</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
                <div id="bs-navbar" className="navbar-collapse collapse navigation">
                    <div className="site-url">
                        
                        <Link to={"/"}>depinfcomp.manizales.unal.edu.co</Link>
                    </div>
                    <div className="buscador">
                        <div className="gcse-searchbox-only" data-resultsUrl="http://unal.edu.co/resultados-de-la-busqueda/" data-newWindow="true"></div>
                    </div>
                    <div className="mainMenu">
                        <div className="btn-group" id="departamentoDropdown">
                            <div className="btn btn-default dropdown-toggle" data-toggle="dropdown" id="departamentoDropdown">
                                Departamento<span className="caret"></span>
                            </div>
                            <ul className="dropdown-menu" id="departamentoMenu">
                                <li><a href="#">Historia</a></li>
                                <li><a href="#">Misión y Visión</a></li>
                            </ul>
                        </div>
                        <div className="btn-group" id="curricularDropdown">
                            <button className="btn btn-default dropdown-toggle" data-toggle="dropdown" id="curricularDropdownButton">
                                Área curricular <span className="caret"></span>
                            </button>
                            <ul className="dropdown-menu" role="menu" id="curricularMenu">
                                <li className="dropdown-submenu">
                                    <a>Pregrado</a>
                                    <ul className="dropdown-menu" role="menu">
                                        <li><a href="https://www.manizales.unal.edu.co/menu/programas-academicos/carreras/administracion-de-sistemas-informaticos/">
                                            Administración de sistemas informáticos</a></li>
                                    </ul>
                                </li>
                                <li className="dropdown-submenu">
                                    <a>Posgrados</a>
                                    <ul className="dropdown-menu" role="menu">
                                        <li className="dropdown-submenu">
                                            <a href="http://www.fadmon.unal.edu.co/inicio/formacion/posgrados-en-informatica-y-computacion/maestria-en-administracion-de-sistemas-informáticos-profundización.html"
                                             className="submenu">Manizales - Maestría en administración de sistemas informáticos - Profundización</a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        <div className="btn-group" id="investigacionDropdown">
                    <button className="btn btn-default dropdown-toggle" data-toggle="dropdown" id="investigacionDropdownButton">
                        Investigación <span className="caret"></span>
                    </button>
                    <ul className="dropdown-menu" role="menu" id="investigacionMenu">
                        <li className="dropdown-submenu">
                            <a href="#">Grupos de Investigación</a>
                            <ul className="dropdown-menu" role="menu">
                                <li><a href="https://gaia.manizales.unal.edu.co/grupo_inv/grupo-de-investigacion-en-ambientes-inteligentes-adaptativos-gaia/">
                                        GAIA</a></li>
                                <li><a href="https://scienti.minciencias.gov.co/gruplac/jsp/visualiza/visualizagr.jsp?nro=00000000009853">
                                        Teoría y gestión de tecnologías de la informacióna</a></li>
                                <li><a href="https://scienti.minciencias.gov.co/gruplac/jsp/visualiza/visualizagr.jsp?nro=00000000016635">
                                        Emprendimiento Empresarial</a></li>
                            </ul>
                        </li>
                        <li className="dropdown-submenu">
                            <a href="#">Semilleros</a>
                            <ul className="dropdown-menu" role="menu">
                                <li><a href="#">PROGRAMACION COMPETITIVA </a></li>
                                <li><a href="#">GESTION TECNOLOGIAS EN LA NUBE</a></li>
                                <li><a href="#">GAMIFICACION EN LA ENSEÑANZA DE LA PROGRAMACION</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
                        {/* <div className="btn-group" id="movilidadDropdown">
                            <button className="btn btn-default dropdown-toggle" data-toggle="dropdown" id="movilidadDropdownButton">
                                Movilidad académica <span className="caret"></span>
                            </button>
                            <ul className="dropdown-menu" role="menu" id="movilidadMenu">
                                <li><a href="{{route('MovilidadEstudiantil')}}">Movilidad estudiantil</a></li>
                                <li><a href="{{route('MovilidadProfesores')}}">Movilidad profesores</a></li>
                            </ul>
                        </div> */}
                        <div className="btn-group" id="sedesDropdown">
                    <div className="btn btn-default dropdown-toggle" data-toggle="dropdown" id="sedesDropdown">Sedes<span className="caret"></span>
                    </div>
                    <ul className="dropdown-menu dropItem-16" id="sedesMenu">
                        <li><a href="http://amazonia.unal.edu.co" target="_blank">Amazonia</a><span className="caret-right"></span></li>
                        <li><a href="http://bogota.unal.edu.co" target="_blank">Bogotá</a><span className="caret-right"></span></li>
                        <li><a href="http://caribe.unal.edu.co" target="_blank">Caribe</a><span className="caret-right"></span></li>
                        <li><a href="http://delapaz.unal.edu.co" target="_blank">De La Paz</a><span className="caret-right"></span></li>
                        <li><a href="http://www.manizales.unal.edu.co" target="_blank">Manizales</a><span className="caret-right"></span></li>
                        <li><a href="http://medellin.unal.edu.co" target="_blank">Medellín</a><span className="caret-right"></span></li>
                        <li><a href="http://orinoquia.unal.edu.co" target="_blank">Orinoquia</a><span className="caret-right"></span></li>
                        <li><a href="http://www.palmira.unal.edu.co" target="_blank">Palmira</a><span className="caret-right"></span></li>
                        <li><a href="http://tumaco-pacifico.unal.edu.co" target="_blank">Tumaco</a><span className="caret-right"></span></li>
                    </ul>
                </div>
                    </div>
                </div>
            </header>

     

        </div>
    );
};

export default HeadComponent;
