import React from 'react';
// @mui
import { styled, alpha } from '@mui/material/styles';
import {
  Button, Toolbar, Tooltip, IconButton, Typography, OutlinedInput, InputAdornment, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
} from '@mui/material';
// component
import Iconify from '../../../components/iconify/Iconify';

// ----------------------------------------------------------------------

const StyledRoot = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': {
    width: 320,
    boxShadow: theme.customShadows.z8,
  },
  '& fieldset': {
    borderWidth: '1px !important',
    borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
  },
}));

// ----------------------------------------------------------------------

function BooksListToolbar({ numSelected, filterValue, onFilterChange, onDelete }) {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

  const handleDelete = () => {
    toggleModal();
    onDelete();
  };

  return (
    <StyledRoot
      sx={{
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected}
          {' '}
          selected
        </Typography>
      ) : (
        <StyledSearch
          value={filterValue}
          onChange={onFilterChange}
          placeholder="Search book..."
          startAdornment={(
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
            </InputAdornment>
          )}
        />
      )}

      {numSelected > 0 && (
        <>
          <Tooltip title="Delete">
            <IconButton onClick={toggleModal}>
              <Iconify icon="eva:trash-2-fill" />
            </IconButton>
          </Tooltip>
          <Dialog
            open={isOpen}
            onClose={toggleModal}
            aria-labelledby="draggable-dialog-title"
          >
            <DialogTitle>
              Are you sure?
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                The data will be deleted forever.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={toggleModal}>
                Cancel
              </Button>
              <Button onClick={handleDelete}>OK</Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </StyledRoot>
  );
}

export default BooksListToolbar;
