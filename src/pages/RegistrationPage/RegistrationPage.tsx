import { useNavigate } from 'react-router-dom';
import { Input, Radio, Spinner } from '@telegram-apps/telegram-ui';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Page } from '../../components/Page/Page';
import { UserRegistrationSchema, type UserRegistrationForm } from '../../types/schemas';
import { useRegisterUser } from '../../hooks/useAuth';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import './RegistrationPage.css';

export const RegistrationPage = () => {
  const navigate = useNavigate();
  const { mutate: registerUser, isPending, error: mutationError } = useRegisterUser();
  
  // Настройка react-hook-form с zod-resolver
  const { 
    control, 
    handleSubmit, 
    watch, 
    formState: { errors } 
  } = useForm<UserRegistrationForm>({
    resolver: zodResolver(UserRegistrationSchema),
    defaultValues: {
      full_name: '',
      is_mirea_student: false,
      group: '',
    }
  });
  
  const isMireaStudent = watch('is_mirea_student');
  
  const onSubmit = (data: UserRegistrationForm) => {
    registerUser(data, {
      onSuccess: (result) => {
        if (result.status === 'success') {
          navigate('/hackathons');
        }
      }
    });
  };

  return (
    <Page back={false}>
        <div className="registration-header">
          <h1 className="registration-title">Регистрация</h1>
          <p className="registration-subtitle">Пожалуйста, заполните информацию о себе</p>
        </div>

        <form className="registration-form" onSubmit={handleSubmit(onSubmit)}>
          {mutationError && (
            <ErrorMessage message={mutationError.message} />
          )}

          <div className="form-group">
            <label htmlFor="full_name" className="form-label">ФИО*</label>
            <Controller
              name="full_name"
              control={control}
              render={({ field }) => (
                <Input
                  id="full_name"
                  {...field}
                  placeholder="Введите ваше полное имя"

                  required
                />
              )}
            />
            {errors.full_name && (
              <p className="field-error">{errors.full_name.message}</p>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Статус студента*</label>
            <div className="radio-group">
              <div className="radio-item">
                <Controller
                  name="is_mirea_student"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Radio
                      id="studentTypeYes"
                      name="studentType"
                      checked={value === true}
                      onChange={() => onChange(true)}
                    />
                  )}
                />
                <label htmlFor="studentTypeYes">Студент МИРЭА</label>
              </div>
              <div className="radio-item">
                <Controller
                  name="is_mirea_student"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Radio
                      id="studentTypeNo"
                      name="studentType"
                      checked={value === false}
                      onChange={() => onChange(false)}
                    />
                  )}
                />
                <label htmlFor="studentTypeNo">Внешний участник</label>
              </div>
            </div>
          </div>

          {isMireaStudent && (
            <div className="form-group">
              <label htmlFor="group" className="form-label">Учебная группа</label>
              <Controller
                name="group"
                control={control}
                render={({ field }) => (
                  <Input
                    id="group"
                    {...field}
                    value={field.value || ''}
                    placeholder="Например: ИКБО-01-20"
                  />
                )}
              />
              {errors.group && (
                <ErrorMessage message={errors.group.message || ''} />
              )}
            </div>
          )}

          <div className="form-actions">
            <button
              type="submit"
              disabled={isPending}
              className="form-button"
            >
              {isPending ? (
                <>
                  <Spinner size="s" /> Регистрация...
                </>
              ) : (
                'Зарегистрироваться'
              )}
            </button>
          </div>
        </form>
    </Page>
  );
}; 