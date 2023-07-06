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
  
  const [open, setOpen] = React.useState(false);
  const [showDashboard, setShowDashboard] = React.useState(true);
  const [showInbox, setShowInbox] = React.useState(false);

  const [checked, setChecked] = React.useState([]);

  const handleToggle = (InboxTaskID) => () => {
    console.log(InboxTaskID);
    const currentIndex = checked.indexOf(InboxTaskID);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(InboxTaskID);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  const handleDashboardClick = () => {
    setShowInbox(false); 
    setShowDashboard(true);
  };


  const handleInboxClick = () => {
    setShowDashboard(false);
    setShowInbox(true);
  };

  function handleShowDashboard()  {
    return(
        <>
        <div className="filter-style">
        <FormControl variant="outlined" style={{ minWidth: 120 }}>
          <FormLabel id="sort-label">Sort by</FormLabel>
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
          </Select>
        </FormControl>
        </div>
        <Dashboard newTaskData={props.tasks} taskID={props.taskID} handleDelete={props.handleDelete} handleEdit={props.handleEdit} checked={checked} handleToggle={handleToggle} />
        {/* <Inbox newTaskData={props.tasks} taskID={props.taskID} handleDelete={props.handleDelete} handleEdit={props.handleEdit} checked={checked} handleToggle={handleToggle} /> */}
      </>
    );
  };
  
  function handleShowInbox() {
    return(
      <>
        <Inbox newTaskData={props.tasks} taskID={props.taskID} handleDelete={props.handleDelete} handleEdit={props.handleEdit} checked={checked} handleToggle={handleToggle} /> 
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
            sx={{ mr: 2, mb: 300, ...(open && { display: 'none' }) }}
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
                <ListItemButton onClick={handleInboxClick}> 
                    <ListItemText primary={"Calendar"} />
                </ListItemButton>
                </ListItem>
        </List>
         <Divider />
        <List>
            <ListItem key={'Habits'} disablePadding>
                <ListItemButton onClick={props.handleClickOpen}> 
                    <ListItemText primary={"Habits"} />
                </ListItemButton>
            </ListItem>
            <ListItem key={'Goals'} disablePadding>
                <ListItemButton onClick={props.handleClickOpen}> 
                    <ListItemText primary={"Goals"} />
                </ListItemButton>
            </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem key={'Create'} disablePadding>
                <ListItemButton onClick={props.handleClickOpen}> 
                    <ListItemText primary={"Create Task"} />
                </ListItemButton>
            </ListItem>
        </List>
        <Divider />
        <List>
            
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {/* <Button className="buttonStyle" variant="contained" color="primary" onClick={props.undoDelete} size="small">Undo Delete</Button> */}
        {showDashboard && handleShowDashboard()}
        {showInbox && handleShowInbox()}
      </Main>
    </Box>
  );
}