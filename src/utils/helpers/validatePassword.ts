export const validatePassword = (passwrd: string) => {
  const regex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!#$%&()*+,.:<>?@^_{|}~-])(?!.*\s).{8,}$/;
  return regex.test(passwrd);
};
