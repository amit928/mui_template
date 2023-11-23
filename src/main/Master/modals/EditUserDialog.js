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
import { updateUser } from "../action";
import { useMaterialUIController } from "context";

export default function EditUserDialog({ open, handleClose, currentUser, roleList }) {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [controller] = useMaterialUIController();
    const { sidenavColor } = controller;

    const accessToken = useSelector(store => store.common.access_token)
    const common_color = useSelector(store => store.common.common_color)

    const [first_name, setfirst_name] = useState("");
    const [last_name, setlast_name] = useState("");
    const [organization_name, setorganization_name] = useState("");
    const [phone_number, setphone_number] = useState("");
    const [is_active, setis_active] = useState(false);
    const [role_id, setrole_id] = useState([""])
    const [email, setemail] = useState("");

    useEffect(() => {
        setemail(currentUser.email)
        setphone_number(currentUser.phone_number);
        setfirst_name(currentUser.first_name);
        setlast_name(currentUser.last_name);
        setorganization_name(currentUser.organization_name);
        setis_active(currentUser.is_active);
        currentUser.role_data && currentUser.role_data[0] ? setrole_id([currentUser.role_data[0].id]) : setrole_id([""])
    }, [currentUser.id])

    const on_edit_user = () => {
        var body = {
            "first_name": first_name,
            "last_name": last_name,
            "organization_name": organization_name,
            "role_id": role_id,
            "phone_number": phone_number,
            "is_active": is_active
        }

        if (first_name && last_name && phone_number && organization_name) {
            dispatch(updateUser(accessToken, body, currentUser.id));
            handleClose();
        }
        else {
            dispatch(onSetNotification(NOTIFICATION_COLOUR.DANGER, "Required field should not be empty", true))
        }
    }


    return <React.Fragment>
        <Dialog
            open={open}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <Paper style={{ minWidth: 550, backgroundColor: common_color.BACKGROUND_COLOR, color: common_color.TEXT_COLOR }}>
                <DialogTitle
                >
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
                            Edit User
                        </MDTypography>
                    </MDBox>

                </DialogTitle>
                <DialogContent>

                    <MDBox px={1} >

                        <MDBox component="form" role="form">
                            <MDBox mb={1} >
                                <Row>
                                    <Col md="12" style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
                                        <MDTypography style={{ fontSize: 15, marginRight: 10 }} >Is Active</MDTypography>
                                        <Switch checked={is_active} onChange={(e) => { setis_active(e.target.checked) }} inputProps={{ 'aria-label': 'controlled' }} />
                                    </Col>
                                </Row>
                            </MDBox>
                            <MDBox mb={2}  >
                                <Row>
                                    <Col md="6">
                                        <TextField value={first_name} defaultValue={first_name} type="text" label="First Name" variant="outlined" required fullWidth onChange={(e) => { setfirst_name(e.target.value) }} />
                                    </Col>

                                    <Col md="6">
                                        <TextField value={last_name} defaultValue={last_name} type="text" label="Last Name" variant="outlined" required fullWidth onChange={(e) => { setlast_name(e.target.value) }} />
                                    </Col>
                                </Row>
                            </MDBox>
                            <MDBox mb={2}>
                                <Row>
                                    <Col md="6">
                                        <TextField value={phone_number} defaultValue={phone_number} type="number" label="Phone No" variant="outlined" required fullWidth onChange={(e) => { setphone_number(e.target.value) }} />
                                    </Col>
                                    <Col md="6">
                                        <TextField value={email} readOnly label="Email" variant="outlined" required fullWidth  />
                                    </Col>
                                </Row>
                            </MDBox>
                            <MDBox mb={2}>
                                <Row>
                                    <Col md="6">
                                        <TextField value={organization_name} defaultValue={organization_name} type="text" label="Organization Name" variant="outlined" required onChange={(e) => { setorganization_name(e.target.value) }} fullWidth />
                                    </Col>
                                    <Col md="6">
                                        <MDSelect variant="outlined" label="Role" value={role_id[0] ?? ""} onChange={(e) => { setrole_id([e.target.value]) }} required={true}
                                            data={
                                                (roleList.results && roleList.results.length > 0) ? roleList.results.map((item) => { return { label: item.role_name, value: item.id } }) : []
                                            } />
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
                    <MDButton style={{ width: 90 }} onClick={on_edit_user} variant="gradient" color="dark" fullWidth>
                        update
                    </MDButton>
                </DialogActions>
            </Paper>
        </Dialog>
    </React.Fragment>;
}
