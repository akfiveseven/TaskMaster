import React, { useEffect, useState } from "react";
import { Calendar, dayjsLocalizer } from 'react-big-calendar'
import dayjs from 'dayjs'
import Typography from '@mui/material/Typography';
import { responsiveFontSizes, Checkbox, Chip } from '@mui/material';

export default function TaskCalendar(props) {
  
  //console.log(props.newTaskData)
  const localizer = dayjsLocalizer(dayjs)

  // Check if newTaskData exists and is an array
  // Get the date of the next occurrence for each task, depending on the repeatDays
function getNextOccurrence(task, repeatDay) {
  const now = new Date();
  const currentDayOfWeek = now.getDay();
  const repeatDayNumber = getDayOfWeekNumber(repeatDay);
  const diff = (repeatDayNumber - currentDayOfWeek + 7) % 7;

  const nextDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + diff);
  return nextDate;
}

// Get the day of the week as a number (0 for Sunday, 1 for Monday, etc.)
function getDayOfWeekNumber(dayOfWeek) {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return daysOfWeek.indexOf(dayOfWeek);
}


useEffect(() => {
  const lastOpenDate = localStorage.getItem('lastOpenDate');
  const currentDate = new Date().toDateString();

  if (lastOpenDate !== currentDate) {
    // It's a new day

    const updatedTasks = props.newTaskData.map(task => {
      if (task.taskType === 'Habit') {
        // This is a repeating task, check if it's completed (checked)

        Object.entries(task.habitDays).forEach(([repeatDay, isSelected]) => {
          if (isSelected) {
            // Get the date of the next occurrence for the current day
            const occurrenceDate = getNextOccurrence(task, repeatDay);

            // Generate a new ID for today's occurrence
            const occurrenceID = task.taskID + '-' + occurrenceDate.toISOString();

            // Uncheck this occurrence
            const checkedIndex = props.checked.indexOf(occurrenceID);
            if (checkedIndex !== -1) {
              props.checked.splice(checkedIndex, 1);
            }
          }
        });
      }
      return task;
    });
    props.handleNewDayData(updatedTasks);
    //setNewTaskData(updatedTasks); // Update your task data state here
    localStorage.setItem('lastOpenDate', currentDate); // Save today's date as the last open date
  }
}, []);


// Check if newTaskData exists and is an array
const mappedEvents = Array.isArray(props.newTaskData)
? props.newTaskData.map(task => ({
    id: task.taskID, // Provide a unique ID for each event
    title: task.taskName,
    start: new Date(task.taskStartDate + 'T00:00'),
    end: new Date(task.taskStartDate + 'T00:00'),
    priority: task.taskPriority,
    checked: props.checked.includes(task.taskID),
    // Additional properties as needed
  }))
: [];

const futureEvents = props.newTaskData.flatMap((task) => {
  if (task.taskType === 'Habit') {
    // If it's a Habit task, generate an event for each day in repeatDays
    return Object.entries(task.habitDays).flatMap(([repeatDay, isSelected]) => {
      if (isSelected) {
        const occurrenceDate = getNextOccurrence(task, repeatDay);
        const occurrenceID = task.taskID + '-' + occurrenceDate.toISOString();
        return {
          id: occurrenceID, // Unique ID for each occurrence
          title: task.taskName,
          start: occurrenceDate,
          end: occurrenceDate,
          priority: task.taskPriority,
          checked: props.checked.includes(occurrenceID),
          allDay: true,
        };
      } else {
        return [];
      }
    });
  } else {
    return [];
  }
});


const events = [...mappedEvents, ...futureEvents];
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

  // Custom event component that only renders the event title
  const Event = ({ event }) => (
  <div style={event.checked ? { textDecoration: "line-through" } : {}}>
    {event.title}
  </div>
  );

  return (
    <div>
      <Typography variant="h2" gutterBottom className="text-center underline" sx={{mb: "2rem"}} >Calendar</Typography>
      <Calendar
        showTime={false}
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: window.innerHeight }}
        onSelectEvent={handleEventClick}
        eventPropGetter={eventStyleGetter} // This is the function that will color the events
        components={{ event: Event }}
        //popup
        // Additional configuration props as needed
      />
    </div>
  );
}
