import React from "react";
import {
  FormControlLabel,
  Checkbox,
  IconButton,
  Icon
} from "@material-ui/core";
import { isMobile } from "utils";

const InboxTopBar = ({
  toggleSidenav,
  handleMasterCheckbox,
  masterCheckbox
}) => {
  return (
    <div className="inbox__topbar py-1 mx-1 flex items-center position-relative bg-primary">
      {isMobile() && (
        <IconButton onClick={toggleSidenav}>
          <Icon>short_text</Icon>
        </IconButton>
      )}
      <FormControlLabel
        className="text-white ml-4"
        control={
          <Checkbox
            checked={masterCheckbox}
            onChange={handleMasterCheckbox}
            color="secondary"
          />
        }
        label="All"
      />
      <IconButton>
        <Icon className="text-white">delete</Icon>
      </IconButton>
      <IconButton>
        <Icon className="text-white">folder_special</Icon>
      </IconButton>
      <IconButton>
        <Icon className="text-white">archive</Icon>
      </IconButton>
      <IconButton>
        <Icon className="text-white">error</Icon>
      </IconButton>
    </div>
  );
};

export default InboxTopBar;
