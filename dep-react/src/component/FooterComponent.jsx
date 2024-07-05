import "../css/flooter.css"; // Asegúrate de importar el archivo CSS

const Footer = () => {
  return (
    <footer className="footer clearfix">
        <nav className="col-md-3 col-lg-3 col-sm-3 col-xs-4 col-xxs-6 gobiernoLinea">
            <a href="http://www.legal.unal.edu.co" target="_top">Régimen Legal</a>
            <a href="http://personal.unal.edu.co" target="_top">Talento humano</a>
            <a href="http://contratacion.unal.edu.co" target="_top">Contratación</a>
            <a href="http://personal.unal.edu.co" target="_top">Ofertas de empleo</a>
            <a href="http://launalcuenta.unal.edu.co/" target="_top">Rendición de cuentas</a>
            <a href="http://docentes.unal.edu.co/concurso-profesoral/" target="_top">Concurso docente</a>
            <a href="http://www.pagovirtual.unal.edu.co/" target="_top">Pago Virtual</a>
            <a href="http://controlinterno.unal.edu.co/" target="_top">Control interno</a>
            <a href="http://siga.unal.edu.co" target="_top">Calidad</a>
            <a href="http://unal.edu.co/buzon-de-notificaciones/" target="_self">Buzón de notificaciones</a>
        </nav>
        <nav className="col-md-3 col-lg-3 col-sm-3 col-xs-4 col-xxs-6 gobiernoLinea">
            <a href="http://correo.unal.edu.co" target="_top">Correo institucional</a>
            <a href="index.html">Mapa del sitio</a>
            <a href="http://redessociales.unal.edu.co" target="_top">Redes Sociales</a>
            <a href="https://unal.edu.co/faq/l">FAQ</a>
            <a href="http://unal.edu.co/quejas-y-reclamos/" target="_self">Quejas y reclamos</a>
            <a href="http://unal.edu.co/atencion-en-linea/" target="_self">Atención en línea</a>
            <a href="http://unal.edu.co/encuesta/" target="_self">Encuesta</a>
            <a href="mailto:depinfcomp_man@unal.edu.co">Contáctenos</a>
            <a href="http://estadisticas.unal.edu.co/" target="_top">Estadísticas</a>
            <a href="index.html#">Glosario</a>
        </nav>
        <div className="col-md-4 col-lg-4 col-sm-4 col-xs-4 col-xxs-12 footer-info">
            <p className="col-sm-12 col-md-6 contacto">
                <b>Contacto página web: </b><br /> Dirección Campus La Nubia<br /> Bloque Q, Piso 2.<br /> Manizales, Colombia<br />
                Línea 01 8000 916956
            </p>
            <p className="col-sm-12 col-md-6 derechos">
                <a href="https://unal.edu.co/fileadmin/user_upload/docs/legal.pdf" target="_blank">&copy; Copyright
                    2019</a><br /> Algunos derechos reservados.<br />
                <a title="Comuníquese con el administrador de este sitio web" href="mailto:depinfcomp_man@unal.edu.co">depinfcomp_man@unal.edu.co</a><br />
                <a href="index.html#">Acerca de este sitio web</a><br /> Actualización:03/05/2024
            </p>
        </div>
        <div className="col-md-2 col-lg-2 col-sm-2 col-xs-12 logos">
            <div className="col-xs-6 col-sm-12 col-md-6 no-padding">
                <a className="col-xs-6 col-sm-12" href="http://orgullo.unal.edu.co/">
                    <img className="hidden-print" alt="Orgullo UN" src="images/log_orgullo.png" width="78" height="21" />
                    <img className="visible-print" alt="Orgullo UN" src="images/log_orgullo_black.png" width="94" height="37" />
                </a>

                <a className="col-xs-6 col-sm-12 imgAgencia" href="http://agenciadenoticias.unal.edu.co/">
                    <img className="hidden-print" alt="Agencia de noticias" src="images/log_agenc.png" width="94" height="25" />
                    <img className="visible-print" alt="Agencia de noticias" src="images/log_agenc_black.png" width="94" height="37" />
                </a>
            </div>
            <div className="col-xs-6 col-sm-12 col-md-6 no-padding">
                <a className="col-xs-6 col-sm-12" href="https://www.gov.co/">
                    <img alt="Trámites en línea" src="images/log_gobiern.png" width="67" height="51" />
                </a>

                <a className="col-xs-6 col-sm-12" href="http://www.contaduria.gov.co/">
                    <img alt="Contaduría general de la republica" src="images/log_contra.png" width="67" height="51" />
                </a>
            </div>
        </div>
    </footer>
  );
};

export default Footer;
