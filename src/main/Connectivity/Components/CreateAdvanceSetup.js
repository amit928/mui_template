import { Card, Grid, TextField } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { NOTIFICATION_COLOUR } from "lib/Constants";
import { validator } from "lib/Utils";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { onSetNotification } from "redux/action";
import { createUser } from "../action";
import { useMaterialUIController } from "context";

export default function CreateAdvanceSetup() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [controller] = useMaterialUIController();
    const { sidenavColor } = controller;

    const accessToken = useSelector(store => store.common.access_token)
    const common_color = useSelector(store => store.common.common_color)

    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [first_name, setfirst_name] = useState("");
    const [last_name, setlast_name] = useState("");
    const [organization_name, setorganization_name] = useState("");
    const [required_fields, setrequired_fields] = useState([])

    const handleBlur = (field_name, value) => {
        var fields = [...required_fields]
        if (value) {
            fields.splice(fields.indexOf(field_name), 1)
        }
        else {
            fields.push(field_name)
        }
        setrequired_fields(fields)
    }


    const on_create_user = () => {
        if (first_name && last_name && email && phone && organization_name) {
            var body = {
                "email": email,
                "first_name": first_name,
                "last_name": last_name,
                "organization_name": organization_name,
                "phone_number": phone,
                "is_active": true
            }
            dispatch(createUser(accessToken, body, navigate));
        }
        else {
            dispatch(onSetNotification(NOTIFICATION_COLOUR.DANGER, "Required field should not be empty", true))
        }
    }

    return <DashboardLayout>
        <DashboardNavbar />
        <MDBox >
            <Grid container spacing={4} justifyContent={"center"} height={"85vh"} flex={1} alignItems={"center"} >
                <Grid item xs={7} sm={7} >
                    <Card>
                        <MDBox
                            mx={2}
                            mt={-3}
                            py={1}
                            px={2}
                            variant="gradient"
                            bgColor={sidenavColor}
                            borderRadius="lg"
                            coloredShadow={sidenavColor}
                            textAlign="center"
                        // style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
                        >
                            <MDTypography variant="h5" fontWeight="medium" color="white" >
                                Create User
                            </MDTypography>

                        </MDBox>
                        <MDBox pt={3} pb={3} px={3}>

                            <MDTypography variant="h5" fontWeight="regular" >
                                About User
                            </MDTypography>
                            <MDTypography fontSize={15} fontWeight="light" style={{ color: common_color.TEXT_LIGHT_COLOR }} mb={1} >
                                Mandatory Information
                            </MDTypography>
                            <MDBox component="form" role="form">
                                <MDBox mb={2}  >
                                    <Row>
                                        <Col md="6">
                                            <TextField
                                                error={required_fields.includes("first_name")}
                                                helperText={required_fields.includes("first_name") ? "This is a required field." : ""}
                                                type="text"
                                                label="First Name"
                                                variant="outlined"
                                                required
                                                fullWidth
                                                onChange={(e) => { setfirst_name(e.target.value); handleBlur('first_name', e.target.value) }} onBlur={(e) => handleBlur('first_name', e.target.value)} />
                                        </Col>

                                        <Col md="6">
                                            <TextField error={last_name && !validator("alphanumeric", last_name)} type="text" label="Last Name" variant="outlined" required fullWidth onChange={(e) => { setlast_name(e.target.value) }} />
                                        </Col>
                                    </Row>
                                </MDBox>
                                <MDBox mb={2}>
                                    <Row>
                                        <Col md="6">
                                            <TextField error={phone && !validator("number", phone)} type="number" label="Phone No" variant="outlined" required fullWidth onChange={(e) => { setPhone(e.target.value) }} />
                                        </Col>
                                        <Col md="6">
                                            <TextField error={email && !validator("email", email)} type="email" label="Email" variant="outlined" required fullWidth onChange={(e) => { setEmail(e.target.value) }} />
                                        </Col>
                                    </Row>
                                </MDBox>
                                <MDBox mb={2}>
                                    <TextField error={organization_name && !validator("alphanumeric", organization_name)} type="text" label="Organisation Name" variant="outlined" required onChange={(e) => { setorganization_name(e.target.value) }} fullWidth />
                                </MDBox>

                                <MDBox mt={4} style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}  >
                                    <MDButton onClick={on_create_user} variant="gradient" color="dark">
                                        create
                                    </MDButton>
                                </MDBox>
                            </MDBox>
                        </MDBox>
                    </Card>
                </Grid>
            </Grid>
        </MDBox>
    </DashboardLayout>;
}
