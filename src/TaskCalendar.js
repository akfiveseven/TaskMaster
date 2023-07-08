import React from 'react';
import { Calendar, dayjsLocalizer } from 'react-big-calendar'
import dayjs from 'dayjs'
import { responsiveFontSizes } from '@mui/material';
import './style.css'

  // Custom event component that only renders the event title
  const Event = ({ event }) => (
    <span>
      {event.title}
    </span>
  );

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
        priority: task.taskPriority,
        // Additional properties as needed
      }))
    : [];
    //console.log(mappedEvents)

  // Handle when user clicks on certain event
  const handleEventClick = (event) => {
    console.log('Event clicked:', event)
    props.handleEdit(event.id)

  }

  // A function to color events based on their priority
  const eventStyleGetter = (event, start, end, isSelected) => {
    let backgroundColor = '#f9c2ff'; // Default color if no priority is set
    if (event.priority === 'High') {
      backgroundColor = '#ff0000'; // red
    } else if (event.priority === 'Medium') {
      backgroundColor = '#ffa500'; // orange
    } else if (event.priority === 'Low') {
      backgroundColor = '#008000'; // green
    }

    let style = {
      backgroundColor: backgroundColor,
      borderRadius: '0',
      opacity: 0.8,
      color: 'black',
      border: '0',
      display: 'block',
      fontSize: '9px'
    };

    return {
      style: style
    };
  }

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={mappedEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: window.innerHeight * 0.8}}
        onSelectEvent={handleEventClick}
        eventPropGetter={eventStyleGetter} // This is the function that will color the events
        components={{ event: Event }}
        //popup
        // Additional configuration props as needed
      />
    </div>
  );
}
