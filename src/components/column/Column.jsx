import React from "react";
import { useEffect, useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import Task from "../task/Task";
import { Box } from "@mui/material";

class InnerList extends React.Component {
  shouldComponentUpdate(nextProps) {
    if (nextProps.tasks === this.props.tasks) {
      return false;
    }
    return true;
  }
  render() {
    return this.props.tasks.map((task, index) => (
      <Task key={task.id} task={task} index={index} />
    ));
  }
}

const Column = ({ column, tasks, index }) => {
  return (
    <div style={{ width: "100%" }}>
      <StrictModeDroppable droppableId={column.id} index={index}>
        {(provided) => (
          <Box
            sx={{
              height: "330px",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <InnerList tasks={tasks} />
            {provided.placeholder}
          </Box>
        )}
      </StrictModeDroppable>
    </div>
  );
};

const StrictModeDroppable = ({ children, ...props }) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return <Droppable {...props}>{children}</Droppable>;
};

export default Column;
