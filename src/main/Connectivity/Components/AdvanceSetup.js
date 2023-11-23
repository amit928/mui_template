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
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { getSetupList } from "../action";
import { PAGE_SIZE } from "lib/Constants";
import { useMaterialUIController } from "context";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

export default function AdvanceSetup() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [controller] = useMaterialUIController();
    const { sidenavColor } = controller;

    const common_color = useSelector(store => store.common.common_color)
    const accessToken = useSelector(store => store.common.access_token)
    const setupList = useSelector(store => store.connectivity.setupList)

    const [open, setopen] = useState(false)
    const [openDeleteModal, setopenDeleteModal] = useState(false)
    const [currentUser, setcurrentUser] = useState({})
    const [open_copy_modal, setopen_copy_modal] = useState(false)

    useEffect(() => {
        if (accessToken) {
            dispatch(getSetupList(accessToken, { "page": 1, "page_size": PAGE_SIZE }))
        }
    }, [accessToken])

    // const delete_user = () => {
    //     dispatch(deleteUser(accessToken, currentUser.id));
    //     setopenDeleteModal(false);
    // }

    return <DashboardLayout>
        <DashboardNavbar />

        {/* <EditUserDialog open={open} handleClose={() => setopen(false)} currentUser={currentUser} roleList={roleList} />
        <DeleteModal open={openDeleteModal} handleClose={() => { setopenDeleteModal(false) }} onConfirm={() => delete_user()} /> */}

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
                                Advance Setup List
                            </MDTypography>
                            <Link to={'/user-management/create-user'}>
                                <MDButton size="small" style={{ width: 100 }} onClick={() => { }} variant="contained" color="white" fullWidth  >
                                    Create
                                </MDButton>
                            </Link>
                        </MDBox>
                        <MDBox pt={1}>
                            <Customize_DataTable
                                count={setupList.count}
                                rows={setupList.results}
                                onPageChange={(page) => { dispatch(getSetupList(accessToken, { "page": page, "page_size": PAGE_SIZE })) }}
                                columns={[
                                    // { field: "id", headerName: "ID", width: 90 },
                                    {
                                        field: "action", headerName: "Action", width: 110, renderCell: (row) => <Typography>
                                            <Tooltip title="Edit" ><EditIcon fontSize="small" style={{ cursor: "pointer", }} onClick={() => { setopen(true); setcurrentUser(row.row) }} /></Tooltip>
                                            <Tooltip title="Delete" ><DeleteIcon fontSize="small" style={{ marginInline: 8, cursor: "pointer" }} onClick={() => { setopenDeleteModal(true); setcurrentUser(row.row) }} /></Tooltip>
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
                                    { field: "email", headerName: "Connectivity Profile Name", width: 200 },
                                    { field: "organization_name", headerName: "TP Profile Name", width: 130 },
                                    { field: "phone_number", headerName: "Connectivity Type", width: 140 },
                                    { field: "data_access", headerName: "Operation Type", width: 130 },
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
