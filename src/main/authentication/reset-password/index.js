/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-reset-cover.jpeg";
import { onForgotPassword, onResetPassword, onVerifyOTP } from "./action";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { NOTIFICATION_COLOUR } from "lib/Constants";
import { onSetNotification } from "redux/action";
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function Cover() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const common_color = useSelector(store => store.common.common_color)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setconfirm_password] = useState("");
  const [otp, setotp] = useState("");

  const [showPassword, setshowPassword] = useState(false)
  const [verify_otp_status, setverify_otp_status] = useState(false)
  const [reset_password_status, setreset_password_status] = useState(false)

  const on_forgot_password = () => {
    if (email) {
      dispatch(onForgotPassword(email, (status) => { setverify_otp_status(status) }));
    }
    else {
      dispatch(onSetNotification(NOTIFICATION_COLOUR.DANGER, "Email field should not be empty", true))
    }
  }

  const verify_otp = () => {
    if (otp) {
      var body = { "otp": otp, "email": email }
      dispatch(onVerifyOTP(body, (status) => { setreset_password_status(status) }));
    }
    else {
      dispatch(onSetNotification(NOTIFICATION_COLOUR.DANGER, "OTP field should not be empty", true))
    }
  }

  const on_reset_password = () => {
    if (password && confirm_password) {
      if (password == confirm_password) {
        var body = { "email": email, "password": password }
        dispatch(onResetPassword(body, navigate));
      }
      else {
        dispatch(onSetNotification(NOTIFICATION_COLOUR.DANGER, "Password and Confirm Password are not Same", true))
      }
    }
    else {
      dispatch(onSetNotification(NOTIFICATION_COLOUR.DANGER, "Any field should not be empty", true))
    }
  }


  return (
    <CoverLayout coverHeight="50vh" image={bgImage}>
      {reset_password_status ?
        <Card>
          <MDBox
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="success"
            mx={2}
            mt={-3}
            py={2}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h3" fontWeight="medium" color="white" mt={1}>
              Verify OTP
            </MDTypography>
          </MDBox>
          <MDBox pt={4} pb={3} px={3}>
            <MDBox component="form" role="form">

              <MDBox mb={2}>
                <FormControl variant="outlined" fullWidth >
                  <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    onChange={(e) => { setPassword(e.target.value) }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => { setshowPassword(!showPassword) }}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff sx={{ color: common_color.TEXT_COLOR }} fontSize="small" /> : <Visibility sx={{ color: common_color.TEXT_COLOR }} fontSize="small" />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
              </MDBox>

              <MDBox mb={4}>
                <FormControl variant="outlined" fullWidth >
                  <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    onChange={(e) => { setconfirm_password(e.target.value) }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => { setshowPassword(!showPassword) }}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff sx={{ color: common_color.TEXT_COLOR }} fontSize="small" /> : <Visibility sx={{ color: common_color.TEXT_COLOR }} fontSize="small" />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Confirm Password"
                  />
                </FormControl>
              </MDBox>
              <MDBox mt={6} mb={1}>
                <MDButton variant="gradient" color="info" fullWidth onClick={on_reset_password}>
                  Reset
                </MDButton>
              </MDBox>
            </MDBox>
          </MDBox>
        </Card>
        :
        verify_otp_status ? <Card>
          <MDBox
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="success"
            mx={2}
            mt={-3}
            py={2}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h3" fontWeight="medium" color="white" mt={1}>
              Verify OTP
            </MDTypography>
          </MDBox>
          <MDBox pt={4} pb={3} px={3}>
            <MDBox component="form" role="form">
              <MDBox mb={4}>
                <MDInput type="number" label="Enter OTP" variant="standard" onChange={(e) => { setotp(e.target.value) }} fullWidth />
              </MDBox>
              <MDBox mt={6} mb={1}>
                <MDButton variant="gradient" color="info" fullWidth onClick={verify_otp}>
                  Verify
                </MDButton>
              </MDBox>
            </MDBox>
          </MDBox>
        </Card>
          :
          <Card>
            <MDBox
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="success"
              mx={2}
              mt={-3}
              py={2}
              mb={1}
              textAlign="center"
            >
              <MDTypography variant="h3" fontWeight="medium" color="white" mt={1}>
                Forgot Password
              </MDTypography>
              <MDTypography display="block" variant="button" color="white" my={1}>
                You will receive an e-mail in maximum 60 seconds
              </MDTypography>
            </MDBox>
            <MDBox pt={4} pb={3} px={3}>
              <MDBox component="form" role="form">
                <MDBox mb={4}>
                  <MDInput type="email" label="Email" variant="standard" onChange={(e) => { setEmail(e.target.value) }} fullWidth />
                </MDBox>
                <MDBox mt={6} mb={1}>
                  <MDButton variant="gradient" color="info" fullWidth onClick={on_forgot_password}>
                    reset
                  </MDButton>
                </MDBox>
              </MDBox>
            </MDBox>
          </Card>
      }

    </CoverLayout>
  );
}

export default Cover;
