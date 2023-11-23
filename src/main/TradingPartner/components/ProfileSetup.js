import { Card, Grid, Tooltip, Typography } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React, { useEffect, useState } from "react";
import Customize_DataTable from '../../../common/Components/Cutomize_Datatable';
import MDButton from "components/MDButton";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PAGE_SIZE } from "lib/Constants";
import { deleteProfileSetup, getProfileSetupList } from "../action";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EditProfileSetup from "../modals/EditProfileSetup";
import DeleteModal from "main/Master/modals/DeleteModal";
import { useMaterialUIController } from "context";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';


export default function ProfileSetup() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [controller] = useMaterialUIController();
    const { sidenavColor } = controller;

    const common_color = useSelector(store => store.common.common_color)
    const accessToken = useSelector(store => store.common.access_token)
    const profileSetupList = useSelector(store => store.tradingpartner.profileSetupList)

    const [open, setOpen] = useState(false)
    const [currentProfile, setcurrentProfile] = useState({})
    const [openDeleteModal, setopenDeleteModal] = useState(false)

    useEffect(() => {
        if (accessToken) {
            dispatch(getProfileSetupList(accessToken, { "page": 1, "page_size": PAGE_SIZE }))
        }
    }, [accessToken])

    const delete_profile_setup = () => {
        dispatch(deleteProfileSetup(accessToken, currentProfile.id));
        setopenDeleteModal(false);
    }


    return <DashboardLayout>
        <DashboardNavbar />

        <EditProfileSetup open={open} handleClose={() => setOpen(false)} currentProfile={currentProfile} />
        <DeleteModal open={openDeleteModal} handleClose={() => { setopenDeleteModal(false) }} onConfirm={() => delete_profile_setup()} />

        <MDBox mt={4}>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Card>
                        <MDBox
                            mx={2}
                            mt={-3}
                            py={1}
                            px={2}
                            variant="gradient"
                            bgColor={sidenavColor}
                            borderRadius="lg"
                            coloredShadow={sidenavColor}
                            style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
                        >
                            <MDTypography variant="h6" color="white">
                                Profile Setup
                            </MDTypography>
                            <Link to={"/profile-setup/create-setup"} >
                                <MDButton size="small" style={{ width: 100 }} variant="contained" color="white" fullWidth  >
                                    Create
                                </MDButton>
                            </Link>
                        </MDBox>
                        <MDBox pt={1}>
                            <Customize_DataTable
                                count={profileSetupList.count}
                                rows={profileSetupList.results}
                                onPageChange={(page) => { dispatch(getProfileSetupList(accessToken, { "page": page, "page_size": PAGE_SIZE })) }}
                                columns={[
                                    // { field: "id", headerName: "ID", width: 90 },
                                    {
                                        field: "action", headerName: "Action", width: 110, renderCell: (row) => <Typography>
                                            <Tooltip title="Edit" ><EditIcon fontSize="small" style={{ cursor: "pointer", }} onClick={() => { setOpen(true); setcurrentProfile(row.row) }} /></Tooltip>
                                            <Tooltip title="Delete" ><DeleteIcon fontSize="small" style={{ marginLeft: 8, cursor: "pointer" }} onClick={() => { setopenDeleteModal(true); setcurrentProfile(row.row) }} /></Tooltip>
                                        </Typography>
                                    },
                                    {
                                        field: "is_active", renderCell: (row) => <MDBox ml={1} >
                                            {row.row.is_active ?
                                                <Tooltip title="Active">
                                                    <CheckCircleIcon color="success" fontSize="medium" />
                                                </Tooltip> :
                                                <Tooltip title="In-active">
                                                    <CancelIcon color="error" fontSize="medium" />
                                                </Tooltip>}
                                        </MDBox>, headerName: "Status", width: 90
                                    },
                                    { field: "profile_name", headerName: "Profile Name", width: 150 },
                                    { field: "sender_id", headerName: "Sender ID", width: 160 },
                                    { field: "sender_name", headerName: "Sender Name", width: 160 },
                                    { field: "receiver_id", headerName: "Receiver ID", width: 160 },
                                    { field: "receiver_name", headerName: "Receiver Name", width: 160 },
                                    { field: "message_direction", renderCell: (row) => <Typography style={{ fontSize: 15 }}>{row.row.message_direction == "i" ? "IN" : "OUT"}</Typography>, headerName: "Direction", width: 160 },
                                    { field: "message_type", headerName: "Message Type", width: 160 },
                                    { field: "message_version", headerName: "Message Version", width: 160 },
                                ]}
                            />
                        </MDBox>
                    </Card>
                </Grid>
            </Grid>
        </MDBox>
    </DashboardLayout>;
}
