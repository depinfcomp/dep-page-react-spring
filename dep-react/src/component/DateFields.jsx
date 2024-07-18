import React, { useEffect } from "react";
import { TextField, Grid } from "@mui/material";
import { useSnackbar } from "notistack";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

const holidays = [
    // 2024
    "2024-01-01", "2024-01-08", "2024-03-25", "2024-03-28", "2024-03-29",
    "2024-05-01", "2024-05-13", "2024-06-03", "2024-06-10", "2024-07-01",
    "2024-07-20", "2024-08-07", "2024-08-19", "2024-10-14", "2024-11-04",
    "2024-11-11", "2024-12-08", "2024-12-25",
    // 2025
    "2025-01-01", "2025-01-06", "2025-03-24", "2025-04-03", "2025-04-04",
    "2025-04-14", "2025-05-01", "2025-05-19", "2025-06-09", "2025-06-30",
    "2025-07-20", "2025-08-07", "2025-08-18", "2025-10-13", "2025-11-03",
    "2025-11-17", "2025-12-08", "2025-12-25",
    // 2026
    "2026-01-01", "2026-01-06", "2026-03-16", "2026-04-02", "2026-04-03",
    "2026-04-06", "2026-05-01", "2026-05-25", "2026-06-15", "2026-06-29",
    "2026-07-20", "2026-08-07", "2026-08-17", "2026-10-12", "2026-11-02",
    "2026-11-16", "2026-12-08", "2026-12-25",
  ];
  

const isHoliday = (date) => {
  return holidays.includes(date.format("YYYY-MM-DD"));
};

const calculateBusinessDays = (start, end) => {
  let count = 0;
  let currentDate = start.clone();

  while (currentDate.isBefore(end) || currentDate.isSame(end, 'day')) {
    const dayOfWeek = currentDate.day();

    if (dayOfWeek !== 0 && dayOfWeek !== 6 && !isHoliday(currentDate)) {
      count++;
    }
    currentDate = currentDate.add(1, 'day');
  }

  return count;
};

const DateFields = ({ startDate, setStartDate, endDate, setEndDate }) => {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (startDate && endDate) {
      const start = dayjs(startDate);
      const end = dayjs(endDate);
      const businessDays = calculateBusinessDays(start, end);

      if (businessDays > 2) {
        enqueueSnackbar("El rango de fechas no puede ser mayor a 2 días hábiles.", {
          variant: "error",
        });
        setEndDate("");
      }
    }
  }, [startDate, endDate, enqueueSnackbar]);

  return (
    <Grid container spacing={2} sx={{ marginBottom: 5 }}>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          type="date"
          label="Fecha de Inicio"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          fullWidth
          InputLabelProps={{
            shrink: true,
            style: { fontSize: "2rem" },
          }}
          InputProps={{
            style: { fontSize: "1.2rem" },
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          type="date"
          label="Fecha de Fin"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          fullWidth
          InputLabelProps={{
            shrink: true,
            style: { fontSize: "2rem" },
          }}
          InputProps={{
            style: { fontSize: "1.2rem" },
          }}
        />
      </Grid>
    </Grid>
  );
};

export default DateFields;
