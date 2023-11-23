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
import { deleteCodeList, deleteProfileSetup, deleteRuleSetup, getCodeList, getProfileSetupList, getRuleSetupList } from "../action";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useMaterialUIController } from "context";
import CreateRuleSetup from "../modals/CreateRuleSetup";
import DirectionsIcon from '@mui/icons-material/Directions';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import EditRuleSetup from "../modals/EditRuleSetup";
import DeleteModal from "main/Master/modals/DeleteModal";
import CreateCodeList from "../modals/CreateCodeList";
import EditCodeList from "../modals/EditCodelist";

export default function Codelist() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [controller] = useMaterialUIController();
  const { sidenavColor } = controller;

  const accessToken = useSelector(store => store.common.access_token)
  const profileSetupList = useSelector(store => store.tradingpartner.profileSetupList)
  const ruleSetupList = useSelector(store => store.tradingpartner.ruleSetupList)
  const codeList = useSelector(store => store.tradingpartner.codeList)


  const [open, setOpen] = useState(false)
  const [open_edit_rule, setopen_edit_rule] = useState(false)
  const [currentRule, setcurrentRule] = useState({})
  const [openDeleteModal, setopenDeleteModal] = useState(false)
  const [currentCodelist, setcurrentCodelist] = useState({})

  useEffect(() => {
    if (accessToken) {
      dispatch(getCodeList(accessToken))
      // dispatch(getRuleSetupList(accessToken))
    }
  }, [accessToken])

  const delete_codeList = () => {
    dispatch(deleteCodeList(accessToken, currentCodelist.id));
    setopenDeleteModal(false);
  }


  return <DashboardLayout>
    <DashboardNavbar />

    <CreateCodeList open={open} handleClose={() => setOpen(false)} profileSetupList={profileSetupList} />

    <EditCodeList open={open_edit_rule} handleClose={() => setopen_edit_rule(false)} currentCodelist={currentCodelist} />

    <DeleteModal open={openDeleteModal} handleClose={() => { setopenDeleteModal(false) }} onConfirm={() => delete_codeList()} />

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
                Codelist
              </MDTypography>
              <MDButton onClick={() => { setOpen(true) }} size="small" style={{ width: 100 }} variant="contained" color="white" fullWidth  >
                Create
              </MDButton>
            </MDBox>
            <MDBox pt={1}>
              <Customize_DataTable
                count={codeList.count}
                rows={codeList.results}
                onPageChange={(page) => { dispatch(getCodeList(accessToken, { "page": page, "page_size": PAGE_SIZE })) }}
                columns={[
                  // { field: "id", headerName: "ID", width: 90 },
                  {
                    field: "action", headerName: "Action", width: 110, renderCell: (row) => <Typography>
                      <Tooltip title="Edit" ><EditIcon fontSize="small" style={{ cursor: "pointer", }} onClick={() => { setopen_edit_rule(true); setcurrentCodelist(row.row) }} /></Tooltip>
                      <Tooltip title="Delete" ><DeleteIcon fontSize="small" style={{ marginLeft: 8, cursor: "pointer" }} onClick={() => { setopenDeleteModal(true); setcurrentCodelist(row.row) }} /></Tooltip>
                      <Link to={`/codelist/${row.row.id}`}>
                        <Tooltip title="Go To Library" ><DirectionsIcon fontSize="small" style={{ marginLeft: 8, cursor: "pointer" }} /></Tooltip>
                      </Link>
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
                  { field: "name", headerName: "Name", width: 150 },
                  { field: "description", headerName: "Description", width: 170 },
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
