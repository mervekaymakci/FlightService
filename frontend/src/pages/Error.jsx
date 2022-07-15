import { Center } from "../components/styles";
import React from "react";
import { Paper } from "@mui/material";
import image from "./../images/background.png";
export const Error = () => {
  return (
    <div style={{ margin: 45 }}>
      <Paper elevation={24}>
        <Center>
          <div style={{ color: "#E8513C", fontSize: "7rem", marginTop: 10 }}>
            ERROR
          </div>
        </Center>
        <Center>
          <div style={{ color: "#E8833C", fontSize: "3rem", marginTop: 10 }}>
            Sorry! The page that you are trying to reach cannot be found!
          </div>
        </Center>
        <Center>
          <img src={image} />
        </Center>
      </Paper>
    </div>
  );
};
