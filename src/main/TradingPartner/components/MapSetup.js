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
import { deleteProfileSetup, deleteRuleSetup, getProfileSetupList, getRuleSetupList } from "../action";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useMaterialUIController } from "context";
import CreateRuleSetup from "../modals/CreateRuleSetup";
import DirectionsIcon from '@mui/icons-material/Directions';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import EditRuleSetup from "../modals/EditRuleSetup";
import DeleteModal from "main/Master/modals/DeleteModal";

export default function MapSetup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [controller] = useMaterialUIController();
  const { sidenavColor } = controller;

  const accessToken = useSelector(store => store.common.access_token)
  const profileSetupList = useSelector(store => store.tradingpartner.profileSetupList)
  const ruleSetupList = useSelector(store => store.tradingpartner.ruleSetupList)


  const [open, setOpen] = useState(false)
  const [open_edit_rule, setopen_edit_rule] = useState(false)
  const [currentRule, setcurrentRule] = useState({})
  const [openDeleteModal, setopenDeleteModal] = useState(false)

  useEffect(() => {
    if (accessToken) {
      dispatch(getProfileSetupList(accessToken, {}))
      dispatch(getRuleSetupList(accessToken))
    }
  }, [accessToken])

  const delete_rule_setup = () => {
    dispatch(deleteRuleSetup(accessToken, currentRule.id));
    setopenDeleteModal(false);
  }


  return <DashboardLayout>
    <DashboardNavbar />

    <CreateRuleSetup open={open} handleClose={() => setOpen(false)} profileSetupList={profileSetupList} />
    <EditRuleSetup open={open_edit_rule} handleClose={() => setopen_edit_rule(false)} profileSetupList={profileSetupList} currentRule={currentRule} />
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
                Map Setup
              </MDTypography>
              <MDButton onClick={() => { setOpen(true) }} size="small" style={{ width: 100 }} variant="contained" color="white" fullWidth  >
                Create
              </MDButton>
            </MDBox>
            <MDBox pt={1}>
              <Customize_DataTable
                count={ruleSetupList.count}
                rows={ruleSetupList.results}
                onPageChange={(page) => { dispatch(getRuleSetupList(accessToken, { "page": page, "page_size": PAGE_SIZE })) }}
                columns={[
                  // { field: "id", headerName: "ID", width: 90 },
                  {
                    field: "action", headerName: "Action", width: 110, renderCell: (row) => <Typography>
                      <Tooltip title="Edit" ><EditIcon fontSize="small" style={{ cursor: "pointer", }} onClick={() => { setopen_edit_rule(true); setcurrentRule(row.row) }} /></Tooltip>
                      <Tooltip title="Delete" ><DeleteIcon fontSize="small" style={{ marginLeft: 8, cursor: "pointer" }} onClick={() => { setopenDeleteModal(true); setcurrentRule(row.row) }} /></Tooltip>
                      <Link to={`/map-setup/${row.row.id}`}>
                        <Tooltip title="Go To Mapping" ><DirectionsIcon fontSize="small" style={{ marginLeft: 8, cursor: "pointer" }} /></Tooltip>
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
                  { field: "profile_name", headerName: "Profile Name", width: 150 },
                  { field: "map_name", headerName: "Map Name", width: 150 },
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
