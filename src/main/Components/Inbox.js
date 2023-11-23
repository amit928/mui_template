import { AppBar, Card, Grid, Icon, Tab, Tabs } from "@mui/material";
import Customize_DataTable from "common/Components/Cutomize_Datatable";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
// Material Dashboard 2 React base styles
import breakpoints from "assets/theme/base/breakpoints";


export default function Inbox() {
    const [checkedIds, setcheckedIds] = useState("")
    const common_color = useSelector((store) => store.common.common_color)
    const [selectedProducts, setSelectedProducts] = useState(null);

    const [tabsOrientation, setTabsOrientation] = useState("horizontal");
    const [tabValue, setTabValue] = useState(0);

    useEffect(() => {
        // A function that sets the orientation state of the tabs.
        function handleTabsOrientation() {
            return window.innerWidth < breakpoints.values.sm
                ? setTabsOrientation("vertical")
                : setTabsOrientation("horizontal");
        }

        /** 
         The event listener that's calling the handleTabsOrientation function when resizing the window.
        */
        window.addEventListener("resize", handleTabsOrientation);

        // Call the handleTabsOrientation function to set the state with the initial value.
        handleTabsOrientation();

        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleTabsOrientation);
    }, [tabsOrientation]);

    const handleSetTabValue = (event, newValue) => setTabValue(newValue);


    const handleCheckedRowIds = (data) => {
        var arrayOfIds = data && data.length > 0 && data.map(obj => obj.id);
        var idString = arrayOfIds && arrayOfIds.length > 0 && arrayOfIds.join(',');
        setcheckedIds(idString)
    }
    const tableRef = useRef(null);
    return <DashboardLayout>
        <DashboardNavbar />
        <MDBox>
            <Grid container spacing={4}>
                <Grid item xs={12} md={12} lg={12} sx={{ ml: "auto" }} mb={1} >
                    <AppBar position="static" >
                        <Tabs orientation={tabsOrientation} value={tabValue} onChange={handleSetTabValue} style={{}} >
                            <Tab
                                label="Tab 1"
                                icon={
                                    <Icon fontSize="small" sx={{ mt: -0.25 }}>
                                        settings
                                    </Icon>
                                }
                            />
                            <Tab
                                label="Tab 2"
                                icon={
                                    <Icon fontSize="small" sx={{ mt: -0.25 }}>
                                        settings
                                    </Icon>
                                }
                            />
                            <Tab
                                label="Tab 3"
                                icon={
                                    <Icon fontSize="small" sx={{ mt: -0.25 }}>
                                        settings
                                    </Icon>
                                }
                            />
                            <Tab
                                label="Tab 4"
                                icon={
                                    <Icon fontSize="small" sx={{ mt: -0.25 }}>
                                        settings
                                    </Icon>
                                }
                            />
                            <Tab
                                label="Tab 5"
                                icon={
                                    <Icon fontSize="small" sx={{ mt: -0.25 }}>
                                        settings
                                    </Icon>
                                }
                            />
                            <Tab
                                label="Tab 6"
                                icon={
                                    <Icon fontSize="small" sx={{ mt: -0.25 }}>
                                        settings
                                    </Icon>
                                }
                            />
                        </Tabs>
                    </AppBar>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <MDBox
                            mx={2}
                            mt={-3}
                            py={1}
                            px={2}
                            variant="gradient"
                            bgColor="info"
                            borderRadius="lg"
                            coloredShadow="info"
                        >
                            <MDTypography variant="h6" color="white">
                                Table Header
                            </MDTypography>
                        </MDBox>
                        <MDBox pt={1}>
                            <Customize_DataTable />
                        </MDBox>
                    </Card>
                </Grid>
            </Grid>
        </MDBox>

    </DashboardLayout>;
}
