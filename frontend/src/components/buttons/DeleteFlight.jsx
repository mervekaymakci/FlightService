import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@material-ui/core/IconButton";
import axios from "axios";

export const DeleteFlight = ({ flight, flightInfo }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:8085/flights/${flight.flightNumber}`
      );
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
