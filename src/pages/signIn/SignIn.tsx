import { Container } from '@mui/material';

import { SignInWidget } from '../../widgets/signInWidget';

export const SignIn = () => {
  return (
    <Container maxWidth="xs" sx={{ p: '0 24px' }}>
      <SignInWidget />
    </Container>
  );
};
