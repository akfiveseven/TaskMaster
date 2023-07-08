import React from 'react';
import { Calendar, dayjsLocalizer } from 'react-big-calendar'
import dayjs from 'dayjs'
import 'react-big-calendar/lib/css/react-big-calendar.css'

export default function TaskCalendar(props) {

  //console.log(props.newTaskData)
  const localizer = dayjsLocalizer(dayjs)

  // Check if newTaskData exists and is an array
  const mappedEvents = Array.isArray(props.newTaskData)
    ? props.newTaskData.map(task => ({
        id: task.taskID, // Provide a unique ID for each event
        title: task.taskName,
        start: new Date(task.taskStartDate + 'T00:00'),
        end: new Date(task.taskStartDate + 'T00:00'),
        // Additional properties as needed
      }))
    : [];
    //console.log(mappedEvents)

  // Handle when user clicks on certain event
  const handleEventClick = (event) => {
    console.log('Event clicked:', event)
    props.handleEdit(event.id)

  }

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={mappedEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onSelectEvent={handleEventClick}
        popup
        // Additional configuration props as needed
      />
    </div>
  );
}
