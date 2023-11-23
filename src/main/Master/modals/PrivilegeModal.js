import { Autocomplete, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Paper, Switch, TextField, Typography } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import MDTypography from "components/MDTypography";
import { useMaterialUIController } from "context";


export default function PrivilegeModal({ open, handleClose, privilegeList }) {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [controller] = useMaterialUIController();
    const { sidenavColor } = controller;

    const accessToken = useSelector(store => store.common.access_token)
    const common_color = useSelector(store => store.common.common_color)


    return <React.Fragment>
        <Dialog
            open={open}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
            maxWidth="lg"
            fullWidth={true}
        // closeAfterTransition
        >
            <Paper style={{ backgroundColor: common_color.BACKGROUND_COLOR, color: common_color.TEXT_COLOR }}>
                <DialogTitle >
                    <MDBox mx={0}
                        mt={0}
                        py={1}
                        px={2}
                        variant="gradient"
                        bgColor={sidenavColor}
                        borderRadius="lg"
                        coloredShadow={sidenavColor} style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <MDTypography variant="h6" fontWeight={"medium"} color="white"  >
                            Privilege List
                        </MDTypography>
                        <IconButton color="white" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                    </MDBox>
                </DialogTitle>
                <DialogContent>

                    <MDBox px={1} mb={2} style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap" }}>
                        {
                            privilegeList && privilegeList.length > 0 && privilegeList.map((item, index) => {
                                return <Typography style={{ fontSize: 15, width: "40%", lineHeight: 1.7 }}>
                                    {index + 1}. {item.privilege_name.split("_").join(" ")}
                                </Typography>
                            })
                        }
                    </MDBox>
                </DialogContent>
            </Paper>
        </Dialog>
    </React.Fragment>;
}
