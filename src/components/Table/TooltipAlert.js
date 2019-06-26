import React from "react";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

const TooltipAlert = props => {
  const { setOpenTooltip, deleteMethod, id } = props;
  return (
    <div>
      <Typography>
        This category has dependencies, do you really want to delete it?
      </Typography>
      <ButtonGroup size={"small"} color={"primary"} variant={"contained"}>
        <Button onClick={() => setOpenTooltip({ type: "close" })}> No </Button>
        <Button onClick={() => deleteMethod({ id })}> Yes </Button>
      </ButtonGroup>
    </div>
  );
};

export default TooltipAlert;
