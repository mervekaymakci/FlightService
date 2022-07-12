import React from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Center } from "../components/styles";
import { Paper } from "@mui/material";

const DeleteFlight = ({ flight }) => {
  const flightNumberRef = useRef();
  const navigate = useNavigate();

  const handleDelete = async (event) => {
    event.preventDefault();

    try {
      await axios.delete(
        "http://localhost:8085/flights/" + flight.flightNumber
      );
      navigate("../flights", { replace: true });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div style={{ margin: 45 }}>
        <Paper elevation={24}>
          <Center>
            <form className="myForm" onSubmit={handleDelete}>
              <Center>
                <h1 style={{ color: "#FFAC42" }}>Delete Flight</h1>
              </Center>
              <div>
                <TextField
                  type={"text"}
                  inputRef={flightNumberRef}
                  sx={{ width: 350, paddingBottom: 3 }}
                  placeholder={" Flight Number"}
                ></TextField>
              </div>
              <Center>
                <Button
                  type="submit"
                  variant="contained"
                  style={{
                    backgroundColor: "#FFAC42",
                    height: 50,
                    width: 150,
                    color: "white",
                    borderColor: "#ff7f50",
                    marginBottom: 50,
                  }}
                  onClick={handleDelete}
                >
                  Delete Flight
                </Button>
              </Center>
            </form>
          </Center>
        </Paper>
      </div>
    </>
  );
};

export default DeleteFlight;
