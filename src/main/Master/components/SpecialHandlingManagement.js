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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteModal from "../modals/DeleteModal";
import { useMaterialUIController } from "context";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import CreateSpecialHandlingManagement from "../modals/CreateSpecialHandlingManagement";
import { getProfileSetupList } from "main/TradingPartner/action";
import { getSpecialHandlingManagementList } from "main/TradingPartner/action";
import { deleteSpecialHandlingManagement } from "main/TradingPartner/action";

export default function SpecialHandlingManagement() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [controller] = useMaterialUIController();
    const { sidenavColor } = controller;

    const common_color = useSelector(store => store.common.common_color)
    const accessToken = useSelector(store => store.common.access_token)
    const specialHandlingManagementList = useSelector(store => store.tradingpartner.specialHandlingManagementList)
    const profileSetupList = useSelector(store => store.tradingpartner.profileSetupList)

    const [open, setOpen] = useState(false)
    const [open_edit, setopen_edit] = useState(false)
    const [openDeleteModal, setopenDeleteModal] = useState(false)
    const [currentMessageHandling, setcurrentMessageHandling] = useState({})

    useEffect(() => {
        if (accessToken) {
            dispatch(getSpecialHandlingManagementList(accessToken))
            dispatch(getProfileSetupList(accessToken, {}))

        }
    }, [accessToken])

    const delete_specialHandling = () => {
        dispatch(deleteSpecialHandlingManagement(accessToken, currentMessageHandling.id));
        setopenDeleteModal(false);
    }

    return <DashboardLayout>
        <DashboardNavbar />

        <CreateSpecialHandlingManagement open={open} handleClose={() => setOpen(false)} profileSetupList={profileSetupList} />


        {/* <EditUserDialog open={open} handleClose={() => setopen(false)} currentUser={currentUser} roleList={roleList} />
        <DeleteModal open={openDeleteModal} handleClose={() => { setopenDeleteModal(false) }} onConfirm={() => delete_user()} />
        <CopyUserDialog open={open_copy_modal} handleClose={() => setopen_copy_modal(false)} currentUser={currentUser} roleList={roleList} /> */}

        <DeleteModal open={openDeleteModal} handleClose={() => { setopenDeleteModal(false) }} onConfirm={() => delete_specialHandling()} />

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
                                Special Handling Management
                            </MDTypography>
                            <MDButton size="small" style={{ width: 100 }} onClick={() => { setOpen(true); }} variant="contained" color="white" fullWidth  >
                                Create
                            </MDButton>
                        </MDBox>
                        <MDBox pt={1}>
                            <Customize_DataTable
                                count={specialHandlingManagementList.count}
                                rows={specialHandlingManagementList.results}
                                onPageChange={(page) => { dispatch(getSpecialHandlingManagementList(accessToken)) }}
                                columns={[
                                    // { field: "id", headerName: "ID", width: 90 },
                                    {
                                        field: "action", headerName: "Action", width: 90, renderCell: (row) => <Typography>
                                            <Tooltip title="Edit" ><EditIcon fontSize="small" style={{ cursor: "pointer", }} onClick={() => { setopen_edit(true); setcurrentMessageHandling(row.row) }} /></Tooltip>
                                            <Tooltip title="Delete" ><DeleteIcon fontSize="small" style={{ marginInline: 8, cursor: "pointer" }} onClick={() => { setopenDeleteModal(true); setcurrentMessageHandling(row.row) }} /></Tooltip>
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
                                        </MDBox>, headerName: "Status", width: 80
                                    },
                                    { renderCell: (row) => <Typography fontSize={13} fontWeight={'lighter'} >{row.row.module_type == 10 ? "Message Special Handling" : "Connectivity Special Handling"}</Typography>, headerName: "Module Type", width: 170 },
                                    { field: "special_handling_name", headerName: "Special Handling Name", width: 170 },
                                    { field: "special_handling_description", headerName: "Special Handling Description", width: 170 },
                                    { field: "special_handling_rule", headerName: "Special Handling Rule", width: 170 },
                                    { field: "created_on", headerName: "Createtd On", width: 140 },
                                    { field: "created_by", headerName: "Createtd By", width: 130 },
                                    { field: "modified_on", headerName: "Updated On", width: 140 },
                                    { field: "modified_by", headerName: "Updated By", width: 130 },
                                ]}
                            />
                        </MDBox>
                    </Card>
                </Grid>
            </Grid>
        </MDBox>
    </DashboardLayout>;
}
