import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Button,
  FormHelperText,
  TextField,
  Typography,
} from '@mui/material';
import { FieldValues, useForm } from 'react-hook-form';
import { z } from 'zod';

import { User } from '../../shared/types';

type Props = {
  onNext: () => void;
  saveData: (data: Data) => void;
};

let userList: User[] = [];

if (localStorage.getItem('users')) {
  userList = JSON.parse(localStorage.getItem('users')!);
}

const SignUpFormSchema = z
  .object({
    username: z
      .string()
      .min(4, {
        message: 'Имя пользователя должно содержать не менее 4 символов',
      })
      .max(20, { message: 'Имя пользователя не должно превышать 20 символов' })
      .refine(username => !userList.some(user => user.username === username), {
        message: 'Имя пользователя уже занято',
      }),
    email: z
      .string()
      .email()
      .refine(email => !userList.some(user => user.email === email), {
        message: 'Адрес электронной почты уже используется',
      }),
    password: z
      .string()
      .min(8, { message: 'Пароль должен содержать не менее 8 символов' })
      .max(20, { message: 'Пароль не должен превышать 20 символов' }),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  });

export type Data = z.infer<typeof SignUpFormSchema>;

export const SignUpForm = ({ onNext, saveData }: Props) => {
  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(SignUpFormSchema),
  });

  const onSubmitSuccess = (data: FieldValues) => {
    saveData(data as Data);

    const newUser = {
      username: data.username,
      email: data.email,
      password: data.password,
    };

    userList.push(newUser);
    localStorage.setItem('users', JSON.stringify(userList));
    onNext();
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
        Регистрация
      </Typography>
      <Box
        component="form"
        display="flex"
        flexDirection="column"
        noValidate
        onSubmit={handleSubmit(onSubmitSuccess)}
      >
        <TextField
          {...register('username')}
          required
          fullWidth
          label="Имя пользователя"
          id="username"
        />
        <FormHelperText error sx={{ height: '20px', mb: '5px' }}>
          {formState.errors?.username?.message &&
            (formState.errors.username.message as string)}
        </FormHelperText>
        <TextField
          {...register('email')}
          required
          fullWidth
          type="email"
          label="Email"
          id="email"
        />
        <FormHelperText error sx={{ height: '20px', mb: '5px' }}>
          {formState.errors?.email?.message &&
            (formState.errors.email.message as string)}
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
          {formState.errors?.password?.message &&
            (formState.errors.password.message as string)}
        </FormHelperText>
        <TextField
          {...register('confirmPassword')}
          required
          fullWidth
          type="password"
          label="Повторите пароль"
          id="confirmPassword"
        />
        <FormHelperText error sx={{ height: '20px', mb: '5px' }}>
          {formState.errors?.confirmPassword?.message &&
            (formState.errors.confirmPassword.message as string)}
        </FormHelperText>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ fontSize: '18px', p: 1, mt: 2, mb: 4 }}
        >
          Присоединиться
        </Button>
      </Box>
    </>
  );
};
