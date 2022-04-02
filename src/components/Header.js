import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { ReactComponent as SpruceLogo } from "../assets/spruce-logo.svg";
import { CREATE_BOOKING } from "../hooks/useCreateBooking";
import "./css/Header.css";
import { useMutation } from "@apollo/client";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  minWidth: "200px",
  maxWidth: "700px",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 12,
  p: 1,
};

export default function TopAppBar() {
  const [createBooking, { data, loading, error }] = useMutation(CREATE_BOOKING);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [customerName, setCustomerName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [bookingType, setBookingType] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");

  const handleSubmit = () => {
    let validAddress = streetAddress.concat("\n", city).concat(", ", state).concat(" ", zipCode);
    let validDateTime = bookingDate.concat(" ", bookingTime);
    createBooking({
      variables: {
        input: {
          type: bookingType,
          name: customerName,
          email: emailAddress,
          address: validAddress,
          serviceDate: validDateTime,
        },
      },
    }).then(() => {
      handleClose()
    });
  };

  return (
    <>
      <Box id="headerContainer">
        <Box>
          <AppBar position="static" elevation={0} id="topAppBar">
            <Toolbar id="topToolBar">
              <SpruceLogo />
            </Toolbar>
          </AppBar>
        </Box>
        <Box>
          <AppBar position="static" elevation={0} id="bottomAppBar">
            <Toolbar id="bottomToolBar">
              <Typography variant="h5" id="bottomToolBarTitle">
                Bookings
              </Typography>
              <Button
                variant="contained"
                id="createBookingBtnHeader"
                onClick={handleOpen}
              >
                Create booking
              </Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Card sx={style}>
                  <CardHeader
                    title="Create Booking"
                    sx={{ color: "#404040" }}
                  ></CardHeader>
                  <Box className="form">
                    <CardContent>
                      <Grid item container spacing={1} justify="center">
                        <Grid item xs={12} sm={12} md={6}>
                          <TextField
                            fullWidth
                            id="outlined-name"
                            label="Name"
                            variant="outlined"
                            helperText="&nbsp;"
                            onChange={(e) => {
                              setCustomerName(e.target.value);
                            }}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  &nbsp;
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                          <FormControl fullWidth>
                            <InputLabel id="outlined-booking-type-label">
                              {" "}
                              Booking Type{" "}
                            </InputLabel>
                            <Select
                              labelId="outlined-booking-type-label"
                              id="outlined-booking-type"
                              value={bookingType}
                              label="Booking Type"
                              onChange={(e) => {
                                setBookingType(e.target.value);
                              }}
                            >
                              <MenuItem value={"Housekeeping"}>
                                {" "}
                                Housekeeping{" "}
                              </MenuItem>
                              <MenuItem value={"DogWalk"}>DogWalk</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                          <TextField
                            fullWidth
                            id="outlined-email"
                            label="Email"
                            variant="outlined"
                            onChange={(e) => {
                              setEmailAddress(e.target.value);
                            }}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  &nbsp;
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                          <TextField
                            fullWidth
                            id="outlined-booking-date"
                            label="Booking Date"
                            variant="outlined"
                            helperText="Correct Format: YYYY-MM-DD"
                            onChange={(e) => {
                              setBookingDate(e.target.value);
                            }}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  &nbsp;
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                          <TextField
                            fullWidth
                            id="outlined-street-address"
                            label="Street Address"
                            variant="outlined"
                            onChange={(e) => {
                              setStreetAddress(e.target.value);
                            }}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  &nbsp;
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                          <TextField
                            fullWidth
                            id="outlined-booking-time"
                            label="Booking Time"
                            variant="outlined"
                            helperText="Correct Format: HH:MM:SS"
                            onChange={(e) => {
                              setBookingTime(e.target.value);
                            }}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  &nbsp;
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                          <TextField
                            fullWidth
                            id="outlined-city"
                            label="City"
                            variant="outlined"
                            helperText="&nbsp;"
                            onChange={(e) => {
                              setCity(e.target.value);
                            }}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  &nbsp;
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}></Grid>
                        <Grid item xs={12} sm={12} md={3}>
                          <TextField
                            fullWidth
                            id="outlined-state"
                            label="State"
                            variant="outlined"
                            type="text"
                            maxLength={2}
                            onChange={(e) => {
                              setState(e.target.value);
                            }}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  &nbsp;
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={3}>
                          <TextField
                            fullWidth
                            id="outlined-zip-code"
                            label="Zip Code"
                            variant="outlined"
                            type="number"
                            onChange={(e) => {
                              setZipCode(e.target.value);
                            }}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  &nbsp;
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                    <CardActions
                      sx={{ padding: "8px 16px", justifyContent: "end" }}
                    >
                      <Button
                        id="createBookingBtnForm"
                        disabled={
                          !customerName ||
                          !emailAddress ||
                          !streetAddress ||
                          !city ||
                          !state ||
                          !zipCode ||
                          !bookingType ||
                          !bookingDate ||
                          !bookingTime
                        }
                        onClick={() => handleSubmit()}
                      >
                        Create Booking
                      </Button>
                    </CardActions>
                  </Box>
                </Card>
              </Modal>
            </Toolbar>
          </AppBar>
        </Box>
      </Box>
    </>
  );
}
