import { useRef } from "react";
import axios from "axios";
import { Center } from "../components/styles";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField, Paper, Box, Button } from "@mui/material";
import { FormBox } from "../components/inputForms/FormBox";
import { useLocation } from "react-router-dom";

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

export const UpdateFlight = () => {
  // use to navigate back to homepage on submit
  const navigate = useNavigate();

  const location = useLocation();

  //unpack the flight data that was passed when the edit flight button was clicked and navigates user to another page
  const flightData = { ...location.state };

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

  // Function to update the flight in the DB, based on the user entry in the form
  const useSubmit = async () => {
    try {
      await axios.put("http://localhost:8085/flights", {
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

      navigate("../", { replace: true }); //navigate the user back to the homePage onSubmit
    } catch (err) {
      console.log("Something went wrong");
      console.error(err);
    }
  };

  return (
    <div style={{ margin: 45 }}>
      <Paper elevation={24}>
        <Center>
          <form className="myForm" onSubmit={handleSubmit(useSubmit)}>
            <Center>
              <h1 style={{ color: "#FFAC42" }}>Update Flight</h1>
            </Center>
            <div>
              <TextField
                sx={{ width: 350, paddingBottom: 3 }}
                id="flightNumber"
                name="flightNum"
                label="Flight Number"
                defaultValue={
                  flightData.flight?.flightNumber === undefined
                    ? ""
                    : flightData.flight?.flightNumber
                }
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
                defaultValue={
                  flightData.flight?.departureDate === undefined
                    ? ""
                    : flightData.flight?.departureDate
                }
                type="date"
                name="depDate"
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
                defaultValue={
                  flightData.flight?.arrivalDate === undefined
                    ? ""
                    : flightData.flight?.arrivalDate
                }
                type="date"
                name="arrDate"
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
                defaultValue={
                  flightData.flight?.departureTime === undefined
                    ? ""
                    : flightData.flight?.departureTime
                }
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
                defaultValue={
                  flightData.flight?.arrivalTime === undefined
                    ? ""
                    : flightData.flight?.arrivalTime
                }
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
                defaultValue={
                  flightData.flight?.departureAirport === undefined
                    ? ""
                    : flightData.flight?.departureAirport
                }
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
                defaultValue={
                  flightData.flight?.arrivalAirport === undefined
                    ? ""
                    : flightData.flight?.arrivalAirport
                }
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
                defaultValue={
                  flightData.flight?.currentNumOfPassengers === undefined
                    ? ""
                    : flightData.flight?.currentNumOfPassengers
                }
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
                defaultValue={
                  flightData.flight?.passengerLimit === undefined
                    ? ""
                    : flightData.flight?.passengerLimit
                }
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
                Update Flight
              </Button>
            </Center>
          </form>
        </Center>
      </Paper>
    </div>
  );
};
