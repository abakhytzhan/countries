import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button";
import ButtonTryAgain from "../buttons/ButtonTryAgain";
import ButtonNextQuestion from "../buttons/ButtonNextQuestion";

import ScoreCounter from "../scoreCounter/ScoreCounter";
import QuizModal from "../quizModal/QuizModal";

const CountryQuiz = ({ data, list, handleQuiz }) => {
  const [total, setTotal] = React.useState();
  const [countRight, setCountRight] = React.useState();
  const [countWrong, setCountWrong] = React.useState();
  const [next, setNext] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState("Choose wisely");
  const [index, setIndex] = React.useState();
  const [value1, setValue1] = React.useState();
  const [value2, setValue2] = React.useState();
  const [value3, setValue3] = React.useState();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [countriesList1, setCountriesList1] = React.useState([...list]);
  React.useEffect(() => {
    setCountriesList1([...list]);
    setTotal(0);
    setCountRight(0);
    setCountWrong(0);
    setNext(false);
    setHelperText("Choose wisely");
    setError(false);
    setValue("");
  }, [list]);

  React.useEffect(() => {
    const index1 = Math.floor(Math.random() * countriesList1.length);
    let index2 = -1,
      index3 = -1;
    index2 = getIndex();
    index3 = getIndex();

    const rnd = Math.floor(Math.random() * 3);
    setIndex(index1);
    if (rnd === 0) {
      setValue1(countriesList1[index1].name.common);
      setValue2(data[index2].name.common);
      setValue3(data[index3].name.common);
    } else if (rnd === 1) {
      setValue1(data[index2].name.common);
      setValue2(data[index3].name.common);
      setValue3(countriesList1[index1].name.common);
    } else {
      setValue1(data[index2].name.common);
      setValue2(countriesList1[index1].name.common);
      setValue3(data[index3].name.common);
    }

    function getIndex() {
      const ind = Math.floor(Math.random() * data.length);
      if (
        data[ind].name.common === countriesList1[index1]?.name.common ||
        ind === index2
      ) {
        return getIndex();
      }
      return ind;
    }
  }, [countriesList1, data]);

  const handleRadioChange = (event) => {
    setValue(event.target.value);

    setError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!value) {
      setHelperText("Please select an option.");
      setError(true);
    } else if (value === countriesList1[index].name.common) {
      setCountRight((prev) => prev + 1);
      setTotal((prev) => prev + 1);
      setHelperText("Well done!");
      setError(false);
      setNext(true);
    } else {
      setCountWrong((prev) => prev + 1);
      setTotal((prev) => prev + 1);
      setHelperText(
        `Sorry, right answer: ${countriesList1[index].name.common}!`
      );
      setError(true);
      setNext(true);
    }

    if (total === list.length - 1) {
      handleOpen();
    }
  };

  const handleNext = () => {
    setNext(false);
    setValue("");
    setCountriesList1((prev) => [
      ...prev.slice(0, index),
      ...prev.slice(index + 1, prev.length),
    ]);
    setIndex("");
    setHelperText(" ");
  };

  return (
    <>
      <ScoreCounter
        list={list}
        total={total}
        countRight={countRight}
        countWrong={countWrong}
      />
      <div className="quiz">
        <img
          src={countriesList1[index]?.flags.png}
          alt="Country flag"
          style={{
            border: "2px solid gray",
            minWidth: "50%",
          }}
        />

        <form onSubmit={handleSubmit} style={{ minWidth: "50%" }}>
          <FormControl sx={{ m: 3 }} error={error} variant="standard">
            <RadioGroup name="quiz" value={value} onChange={handleRadioChange}>
              <FormControlLabel
                sx={{
                  width: "100%",
                  minHeight: "auto",
                  borderRadius: "10px",

                  ":hover": {
                    background: "rgba(25, 118, 210, 0.2)",
                    transition: "0.2s",
                  },
                  cursor: "pointer",
                }}
                value={value1}
                control={<Radio />}
                label={value1}
                disabled={next}
              />
              <FormControlLabel
                sx={{
                  width: "100%",
                  MinHeight: "auto",
                  borderRadius: "10px",

                  ":hover": {
                    background: "rgba(25, 118, 210, 0.2)",
                    transition: "0.2s",
                  },
                  cursor: "pointer",
                }}
                value={value2}
                control={<Radio />}
                label={value2}
                disabled={next}
              />
              <FormControlLabel
                sx={{
                  width: "100%",
                  minHeight: "auto",
                  borderRadius: "10px",

                  ":hover": {
                    background: "rgba(25, 118, 210, 0.2)",
                    transition: "0.2s",
                  },
                  cursor: "pointer",
                }}
                value={value3}
                control={<Radio />}
                label={value3}
                disabled={next}
              />
            </RadioGroup>
            <FormHelperText sx={{ fontSize: "14px" }}>
              {helperText}
            </FormHelperText>
            {countriesList1.length > 1 && next && (
              <ButtonNextQuestion handleNext={handleNext} />
            )}
            {countriesList1.length > 0 && !next && (
              <Button
                sx={{ mt: 1, width: "200px" }}
                type="submit"
                variant="outlined"
              >
                Check Answer
              </Button>
            )}
            {total === list.length && (
              <ButtonTryAgain handleQuiz={handleQuiz} list={list} />
            )}
          </FormControl>
        </form>
      </div>
      <QuizModal
        open={open}
        handleClose={handleClose}
        countRight={countRight}
        list={list}
      />
    </>
  );
};

export default CountryQuiz;
