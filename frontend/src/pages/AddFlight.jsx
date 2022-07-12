import * as React from "react";
import axios from "axios";
import { Center } from "../components/styles";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField, Paper, Box, Button } from "@mui/material";
import { useState, useRef } from "react";
import { DialogBoxx } from "../features";
import { useEffect } from "react";

const dateNow = new Date(); // Creating a new date object with the current date and time
const year = dateNow.getFullYear(); // Getting current year from the created Date object
const monthWithOffset = dateNow.getUTCMonth() + 1; // January is 0 by default in JS. Offsetting +1 to fix date for calendar.
const month = // Setting current Month number from current Date object
  monthWithOffset.toString().length < 2 // Checking if month is < 10 and pre-prending 0 to adjust for date input.
    ? `0${monthWithOffset}`
    : monthWithOffset;
const date =
  dateNow.getUTCDate().toString().length < 2 // Checking if date is < 10 and pre-prending 0 if not to adjust for date input.
    ? `0${dateNow.getUTCDate()}`
    : dateNow.getUTCDate();

const materialDateInput = `${year}-${month}-${date}`; // combining to format for defaultValue or value attribute of material <TextField>

const schema = yup.object().shape({
  flightNum: yup
    .number()
    .typeError("Please enter a valid Flight Number.")
    .min(1, "The Flight Number must be greater than 0")
    .max(999999, "Flight Numbers can only be between 0 and 1,000,000")
    .required(),
  depDate: yup.date().typeError("Please select a Departure Date.").required(),
  arrDate: yup
    .date()
    .typeError("Please enter an Arrival Date.")
    .min(yup.ref("depDate"), "Arrival date must be after Departure date")
    .required(),
  depTime: yup.string().required("Please enter a valid Departure Time."),
  arrTime: yup.string().required("Please enter a valid Arrival Time."),
  depAirport: yup
    .string()
    .matches(/^[a-zA-Z]{0,3}$/, "Airport Code must be three letters")
    .required("Please enter a valid Departure Airport."),
  arrAirport: yup
    .string()
    .matches(/^[a-zA-Z]{0,3}$/, "Airport Code must be three letters")
    .required("Please enter a valid Arrival Airport."),
  numPass: yup
    .number()
    .typeError("Please enter a valid Number of Passengers.")
    .min(0, "The Number of passengers must be a positive number")
    .max(400, "The number of passengers cannot exceed 400")
    .required(),
  passLimit: yup
    .number()
    .typeError("Please enter a valid Passenger Limit")
    .min(1, "The Passenger limit must be greater than 0")
    .max(400, "The Passenger Limit cannot exceed 400")
    .moreThan(
      yup.ref("numPass"),
      "Number of passengers must be less than the limit"
    )
    .required(),
});

export const AddFlight = () => {
  let dialogDupFlightNum;

  const [dupCheck, setDupCheck] = useState(false); //duplicate flight number checker

  // use to navigate back to homepage on submit
  const navigate = useNavigate();

  // Create the hook for react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const flightNumberRef = useRef();
  const departureDateRef = useRef();
  const arrivalDateRef = useRef();
  const departureTimeRef = useRef();
  const arrivalTimeRef = useRef();
  const departureAirportRef = useRef();
  const arrivalAirportRef = useRef();
  const numPassengersRef = useRef();
  const passengerLimitRef = useRef();

  // create ref but without using already assigned ref .
  const flightNumberReg = register("flightNum");
  const depDateReg = register("depDate");
  const arrDateReg = register("arrDate");
  const depTimeReg = register("depTime");
  const arrTimeReg = register("arrTime");
  const depAirportReg = register("depAirport");
  const arrAirportReg = register("arrAirport");
  const numPassReg = register("numPass");
  const passLimitReg = register("passLimit");

  // If the flight number is already in the DB, call the error dialog box to inform user
  if (dupCheck === true) {
    dialogDupFlightNum = (
      <DialogBoxx setDupCheck={setDupCheck} dupCheck={dupCheck}></DialogBoxx>
    );
  }

  //function to pull the input refs from the users entry and add them to the DB
  const useSubmit = async () => {
    try {
      await axios.post("http://localhost:8085/flights", {
        // Must use exact name to link with the DB
        flightNumber: flightNumberRef.current.value,
        departureDate: departureDateRef.current.value,
        arrivalDate: arrivalDateRef.current.value,
        departureTime: departureTimeRef.current.value,
        arrivalTime: arrivalTimeRef.current.value,
        departureAirport: departureAirportRef.current.value,
        arrivalAirport: arrivalAirportRef.current.value,
        currentNumOfPassengers: numPassengersRef.current.value,
        passengerLimit: passengerLimitRef.current.value,
      });

      navigate("../", { replace: true });
    } catch (err) {
      // if the flight number already exists, setDupCheck to call dialog box
      if (err.message.indexOf("0") !== 1) {
        setDupCheck(true);
      }
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  return (
    <>
      {dialogDupFlightNum}
      <div>
        <div style={{ margin: 45 }}>
          <Paper elevation={24}>
            <Center>
              <form className="myForm" onSubmit={handleSubmit(useSubmit)}>
                <Center>
                  <h1 style={{ color: "#FFAC42" }}>Create Flight</h1>
                </Center>
                <div>
                  <TextField
                    sx={{ width: 350, paddingBottom: 3 }}
                    id="flightNumber"
                    name="flightNum"
                    label="Flight Number"
                    variant="outlined"
                    color="primary"
                    error={errors.flightNum?.message}
                    helperText={errors.flightNum?.message}
                    {...flightNumberReg}
                    inputRef={(e) => {
                      flightNumberReg.ref(e);
                      flightNumberRef.current = e;
                    }}
                  ></TextField>
                </div>

                <div>
                  <TextField
                    sx={{ width: 350, paddingBottom: 3 }}
                    id="date"
                    label="Departure Date"
                    type="date"
                    name="depDate"
                    defaultValue={materialDateInput} // Today's Date being used as default
                    error={errors.depDate?.message}
                    helperText={errors.depDate?.message}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    {...depDateReg}
                    inputRef={(e) => {
                      depDateReg.ref(e);
                      departureDateRef.current = e;
                    }}
                  />
                </div>

                <div>
                  <TextField
                    sx={{ width: 350, paddingBottom: 3 }}
                    id="date"
                    label="Arrival Date"
                    type="date"
                    name="arrDate"
                    defaultValue={materialDateInput} // Today's Date being used as default
                    error={errors.arrDate?.message}
                    helperText={errors.arrDate?.message}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    {...arrDateReg}
                    inputRef={(e) => {
                      arrDateReg.ref(e);
                      arrivalDateRef.current = e;
                    }}
                  />
                </div>

                <div>
                  <TextField
                    sx={{ width: 350, paddingBottom: 3 }}
                    id="departureTime"
                    name="depTime"
                    label="Departure Time"
                    type="time"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={errors.depTime?.message}
                    helperText={errors.depTime?.message}
                    {...depTimeReg}
                    inputRef={(e) => {
                      depTimeReg.ref(e);
                      departureTimeRef.current = e;
                    }}
                  />
                </div>

                <div>
                  <TextField
                    sx={{ width: 350, paddingBottom: 3 }}
                    id="arrivalTime"
                    name="arrTime"
                    label="Arrival Time"
                    type="time"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={errors.arrTime?.message}
                    helperText={errors.arrTime?.message}
                    {...arrTimeReg}
                    inputRef={(e) => {
                      arrTimeReg.ref(e);
                      arrivalTimeRef.current = e;
                    }}
                  />
                </div>

                <div>
                  <TextField
                    sx={{ width: 350, paddingBottom: 3 }}
                    id="departureAirport"
                    name="depAirport"
                    label="Departure Airport"
                    variant="outlined"
                    color="primary"
                    error={errors.depAirport?.message}
                    helperText={errors.depAirport?.message}
                    {...depAirportReg}
                    inputRef={(e) => {
                      depAirportReg.ref(e);
                      departureAirportRef.current = e;
                    }}
                  ></TextField>
                </div>

                <div>
                  <TextField
                    sx={{ width: 350, paddingBottom: 3 }}
                    id="arrivalAirport"
                    name="arrAirport"
                    label="Arrival Airport"
                    variant="outlined"
                    color="primary"
                    error={errors.arrAirport?.message}
                    helperText={errors.arrAirport?.message}
                    {...arrAirportReg}
                    inputRef={(e) => {
                      arrAirportReg.ref(e);
                      arrivalAirportRef.current = e;
                    }}
                  ></TextField>
                </div>

                <div>
                  <TextField
                    sx={{ width: 350, paddingBottom: 3 }}
                    id="numPassengers"
                    name="numPass"
                    label="Number of Passengers"
                    variant="outlined"
                    color="primary"
                    error={errors.numPass?.message}
                    helperText={errors.numPass?.message}
                    {...numPassReg}
                    inputRef={(e) => {
                      numPassReg.ref(e);
                      numPassengersRef.current = e;
                    }}
                  ></TextField>
                </div>

                <div>
                  <TextField
                    sx={{ width: 350, paddingBottom: 3 }}
                    id="passengerLimit"
                    name="passLimit"
                    label="Passenger Limit"
                    variant="outlined"
                    color="primary"
                    error={errors.passLimit?.message}
                    helperText={errors.passLimit?.message}
                    {...passLimitReg}
                    inputRef={(e) => {
                      passLimitReg.ref(e);
                      passengerLimitRef.current = e;
                    }}
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
                  >
                    Create Flight
                  </Button>
                </Center>
              </form>
            </Center>
          </Paper>
        </div>
      </div>
    </>
  );
};
