import { Button } from "@mui/material";

const ButtonCheckAnswer = ({ handleCheck }) => {
  return (
    <Button
      sx={{ mt: 1, width: "200px" }}
      type="submit"
      variant="outlined"
      onClick={handleCheck}
    >
      Check Answer
    </Button>
  );
};

export default ButtonCheckAnswer;
