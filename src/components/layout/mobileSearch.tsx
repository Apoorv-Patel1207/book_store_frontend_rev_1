import React, { useState } from "react";

import SearchIcon from "@mui/icons-material/Search";
import { IconButton, Popover } from "@mui/material";

import Search from "./search";

const MobileSearch = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton color="inherit" onClick={handleOpenPopover}>
        <SearchIcon />
      </IconButton>
      <Popover
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        onClose={handleClosePopover}
        open={Boolean(anchorEl)}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Search isMobile />
      </Popover>
    </>
  );
};

export default MobileSearch;
