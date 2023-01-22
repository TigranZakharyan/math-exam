import React from 'react';
// @mui
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

const SvgColor = React.forwardRef(({ src, sx }, ref) => (
  <Box
    component="span"
    className="svg-color"
    ref={ref}
    sx={{
      width: 24,
      height: 24,
      display: 'inline-block',
      bgcolor: 'currentColor',
      mask: `url(${src}) no-repeat center / contain`,
      WebkitMask: `url(${src}) no-repeat center / contain`,
      ...sx,
    }}
  />
));

export default SvgColor;
