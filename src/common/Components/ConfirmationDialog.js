import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Link, useNavigate } from 'react-router-dom';
import MDButton from 'components/MDButton';
import { Paper } from '@mui/material';
import { useSelector } from 'react-redux';
import { deleteUserDataFromStorage } from 'lib/Utils';


// const Transition = React.forwardRef(function Transition(props, ref) {
//     return <Slide direction="left" ref={ref} {...props} />;
// });

export default function AlertDialogSlide({ open, handleClose }) {

    const navigate = useNavigate();

    const common_color = useSelector(store => store.common.common_color);

    const onLogout = () => {
        deleteUserDataFromStorage('loginData');
        navigate("/authentication/sign-in")
    }


    return (
        <React.Fragment>
            <Dialog
                open={open}
                // TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <Paper style={{ width: 350, backgroundColor: common_color.BACKGROUND_COLOR, color: common_color.TEXT_COLOR }}>
                    <DialogTitle >Logout</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description" >
                            Are you sure want to Logout !
                        </DialogContentText>
                    </DialogContent>

                    <DialogActions>
                        <MDButton onClick={handleClose} style={{ marginRight: 10 }} >
                            Cancel
                        </MDButton>
                        <MDButton style={{width:90}} onClick={onLogout} variant="gradient" color="error" fullWidth>
                            Logout
                        </MDButton>
                    </DialogActions>
                </Paper>
            </Dialog>
        </React.Fragment>
    );
}
