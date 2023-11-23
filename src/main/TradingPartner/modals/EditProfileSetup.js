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
import { onUpdateProfileSetup, updateUser } from "../action";
import { useMaterialUIController } from "context";

export default function EditProfileSetup({ open, handleClose, currentProfile }) {


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

    useEffect(() => {
        setprofile_name(currentProfile.profile_name);
        setfile_format(currentProfile.file_format);
        setsenderId(currentProfile.sender_id);
        setsenderName(currentProfile.sender_name);
        setrecieverId(currentProfile.receiver_id);
        setrecieverName(currentProfile.receiver_name);
        setdirection(currentProfile.message_direction)
        setmessage_type(currentProfile.message_type)
        setmessage_version(currentProfile.message_version)
    }, [currentProfile.id])

    const on_edit_profile = () => {
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
            dispatch(onUpdateProfileSetup(accessToken, body, currentProfile.id));
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
                            Edit Profile Setup
                        </MDTypography>
                    </MDBox>

                </DialogTitle>
                <DialogContent>

                    <MDBox px={1}>

                        <MDBox component="form" role="form">
                            <MDBox mb={2} mt={2} >
                                <Row>
                                    <Col md="6">
                                        <TextField defaultValue={profile_name} value={profile_name} type="text" label="Profile Name" variant="outlined" required fullWidth onChange={(e) => { setprofile_name(e.target.value) }} />
                                    </Col>

                                    <Col md="6">
                                        <MDSelect variant="outlined" defaultValue={file_format} value={file_format} label="File Format" onChange={(e) => { setfile_format(e.target.value) }} required={true} data={[
                                            { label: "EDIFACT", value: "EDIFACT" },
                                            { label: "X12", value: "X12" }
                                        ]} />
                                    </Col>
                                </Row>
                            </MDBox>
                            <MDBox mb={2}>
                                <Row>
                                    <Col md="6">
                                        <TextField defaultValue={senderId} value={senderId} type="text" label="Sender Id" variant="outlined" required fullWidth onChange={(e) => { setsenderId(e.target.value) }} />
                                    </Col>
                                    <Col md="6">
                                        <TextField defaultValue={senderName} value={senderName} type="text" label="Sender Name" variant="outlined" required fullWidth onChange={(e) => { setsenderName(e.target.value) }} />
                                    </Col>
                                </Row>
                            </MDBox>
                            <MDBox mb={2}>
                                <Row>
                                    <Col md="6">
                                        <TextField defaultValue={recieverId} value={recieverId} type="text" label="Reciever Id" variant="outlined" required fullWidth onChange={(e) => { setrecieverId(e.target.value) }} />
                                    </Col>

                                    <Col md="6">
                                        <TextField defaultValue={recieverName} value={recieverName} type="text" label="Reciever Name" variant="outlined" required fullWidth onChange={(e) => { setrecieverName(e.target.value) }} />
                                    </Col>
                                </Row>
                            </MDBox>
                            <MDBox mb={2}>
                                <Row>
                                    <Col md="6">
                                        <MDSelect variant="outlined" defaultValue={direction} value={direction} label="Message Direction" onChange={(e) => { setdirection(e.target.value) }} required={true} data={[
                                            { label: "IN", value: "i" },
                                            { label: "OUT", value: "o" }
                                        ]} />
                                    </Col>
                                    <Col md="6">
                                        <TextField defaultValue={message_type} value={message_type} type="text" label="Message Type" variant="outlined" required fullWidth onChange={(e) => { setmessage_type(e.target.value) }} />
                                    </Col>
                                </Row>
                            </MDBox>
                            <MDBox>
                                <TextField defaultValue={message_version} value={message_version} type="text" label="Message Version" variant="outlined" required onChange={(e) => { setmessage_version(e.target.value) }} fullWidth />
                            </MDBox>
                        </MDBox>
                    </MDBox>
                </DialogContent>

                <DialogActions>
                    <MDButton onClick={handleClose} style={{ marginRight: 10 }} >
                        Cancel
                    </MDButton>
                    <MDButton style={{ width: 90 }} onClick={on_edit_profile} variant="gradient" color="dark" fullWidth>
                        update
                    </MDButton>
                </DialogActions>
            </Paper>
        </Dialog>
    </React.Fragment>;
}
