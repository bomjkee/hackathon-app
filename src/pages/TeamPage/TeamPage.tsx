import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { Page } from '../../components/Page/Page';
import { useTeamDetail, useUpdateTeam, useDeleteTeam, useJoinTeam, useLeaveTeam, useIsTeamLeader, useInviteUser } from '../../hooks/useTeams';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { LoaderScreen } from '../../components/LoaderScreen/LoaderScreen';
import { useProfile } from '../../hooks/useProfile';
import { TeamWithMembers, MemberInfo } from '../../types/schemas';
import { PencilIcon, LockClosedIcon, LockOpenIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import './TeamPage.css';

// Простой компонент диалога
const Dialog = ({ title, children, onClose }: { title: string, children: React.ReactNode, onClose: () => void }) => {
  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog-container" onClick={(e) => e.stopPropagation()}>
        <div className="dialog-header">
          <h3>{title}</h3>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <div className="dialog-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export const TeamPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: profileData } = useProfile();

  const [newDescription, setNewDescription] = useState<string>('');
  const [newName, setNewName] = useState<string>('');
  const [inviteUserId, setInviteUserId] = useState<string>('');
  const [inviteError, setInviteError] = useState<string>('');
  const [showInviteDialog, setShowInviteDialog] = useState<boolean>(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
  const [showLeaveDialog, setShowLeaveDialog] = useState<boolean>(false);
  const [showEditDialog, setShowEditDialog] = useState<boolean>(false);

  // Получаем данные команды
  const { data: teamData, isLoading, error, refetch } = useTeamDetail(id ? parseInt(id) : 0);

  // Проверяем, является ли текущий пользователь лидером команды
  const { data: leaderData } = useIsTeamLeader(id ? parseInt(id) : 0);
  const isLeader = leaderData?.is_leader || false;

  // Мутации для действий с командой
  const updateTeamMutation = useUpdateTeam();
  const deleteTeamMutation = useDeleteTeam();
  const joinTeamMutation = useJoinTeam();
  const leaveTeamMutation = useLeaveTeam();
  const inviteUserMutation = useInviteUser();

  // Определяем, является ли текущий пользователь участником команды
  const isMember = teamData?.members.some(member =>
    member.user_id === profileData?.user.telegram_id && (member.role === 'member' || member.role === 'leader')
  ) || false;

  // Обработчики событий
  const handleEditClick = () => {
    if (teamData) {
      setNewName(teamData.team.name);
      setNewDescription(teamData.team.description || '');
      setShowEditDialog(true);
    }
  };

  const handleEditSave = async () => {
    if (!id || !teamData) return;

    try {
      await updateTeamMutation.mutateAsync({
        teamId: parseInt(id),
        name: newName.trim(),
        description: newDescription.trim(),
        is_open: teamData.team.is_open
      });
      setShowEditDialog(false);
      queryClient.invalidateQueries({ queryKey: ['team', parseInt(id)] });
    } catch (error) {
      console.error('Failed to update team:', error);
    }
  };

  const handleOpenStatusToggle = async () => {
    if (!id || !teamData) return;

    try {
      await updateTeamMutation.mutateAsync({
        teamId: parseInt(id),
        is_open: !teamData.team.is_open
      });
      queryClient.invalidateQueries({ queryKey: ['team', parseInt(id)] });
    } catch (error) {
      console.error('Failed to toggle open status:', error);
    }
  };

  const handleDeleteTeam = async () => {
    if (!id) return;

    try {
      await deleteTeamMutation.mutateAsync(parseInt(id));
      navigate('/teams');
    } catch (error) {
      console.error('Failed to delete team:', error);
    }
  };

  const handleJoinTeam = async () => {
    if (!id) return;

    try {
      await joinTeamMutation.mutateAsync(parseInt(id));
      queryClient.invalidateQueries({ queryKey: ['team', parseInt(id)] });
    } catch (error) {
      console.error('Failed to join team:', error);
    }
  };

  const handleLeaveTeam = async () => {
    if (!id) return;

    try {
      await leaveTeamMutation.mutateAsync(parseInt(id));
      navigate('/teams');
    } catch (error) {
      console.error('Failed to leave team:', error);
    }
  };

  const handleInviteSubmit = async () => {
    if (!id || !inviteUserId) return;

    try {
      const inviteUserIdInt = parseInt(inviteUserId);

      await inviteUserMutation.mutateAsync({
        teamId: parseInt(id),
        inviteUserId: inviteUserIdInt
      });
      setInviteUserId('');
      setShowInviteDialog(false);
      setInviteError('');
    } catch (error) {
      console.error('Failed to invite user:', error);
      setInviteError('Не удалось пригласить пользователя. Проверьте ID пользователя.');
    }
  };

  if (isLoading || !profileData) {
    return (
      <div className="team-loading">
        <LoaderScreen message="Загрузка информации о команде..." />
      </div>
    );
  }

  if (error || !teamData) {
    return (
      <div className="team-page">
        <ErrorMessage
          message="Не удалось загрузить данные команды"
          onRetry={refetch}
        />
      </div>
    );
  }

  const { team, members } = teamData;

  return (
    <Page back={true}>
      <div className="team-card">
        <div className="team-header">
          <div className="team-header-title">
            <h2 className="team-name">
              {team.name}
              {isLeader && <PencilIcon onClick={handleEditClick} />}
            </h2>
            {isLeader && (
              <span 
                className={`team-status ${team.is_open ? 'open' : 'closed'}`}
                onClick={handleOpenStatusToggle}
              >
                {team.is_open ? 'Открытая' : 'Закрытая'}
                {team.is_open ? <LockOpenIcon /> : <LockClosedIcon />}
              </span>
            )}
          </div>
        </div>

        <div className="team-description-section">
          <h2 className="section-title">
            <UserGroupIcon />
            Описание
          </h2>
          <p className="team-description">
            {team.description || 'Описание отсутствует'}
          </p>
          {isLeader && (
            <div className="leader-hint">
              <p>Как лидер команды вы можете:</p>
              <ul>
                <li>Редактировать название и описание команды</li>
                <li>Менять тип команды (открытая/закрытая)</li>
                <li>Приглашать новых участников</li>
                <li>Управлять составом команды</li>
              </ul>
            </div>
          )}
        </div>

        {isLeader && (
          <div className="team-leader-actions">
            <button
              className="invite-btn"
              onClick={() => setShowInviteDialog(true)}
            >
              Пригласить
            </button>
            <button
              className="delete-btn"
              onClick={() => setShowDeleteDialog(true)}
            >
              Удалить команду
            </button>
          </div>
        )}

        <div className="team-members-section">
          <h2 className="section-title">
            <UserGroupIcon />
            Участники команды
          </h2>
          <div className="members-list">
            {members.map((member: MemberInfo) => (
              <div key={member.user_id} className="member-item">
                <span className="member-name">{member.tg_name}</span>
                <span className={`member-role ${member.role}`}>
                  {member.role === 'leader' ? 'Лидер' : 'Участник'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="team-actions">
          {!isMember && team.is_open && (
            <button
              className="join-button"
              onClick={handleJoinTeam}
              disabled={joinTeamMutation.isPending}
            >
              {joinTeamMutation.isPending ? 'Присоединение...' : 'Присоединиться к команде'}
            </button>
          )}

          {isMember && !isLeader && (
            <button
              className="leave-button"
              onClick={() => setShowLeaveDialog(true)}
              disabled={leaveTeamMutation.isPending}
            >
              {leaveTeamMutation.isPending ? 'Выход...' : 'Покинуть команду'}
            </button>
          )}
        </div>
      </div>

      {/* Диалоги */}
      {showEditDialog && (
        <Dialog
          title="Редактировать команду"
          onClose={() => setShowEditDialog(false)}
        >
          <div className="dialog-content">
            <div className="form-group">
              <label className="form-label">Название команды</label>
              <input
                type="text"
                className="dialog-input"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Введите название команды"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Описание команды</label>
              <textarea
                className="team-description-textarea"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="Введите описание команды"
              />
            </div>
            <div className="dialog-actions">
              <button onClick={() => setShowEditDialog(false)}>Отмена</button>
              <button
                onClick={handleEditSave}
                disabled={updateTeamMutation.isPending}
              >
                {updateTeamMutation.isPending ? 'Сохранение...' : 'Сохранить'}
              </button>
            </div>
          </div>
        </Dialog>
      )}

      {showInviteDialog && (
        <Dialog
          title="Пригласить участника"
          onClose={() => setShowInviteDialog(false)}
        >
          <div className="dialog-content">
            <p className="dialog-description">
              Введите ID пользователя, которого хотите пригласить в команду
            </p>
            {inviteError && <p className="error-message">{inviteError}</p>}
            <input
              type="text"
              className="dialog-input"
              value={inviteUserId}
              onChange={(e) => setInviteUserId(e.target.value)}
              placeholder="ID пользователя"
            />
            <div className="dialog-actions">
              <button onClick={() => setShowInviteDialog(false)}>Отмена</button>
              <button
                onClick={handleInviteSubmit}
                disabled={inviteUserMutation.isPending}
              >
                {inviteUserMutation.isPending ? 'Отправка...' : 'Пригласить'}
              </button>
            </div>
          </div>
        </Dialog>
      )}

      {showDeleteDialog && (
        <Dialog
          title="Удаление команды"
          onClose={() => setShowDeleteDialog(false)}
        >
          <div className="dialog-content">
            <p className="dialog-description danger">
              Вы уверены, что хотите удалить команду? Это действие нельзя отменить.
            </p>
            <div className="dialog-actions">
              <button onClick={() => setShowDeleteDialog(false)}>Отмена</button>
              <button
                className="danger"
                onClick={handleDeleteTeam}
                disabled={deleteTeamMutation.isPending}
              >
                {deleteTeamMutation.isPending ? 'Удаление...' : 'Удалить'}
              </button>
            </div>
          </div>
        </Dialog>
      )}

      {showLeaveDialog && (
        <Dialog
          title="Покинуть команду"
          onClose={() => setShowLeaveDialog(false)}
        >
          <div className="dialog-content">
            <p className="dialog-description warning">
              Вы уверены, что хотите покинуть команду?
            </p>
            <div className="dialog-actions">
              <button onClick={() => setShowLeaveDialog(false)}>Отмена</button>
              <button
                className="warning"
                onClick={handleLeaveTeam}
                disabled={leaveTeamMutation.isPending}
              >
                {leaveTeamMutation.isPending ? 'Выход...' : 'Покинуть'}
              </button>
            </div>
          </div>
        </Dialog>
      )}
    </Page>
  );
};