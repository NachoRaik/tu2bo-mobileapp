import { validateEmail } from '@utils/email';

export const infoValid = (username, email, password, confirmPw) => {
  const emailValid = validateEmail(email);
  const passwordValid = password.length > 0;
  const usernameValid = username.length > 0;
  return (
    !emailValid || !usernameValid || !passwordValid || password !== confirmPw
  );
};
