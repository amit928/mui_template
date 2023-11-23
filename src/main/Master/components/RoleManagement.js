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
import EditUserDialog from "../modals/EditUserDialog";
import { deleteRole, deleteUser, getPrivilageList, getRoleList } from "../action";
import DeleteModal from "../modals/DeleteModal";
import { PAGE_SIZE } from "lib/Constants";
import PrivilegeModal from "../modals/PrivilegeModal";
import EditRoleDialog from "../modals/EditRoleDialog";
import CopyRoleDialog from "../modals/CopyRoleDialog";
import { useMaterialUIController } from "context";

export default function RoleManagement() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [controller] = useMaterialUIController();
    const { sidenavColor } = controller;

    const common_color = useSelector(store => store.common.common_color)
    const accessToken = useSelector(store => store.common.access_token)
    const roleList = useSelector(store => store.master.roleList)

    const [open, setopen] = useState(false)
    const [privilege_open, setprivilege_open] = useState(false)
    const [openDeleteModal, setopenDeleteModal] = useState(false)
    const [currentRole, setcurrentRole] = useState({})
    const [currentPrivileges, setCurrentPrivileges] = useState([])
    const [open_copy_modal, setopen_copy_modal] = useState(false)

    useEffect(() => {
        if (accessToken) {
            dispatch(getPrivilageList(accessToken))
            dispatch(getRoleList(accessToken, { "page": 1, "page_size": PAGE_SIZE, "include_privilege_data": true }))
        }
    }, [accessToken])

    const delete_role = () => {
        dispatch(deleteRole(accessToken, currentRole.id));
        setopenDeleteModal(false);
    }

    return <DashboardLayout>
        <DashboardNavbar />

        <EditRoleDialog open={open} handleClose={() => setopen(false)} currentRole={currentRole} roleList={roleList} />
        <DeleteModal open={openDeleteModal} handleClose={() => { setopenDeleteModal(false) }} onConfirm={() => delete_role()} />
        <CopyRoleDialog open={open_copy_modal} handleClose={() => setopen_copy_modal(false)} currentRole={currentRole} roleList={roleList} />

        <PrivilegeModal open={privilege_open} handleClose={() => setprivilege_open(false)} privilegeList={currentPrivileges} />

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
                                Role List
                            </MDTypography>
                            <Link to={'/role-management/create-role'}>
                                <MDButton size="small" style={{ width: 100 }} variant="contained" color="white" fullWidth  >
                                    Create
                                </MDButton>
                            </Link>
                        </MDBox>
                        <MDBox pt={1}>
                            <Customize_DataTable
                                count={roleList.count}
                                rows={roleList.results}
                                onPageChange={(page) => { dispatch(getRoleList(accessToken, { "page": page, "page_size": PAGE_SIZE, "include_privilege_data": true })) }}
                                columns={[
                                    // { field: "id", headerName: "ID", width: 90 },
                                    {
                                        field: "action", headerName: "Action", width: 110, renderCell: (row) => <Typography>
                                            <Tooltip title="Edit" ><EditIcon fontSize="small" style={{ cursor: "pointer", }} onClick={() => { setopen(true); setcurrentRole(row.row) }} /></Tooltip>
                                            <Tooltip title="Delete" ><DeleteIcon fontSize="small" style={{ marginInline: 8, cursor: "pointer" }} onClick={() => { setopenDeleteModal(true); setcurrentRole(row.row) }} /></Tooltip>
                                            <Tooltip title="Copy" ><ContentCopyIcon fontSize="small" style={{ cursor: "pointer" }} onClick={() => { setopen_copy_modal(true); setcurrentRole(row.row) }} /></Tooltip>
                                        </Typography>
                                    },
                                    { field: "role_name", headerName: "Role Name", width: 140 },
                                    { field: "role_description", headerName: "Role Description", width: 200 },
                                    { renderCell: (row) => <MDBox><Link onClick={() => { setprivilege_open(true); setCurrentPrivileges(row.row.privilege_data) }}>View</Link></MDBox>, headerName: "Role Privileges", width: 160 },
                                    { field: "created_on", headerName: "Createtd On", width: 160 },
                                    { field: "modified_on", headerName: "Updated On", width: 160 },
                                ]}
                            />
                        </MDBox>
                    </Card>
                </Grid>
            </Grid>
        </MDBox>
    </DashboardLayout>;
}
