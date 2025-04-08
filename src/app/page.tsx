"use client";
import { useEffect, useMemo, useReducer } from "react";
import {
  Box,
  Card,
  Fade,
  InputAdornment,
  TextField,
  Typography,
  Zoom,
} from "@mui/material";
import React from "react";
import Image from "next/image";
import { DataGrid, useGridApiRef } from "@mui/x-data-grid";
import { columns } from "@/app/config/dataGridColumns";
import { useFetchAdvocates } from "../app/queries/advocates";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSpinner } from "@fortawesome/free-solid-svg-icons";
import DataGridToolBar from "@/app/components/DataGridToolBar";

interface InitialState {
  searchTerm: string;
  filteredData: any[];
}

const reducer = (
  state: InitialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case "SET_SEARCH_TERM":
      return { ...state, searchTerm: action.payload };
    case "SET_FILTERED_DATA":
      return { ...state, filteredData: action.payload };
    default:
      return state;
  }
};

const initialState = {
  searchTerm: "",
  filteredData: [],
};

export default function Home() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const apiRef = useGridApiRef();
  const { data, isLoading } = useFetchAdvocates({
    queryKey: ["advocates"],
    refetchOnWindowFocus: false,
    enabled: true,
  });

  const filteredData = useMemo(() => {
    return data
      ? data.filter((advocate) => {
          const searchString = `${advocate.firstName} ${advocate.lastName} ${
            advocate.city
          } ${advocate.degree} ${advocate.specialties.join(" ")} ${
            advocate.yearsOfExperience
          } ${advocate.phoneNumber}`;
          return searchString
            .toLowerCase()
            .includes(state.searchTerm.toLowerCase());
        })
      : [];
  }, [data, state.searchTerm]);

  useEffect(() => {
    if (data) {
      dispatch({ type: "SET_FILTERED_DATA", payload: filteredData });
    }
  }, [data, state.searchTerm]);

  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      padding={1}
    >
      <Fade in={true} timeout={400}>
        <Box
          height="4rem"
          width="50%"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginTop="2rem"
          sx={{
            borderRadius: "1rem",
            boxShadow: "0 20px 20px -5px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box paddingLeft="0.8rem">
            <Image
              src="/solace-white.png"
              alt="Solace"
              width="100"
              height="180"
            />
          </Box>
          <Box display="flex" paddingRight="1rem" width="16rem">
            {data && (
              <Fade in={true} timeout={400}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="e.g. John, New York, MD"
                  onChange={(e) =>
                    dispatch({
                      type: "SET_SEARCH_TERM",
                      payload: e.target.value,
                    })
                  }
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      height: "2.5rem",
                      borderRadius: "10px",
                      "& fieldset": {
                        borderColor: "grey",
                      },
                      "&:hover fieldset": {
                        borderColor: "#265b4e",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#265b4e",
                      },
                    },
                  }}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <FontAwesomeIcon
                            icon={faSearch}
                            style={{ fontSize: "0.8rem" }}
                          />
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </Fade>
            )}
          </Box>
        </Box>
      </Fade>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="auto"
        width="90%"
        paddingTop="2rem"
      >
        {!isLoading && state.filteredData.length ? (
          <Zoom in={true} timeout={400}>
            <Box
              display="flex"
              flexDirection="column"
              height="100%"
              width="100%"
            >
              <DataGridToolBar apiRef={apiRef} />
              <Card sx={{ height: "100%", width: "100%", overflow: "auto" }}>
                <DataGrid
                  apiRef={apiRef}
                  rows={state.filteredData}
                  columns={columns}
                  initialState={{
                    columns: {
                      columnVisibilityModel: {
                        id: false,
                      },
                    },
                  }}
                  sx={{
                    height: "35rem",
                  }}
                />
              </Card>
            </Box>
          </Zoom>
        ) : !isLoading && !state.filteredData.length ? (
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            height="30rem"
          >
            <Fade in={true} timeout={400}>
              <Typography variant="h5" color="#265b4e">
                Oh no! No advocates found.
              </Typography>
            </Fade>
          </Box>
        ) : (
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            height="30rem"
          >
            <Box display="flex" paddingLeft="0.8rem" paddingBottom="1rem">
              <Image
                src="/solace-motto.png"
                alt="Solace"
                width="325"
                height="180"
              />
            </Box>
            <Box display="flex" height="5rem">
              <FontAwesomeIcon
                icon={faSpinner}
                spin
                size="2x"
                color="#265b4e"
              />
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}
