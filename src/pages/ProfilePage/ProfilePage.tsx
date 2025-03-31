import { Link } from 'react-router-dom';
import { Page } from '../../components/Page/Page';
import { useProfile } from '../../hooks/useProfile';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { LoaderScreen } from '../../components/LoaderScreen/LoaderScreen';
import './ProfilePage.css';

export const ProfilePage = () => {
  const { data: profile, isLoading, error: profileError, refetch: refetchProfile } = useProfile();

  if (isLoading) {
    return (
      <Page back={false}>
          <LoaderScreen message="Загрузка профиля..." />
      </Page>
    );
  }

  if (profileError) {
    return (
      <Page back={false}>
          <ErrorMessage message="Ошибка загрузки профиля" onRetry={refetchProfile} />
      </Page>
    );
  }

  return (
    <Page back={false}>
      <div className="profile-page">
        <h2 className="profile-title">Мой профиль</h2>

        <div className="profile-content">
          {profile && profile.user && (
            <div className="profile-section">
              <h2 className="profile-section-title">Личная информация</h2>
              <div className="profile-user-info">

                <div className="profile-info-item">
                  <span className="profile-info-label">Имя пользователя:</span>
                  <span>@{profile.user.username}</span>
                </div>

                <div className="profile-info-item">
                  <span className="profile-info-label">Telegram ID:</span>
                  <span>{profile.user.telegram_id}</span>
                </div>

                {profile.user.first_name && (
                  <div className="profile-info-item">
                    <span className="profile-info-label">Имя:</span>
                    <span>{profile.user.first_name}</span>
                  </div>
                )}

                {profile.user.last_name && (
                  <div className="profile-info-item">
                    <span className="profile-info-label">Фамилия:</span>
                    <span>{profile.user.last_name}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="profile-section">
            <h2 className="profile-section-title">Мои команды</h2>

            {!profile || !profile.teams || profile.teams.length === 0 ? (
              <div className="profile-no-teams">
                <p>Вы еще не состоите ни в одной команде</p>
                <Link to="/teams" className="profile-link">Найти команду</Link>
              </div>
            ) : (
              <div className="profile-teams-list">
                {profile.teams.map(team => (
                  <Link key={team.id} to={`/teams/${team.id}`} className="team-card-link">
                    <div className="team-card">
                      <div className="team-card-header">
                        <h3 className="team-card-title">{team.name}</h3>
                        <span className={`profile-team-type-badge ${team.is_open ? 'open' : 'closed'}`}>
                          {team.is_open ? 'Открытая' : 'Закрытая'}
                        </span>
                      </div>
                      {team.description && (
                        <p className="team-card-description">{team.description}</p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Page>
  );
};