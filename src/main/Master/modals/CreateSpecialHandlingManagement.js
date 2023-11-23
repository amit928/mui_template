import { Autocomplete, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Switch, TextField } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDSelect from "components/MDSelect";
import MDTypography from "components/MDTypography";
import { NOTIFICATION_COLOUR } from "lib/Constants";
import { validator } from "lib/Utils";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { onSetNotification } from "redux/action";
import { useMaterialUIController } from "context";
import { onCreateSpecialHandlingManagement } from "main/TradingPartner/action";

export default function CreateSpecialHandlingManagement({ open, handleClose, profileSetupList }) {


    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [controller] = useMaterialUIController();
    const { sidenavColor } = controller;

    const accessToken = useSelector(store => store.common.access_token)
    const common_color = useSelector(store => store.common.common_color)

    const [is_active, setis_active] = useState(false);
    const [connectivity_profile_id, setconnectivity_profile_id] = useState("");
    const [special_handling_desc, setspecial_handling_desc] = useState("");
    const [special_handling_name, setspecial_handling_name] = useState("");
    const [rule_description, setrule_description] = useState("");
    const [module_type, setmodule_type] = useState("");

    const on_create_message_handling = () => {
        if (connectivity_profile_id && special_handling_desc && special_handling_name && rule_description && module_type) {
            var body = {
                "special_handling_description": special_handling_desc,
                "special_handling_name": special_handling_name,
                "special_handling_rule": rule_description,
                "tp_profile_id": connectivity_profile_id,
                "is_active": is_active,
                "module_type": module_type
            }
            dispatch(onCreateSpecialHandlingManagement(accessToken, body));
            handleClose();
        }
        else {
            dispatch(onSetNotification(NOTIFICATION_COLOUR.DANGER, "Please fill The required fields.", true))
        }
    }

    return <React.Fragment>
        <Dialog
            open={open}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
            fullWidth
            maxWidth="md"
        >
            <Paper style={{ backgroundColor: common_color.BACKGROUND_COLOR, color: common_color.TEXT_COLOR }}>
                <DialogTitle >
                    <MDBox
                        mx={0}
                        mt={0}
                        py={1}
                        px={2}
                        variant="gradient"
                        bgColor={sidenavColor}
                        borderRadius="lg"
                        coloredShadow={sidenavColor}
                        style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
                    >
                        <MDTypography variant="h6" color="white">
                            Create Special Handling
                        </MDTypography>
                    </MDBox>

                </DialogTitle>
                <DialogContent>

                    <MDBox component="form" role="form" >
                        <MDBox mb={2} ml={2} >
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
                                    <MDSelect value={connectivity_profile_id} label="TP Profile Name" variant="outlined" onChange={(e) => { setconnectivity_profile_id(e.target.value) }} required={true} data={(profileSetupList.results && profileSetupList.results.length > 0) ?
                                        profileSetupList.results.map((item, index) => { return { label: item.profile_name, value: item.id } }) : []} />
                                </Col>

                                <Col md="6">
                                    <MDSelect value={module_type} label="Select Module Type" variant="outlined" onChange={(e) => { setmodule_type(e.target.value) }}
                                        required={true}
                                        data={[
                                            { label: "Message Special Handling", value: 10 },
                                            { label: "Connectivity Special Handling", value: 5 }
                                        ]} />
                                </Col>

                            </Row>
                        </MDBox>
                        <MDBox mb={2} >
                            <Row>
                                <Col md="6">
                                    <TextField type="text" defaultValue={special_handling_name} label="Special Handling Name" variant="outlined" required onChange={(e) => { setspecial_handling_name(e.target.value) }} fullWidth />
                                </Col>
                                <Col md="6">
                                    <TextField type="text" defaultValue={special_handling_desc} label="Special Handling Description" variant="outlined" required onChange={(e) => { setspecial_handling_desc(e.target.value) }} fullWidth />
                                </Col>
                            </Row>
                        </MDBox>
                        <MDBox mb={2} >
                            <Row>
                                <Col md="6">
                                    <TextField type="text" defaultValue={rule_description} label="Special Handling Rule" variant="outlined" required onChange={(e) => { setrule_description(e.target.value) }} fullWidth />
                                </Col>
                            </Row>
                        </MDBox>
                    </MDBox>
                </DialogContent>

                <DialogActions>
                    <MDButton onClick={handleClose} style={{ marginRight: 10 }} >
                        Cancel
                    </MDButton>
                    <MDButton style={{ width: 90 }} onClick={on_create_message_handling} variant="gradient" color={sidenavColor} fullWidth>
                        Create
                    </MDButton>
                </DialogActions>
            </Paper>
        </Dialog>
    </React.Fragment>;
}
