import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es'; // Importar el locale de español para moment
import 'react-big-calendar/lib/css/react-big-calendar.css';

moment.locale('es'); // Configurar moment para usar el idioma español
const localizer = momentLocalizer(moment);

const CalendarComponent = ({ events }) => {
  const formattedEvents = events.map(event => ({
    title: event.titulo,
    start: new Date(event.fechaInicio),
    end: new Date(event.fechaFin),
    url: event.linkInformacion, // Agregar URL si está presente
  }));

  const handleSelectEvent = (event) => {
    if (event.url) {
      window.open(event.url, '_blank');
    }
  };

  return (
    <div style={{ height: '500px' }} >
      <Calendar
        localizer={localizer}
        events={formattedEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
        onSelectEvent={handleSelectEvent}
        messages={{
          next: "Sig.",
          previous: "Ant.",
          today: "Hoy",
          month: "Mes",
          week: "Semana",
          day: "Día",
          agenda: "Agenda",
          date: "Fecha",
          time: "Hora",
          event: "Evento",
          noEventsInRange: "No hay eventos en este rango.",
          showMore: total => `+ Ver más (${total})`
        }}
      />
    </div>
  );
};

export default CalendarComponent;
