import {
  Box,
  Button,
  FormHelperText,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { ROUTES } from '../../shared/constants';
import { User } from '../../shared/types';

let userList: User[] = [];

if (localStorage.getItem('users')) {
  userList = JSON.parse(localStorage.getItem('users')!);
}

export const SignInForm = () => {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validate = (data: FieldValues) => {
    const user = userList.find(user => user.username === data.username);

    if (!user) {
      setUsernameError('Такого пользователя не существует');
      return false;
    } else {
      setUsernameError('');
    }

    if (user.password !== data.password) {
      setPasswordError('Неверный пароль');
      return false;
    } else {
      setPasswordError('');
    }

    localStorage.setItem('authorized_user', JSON.stringify(user.username));
    navigate(ROUTES.home);
  };

  return (
    <>
      <Typography
        variant="h4"
        component="h1"
        textAlign="center"
        color="text.primary"
        margin="24px 0 36px"
      >
        Вход
      </Typography>
      <Box
        component="form"
        display="flex"
        flexDirection="column"
        noValidate
        onSubmit={handleSubmit(validate)}
      >
        <TextField
          {...register('username')}
          required
          fullWidth
          label="Имя пользователя"
          id="username"
        />
        <FormHelperText error sx={{ height: '20px', mb: '5px' }}>
          {usernameError}
        </FormHelperText>
        <TextField
          {...register('password')}
          required
          fullWidth
          type="password"
          label="Пароль"
          id="password"
        />
        <FormHelperText error sx={{ height: '20px', mb: '5px' }}>
          {passwordError}
        </FormHelperText>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ fontSize: '18px', p: 1, mt: 2 }}
        >
          Отправить
        </Button>
        <Typography
          variant="body1"
          component="p"
          textAlign="center"
          color="text.secondary"
          sx={{
            p: { xs: '25px 0', sm: '50px 0' },
          }}
        >
          {'Нет аккаунта? '}
          <Link
            variant="body1"
            component={RouterLink}
            color="primary"
            to="/sign_up"
            sx={{ textDecoration: 'none' }}
          >
            Регистрация
          </Link>
        </Typography>
      </Box>
    </>
  );
};
