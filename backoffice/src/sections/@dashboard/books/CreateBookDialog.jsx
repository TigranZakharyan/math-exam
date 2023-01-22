import React from "react";
// react-props
// @mui
import { styled } from '@mui/material/styles';
import {
  Dialog, DialogContent, Grid, Button, TextField, DialogTitle, DialogActions, FormControl
} from '@mui/material';
// import Image from "mui-image";

// ----------------------------------------------------------------------

const StyledGrid = styled(Grid)(() => ({
  marginTop: 5,
}));

const StyledTextField = styled(TextField)(() => ({
  width: '100%'
}));

function NewBookDialog({ onClose, onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e.target);
  }

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open
    >
      <DialogTitle>Edit the book</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
            <StyledGrid container spacing={2}>
              <Grid item xs={6}>
                <StyledTextField
                  required
                  name="title"
                  label="Title"
                />
              </Grid>
              <Grid item xs={6}>
                <StyledTextField
                  required
                  name="author"
                  label="Author"
                />
              </Grid>
              <Grid item xs={12}>
                <StyledTextField
                  required
                  name="description"
                  label="Description"
                />
              </Grid>
              <Grid item xs={6}>
                <span>Preview</span>
                <StyledTextField
                  required
                  type="file"
                  name="preview"
                  accept="image/*"
                />
              </Grid>
              <Grid item xs={6}>
                <span>File</span>
                <StyledTextField
                  required
                  type="file"
                  name="file"
                  accept=".pdf"
                />
              </Grid>
              <Grid item xs={6}>
                {/* <Image /> */}
              </Grid>
            </StyledGrid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">OK</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default NewBookDialog;


