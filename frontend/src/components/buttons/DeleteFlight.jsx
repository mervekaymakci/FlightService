import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@material-ui/core/IconButton";
import axios from "axios";

export const DeleteFlight = ({ flight, flightInfo }) => {
  // Function to delete the specific flight number onClick
  const handleDelete = async () => {
    try {
      // use the flight number from the current clicked button to delete the flight
      await axios.delete(
        `http://localhost:8085/flights/${flight.flightNumber}`
      );

      // use to refresh just the component when deleted instead of the entire page
      // destructure out to pass the get all method into it in Home.jsx
      // That way each time the delete is pressed the parent re-renders as well
      flightInfo();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <IconButton
      style={{
        color: "#ff7f50",
      }}
    >
      <DeleteIcon fontSize="10px" sx={{ margin: 1 }} onClick={handleDelete} />
    </IconButton>
  );
};
