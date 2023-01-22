import React from 'react';
// icons
import { Icon } from '@iconify/react';
// @mui
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

const Iconify = React.forwardRef(({ icon, width = 20, sx }, ref) => (
  <Box ref={ref} component={Icon} icon={icon} sx={{ width, height: width, ...sx }} />
));

export default Iconify;
