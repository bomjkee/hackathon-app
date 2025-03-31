import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Radio, Spinner } from '@telegram-apps/telegram-ui';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Page } from '../../components/Page/Page';
import { TeamCreateSchema, TeamCreate } from '../../types/schemas';
import { useHackathons } from '../../hooks/useHackathons';
import { useCreateTeam } from '../../hooks/useTeams';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import './CreateTeamPage.css';
import { LoaderScreen } from '../../components/LoaderScreen/LoaderScreen';

export const CreateTeamPage = () => {
  const navigate = useNavigate();
  const { data: hackathons, isLoading: isLoadingHackathons, error: hackathonsError } = useHackathons();
  const { mutate: createTeam, isPending: isSubmitting, error: mutationError } = useCreateTeam();
  
  const { 
    control, 
    handleSubmit, 
    setValue,
    formState: { errors }
  } = useForm<TeamCreate>({
    resolver: zodResolver(TeamCreateSchema),
    defaultValues: {
      name: '',
      description: '',
      is_open: true,
      hackathon_id: 0
    }
  });
  
  useEffect(() => {
    if (hackathons && hackathons.length > 0) {
      setValue('hackathon_id', hackathons[0].id);
    }
  }, [hackathons, setValue]);
  
  const onSubmit = (data: TeamCreate) => {
    createTeam(data, {
      onSuccess: (result) => {
        navigate('/teams');
      },
      onError: (error) => {
        console.error('Ошибка при создании команды:', error);
      }
    });
  };

  return (
    <Page 
      back={true}
      title="Создание команды"
      subtitle="Заполните информацию о вашей команде"
    >
      {isLoadingHackathons ? (
        <LoaderScreen message="Загрузка хакатонов..." />
      ) : (
        <form className="page-form" onSubmit={handleSubmit(onSubmit)}>
          {(hackathonsError || mutationError) && (
            <ErrorMessage 
              message={hackathonsError?.message || mutationError?.message || 'Произошла ошибка. Пожалуйста, попробуйте еще раз.'} 
            />
          )}

          <div className="form-group">
            <label htmlFor="name" className="form-label">Название команды*</label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  id="name"
                  {...field}
                  placeholder="Введите название команды"
                  required
                  className={errors.name ? 'error' : ''}
                />
              )}
            />
            {errors.name && (
              <p className="form-error">{errors.name.message}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">Описание команды</label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <textarea
                  id="description"
                  {...field}
                  value={field.value || ''}
                  placeholder="Опишите вашу команду, какие специалисты нужны, над чем будете работать"
                  className={`form-description-textarea ${errors.description ? 'error' : ''}`}
                />
              )}
            />
            {errors.description && (
              <p className="form-error">{errors.description.message}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="hackathon_id">Хакатон*</label>
            <Controller
              name="hackathon_id"
              control={control}
              render={({ field: { onChange, value } }) => (
                <select
                  id="hackathon_id"
                  value={value}
                  onChange={(e) => onChange(Number(e.target.value))}
                  required
                  className={`form-select ${errors.hackathon_id ? 'error' : ''}`}
                >
                  {hackathons && hackathons.length > 0 ? (
                    hackathons.map((hackathon) => (
                      <option key={hackathon.id} value={hackathon.id}>
                        {hackathon.name}
                      </option>
                    ))
                  ) : (
                    <option value="">Нет доступных хакатонов</option>
                  )}
                </select>
              )}
            />
            {errors.hackathon_id && (
              <p className="form-error">{errors.hackathon_id.message}</p>
            )}
          </div>

          <div className="form-group">
            <label>Тип команды</label>
            <div className="radio-group">
              <div className="radio-item">
                <Controller
                  name="is_open"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Radio
                      id="teamTypeOpen"
                      name="teamType"
                      checked={value === true}
                      onChange={() => onChange(true)}
                    />
                  )}
                />
                <label htmlFor="teamTypeOpen">Открытая (любой может присоединиться)</label>
              </div>
              <div className="radio-item">
                <Controller
                  name="is_open"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Radio
                      id="teamTypeClosed"
                      name="teamType"
                      checked={value === false}
                      onChange={() => onChange(false)}
                    />
                  )}
                />
                <label htmlFor="teamTypeClosed">Закрытая (только по приглашению)</label>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button
              type="submit"
              disabled={isSubmitting || isLoadingHackathons || !hackathons || hackathons.length === 0}
              className="form-button"
            >
              {isSubmitting ? 'Создание...' : 'Создать команду'}
            </button>
          </div>
        </form>
      )}
    </Page>
  );
}; 