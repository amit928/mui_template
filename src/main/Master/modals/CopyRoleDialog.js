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
import { createRole, updateRole, updateUser } from "../action";
import { useMaterialUIController } from "context";

export default function CopyRoleDialog({ open, handleClose, currentRole }) {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [controller] = useMaterialUIController();
    const { sidenavColor } = controller;

    const accessToken = useSelector(store => store.common.access_token)
    const common_color = useSelector(store => store.common.common_color)
    const privilegeList = useSelector(store => store.master.privilegeList)

    const [role_name, setrole_name] = useState("");
    const [role_description, setrole_description] = useState("");
    const [privilege_names, setprivilege_names] = useState([]);

    useEffect(() => {
        setrole_name(currentRole.role_name);
        setrole_description(currentRole.role_description);
        setprivilege_names(currentRole.privilege_data ?? []);
    }, [currentRole.id])

    const on_create_role = () => {
        if (role_name && role_description && privilege_names) {
            var body = {
                "role_name": role_name,
                "role_description": role_description,
                "privilege_names": privilege_names.length > 0 ? privilege_names.map((item) => { return item.privilege_name }) : []
            }
            dispatch(createRole(accessToken, body, navigate));
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
            maxWidth="lg"
            fullWidth={true}
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
                            Copy Role
                        </MDTypography>
                    </MDBox>

                </DialogTitle>
                <DialogContent>

                    <MDBox px={1}>

                        <MDBox component="form" role="form">
                            <MDBox mb={2}  >
                                <TextField  defaultValue={role_name} value={role_name} type="text" label="Role Name" variant="standard" required fullWidth onChange={(e) => { setrole_name(e.target.value) }} />
                            </MDBox>
                            <MDBox mb={2}  >
                                <TextField  defaultValue={role_description} value={role_description} type="text" label="Role Description" variant="standard" required fullWidth onChange={(e) => { setrole_description(e.target.value) }} />
                            </MDBox>
                            <MDBox mb={2}>
                                <Autocomplete
                                    multiple
                                    id="tags-standard"
                                    options={privilegeList.results ?? []}
                                    getOptionLabel={(option) => option.privilege_name}
                                    // defaultValue={privilege_names}
                                    // disabled
                                    value={privilege_names}
                                    onChange={(e, value) => { setprivilege_names(value) }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="standard"
                                            label="Privileges"
                                            placeholder="Select Privileges"
                                            helperText="Press Ctrl to select multiple items"
                                        />
                                    )}
                                />

                            </MDBox>
                        </MDBox>
                    </MDBox>
                </DialogContent>

                <DialogActions>
                    <MDButton onClick={handleClose} style={{ marginRight: 10 }} >
                        Cancel
                    </MDButton>
                    <MDButton style={{ width: 90 }} onClick={on_create_role} variant="gradient" color="dark" fullWidth>
                        update
                    </MDButton>
                </DialogActions>
            </Paper>
        </Dialog>
    </React.Fragment>;
}
