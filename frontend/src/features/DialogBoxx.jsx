import { useState, forwardRef } from 'react';
import { Button, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText, Slide } from '@mui/material';

export const DialogBoxx = ({ setDupCheck, dupCheck }) => {

    // just disable the warning about not using 'open'
    // eslint-disable-next-line
    const [open, setOpen] = useState(); //open or close the duplicate flight dialog

    //Transition for dialog box
    const Transition = forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });

    const SimpleDialog = () => {

        //Duplicate check is destructured from AddFlight to check if the flight number is a duplicate
        //if it is a duplicate, open the dialog box
        const handleClickOpen = () => {
            if (dupCheck === true) {
                setOpen(true);
            }
        };

        //if the user clicks the close button on the dialog box, reset duplicate check to false and close box
        const handleClose = () => {
            setDupCheck(false);
            setOpen(false);
        };

        return (
            <div>
                <Dialog
                    sx={{
                        "& .MuiDialog-container": {
                            "& .MuiPaper-root": {
                                width: "100%",
                                maxWidth: "28rem",
                                justifyContent: "center",
                                alignItems: "center",
                            },
                        },
                    }}
                    open={handleClickOpen}
                    onClose={handleClose}
                    TransitionComponent={Transition}
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle style={{ fontSize: '2rem' }} id="alert-dialog-title">
                        This flight already exists!
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText style={{ fontSize: '1.3rem' }} id="alert-dialog-description">
                            Please try a different flight number
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button style={{ fontSize: '1.2rem' }} onClick={handleClose} autoFocus>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

    return (
        <SimpleDialog></SimpleDialog>

    );

}