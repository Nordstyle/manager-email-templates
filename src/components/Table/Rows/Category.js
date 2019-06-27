import React from "react";
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import Edit from "@material-ui/icons/Edit";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Tooltip from "@material-ui/core/Tooltip";
import TooltipAlert from "../TooltipAlert";
import TableRow from "@material-ui/core/TableRow";
import DeleteForever from "@material-ui/icons/DeleteForever";


const Category = props => {
  const { row, hasDeps, modalHandler, setOpenTooltip, openTooltip, deleteMethod } = props;
  return (
    <TableRow hover key={row.id}>
      <TableCell>{row.id}</TableCell>
      <TableCell scope="row" padding="none">
        {row.title}
      </TableCell>
      <TableCell align="right">{row.parent}</TableCell>
      <TableCell align="right">{row.children}</TableCell>
      <TableCell align={"right"}>
        <IconButton
          onClick={() =>
            modalHandler({
              type: "open",
              effect: "update",
              payload: { id: row.id, title: row.title, parent: row.parent }
            })
          }
        >
          <Edit />
        </IconButton>
        <ClickAwayListener
          onClickAway={() => setOpenTooltip({ type: "close" })}
        >
          <span>
            <Tooltip
              PopperProps={{
                disablePortal: true
              }}
              onClose={() => setOpenTooltip({ type: "close" })}
              open={openTooltip.openId === row.id}
              disableFocusListener
              disableHoverListener
              disableTouchListener
              interactive
              title={
                <>
                  <TooltipAlert
                    id={row.id}
                    deleteMethod={deleteMethod}
                    setOpenTooltip={setOpenTooltip}
                  />
                </>
              }
            >
              <IconButton
                onClick={() =>
                  hasDeps
                    ? setOpenTooltip({ type: "open", openId: row.id })
                    : deleteMethod({ id: row.id })
                }
              >
                <DeleteForever />
              </IconButton>
            </Tooltip>
          </span>
        </ClickAwayListener>
      </TableCell>
    </TableRow>
  );
};

export default Category;
