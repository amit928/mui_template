import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';
import MDButton from 'components/MDButton';
import { Paper } from '@mui/material';
import { useSelector } from 'react-redux';


export default function DeleteModal({ open, handleClose, onConfirm }) {

    const common_color = useSelector(store => store.common.common_color);

    return (
        <React.Fragment>
            <Dialog
                open={open}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <Paper style={{ width: 350, backgroundColor: common_color.BACKGROUND_COLOR, color: common_color.TEXT_COLOR }}>
                    <DialogTitle >Delete</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description" >
                            Are you sure want to Delete !
                        </DialogContentText>
                    </DialogContent>

                    <DialogActions>
                        <MDButton onClick={handleClose} style={{ marginRight: 10 }} >
                            Cancel
                        </MDButton>
                        <MDButton style={{ width: 90 }} onClick={onConfirm} variant="gradient" color="error" fullWidth>
                            Delete
                        </MDButton>
                    </DialogActions>
                </Paper>
            </Dialog>
        </React.Fragment>
    );
}
