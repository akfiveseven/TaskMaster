import * as React from "react";
import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import { Paper, Button } from "@mui/material";
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
  return (
    <>
        {/* <Paper elevation={0} variant="outlined" square className="paperColor" >   */}
        <div className="navDiv">
            <Breadcrumbs aria-label="breadcrumb" className="breadStyle">
                <StyledBreadcrumb
                component="a"
                href="#"
                label="Home"
                icon={<HomeIcon fontSize="small" />}
                />
                <StyledBreadcrumb component="a" href="#" label="Catalog" />
                <StyledBreadcrumb label="Accessories" deleteIcon={<ExpandMoreIcon />} />
            </Breadcrumbs>
        </div>
        {/* </Paper> */}
    </>
  );
}
