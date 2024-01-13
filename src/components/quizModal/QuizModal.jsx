import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "25%",
  bgcolor: "background.paper",
  border: "2px solid darkblue",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
  color: "blue",
};

const QuizModal = ({ open, handleClose, countRight, list }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Quiz finished!
        </Typography>
        <Typography
          id="modal-modal-description"
          sx={{
            mt: 2,
            color: countRight / list.length >= 0.5 ? "green" : "red",
          }}
        >
          Accuracy {(countRight / list.length) * 100}%
        </Typography>
        <Button
          onClick={handleClose}
          sx={{ display: "block", margin: "0 auto" }}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default QuizModal;
