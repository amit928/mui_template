import { Card, Grid, Switch, TextField } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MDInput from "components/MDInput";
import MDSelect from "components/MDSelect";
import { NOTIFICATION_COLOUR } from "lib/Constants";
import { onSetNotification } from "redux/action";
import { onCreateProfileSetup } from "../action";
import { useMaterialUIController } from "context";

export default function CreateProfileSetup() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [controller] = useMaterialUIController();
    const { sidenavColor } = controller;

    const accessToken = useSelector(store => store.common.access_token)
    const common_color = useSelector(store => store.common.common_color)

    const [profile_name, setprofile_name] = useState("");
    const [file_format, setfile_format] = useState("");
    const [senderId, setsenderId] = useState("");
    const [recieverId, setrecieverId] = useState("");
    const [senderName, setsenderName] = useState("");
    const [recieverName, setrecieverName] = useState("");
    const [direction, setdirection] = useState("");
    const [message_type, setmessage_type] = useState("");
    const [message_version, setmessage_version] = useState("");
    const [is_active, setis_active] = useState(false);


    const on_create_setup = () => {
        if (profile_name && file_format && senderId && recieverId && direction && message_type && message_version && senderName && recieverName) {
            var body = {
                "sender_id": senderId,
                "receiver_id": recieverId,
                "message_direction": direction,
                "message_type": message_type,
                "message_version": message_version,
                "file_format": file_format,
                "profile_name": profile_name,
                "sender_name": senderName,
                "receiver_name": recieverName
            }
            dispatch(onCreateProfileSetup(accessToken, body, navigate));
        }
        else {
            dispatch(onSetNotification(NOTIFICATION_COLOUR.DANGER, "Required field should not be empty", true))
        }
    }

    return <DashboardLayout>
        <DashboardNavbar />
        <MDBox >
            <Grid container spacing={4} justifyContent={"center"} height={"85vh"} flex={1} alignItems={"center"} >
                <Grid item xs={8} sm={9} >
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
                        >
                            <MDTypography variant="h5" fontWeight="medium" color="white" >
                                Create Setup
                            </MDTypography>

                        </MDBox>
                        <MDBox pt={3} pb={3} px={3}>

                            <MDTypography variant="h5" fontWeight="medium" >
                                About Profile Setup
                            </MDTypography>
                            <MDTypography fontSize={15} fontWeight="light" style={{ color: common_color.TEXT_LIGHT_COLOR }} mb={1} >
                                Mandatory Information
                            </MDTypography>
                            <MDBox component="form" role="form" mt={2} >
                                <MDBox mb={2} >
                                    <Row>
                                        <Col md="12" style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
                                            <MDTypography style={{ fontSize: 15, marginRight: 10 }} >Is Active</MDTypography>
                                            <Switch checked={is_active} onChange={(e) => { setis_active(e.target.checked) }} inputProps={{ 'aria-label': 'controlled' }} />
                                        </Col>
                                    </Row>
                                </MDBox>
                                <MDBox mb={2} >
                                    <Row>
                                        <Col md="6">
                                            <TextField type="text" label="Profile Name" variant="outlined" required fullWidth onChange={(e) => { setprofile_name(e.target.value) }} />
                                        </Col>

                                        <Col md="6">
                                            <MDSelect label="File Format" variant="outlined" onChange={(e) => { setfile_format(e.target.value) }} value={file_format} required={true} data={[
                                                { label: "EDIFACT", value: "EDIFACT" },
                                                { label: "X12", value: "X12" }
                                            ]} />
                                        </Col>
                                    </Row>
                                </MDBox>
                                <MDBox mb={2}>
                                    <Row>
                                        <Col md="6">
                                            <TextField type="text" label="Sender Id" variant="outlined" required fullWidth onChange={(e) => { setsenderId(e.target.value) }} />
                                        </Col>
                                        <Col md="6">
                                            <TextField type="text" label="Sender Name" variant="outlined" required fullWidth onChange={(e) => { setsenderName(e.target.value) }} />
                                        </Col>
                                    </Row>
                                </MDBox>
                                <MDBox mb={2}>
                                    <Row>
                                        <Col md="6">
                                            <TextField type="text" label="Reciever Id" variant="outlined" required fullWidth onChange={(e) => { setrecieverId(e.target.value) }} />
                                        </Col>

                                        <Col md="6">
                                            <TextField type="text" label="Reciever Name" variant="outlined" required fullWidth onChange={(e) => { setrecieverName(e.target.value) }} />
                                        </Col>
                                    </Row>
                                </MDBox>
                                <MDBox mb={2}>
                                    <Row>
                                        <Col md="6">
                                            <MDSelect label="Message Direction" variant="outlined" onChange={(e) => { setdirection(e.target.value) }} value={direction} required={true} data={[
                                                { label: "IN", value: "i" },
                                                { label: "OUT", value: "o" }
                                            ]} />
                                        </Col>
                                        <Col md="6">
                                            <TextField type="text" label="Message Type" variant="outlined" required fullWidth onChange={(e) => { setmessage_type(e.target.value) }} />
                                        </Col>
                                    </Row>
                                </MDBox>
                                <MDBox mb={2}>
                                    <Row>
                                        <Col md="12">
                                            <TextField type="text" label="Message Version" variant="outlined" required onChange={(e) => { setmessage_version(e.target.value) }} fullWidth />
                                        </Col>
                                    </Row>
                                </MDBox>

                                <MDBox mt={4} style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}  >
                                    <MDButton onClick={on_create_setup} variant="gradient" color={sidenavColor}>
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
