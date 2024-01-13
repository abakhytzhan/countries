import { Button } from "@mui/material";

const ButtonNextQuestion = ({ handleNext }) => {
  return (
    <Button
      onClick={handleNext}
      sx={{
        mt: 1,
        width: "200px",
        color: "green",
        borderColor: "green",
        ":hover": {
          borderColor: "green",
        },
      }}
      type="button"
      variant="outlined"
    >
      Next question
    </Button>
  );
};

export default ButtonNextQuestion;
