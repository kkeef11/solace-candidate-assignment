"use client";
import { faColumns, faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button } from "@mui/material";
import {
  gridPreferencePanelStateSelector,
  GridPreferencePanelsValue,
} from "@mui/x-data-grid";
import { GridApiCommunity } from "@mui/x-data-grid/internals";
import { useCallback } from "react";

interface ExternalToolbarControlsProps {
  apiRef: React.MutableRefObject<GridApiCommunity>;
}

export default function ExternalToolbarControls({
  apiRef,
}: ExternalToolbarControlsProps) {
  const handleToggleColumn = useCallback(() => {
    const preferencePanel = gridPreferencePanelStateSelector(
      apiRef.current.state
    );
    if (preferencePanel.open) {
      apiRef.current.hidePreferences();
    } else {
      apiRef.current.showPreferences(GridPreferencePanelsValue.columns);
    }
  }, [apiRef]);

  const handleToggleFilter = useCallback(() => {
    apiRef.current.showFilterPanel();
  }, [apiRef]);

  return (
    <Box display="flex" justifyContent="flex-end">
      <Button
        startIcon={
          <FontAwesomeIcon icon={faColumns} style={{ fontSize: "0.8rem" }} />
        }
        sx={{
          color: "#767676",
          paddingBottom: "0.1rem",
          fontSize: "0.9rem",
          textTransform: "none",
        }}
        onClick={handleToggleColumn}
        title="Columns"
      >
        Columns
      </Button>
      <Button
        startIcon={
          <FontAwesomeIcon icon={faFilter} style={{ fontSize: "0.8rem" }} />
        }
        sx={{
          color: "#767676",
          paddingBottom: "0.1rem",
          fontSize: "0.9rem",
          textTransform: "none",
        }}
        onClick={handleToggleFilter}
        title="Filters"
      >
        Filters
      </Button>
    </Box>
  );
}
