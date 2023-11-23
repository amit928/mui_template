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
import { deleteMessageSpecialHandling, getMessageSpecialHandling, getProfileSetupList, getSpecialHandlingManagementList } from "../action";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useMaterialUIController } from "context";
import DirectionsIcon from '@mui/icons-material/Directions';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteModal from "main/Master/modals/DeleteModal";
import CreateMessageHandling from "../modals/CreateMessageHandling";
import EditMessageHandling from "../modals/EditMessageHandling";

export default function MessageSpecialHandling() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [controller] = useMaterialUIController();
  const { sidenavColor } = controller;

  const accessToken = useSelector(store => store.common.access_token)
  const profileSetupList = useSelector(store => store.tradingpartner.profileSetupList)
  const messageSpecialHandlingList = useSelector(store => store.tradingpartner.messageSpecialHandlingList)
  const specialHandlingManagementList = useSelector(store => store.tradingpartner.specialHandlingManagementList)


  const [open, setOpen] = useState(false)
  const [open_edit, setopen_edit] = useState(false)
  const [currentMessageHandling, setcurrentMessageHandling] = useState({})
  const [openDeleteModal, setopenDeleteModal] = useState(false)

  useEffect(() => {
    if (accessToken) {
      dispatch(getMessageSpecialHandling(accessToken, 1))
      dispatch(getSpecialHandlingManagementList(accessToken, 1))
      dispatch(getProfileSetupList(accessToken, {}))
    }
  }, [accessToken])

  const delete_specialHandling = () => {
    dispatch(deleteMessageSpecialHandling(accessToken, currentMessageHandling.id));
    setopenDeleteModal(false);
  }


  return <DashboardLayout>
    <DashboardNavbar />

    <CreateMessageHandling open={open} handleClose={() => setOpen(false)} profileSetupList={profileSetupList} specialHandlingList={specialHandlingManagementList} />

    <EditMessageHandling open={open_edit} handleClose={() => setopen_edit(false)} currentMessageHandling={currentMessageHandling} profileSetupList={profileSetupList} specialHandlingList={specialHandlingManagementList} />

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
                Message Special Handling
              </MDTypography>
              <MDButton onClick={() => { setOpen(true) }} size="small" style={{ width: 100 }} variant="contained" color="white" fullWidth  >
                Create
              </MDButton>
            </MDBox>
            <MDBox pt={1}>
              <Customize_DataTable
                count={messageSpecialHandlingList.count}
                rows={messageSpecialHandlingList.results}
                onPageChange={(page) => { dispatch(getMessageSpecialHandling(accessToken, page)) }}
                columns={[
                  // { field: "id", headerName: "ID", width: 90 },
                  {
                    field: "action", headerName: "Action", width: 110, renderCell: (row) => <Typography>
                      <Tooltip title="Edit" ><EditIcon fontSize="small" style={{ cursor: "pointer", }} onClick={() => { setopen_edit(true); setcurrentMessageHandling(row.row) }} /></Tooltip>
                      <Tooltip title="Delete" ><DeleteIcon fontSize="small" style={{ marginLeft: 8, cursor: "pointer" }} onClick={() => { setopenDeleteModal(true); setcurrentMessageHandling(row.row) }} /></Tooltip>
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
                  { field: "special_handling_type", headerName: "Special Handling Type ", width: 170 },
                  { field: "special_handling_name", headerName: "Special Handling Name ", width: 170 },
                  { field: "rule_description", headerName: "Rule Description ", width: 170 },
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
