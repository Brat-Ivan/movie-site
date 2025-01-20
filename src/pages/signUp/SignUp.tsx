import { Container } from '@mui/material';

import { SignUpWidget } from '../../widgets/signUpWidget';

export const SignUp = () => {
  return (
    <Container
      maxWidth="xs"
      sx={{ p: '0 24px', m: '0 auto', textAlign: 'center' }}
    >
      <SignUpWidget />
    </Container>
  );
};
