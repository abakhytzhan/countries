import { Button } from "@mui/material";

const ButtonTryAgain = ({ handleQuiz, list }) => {
  return (
    <Button
      sx={{ mt: 1, width: "200px", background: "green" }}
      type="button"
      variant="contained"
      onClick={() => handleQuiz(list.length)}
    >
      Try again
    </Button>
  );
};

export default ButtonTryAgain;
