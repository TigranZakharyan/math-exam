import React from 'react';
// @mui
import { MenuItem, TextField } from '@mui/material';

// ----------------------------------------------------------------------

function BlogPostsSort({ options, onSort }) {
  return (
    <TextField select size="small" value="latest" onChange={onSort}>
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}

export default BlogPostsSort;
