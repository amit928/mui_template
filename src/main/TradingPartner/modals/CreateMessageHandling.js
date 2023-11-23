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
import { onCreateMessageSpecialHandling } from "../action";
import { useMaterialUIController } from "context";

export default function CreateMessageHandling({ open, handleClose, profileSetupList, specialHandlingList }) {


    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [controller] = useMaterialUIController();
    const { sidenavColor } = controller;

    const accessToken = useSelector(store => store.common.access_token)
    const common_color = useSelector(store => store.common.common_color)

    const [is_active, setis_active] = useState(false);
    const [connectivity_profile_id, setconnectivity_profile_id] = useState("");
    const [special_handling_type, setspecial_handling_type] = useState("");
    const [special_handling_name, setspecial_handling_name] = useState("");
    const [rule_description, setrule_description] = useState("");
    const [module_type, setmodule_type] = useState("");

    useEffect(() => {
        specialHandlingList && specialHandlingList.results && specialHandlingList.results.length > 0 &&
            specialHandlingList.results.map((item, index) => {
                if (item.id === special_handling_name) {
                    setrule_description(item.special_handling_description)
                    setmodule_type(item.id)
                }
            })
    }, [special_handling_name])

    const on_create_message_handling = () => {
        if (connectivity_profile_id && special_handling_type && special_handling_name && rule_description) {
            var body = {
                "module_type": module_type,
                "special_handling_type": special_handling_type,
                "special_handling_name": special_handling_name,
                "rule_description": rule_description,
                "tp_profile_id": connectivity_profile_id,
                "is_active": is_active
            }
            dispatch(onCreateMessageSpecialHandling(accessToken, body));
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
                            Create Message Handling
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
                                    <MDSelect value={special_handling_type} label="Special Handling Type" variant="outlined" onChange={(e) => { setspecial_handling_type(e.target.value) }} required={true} data={[
                                        { label: "Preprocess", value: "Preprocess" },
                                        { label: "Postprocess", value: "Postprocess" }
                                    ]} />
                                </Col>
                            </Row>
                        </MDBox>
                        <MDBox mb={2} >
                            <Row>
                                <Col md="6">
                                    <MDSelect value={special_handling_name ?? ''} label="Special Handling Name" variant="outlined" onChange={(e) => { setspecial_handling_name(e.target.value) }} required={true} data={(specialHandlingList.results && specialHandlingList.results.length > 0) ?
                                        specialHandlingList.results.map((item, index) => { return { label: item.special_handling_name, value: item.id } }) : []} />
                                </Col>

                                <Col md="6">
                                    <TextField type="text" value={rule_description} label="Rule Description" variant="outlined" required onChange={(e) => { setrule_description(e.target.value) }} fullWidth />
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
