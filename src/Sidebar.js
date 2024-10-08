import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
// import TaskList from './TaskList';
import Inbox from './Inbox';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Select from '@mui/material/Select';
import Dashboard from './Dashboard';
import Goals from './Goals';
import { Calendar, dayjsLocalizer } from 'react-big-calendar'
import dayjs from 'dayjs'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import TaskCalendar from './TaskCalendar';
import { GolfCourseSharp } from '@mui/icons-material';
import "./style.css"
import Typography from '@mui/material/Typography';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft(props) {

  const theme = useTheme();
  
  const [open, setOpen] = React.useState(true);
  const [showDashboard, setShowDashboard] = React.useState(true);
  const [showInbox, setShowInbox] = React.useState(false);
  const [showCalendar, setShowCalendar] = React.useState(false);
  const [showHabits, setShowHabits] = React.useState(false);
  const [showGoals, setShowGoals] = React.useState(false);

  //const [checked, setChecked] = React.useState([]);

  // const handleToggle = (InboxTaskID) => () => {
  //   console.log(InboxTaskID);
  //   const currentIndex = checked.indexOf(InboxTaskID);
  //   const newChecked = [...checked];

  //   if (currentIndex === -1) {
  //     newChecked.push(InboxTaskID);
  //   } else {
  //     newChecked.splice(currentIndex, 1);
  //   }

  //   setChecked(newChecked);
  // };
  

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  const handleDashboardClick = () => {
    setShowInbox(false); 
    setShowCalendar(false);
    setShowDashboard(true);
    setShowHabits(false);
    setShowGoals(false);
  };


  const handleInboxClick = () => {
    setShowDashboard(false);
    setShowCalendar(false);
    setShowInbox(true);
    setShowHabits(false);
    setShowGoals(false);
  };

  const handleCalendarClick = () => {
    setShowDashboard(false);
    setShowInbox(false);
    setShowCalendar(true);
    setShowHabits(false);
    setShowGoals(false);
  };

  const handleHabitsClick = () => {
    setShowDashboard(false);
    setShowInbox(false);
    setShowCalendar(false);
    setShowHabits(true);
    setShowGoals(false);
  };

  const handleGoalsView = () => {
    setShowDashboard(false);
    setShowInbox(false);
    setShowCalendar(false);
    setShowHabits(false);
    setShowGoals(true);
  };

  const handleDailyClick = () => {

  };

  function handleShowGoals() {
    return (
      <Goals newTaskData={props.tasks} goalData={props.goalData} goalName={props.goalName} checked={props.checked} handleToggle={props.handleToggle} taskID={props.taskID}/>
    )
  }

  function handleShowCalender() {
    return(
      <>
      <TaskCalendar newTaskData={props.tasks} handleDelete={props.handleDelete} handleNewDayData={props.handleNewDayData} handleEdit={props.handleEdit} checked={props.checked} handleToggle={props.handleToggle} taskID={props.taskID}/>
      </>
    )
  }

  function handleShowDashboard()  {
    return(
        <>
        <Dashboard goalData={props.goalData} rewardData={props.rewardData} newTaskData={props.tasks} taskID={props.taskID} handleDelete={props.handleDelete} handleEdit={props.handleEdit} checked={props.checked} handleToggle={props.handleToggle} handleRewardClaim={props.handleRewardClaim}/>
        {/* <Inbox newTaskData={props.tasks} taskID={props.taskID} handleDelete={props.handleDelete} handleEdit={props.handleEdit} checked={checked} handleToggle={handleToggle} /> */}
      </>
    );
  };
  
  function handleShowInbox() {
    return(
      <>
        <Typography variant="h2" gutterBottom className="text-center underline" sx={{mb: "2rem"}} >Inbox</Typography>
        <div className="filter-style" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <FormControl variant="outlined" style={{ minWidth: 120 }}>
            <FormLabel id="sort-label">Sort Category</FormLabel>
            <Select
              labelId="category-label"
              id="categoryName"
              value={props.selectedCategoryOption} // Change this if you have another state for selected category
              onChange={props.handleCategorySelect}
            >
              <MenuItem value="New">Create New Category</MenuItem>
              {props.categoryData.map((category) => (
                <MenuItem value={category}>{category}</MenuItem>
              ))}
              <MenuItem value="None">None</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined" style={{ minWidth: 120 }}>
            <FormLabel id="sort-label">Filter By</FormLabel>
            <Select
              labelId="sort-label"
              id="Sort"
              value={props.selectedOption}
              onChange={props.handleSort}
              label="Sort by"
            >
              <MenuItem value="original">Original</MenuItem>
              <MenuItem value="priority">Priority</MenuItem>
              <MenuItem value="due-date">Due Date</MenuItem>
              <MenuItem value="task-type">Task Type</MenuItem>
            </Select>
          </FormControl>
        </div>
        <Inbox newTaskData={props.tasks} taskID={props.taskID} handleDelete={props.handleDelete} handleEdit={props.handleEdit} checked={props.checked} handleToggle={props.handleToggle} /> 
      </>
    );
  };


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
        <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            position: 'fixed', // position fixed
            top: theme.spacing(1), // adjust to your preference
            left: theme.spacing(2), // adjust to your preference
            zIndex: theme.zIndex.drawer + 1, // or any value you see fit
            ...(open && { display: 'none' }), // hides button when sidebar is open
          }}
        >
          <MenuIcon />
        </IconButton>
        </Toolbar>
      <Drawer 
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
            {/* Inbox */}
            <ListItem key={'Dashboard'} disablePadding>
                <ListItemButton onClick={handleDashboardClick}> 
                    <ListItemText primary={"Dashboard"} />
                </ListItemButton>
            </ListItem>
            <ListItem key={'Inbox'} disablePadding>
                <ListItemButton onClick={handleInboxClick}> 
                    <ListItemText primary={"Inbox"} />
                </ListItemButton>
                </ListItem>
            <ListItem key={'Calendar'} disablePadding>
                <ListItemButton onClick={handleCalendarClick}> 
                    <ListItemText primary={"Calendar"} />
                </ListItemButton>
                </ListItem>
        </List>
         <Divider />
        {/* <List>
            <ListItem key={'Goals'} disablePadding>
                <ListItemButton onClick={handleGoalsView}> 
                    <ListItemText primary={"Goals"} />
                </ListItemButton>
            </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem key={'Create'} disablePadding>
                <ListItemButton onClick={props.handleClickOpen}> 
                    <ListItemText primary={"Create Item"} />
                </ListItemButton>
            </ListItem>
        </List> */}
        <Divider />
        <List>
            
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {/* <Button className="buttonStyle" variant="contained" color="primary" onClick={props.undoDelete} size="small">Undo Delete</Button> */}
        {showDashboard && handleShowDashboard()}
        {showInbox && handleShowInbox()}
        {showCalendar && handleShowCalender()}
        {showGoals && handleShowGoals()}
      </Main>
    </Box>
  );
}

/*

<List>
            <ListItem key={'Create-Goal'} disablePadding>
                <ListItemButton onClick={props.handleGoalClick}> 
                    <ListItemText primary={"Create Goal"} />
                </ListItemButton>
            </ListItem>
        </List>

*/
