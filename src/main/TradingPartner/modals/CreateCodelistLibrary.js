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
import { onCreateCodelistLibrary, onCreateMappingLibrary, onCreateRuleSetup, onUpdateProfileSetup, updateUser } from "../action";
import { useMaterialUIController } from "context";

export default function CreateCodelistLibrary({ open, handleClose, codelist_name, code_id, profileSetupList }) {


    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [controller] = useMaterialUIController();
    const { sidenavColor } = controller;

    const accessToken = useSelector(store => store.common.access_token)
    const common_color = useSelector(store => store.common.common_color)

    const [lookup_value, setlookup_value] = useState("");
    const [replace_value1, setreplace_value1] = useState("");
    const [replace_value2, setreplace_value2] = useState("");
    const [replace_value3, setreplace_value3] = useState("");
    const [replace_value4, setreplace_value4] = useState("");
    const [replace_value5, setreplace_value5] = useState("");
    const [replace_value6, setreplace_value6] = useState("");
    const [replace_value7, setreplace_value7] = useState("");
    const [profile_id, setprofile_id] = useState("")

    const on_create_codelist_library = () => {
        if (lookup_value && profile_id) {
            var body = {
                "conversion_list_id": code_id,
                "tp_profile_id": profile_id,
                "lookup_value": lookup_value,
                "text1": replace_value1,
                "text2": replace_value2,
                "text3": replace_value3,
                "text4": replace_value4,
                "text5": replace_value5,
                "text6": replace_value6,
                "text7": replace_value7
            }
            dispatch(onCreateCodelistLibrary(accessToken, body, code_id));
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
                            Create Codelist Library
                        </MDTypography>
                    </MDBox>

                </DialogTitle>
                <DialogContent>

                    <MDBox px={1}>
                        <MDBox component="form" role="form">

                            <MDBox my={2}>
                                <Row>

                                    <Col md="6">
                                        <MDSelect
                                            onChange={(e) => { setprofile_id(e.target.value) }}
                                            variant="outlined"
                                            label="Profile Name"
                                            value={profile_id ?? ""}
                                            required={true}
                                            data={
                                                (profileSetupList.results && profileSetupList.results.length > 0) ? profileSetupList.results.map((item) => { return { label: item.profile_name, value: item.id } }) : []
                                            }
                                        />
                                    </Col>
                                    <Col md="6">
                                        <TextField type="text" label="Code List Name" variant="outlined" required fullWidth value={codelist_name} />
                                    </Col>
                                </Row>
                            </MDBox>
                            <MDBox mb={2}>
                                <Row>
                                    <Col md="6">
                                        <TextField type="text" label="LookUp Value" variant="outlined" required fullWidth onChange={(e) => { setlookup_value(e.target.value) }} />
                                    </Col>
                                    <Col md="6">
                                        <TextField type="text" label="Replace Value 1" variant="outlined" fullWidth onChange={(e) => { setreplace_value1(e.target.value) }} />
                                    </Col>
                                </Row>
                            </MDBox>
                            <MDBox mb={2}>
                                <Row>
                                    <Col md="6">
                                        <TextField type="text" label="Replace Value 2" variant="outlined" fullWidth onChange={(e) => { setreplace_value2(e.target.value) }} />
                                    </Col>
                                    <Col md="6">
                                        <TextField type="text" label="Replace Value 3" variant="outlined" fullWidth onChange={(e) => { setreplace_value3(e.target.value) }} />
                                    </Col>
                                </Row>
                            </MDBox>
                            <MDBox mb={2}>
                                <Row>
                                    <Col md="6">
                                        <TextField type="text" label="Replace Value 4" variant="outlined" fullWidth onChange={(e) => { setreplace_value4(e.target.value) }} />
                                    </Col>
                                    <Col md="6">
                                        <TextField type="text" label="Replace Value 5" variant="outlined" fullWidth onChange={(e) => { setreplace_value5(e.target.value) }} />
                                    </Col>
                                </Row>
                            </MDBox>
                            <MDBox mb={2}>
                                <Row>
                                    <Col md="6">
                                        <TextField type="text" label="Replace Value 6" variant="outlined" fullWidth onChange={(e) => { setreplace_value6(e.target.value) }} />
                                    </Col>
                                    <Col md="6">
                                        <TextField type="text" label="Replace Value 7" variant="outlined" fullWidth onChange={(e) => { setreplace_value7(e.target.value) }} />
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
                    <MDButton style={{ width: 90 }} onClick={on_create_codelist_library} variant="gradient" color={sidenavColor} fullWidth>
                        Create
                    </MDButton>
                </DialogActions>
            </Paper>
        </Dialog>
    </React.Fragment>;
}
