/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "main/authentication/sign-in";
import SignUp from "main/authentication/sign-up";
import ForgotPassword from "main/authentication/reset-password"
import CreateUser from "main/Master/components/CreateUser";
import CreateRole from "main/Master/components/CreateRole";
import RoleManagement from "main/Master/components/RoleManagement";
import ProfileSetup from "main/TradingPartner/components/ProfileSetup";
import MapSetup from "main/TradingPartner/components/MapSetup";
import Codelist from "main/TradingPartner/components/Codelist";
import MessageSpecialHandling from "main/TradingPartner/components/MessageSpecialHandling";
import CreateProfileSetup from "main/TradingPartner/components/CreateProfileSetup";
import Setup from "main/Connectivity/Components/Setup";


// @mui icons
import Icon from "@mui/material/Icon";
import Inbox from "main/Components/Inbox";
import UserManagement from "main/Master/components/UserManagement";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PublicIcon from '@mui/icons-material/Public';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import RuleOutlinedIcon from '@mui/icons-material/RuleOutlined';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import ChatIcon from '@mui/icons-material/Chat';
import MappingLibrary from "main/TradingPartner/components/MappingLibrary";
import CodeListLibrary from "main/TradingPartner/components/CodeListLibrary";
import HubIcon from '@mui/icons-material/Hub';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import SpecialHandlingManagement from "main/Master/components/SpecialHandlingManagement";
import EngineeringIcon from '@mui/icons-material/Engineering';
import AdvanceSetup from "main/Connectivity/Components/AdvanceSetup";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
    sidebarView: true
  },
  // {
  //   type: "collapse",
  //   name: "Tables",
  //   key: "tables",
  //   icon: <Icon fontSize="small">table_view</Icon>,
  //   route: "/tables",
  //   component: <Tables />,
  //   sidebarView: true
  // },
  // {
  //   type: "collapse",
  //   name: "Billing",
  //   key: "billing",
  //   icon: <Icon fontSize="small">receipt_long</Icon>,
  //   route: "/billing",
  //   component: <Billing />,
  //   sidebarView: true
  // },
  // {
  //   type: "collapse",
  //   name: "Notifications",
  //   key: "notifications",
  //   icon: <Icon fontSize="small">notifications</Icon>,
  //   route: "/notifications",
  //   component: <Notifications />,
  //   sidebarView: true
  // },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
    sidebarView: true
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
  {
    type: "collapse",
    name: "Forgot Password",
    key: "forgot-password",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/forgot-password",
    component: <ForgotPassword />,
  },
  // {
  //   type: "collapse",
  //   name: "Inbox",
  //   key: "inbox",
  //   icon: <Icon fontSize="small">mail</Icon>,
  //   route: "/inbox",
  //   component: <Inbox />,
  //   sidebarView: true
  // },
  {
    type: "collapse",
    name: "Trading Partner",
    key: "trading-partner",
    icon: <PublicIcon fontSize="small" />,
    parent_status: true,
    sidebarView: true
  },
  {
    type: "collapse",
    name: "Profile Setup",
    key: "profile-setup",
    icon: <AssignmentIndIcon fontSize="small" />,
    route: "/profile-setup",
    component: <ProfileSetup />,
    parent_name: "trading-partner",
    sidebarView: true
  },
  {
    type: "collapse",
    name: "Profile Setup",
    key: "profile-setup",
    icon: <Icon fontSize="small">people</Icon>,
    route: "/profile-setup/create-setup",
    component: <CreateProfileSetup />,
  },
  {
    type: "collapse",
    name: "Map Setup",
    key: "map-setup",
    icon: <RuleOutlinedIcon fontSize="small" />,
    route: "/map-setup",
    component: <MapSetup />,
    parent_name: "trading-partner",
    sidebarView: true
  },
  {
    type: "collapse",
    name: "Mapping Library",
    key: "mapping-library",
    icon: <RuleOutlinedIcon fontSize="small" />,
    route: `/map-setup/:map_id`,
    component: <MappingLibrary />
  },
  {
    type: "collapse",
    name: "Codelist",
    key: "codelist",
    icon: <FactCheckIcon fontSize="small" />,
    route: "/codelist",
    component: <Codelist />,
    parent_name: "trading-partner",
    sidebarView: true
  },
  {
    type: "collapse",
    name: "Codelist Library",
    key: "codelist-library",
    icon: <RuleOutlinedIcon fontSize="small" />,
    route: `/codelist/:code_id`,
    component: <CodeListLibrary />
  },
  {
    type: "collapse",
    name: "Message Handling",
    key: "message-special-handling",
    icon: <ChatIcon fontSize="small" />,
    route: "/message-special-handling",
    component: <MessageSpecialHandling />,
    parent_name: "trading-partner",
    sidebarView: true
  },

  {
    type: "collapse",
    name: "Connectivity",
    key: "connectivity",
    icon: <HubIcon fontSize="small" />,
    parent_status: true,
    sidebarView: true
  },
  {
    type: "collapse",
    name: "Setup",
    key: "setup",
    icon: <DisplaySettingsIcon fontSize="small" />,
    route: "/setup",
    component: <Setup />,
    parent_name: "connectivity",
    sidebarView: true
  },
  {
    type: "collapse",
    name: "Advance Setup",
    key: "advance-setup",
    icon: <EngineeringIcon fontSize="small" />,
    route: "/setup/advance-setup",
    component: <AdvanceSetup />,
  },

  {
    type: "collapse",
    name: "Adminstration",
    key: "adminstration",
    icon: <AdminPanelSettingsIcon fontSize="small" />,
    parent_status: true,
    sidebarView: true
  },
  {
    type: "collapse",
    name: "User Management",
    key: "user-management",
    icon: <Icon fontSize="small">people</Icon>,
    route: "/user-management",
    component: <UserManagement />,
    parent_name: "adminstration",
    sidebarView: true
  },
  {
    type: "collapse",
    name: "Role Management",
    key: "role-management",
    icon: <ManageAccountsIcon fontSize="small" />,
    route: "/role-management",
    component: <RoleManagement />,
    parent_name: "adminstration",
    sidebarView: true
  },
  {
    type: "collapse",
    name: "Create User",
    key: "create-user",
    icon: <Icon fontSize="small">manageaccounts</Icon>,
    route: "/user-management/create-user",
    component: <CreateUser />,
  },
  {
    type: "collapse",
    name: "Create Role",
    key: "create-role",
    icon: <Icon fontSize="small">manageaccounts</Icon>,
    route: "/role-management/create-role",
    component: <CreateRole />,
  },
  {
    type: "collapse",
    name: "Special Handling Management",
    key: "special-handling-management",
    icon: <EngineeringIcon fontSize="small" />,
    route: "/special-handling-management",
    component: <SpecialHandlingManagement />,
    parent_name: "adminstration",
    sidebarView: true
  },

];

export default routes;
