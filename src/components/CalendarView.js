import React, { useState, useEffect, forwardRef } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

export default function CalendarView() {
  const localizer = momentLocalizer(moment);
  const [trainings, setTrainings] = useState([]);

  useEffect(() => fetchData(), []);

  const fetchData = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then((response) => response.json())
      .then((data) => setTrainings(data));
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={trainings}
        titleAccessor={(event) => {
          return event.activity + " - " + event.customer.firstname;
        }}
        startAccessor={(event) => {
          return moment(event.date).toDate();
        }}
        endAccessor={(event) => {
          return moment(event.date).add(event.duration, "minutes").toDate();
        }}
        style={{ height: 500 }}
      />
    </div>
  );
}
