import { Link, Typography } from '@mui/material';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Data, SignUpForm } from './SignUpForm';

type FormStep = 'sign_up' | 'thanks';

export const SignUpWidget = () => {
  const [formStep, setFormStep] = useState<FormStep>('sign_up');

  const [, setFormData] = useState<Data>();

  const onNext = () => {
    setFormStep(prevStep => {
      return prevStep === 'sign_up' ? 'thanks' : prevStep;
    });
  };

  const handleClick = () => {
    setTimeout(() => {
      window.location.reload();
    }, 0);
  };

  return (
    <>
      {formStep === 'sign_up' && (
        <SignUpForm
          onNext={onNext}
          saveData={(data: Data) => setFormData(data)}
        />
      )}
      {formStep === 'thanks' && (
        <div>
          <Typography
            variant="h5"
            component="p"
            color="text.primary"
            sx={{
              p: { xs: '100px 0 25px', sm: '200px 0 50px' },
            }}
          >
            Спасибо за регистрацию!
          </Typography>
          <Link
            variant="body1"
            component={RouterLink}
            color="primary"
            display="block"
            mb={16}
            to="/"
            sx={{ textDecoration: 'none' }}
            onClick={handleClick}
          >
            Перейти на главную страницу
          </Link>
        </div>
      )}
    </>
  );
};
