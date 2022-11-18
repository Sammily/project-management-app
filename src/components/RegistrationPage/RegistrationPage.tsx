import { useNavigate } from 'react-router-dom';
import { createUser } from '../../utils/fetch';
import { useAuth } from '../hook/useAuth';
import { useForm, SubmitHandler } from 'react-hook-form';
import { RegistrationInputs } from '../../utils/types';

export function RegistrationPage() {
  const [state, dispatch] = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationInputs>();

  const onSubmit: SubmitHandler<RegistrationInputs> = async (data) => {
    const name = data.name;
    const login = data.login;
    const password = data.password;
    const body = { name: name, login: login, password: password };
    const response = await createUser(body);
    dispatch({
      type: 'user',
      data: {
        username: name,
        login: login,
        token: null,
        id: response._id,
      },
    });
    navigate('/login');
  };

  return (
    <>
      <div>Register page</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Name:
          <input
            {...register('name', {
              required: 'Name is required',
              minLength: { value: 2, message: 'Name is too short' },
              maxLength: { value: 20, message: 'Name is too long' },
              pattern: {
                value: /[a-zA-Z\s-]{2,25}/,
                message: 'Name should contain only letters, whitespace caracters or "-" character',
              },
            })}
          />
          {errors.name && <p>{errors.name.message}</p>}
        </label>
        <label>
          Login:
          <input
            {...register('login', {
              required: 'Login is required',
              maxLength: { value: 20, message: 'Login is too long' },
              minLength: { value: 3, message: 'Login is too short' },
            })}
          />
          {errors.login && <p>{errors.login.message}</p>}
        </label>
        <label>
          Password:
          <input
            type="password"
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 6, message: 'Password is too short' },
              maxLength: { value: 25, message: 'Password is too long' },
              pattern: {
                value: /(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,25}/,
                message:
                  'Password should contain at least one special character (!@#$%^&*), digit and letter',
              },
            })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </label>
        <button type="submit">Create account</button>
      </form>
    </>
  );
}
