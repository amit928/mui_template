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
import { onCreateRuleSetup, onEditRuleSetup, onUpdateProfileSetup, updateUser } from "../action";
import { useMaterialUIController } from "context";

export default function EditRuleSetup({ open, handleClose, profileSetupList, currentRule }) {


    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [controller] = useMaterialUIController();
    const { sidenavColor } = controller;

    const accessToken = useSelector(store => store.common.access_token)
    const common_color = useSelector(store => store.common.common_color)

    const [profile_id, setprofile_id] = useState("");
    const [map_name, setmap_name] = useState("");

    useEffect(() => {
        setprofile_id(currentRule.tp_profile_id);
        setmap_name(currentRule.map_name);
    }, [currentRule.id])

    const on_edit_rule_setup = () => {
        if (profile_id && map_name) {
            var body = {
                "tp_profile_id": profile_id,
                "map_name": map_name
            }
            dispatch(onEditRuleSetup(accessToken, body, currentRule.id));
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
                            Edit Map Setup
                        </MDTypography>
                    </MDBox>

                </DialogTitle>
                <DialogContent>

                    <MDBox px={1}>

                        <MDBox component="form" role="form">

                            <MDBox my={2}>
                                <MDSelect defaultValue={profile_id} value={profile_id} variant="outlined" label="Select Profile Name" onChange={(e) => { setprofile_id(e.target.value) }} required={true} data={
                                    (profileSetupList.results && profileSetupList.results.length > 0) ?
                                        profileSetupList.results.map((item, index) => { return { label: item.profile_name, value: item.id } }) : []
                                } />
                            </MDBox>
                            <MDBox>
                                <TextField defaultValue={map_name} value={map_name} type="text" label="Map Name" variant="outlined" required onChange={(e) => { setmap_name(e.target.value) }} fullWidth />
                            </MDBox>
                        </MDBox>
                    </MDBox>
                </DialogContent>

                <DialogActions>
                    <MDButton onClick={handleClose} style={{ marginRight: 10 }} >
                        Cancel
                    </MDButton>
                    <MDButton style={{ width: 90 }} onClick={on_edit_rule_setup} variant="gradient" color={sidenavColor} fullWidth>
                        Update
                    </MDButton>
                </DialogActions>
            </Paper>
        </Dialog>
    </React.Fragment>;
}
