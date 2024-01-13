import React from "react";

import { Draggable } from "react-beautiful-dnd";
import { Box } from "@mui/material";

const Task = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <Box
          sx={{
            border: "2px solid grey",
            borderRadius: "10px",
            height: "100px",
            padding: "0 10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            textAlign: "center",
            backgroundColor: "background.default",
            color: "text.secondary",
          }}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {task?.content}
        </Box>
      )}
    </Draggable>
  );
};

export default Task;
