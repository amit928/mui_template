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

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import { Grid } from "@mui/material";
import { Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { onSetNotification } from "redux/action";
import { NOTIFICATION_COLOUR } from "lib/Constants";
import { onRegister } from "./action";
import { validator } from "lib/Utils";

function Cover() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [organization_name, setorganization_name] = useState("");
  const [password, setpassword] = useState("");
  const [confirm_password, setconfirm_password] = useState("");



  const on_register = () => {
    if (first_name && last_name && email && phone && organization_name && password && confirm_password) {

      if (validator('alphanumeric', first_name) && validator('alphanumeric', last_name) && validator('alphanumeric', organization_name) && validator('email', email) && validator('number', phone) && validator('password', password) && validator('password', confirm_password)) {
        if (password === confirm_password) {
          var body = {
            "first_name": first_name,
            "last_name": last_name,
            "phone_number": phone,
            "email": email,
            "organization_name": organization_name,
            "password": password
          }
          dispatch(onRegister(body, navigate));
        }
        else {
          dispatch(onSetNotification(NOTIFICATION_COLOUR.DANGER, "Password and Confirm Password doesnot matched", true))
        }
      }
    }
    else {
      dispatch(onSetNotification(NOTIFICATION_COLOUR.WARNING, "Any Field should not be empty", true))
    }
  }

  return (
    <CoverLayout image={bgImage}>
      <Card >
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          pb={1}
          // mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Register
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}  >
              <Row>
                <Col md="6">
                  <MDInput error={first_name && !validator('alphanumeric', first_name)} type="text" label="First Name" variant="standard" required fullWidth onChange={(e) => { setfirst_name(e.target.value) }} />
                </Col>

                <Col md="6">
                  <MDInput error={last_name && !validator("alphanumeric", last_name)} type="text" label="Last Name" variant="standard" required fullWidth onChange={(e) => { setlast_name(e.target.value) }} />
                </Col>
              </Row>
            </MDBox>
            <MDBox mb={2}>
              <Row>
                <Col md="6">
                  <MDInput error={phone && !validator("number", phone)} type="number" label="Phone No" variant="standard" required fullWidth onChange={(e) => { setPhone(e.target.value) }} />
                </Col>
                <Col md="6">
                  <MDInput error={email && !validator("email", email)} type="email" label="Email" variant="standard" required fullWidth onChange={(e) => { setEmail(e.target.value) }} />
                </Col>
              </Row>
            </MDBox>
            <MDBox mb={2}>
              <Row>
                <Col md="6">
                  <MDInput error={password && !validator("password", password)} type="password" label="Password" variant="standard" required fullWidth onChange={(e) => { setpassword(e.target.value) }} />
                </Col>
                <Col md="6">
                  <MDInput error={confirm_password && !validator("password", confirm_password)} type="password" label="Confirm Password" variant="standard" required fullWidth onChange={(e) => { setconfirm_password(e.target.value) }} />
                </Col>
              </Row>
            </MDBox>
            <MDBox mb={2}>
              <MDInput error={organization_name && !validator("alphanumeric", organization_name)} type="text" label="Organisation Name" variant="standard" required onChange={(e) => { setorganization_name(e.target.value) }} fullWidth />
            </MDBox>

            <MDBox mt={4} mb={1}>
              <MDButton onClick={on_register} variant="gradient" color="info" fullWidth>
                sign up
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign In
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
