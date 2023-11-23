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
import { onCreateCodelist, onCreateRuleSetup, onUpdateProfileSetup, updateUser } from "../action";
import { useMaterialUIController } from "context";

export default function CreateSetupModal({ open, handleClose, profileSetupList }) {


    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [controller] = useMaterialUIController();
    const { sidenavColor } = controller;

    const accessToken = useSelector(store => store.common.access_token)
    const common_color = useSelector(store => store.common.common_color)

    const [connectivity_profile_name, setconnectivity_profile_name] = useState("");
    const [tp_profile_id, settp_profile_id] = useState("");
    const [connectivity_type, setconnectivity_type] = useState("");
    const [operation_type, setoperation_type] = useState("");
    const [is_active, setis_active] = useState(false);

    const on_create_codeList = () => {
        // if (codeListName && codeListDesc) {
        //     var body = {
        //         "name": codeListName,
        //         "description": codeListDesc
        //     }
        //     dispatch(onCreateCodelist(accessToken, body));
        //     handleClose();
        // }
        // else {
        //     dispatch(onSetNotification(NOTIFICATION_COLOUR.DANGER, "Please fill The required fields.", true))
        // }
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
                            Create Codelist
                        </MDTypography>
                    </MDBox>

                </DialogTitle>
                <DialogContent>

                    <MDBox px={1}>

                        <MDBox component="form" role="form">
                            <MDBox mb={1} >
                                <Row>
                                    <Col md="12" style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
                                        <MDTypography style={{ fontSize: 15, marginRight: 10 }} >Is Active</MDTypography>
                                        <Switch checked={is_active} onChange={(e) => { setis_active(e.target.checked) }} inputProps={{ 'aria-label': 'controlled' }} />
                                    </Col>
                                </Row>
                            </MDBox>
                            <MDBox mb={2} >
                                <Row>
                                    <Col md="6" >
                                        <TextField type="text" label="Connectivity Profile Name" variant="outlined" required onChange={(e) => { setcodeListName(e.target.value) }} fullWidth />
                                    </Col>
                                    <Col md="6" >
                                        <MDSelect
                                            onChange={(e) => { settp_profile_id(e.target.value) }}
                                            variant="outlined"
                                            label="TP Profile Name"
                                            value={tp_profile_id ?? ""}
                                            required={true}
                                            data={
                                                (profileSetupList.results && profileSetupList.results.length > 0) ? profileSetupList.results.map((item) => { return { label: item.profile_name, value: item.id } }) : []
                                            }
                                        />
                                    </Col>
                                </Row>
                            </MDBox>
                            <MDBox mb={2} >
                                <Row>
                                    <Col md="6" >
                                        <MDSelect
                                            onChange={(e) => { settp_profile_id(e.target.value) }}
                                            variant="outlined"
                                            label="Connectivity Type"
                                            value={tp_profile_id ?? ""}
                                            required={true}
                                            data={
                                                (profileSetupList.results && profileSetupList.results.length > 0) ? profileSetupList.results.map((item) => { return { label: item.profile_name, value: item.id } }) : []
                                            }
                                        />                                    </Col>
                                    <Col md="6" >
                                        <MDSelect
                                            onChange={(e) => { settp_profile_id(e.target.value) }}
                                            variant="outlined"
                                            label="Operation Type"
                                            value={tp_profile_id ?? ""}
                                            required={true}
                                            data={
                                                (profileSetupList.results && profileSetupList.results.length > 0) ? profileSetupList.results.map((item) => { return { label: item.profile_name, value: item.id } }) : []
                                            }
                                        />
                                    </Col>
                                </Row>
                            </MDBox>
                        </MDBox>
                    </MDBox>
                </DialogContent>

                <DialogActions>
                    <MDButton onClick={handleClose} style={{ marginRight: 10 }} >
                        Cancel
                    </MDButton>
                    <MDButton style={{ width: 90 }} onClick={on_create_codeList} variant="gradient" color={sidenavColor} fullWidth>
                        Create
                    </MDButton>
                </DialogActions>
            </Paper>
        </Dialog>
    </React.Fragment>;
}
