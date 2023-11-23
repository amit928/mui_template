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
import { onEditMapping } from "../action";
import { useMaterialUIController } from "context";

export default function EditMappingLibrary({ open, handleClose, ruleSetupList, map_id, currentMappingList }) {


    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [controller] = useMaterialUIController();
    const { sidenavColor } = controller;

    const accessToken = useSelector(store => store.common.access_token)
    const common_color = useSelector(store => store.common.common_color)

    const [output_tag, setoutput_tag] = useState("");
    const [output_element, setoutput_element] = useState("");
    const [input_tag, setinput_tag] = useState("");
    const [input_element, setinput_element] = useState("");

    useEffect(() => {
        setoutput_tag(currentMappingList.output_tag);
        setoutput_element(currentMappingList.output_elememt);
        setinput_tag(currentMappingList.input_tag);
        setinput_element(currentMappingList.input_element);
    }, [currentMappingList.id])

    const on_update_maping = () => {
        if (output_element && output_tag && input_element && input_tag) {
            var body = {
                "output_tag": output_tag,
                "input_tag": input_tag,
                "input_element": input_element,
                "output_elememt": output_element,
                "map_rule": map_id
            }
            dispatch(onEditMapping(accessToken, body, currentMappingList.id));
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
                            Edit Mapping Library
                        </MDTypography>
                    </MDBox>

                </DialogTitle>
                <DialogContent>

                    <MDBox px={1}>
                        <MDBox component="form" role="form">
                            <MDBox my={2}  >
                                <Row>
                                    <Col md="12">
                                        <MDSelect variant="outlined" label="Map Name" value={map_id ?? ""} required={true}
                                            data={
                                                (ruleSetupList.results && ruleSetupList.results.length > 0) ? ruleSetupList.results.map((item) => { return { label: item.map_name, value: item.id } }) : []
                                            } />
                                    </Col>

                                </Row>
                            </MDBox>
                            <MDBox mb={2}>
                                <Row>
                                    <Col md="6">
                                        <TextField value={output_tag} defaultValue={output_tag} type="text" label="Output Tag" variant="outlined" required fullWidth onChange={(e) => { setoutput_tag(e.target.value) }} />
                                    </Col>
                                    <Col md="6">
                                        <TextField value={output_element} defaultValue={output_element} type="text" label="Output Element" variant="outlined" required fullWidth onChange={(e) => { setoutput_element(e.target.value) }} />
                                    </Col>
                                </Row>
                            </MDBox>
                            <MDBox mb={2}>
                                <Row>
                                    <Col md="6">
                                        <TextField value={input_tag} defaultValue={input_tag} type="text" label="Input Tag" variant="outlined" required fullWidth onChange={(e) => { setinput_tag(e.target.value) }} />
                                    </Col>
                                    <Col md="6">
                                        <TextField value={input_element} defaultValue={input_element} type="text" label="Input Element" variant="outlined" required fullWidth onChange={(e) => { setinput_element(e.target.value) }} />
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
                    <MDButton style={{ width: 90 }} onClick={on_update_maping} variant="gradient" color={sidenavColor} fullWidth>
                        Update
                    </MDButton>
                </DialogActions>
            </Paper>
        </Dialog>
    </React.Fragment>;
}
