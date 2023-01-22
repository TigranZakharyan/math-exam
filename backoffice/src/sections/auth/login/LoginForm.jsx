import React from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import {
  Link, Stack, IconButton, InputAdornment, TextField, Checkbox,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify/Iconify';

// ----------------------------------------------------------------------

const initalData = {
  email: '',
  password: '',
};

export default function LoginForm({ onSubmit }) {
  const [data, setData] = React.useState(initalData);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleSubmit = () => {
    onSubmit(data);
  }

  const handleChange = ({ target }) => {
    const { id, value } = target;
    setData({...data, [id]: value});
  }

  return (
    <>
      <Stack spacing={3}>
        <TextField id="email" label="Email address" value={data.email} onChange={handleChange} />

        <TextField
          id="password"
          label="Password"
          value={data.password}
          onChange={handleChange}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link href="/" variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="button" variant="contained" onClick={handleSubmit}>
        Login
      </LoadingButton>
    </>
  );
}
