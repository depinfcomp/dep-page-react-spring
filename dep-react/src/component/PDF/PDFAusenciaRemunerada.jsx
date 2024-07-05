import PropTypes from "prop-types";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

import logo from "../../../public/PDFcomponent/MZLOGO.jpg";
import firma from "../../../public/PDFcomponent/MZfirma.jpg";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    paddingLeft: 100,
    paddingRight: 60,
    paddingTop: 35,
    paddingBottom: 35,
    fontSize: 11,
    position: "relative",
  },
  logo: {
    width: 300,
    height: 75,
    marginBottom: 15,
    alignSelf: "flex-end",
  },
  firma: {
    width: 150,
    height: 50,
    marginBottom: 15,
    alignSelf: "flex-start",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  header: {
    textAlign: "left",
  },
  header_con: {
    textAlign: "right",
  },
  text: {
    marginTop: 10,
    marginBottom: 10,
  },
  text_departamento: {
    marginBottom: 1,
  },
  text_departamento_Bot: {
    marginBottom: 30,
  },
  text_descri: {
    marginBottom: 5,
    textAlign: "justify",
  },
  text_direc: {
    fontSize: 10,
    fontWeight: "bold",
  },
  docente: {
    marginTop: 30,
    marginBottom: 2,
  },
  nombre_docente: {
    marginBottom: 30,
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    height: 100,
    paddingTop: 50,
    paddingHorizontal: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    fontSize: 8,
  },
  footerLeft: {
    textAlign: "left",
    paddingLeft: 70,
  },
  footerRight: {
    textAlign: "right",
  },
  footerCenter: {
    textAlign: "center",
    flexDirection: "row",
  },
  footerBlock: {
    marginHorizontal: 10,
  },
});

const daysOfWeek = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];
const monthsOfYear = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const formatDateWithDay = (dateString) => {
  const date = new Date(dateString);
  date.setDate(date.getDate() + 1); // Sumar un día a la fecha
  const dayOfWeek = daysOfWeek[date.getDay()];
  const month = monthsOfYear[date.getMonth()];
  return `${dayOfWeek} ${date.getDate()} de ${month}`;
};

function PDFAusenciaRemunerada({
  NOMBRE_DOCENTE,
  FECHA_AUTORIZACION,
  CONSECUTIVO,
  FECHA_SOLICITUD,
  DIAS_SOLICITADOS,
}) {
  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        <View style={styles.section}>
          <Image src={logo} style={styles.logo} />
          <View style={styles.headerContainer}>
            <Text style={styles.header}>Manizales, {FECHA_AUTORIZACION}</Text>
            <Text style={styles.header_con}>{CONSECUTIVO}</Text>
          </View>

          <Text style={styles.docente}>Docente</Text>
          <Text style={styles.nombre_docente}>{NOMBRE_DOCENTE}</Text>

          <Text style={styles.text_departamento}>
            Departamento de informática y computación
          </Text>
          <Text style={styles.text_departamento}>
            Universidad Nacional de Colombia
          </Text>
          <Text style={styles.text_departamento_Bot}>Sede Manizales</Text>

          <Text style={styles.text}>Asunto: Permiso Remunerado</Text>

          <Text style={styles.text_descri}>
            De conformidad con lo establecido en el Acuerdo 123 de 2013 del
            Consejo Superior Universitario (Estatuto de Personal Académico), me
            permito informarle que esta Dirección considera válidas las razones
            expuestas en su comunicación el dia{" "}
            {formatDateWithDay(FECHA_SOLICITUD)}, para ausentarse de su puesto
            de trabajo; por consiguiente, le concede permiso remunerado los días{" "}
            {DIAS_SOLICITADOS}, para que pueda atender asuntos de carácter
            personal.
          </Text>

          <Text style={{ fontWeight: "bold", marginTop: 70 }}>
            Atentamente,
          </Text>
          <Image
            src={"https://i.ibb.co/t21Yn5m/MZfirma.jpg"}
            style={styles.firma}
          />

          <Text style={styles.text_direc}>LUZ ANGELA ARISTIZÁBAL QUINTERO</Text>
          <Text style={styles.text_direc}>
            Directora Departamento de Informática y Computación
          </Text>
          <Text style={styles.text_direc}>laaristizabalq@unal.edu.co</Text>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerLeft}>[ Página 1 de 1 ]</Text>
          <View style={styles.footerCenter}>
            <View style={[styles.footerBlock, styles.footerRight]}>
              <Text>Campus La Nubia</Text>
              <Text>Bloque Q piso 2</Text>
              <Text>(+57 6) 8879300 Ext. 55762 - 55764</Text>
              <Text>Manizales, Colombia</Text>
              <Text>depinfcomp_man@unal.edu.co</Text>
            </View>
            <View style={styles.footerBlock}>
              <Text>PROYECTO</Text>
              <Text>CULTURAL,</Text>
              <Text>CIENTIFICO</Text>
              <Text>Y COLECTIVO</Text>
              <Text>DE NACION</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}

PDFAusenciaRemunerada.propTypes = {
  NOMBRE_DOCENTE: PropTypes.string.isRequired,
  FECHA_AUTORIZACION: PropTypes.string.isRequired,
  CONSECUTIVO: PropTypes.string.isRequired,
  FECHA_SOLICITUD: PropTypes.string.isRequired,
  DIAS_SOLICITADOS: PropTypes.string.isRequired,
};

export default PDFAusenciaRemunerada;
