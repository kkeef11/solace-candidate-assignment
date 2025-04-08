import { GridColDef } from "@mui/x-data-grid";

export const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "firstName", headerName: "First Name", width: 150 },
  { field: "lastName", headerName: "Last Name", width: 150 },
  { field: "city", headerName: "City", width: 150 },
  { field: "degree", headerName: "Degree", width: 150 },
  {
    field: "specialties",
    headerName: "Specialties",
    width: 300,
    renderCell: (params) => params.value.join(", "),
  },
  {
    field: "yearsOfExperience",
    headerName: "Years of Experience",
    type: "number",
    width: 200,
  },
  {
    field: "phoneNumber",
    headerName: "Phone Number",
    type: "string",
    width: 200,
  },
];
