import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@material-ui/core/IconButton";

export const EditFlight = ({ flight }) => {
  const navigate = useNavigate();

  const handleEdit = async () => {
    navigate("/UpdateFlight", { state: { flight } });
  };

  return (
    <IconButton
      style={{
        color: "#ff7f50",
      }}
    >
      <EditIcon fontSize="10px" sx={{ margin: 1 }} onClick={handleEdit} />
    </IconButton>
  );
};
