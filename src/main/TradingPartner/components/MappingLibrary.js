import { Card, Grid, Tooltip, Typography } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React, { useEffect, useState } from "react";
import Customize_DataTable from '../../../common/Components/Cutomize_Datatable';
import MDButton from "components/MDButton";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PAGE_SIZE } from "lib/Constants";
import { deleteMapping, deleteProfileSetup, deleteRuleSetup, getMappingLibraryList, getProfileSetupList, getRuleSetupList } from "../action";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useMaterialUIController } from "context";
import DirectionsIcon from '@mui/icons-material/Directions';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import EditRuleSetup from "../modals/EditRuleSetup";
import DeleteModal from "main/Master/modals/DeleteModal";
import CreateMappingLibrary from "../modals/CreateMappingLibrary";
import EditMappingLibrary from "../modals/EditMappingLibrary";

export default function MappingLibrary() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const [controller] = useMaterialUIController();
    const { sidenavColor } = controller;

    const accessToken = useSelector(store => store.common.access_token)
    const profileSetupList = useSelector(store => store.tradingpartner.profileSetupList)
    const ruleSetupList = useSelector(store => store.tradingpartner.ruleSetupList)
    const mappingLibraryList = useSelector(store => store.tradingpartner.mappingLibraryList)


    const [open, setOpen] = useState(false)
    const [open_edit, setopen_edit] = useState(false)
    const [currentRule, setcurrentRule] = useState({})
    const [openDeleteModal, setopenDeleteModal] = useState(false)
    const [currentMappingList, setcurrentMappingList] = useState({})

    useEffect(() => {
        if (accessToken) {
            dispatch(getMappingLibraryList(accessToken, params.map_id));
            dispatch(getRuleSetupList(accessToken));
        }
    }, [accessToken])

    const delete_rule_setup = () => {
        dispatch(deleteMapping(accessToken, currentRule.id, params.map_id));
        setopenDeleteModal(false);
    }

    return <DashboardLayout>
        <DashboardNavbar />

        <CreateMappingLibrary open={open} handleClose={() => setOpen(false)} ruleSetupList={ruleSetupList} map_id={params.map_id} />

        <EditMappingLibrary open={open_edit} handleClose={() => setopen_edit(false)} ruleSetupList={ruleSetupList} map_id={params.map_id} currentMappingList={currentMappingList} />

        <DeleteModal open={openDeleteModal} handleClose={() => { setopenDeleteModal(false) }} onConfirm={() => delete_rule_setup()} />

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
                                Mapping Library
                            </MDTypography>
                            <MDButton onClick={() => { setOpen(true) }} size="small" style={{ width: 100 }} variant="contained" color="white" fullWidth  >
                                Create
                            </MDButton>
                        </MDBox>
                        <MDBox pt={1}>
                            <Customize_DataTable
                                count={mappingLibraryList.count}
                                rows={mappingLibraryList.results}
                                onPageChange={(page) => { dispatch(getMappingLibraryList(accessToken)) }}
                                columns={[
                                    // { field: "id", headerName: "ID", width: 90 },
                                    {
                                        field: "action", headerName: "Action", width: 110, renderCell: (row) => <Typography>
                                            <Tooltip title="Edit" ><EditIcon fontSize="small" style={{ cursor: "pointer", }} onClick={() => { setopen_edit(true); setcurrentMappingList(row.row) }} /></Tooltip>
                                            <Tooltip title="Delete" ><DeleteIcon fontSize="small" style={{ marginLeft: 8, cursor: "pointer" }} onClick={() => { setopenDeleteModal(true); setcurrentRule(row.row) }} /></Tooltip>
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
                                    { field: "map_name", headerName: "Map Name", width: 150 },
                                    { field: "output_tag", headerName: "Output Tag", width: 150 },
                                    { field: "output_elememt", headerName: "Output Element", width: 150 },
                                    { field: "input_tag", headerName: "Input Tag", width: 150 },
                                    { field: "input_element", headerName: "Input Element", width: 150 },
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
