import * as React from "react";
import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import { Paper, Button, Switch, Avatar } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import './style.css';

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});



export default function TopNav(props) {

  function handleClickProfile() {
    localStorage.setItem("checked", JSON.stringify([]));
    localStorage.setItem("goalData", JSON.stringify([]))
    localStorage.setItem("newTaskData", JSON.stringify([]))
    localStorage.setItem("gold", JSON.stringify(0));
    localStorage.setItem("rewardData", JSON.stringify([]));
  }

  return (
    <>
        {/* <Paper elevation={0} variant="outlined" square className="paperColor" >   */}
        <div className="navDiv">
            <Breadcrumbs aria-label="breadcrumb" className="breadStyle">
              <p>Gold: {props.gold}</p>
              <Chip
                avatar={<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />}
                label="Clear Local Data"
                variant="outlined"
                onClick={handleClickProfile}
              />
              {/* <Switch /> */}
            </Breadcrumbs>
        </div>
        {/* </Paper> */}
    </>
  );
}
