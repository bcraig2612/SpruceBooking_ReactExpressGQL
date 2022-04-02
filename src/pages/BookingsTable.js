import React from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useBookings } from "../hooks/useBookings";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#D8D8D8",
    color: "#404040",
    fontSize: "0.950rem",
    fontWeight: 500,
    textAlign: "left",
    padding: "4px 12px",
    "&:last-of-type": {
      textAlign: "right",
    },
  },
  [`&.${tableCellClasses.body}`]: {
    backgroundColor: "#F5F5F5",
    color: "#404040",
    fontWeight: 500,
    textAlign: "left",
    padding: "5px 12px",
    whiteSpace: "break-spaces",
    verticalAlign: "top",
    "&:last-of-type": {
      textAlign: "right",
    },
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: "#F5F5F5",
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function BookingsTable() {
  const { error, loading, data } = useBookings();

  if (error) {
    return (
      <>
        <Alert severity="error" sx={{ justifyContent: "center" }}>
          Something went wrong...
        </Alert>
      </>
    );
  }

  if (loading) {
    return (
      <Box sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <CircularProgress sx={{ color: "#254442" }} />
      </Box>
    );
  }

  return (
    <>
      <Box id="tableContainer">
        <TableContainer component={Paper} elevation={0}>
          <Table sx={{ minWidth: "100%" }} aria-label="bookings table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Customer</StyledTableCell>
                <StyledTableCell align="right">Email</StyledTableCell>
                <StyledTableCell align="right">Address</StyledTableCell>
                <StyledTableCell align="right">
                  Booking&nbsp;Type
                </StyledTableCell>
                <StyledTableCell align="right">
                  Booking&nbsp;Date/Time
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.bookings.bookings.map((booking) => (
                <StyledTableRow key={booking.id}>
                  <StyledTableCell>{booking.name}</StyledTableCell>
                  <StyledTableCell>{booking.email}</StyledTableCell>
                  <StyledTableCell>{booking.address.slice(0,booking.address.indexOf(',',booking.address.indexOf(',')+1))}</StyledTableCell>
                  <StyledTableCell>{booking.type.replace(/([A-Z])/g, ' $1').trim()}</StyledTableCell>
                  <StyledTableCell>{booking.serviceDate}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
