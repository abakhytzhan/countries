import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const Result = ({ handleButton, name }) => {
  const quizes = ["10", "20", "50", "100", "All"];
  return (
    <Stack
      spacing={{ xs: 0.2, sm: 1, md: 2 }}
      direction="row"
      justifyContent="center"
      mb={{ xs: 1, md: 2 }}
      mr={0.5}
      ml={0.5}
    >
      {quizes.map((quiz) => {
        return (
          <Button
            variant="contained"
            key={quiz}
            onClick={() => handleButton(quiz)}
          >
            {name}
            <span>{quiz}</span>
          </Button>
        );
      })}
    </Stack>
  );
};

export default Result;
