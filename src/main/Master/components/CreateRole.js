import { Autocomplete, Card, Grid, TextField, Typography } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { NOTIFICATION_COLOUR } from "lib/Constants";
import { validator } from "lib/Utils";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { onSetNotification } from "redux/action";
import { createRole, createUser, getPrivilageList } from "../action";
import { useMaterialUIController } from "context";

export default function CreateRole() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [controller] = useMaterialUIController();
  const { sidenavColor } = controller;

  const accessToken = useSelector(store => store.common.access_token)
  const common_color = useSelector(store => store.common.common_color)
  const privilegeList = useSelector(store => store.master.privilegeList)

  const [role_name, setrole_name] = useState("");
  const [role_description, setrole_description] = useState("");
  const [privilege_names, setprivilege_names] = useState([]);


  const on_create_role = () => {
    if (role_name && role_description && privilege_names) {
      var body = {
        "role_name": role_name,
        "role_description": role_description,
        "privilege_names": privilege_names.length > 0 ? privilege_names.map((item) => { return item.privilege_name }) : []
      }
      dispatch(createRole(accessToken, body, navigate));
    }
    else {
      dispatch(onSetNotification(NOTIFICATION_COLOUR.DANGER, "Required field should not be empty", true))
    }
  }

  return <DashboardLayout>
    <DashboardNavbar />
    <MDBox >
      <Grid container spacing={4} justifyContent={"center"} height={"85vh"} flex={1} alignItems={"center"} >
        <Grid item xs={7} sm={7} >
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
              textAlign="center"
            // style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
            >
              <MDTypography variant="h5" fontWeight="medium" color="white" >
                Create Role
              </MDTypography>

            </MDBox>
            <MDBox pt={3} pb={3} px={3}>

              <MDTypography variant="h5" fontWeight="medium" >
                About Role
              </MDTypography>
              <MDTypography fontSize={15} fontWeight="light" style={{ color: common_color.TEXT_LIGHT_COLOR }} mb={1} >
                Mandatory Information
              </MDTypography>
              <MDBox component="form" role="form">
                <MDBox mb={2}  >
                  <TextField type="text" label="Role Name" variant="outlined" required fullWidth onChange={(e) => { setrole_name(e.target.value) }} />
                </MDBox>
                <MDBox mb={2}  >
                  <TextField type="text" label="Role Description" variant="outlined" required fullWidth onChange={(e) => { setrole_description(e.target.value) }} />
                </MDBox>
                <MDBox mb={2}>
                  <Autocomplete
                    multiple
                    id="tags-standard"
                    options={privilegeList.results ?? []}
                    getOptionLabel={(option) => option.privilege_name}
                    defaultValue={privilege_names}
                    onChange={(e, value) => { setprivilege_names(value) }}
                    renderInput={(params) => (
                      <Typography><TextField
                        {...params}
                        variant="outlined"
                        label="Privileges"
                        placeholder="Select Privileges"
                        helperText="Press Ctrl to select multiple items"
                      /></Typography>
                    )}
                  />

                </MDBox>

                <MDBox mt={4} style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}  >
                  <MDButton onClick={on_create_role} variant="gradient" color={sidenavColor}>
                    create
                  </MDButton>
                </MDBox>
              </MDBox>
            </MDBox>
          </Card>
        </Grid>
      </Grid>
    </MDBox>
  </DashboardLayout>;
}
