import React from "react";
import { Link } from "react-router-dom";
import ToDoApp from "./ToDoApp";

export default function Navbar() {
  return (
    <div className="container-fluid">
    <div className="row flex-nowrap">
        <div className="sidebar-container col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
            <div className="sidebar-text d-flex flex-column align-items-center text-white min-vh-100">
                <a href="/" className="d-flex align-items-center text-white text-decoration-none">
                    <span className="fs-5 d-none d-sm-inline"><p className="sidebar-text">Menu</p></span>
                </a>
            </div>
        </div>
        <ToDoApp />
    </div>
</div>
  );

}
