import * as React from "react";
import { useState } from "react";
import ScoreCounter from "../scoreCounter/ScoreCounter";
import { DragDropContext } from "react-beautiful-dnd";
import { initialData } from "../../initial-data";
import Column from "../column/Column";
import { Stack } from "@mui/material";
import QuizModal from "../quizModal/QuizModal";
import FormHelperText from "@mui/material/FormHelperText";
import ButtonCheckAnswer from "../buttons/ButtonCheckAnswer";
import ButtonNextQuestion from "../buttons/ButtonNextQuestion";
import ButtonTryAgain from "../buttons/ButtonTryAgain";

class InnerList extends React.Component {
  shouldComponentUpdate(nextProps) {
    if (
      nextProps.column === this.props.column &&
      nextProps.taskMap === this.props.taskMap &&
      nextProps.index === this.props.index
    ) {
      return false;
    }
    return true;
  }
  render() {
    const { column, taskMap, index } = this.props;
    const tasks = column.taskIds.map((taskId) => taskMap[taskId]);
    return <Column column={column} tasks={tasks} index={index} />;
  }
}

const CountryDnD = ({ data, list, handleQuiz }) => {
  const [total, setTotal] = React.useState(0);
  const [countRight, setCountRight] = React.useState(0);
  const [countWrong, setCountWrong] = React.useState(0);
  const [next, setNext] = React.useState(false);
  const [index, setIndex] = React.useState();

  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState("Choose wisely");
  const [open, setOpen] = React.useState(false);

  const [value1, setValue1] = React.useState();
  const [value2, setValue2] = React.useState();
  const [value3, setValue3] = React.useState();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [countriesList1, setCountriesList1] = React.useState([...list]);
  const [state, setState] = useState(initialData);

  React.useEffect(() => {
    setCountriesList1([...list]);
    setTotal(0);
    setCountRight(0);
    setCountWrong(0);
    setNext(false);
    setHelperText("Choose wisely");
    setError(false);
  }, [list]);

  React.useEffect(() => {
    const index1 = Math.floor(Math.random() * countriesList1.length);
    let index2 = -1,
      index3 = -1;
    index2 = getIndex();
    index3 = getIndex();
    setValue1(index1);
    setValue2(index2);
    setValue3(index3);

    const rnd = Math.floor(Math.random() * 3);
    setIndex(index1);
    if (rnd === 0) {
      setState({
        ...state,
        tasks: {
          "task-1": {
            id: "task-1",
            content: data[index3].name.common,
          },
          "task-2": {
            id: "task-2",
            content: data[index2].name.common,
          },
          "task-3": {
            id: "task-3",
            content: countriesList1[index1].name.common,
          },
        },
      });
    } else if (rnd === 1) {
      setState({
        ...state,
        tasks: {
          "task-1": {
            id: "task-1",
            content: data[index2].name.common,
          },
          "task-2": {
            id: "task-2",
            content: data[index3].name.common,
          },
          "task-3": {
            id: "task-3",
            content: countriesList1[index1].name.common,
          },
        },
      });
    } else {
      setState({
        ...state,
        tasks: {
          "task-1": {
            id: "task-1",
            content: data[index2].name.common,
          },
          "task-2": {
            id: "task-2",
            content: countriesList1[index1].name.common,
          },
          "task-3": {
            id: "task-3",
            content: data[index3].name.common,
          },
        },
      });
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

  function onDragEnd(result) {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const column = state.columns[source.droppableId];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...column,
      taskIds: newTaskIds,
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newColumn.id]: newColumn,
      },
    };

    setState(newState);
  }

  const handleCheck = () => {
    const arr1 = [
      countriesList1[value1].name.common,
      data[value2].name.common,
      data[value3].name.common,
    ];
    const arr2 = [
      state.tasks[state.columns["column-1"].taskIds[0]].content,
      state.tasks[state.columns["column-1"].taskIds[1]].content,
      state.tasks[state.columns["column-1"].taskIds[2]].content,
    ];

    if (arr1.toString() === arr2.toString()) {
      setCountRight((prev) => prev + 1);
      setHelperText("Well done!");
    } else {
      setCountWrong((prev) => prev + 1);
      setHelperText("Sorry, wrong answer.");
      setError(true);
    }
    setTotal((prev) => prev + 1);
    setNext(true);

    if (total === list.length - 1) {
      handleOpen();
    }
  };

  const handleNext = () => {
    setNext(false);
    setCountriesList1((prev) => [
      ...prev.slice(0, index),
      ...prev.slice(index + 1, prev.length),
    ]);
    setHelperText(" ");
    setError(false);
  };

  return (
    <>
      <ScoreCounter
        list={list}
        total={total}
        countRight={countRight}
        countWrong={countWrong}
      />
      <div className="dnd">
        <div className="dnd-column">
          <Stack
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "330px",
              width: "100%",
            }}
          >
            <img src={countriesList1[value1]?.flags.png} alt="Country flag-1" />
            <img src={data[value2]?.flags.png} alt="Country flag-2" />
            <img src={data[value3]?.flags.png} alt="Country flag-3" />
          </Stack>
        </div>

        <div className="dnd-column">
          <DragDropContext onDragEnd={onDragEnd}>
            {state.columnOrder.map((columnId) => {
              const column = state.columns[columnId];
              return (
                <InnerList
                  key={column.id}
                  column={column}
                  index={index}
                  taskMap={state.tasks}
                />
              );
            })}
          </DragDropContext>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <FormHelperText
          sx={{
            fontSize: "14px",
            color: error ? "red" : "rgba(25, 118, 210, 1)",
          }}
        >
          {helperText}
        </FormHelperText>
        {countriesList1.length > 1 && next && (
          <ButtonNextQuestion handleNext={handleNext} />
        )}
        {countriesList1.length > 0 && !next && (
          <ButtonCheckAnswer handleCheck={handleCheck} />
        )}
        {total === list.length && (
          <ButtonTryAgain handleQuiz={handleQuiz} list={list} />
        )}
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

export default CountryDnD;
