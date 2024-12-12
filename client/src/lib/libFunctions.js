// file containing library or extra functions

export function validateAccountCreation(user) {
  let errors = {
    email: false,
    password: false,
  };

  if (!user) return { email: true, password: true };

  if (!/@/.test(user.email)) {
    errors = {
      ...errors,
      email: true,
    };
  }

  const isValidPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{5,}$/;

  if (!isValidPassword.test(user.password)) {
    errors = {
      ...errors,
      password: true,
    };
  }

  return errors;
}
