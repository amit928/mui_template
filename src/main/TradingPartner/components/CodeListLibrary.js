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
import { deleteCodeListLibrary, deleteMapping, deleteProfileSetup, deleteRuleSetup, getCodeList, getCodeListLibrary, getMappingLibraryList, getProfileSetupList, getRuleSetupList } from "../action";
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
import CreateCodelistLibrary from "../modals/CreateCodelistLibrary";
import EditCodelistLibrary from "../modals/EditCodelistLibrary";

export default function CodeListLibrary() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const [controller] = useMaterialUIController();
    const { sidenavColor } = controller;

    const accessToken = useSelector(store => store.common.access_token)
    const codeListLibrary = useSelector(store => store.tradingpartner.codeListLibrary)
    const ruleSetupList = useSelector(store => store.tradingpartner.ruleSetupList)
    const codeList = useSelector(store => store.tradingpartner.codeList)
    const profileSetupList = useSelector(store => store.tradingpartner.profileSetupList)


    const [open, setOpen] = useState(false)
    const [open_edit, setopen_edit] = useState(false)
    const [openDeleteModal, setopenDeleteModal] = useState(false)
    const [currentCodelistLibrary, setcurrentCodelistLibrary] = useState({})

    useEffect(() => {
        if (accessToken) {
            dispatch(getProfileSetupList(accessToken, { "page": 1, "page_size": PAGE_SIZE }))

            dispatch(getCodeListLibrary(accessToken, { "page": 1, "page_size": PAGE_SIZE, "conversion_list_id": params.code_id }));
            dispatch(getCodeList(accessToken))
        }
    }, [accessToken])

    const delete_coldelist_library = () => {
        dispatch(deleteCodeListLibrary(accessToken, currentCodelistLibrary.id, params.code_id));
        setopenDeleteModal(false);
    }

    const getNameFromCodelistId = (id) => {
        var name = ""
        codeList.results && codeList.results.length > 0 && codeList.results.map((item, index) => {
            if (item.id == id) {
                name = item.name
            }
        })
        return name
    }

    return <DashboardLayout>
        <DashboardNavbar />

        <CreateCodelistLibrary open={open} handleClose={() => setOpen(false)} ruleSetupList={ruleSetupList} code_id={params.code_id} profileSetupList={profileSetupList} codelist_name={getNameFromCodelistId(params.code_id)} />

        <EditCodelistLibrary open={open_edit} handleClose={() => setopen_edit(false)} currentCodelistLibrary={currentCodelistLibrary} code_id={params.code_id} profileSetupList={profileSetupList} codelist_name={getNameFromCodelistId(params.code_id)} />

        <DeleteModal open={openDeleteModal} handleClose={() => { setopenDeleteModal(false) }} onConfirm={() => delete_coldelist_library()} />

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
                                Codelist Library
                            </MDTypography>
                            <MDButton onClick={() => { setOpen(true) }} size="small" style={{ width: 100 }} variant="contained" color="white" fullWidth  >
                                Create
                            </MDButton>
                        </MDBox>
                        <MDBox pt={1}>
                            <Customize_DataTable
                                count={codeListLibrary.count}
                                rows={codeListLibrary.results}
                                onPageChange={(page) => { dispatch(getCodeListLibrary(accessToken, { "page": 1, "page_size": PAGE_SIZE, "conversion_list_id": params.code_id })) }}
                                columns={[
                                    // { field: "id", headerName: "ID", width: 90 },
                                    {
                                        field: "action", headerName: "Action", width: 110, renderCell: (row) => <Typography>
                                            <Tooltip title="Edit" ><EditIcon fontSize="small" style={{ cursor: "pointer", }} onClick={() => { setopen_edit(true); setcurrentCodelistLibrary(row.row) }} /></Tooltip>
                                            <Tooltip title="Delete" ><DeleteIcon fontSize="small" style={{ marginLeft: 8, cursor: "pointer" }} onClick={() => { setopenDeleteModal(true); setcurrentCodelistLibrary(row.row) }} /></Tooltip>
                                        </Typography>
                                    },
                                    // {
                                    //     field: "is_active", renderCell: (row) => <MDBox ml={1} >
                                    //         {row.row.is_active ?
                                    //             <Tooltip title="Active">
                                    //                 <CheckCircleIcon color="success" fontSize="medium" />
                                    //             </Tooltip> :
                                    //             <Tooltip title="In-active">
                                    //                 <CancelIcon color="error" fontSize="medium" />
                                    //             </Tooltip>}
                                    //     </MDBox>, headerName: "Status", width: 90
                                    // },
                                    { field: "tp_profile_name", headerName: "Profile Name", width: 150 },
                                    { field: "code_list_name", headerName: "Codelist Name", width: 150 },
                                    { field: "lookup_value", headerName: "LookUp Value", width: 150 },
                                    { field: "text1", headerName: "Replace Value 1", width: 150 },
                                    { field: "text2", headerName: "Replace Value 2", width: 150 },
                                    { field: "text3", headerName: "Replace Value 3", width: 150 },
                                    { field: "text4", headerName: "Replace Value 4", width: 150 },
                                    { field: "text5", headerName: "Replace Value 5", width: 150 },
                                    { field: "text6", headerName: "Replace Value 6", width: 150 },
                                    { field: "text7", headerName: "Replace Value 7", width: 150 },
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
