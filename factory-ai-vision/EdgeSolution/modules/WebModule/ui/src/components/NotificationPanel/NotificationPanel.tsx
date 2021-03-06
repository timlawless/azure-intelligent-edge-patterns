import React, { useEffect } from 'react';
import { Flex, CloseIcon, Button } from '@fluentui/react-northstar';
import { useSelector, useDispatch } from 'react-redux';

import { State } from 'RootStateType';
import { mainTheme } from '../../themes/mainTheme';
import { Notification } from '../../reducers/type';
import { getNotifications, clearAllNotifications } from '../../action/creators/notificationActionCreators';
import { NotificationCard } from '../NotificationCard';

type NotificationPanelProps = {
  onDismiss: Function;
};

export const NotificationPanel: React.FC<NotificationPanelProps> = ({ onDismiss }) => {
  const notifications = useSelector<State, Notification[]>((state) => state.notifications);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotifications());
  }, [dispatch]);

  const clearAll = () => {
    dispatch(clearAllNotifications());
  };

  return (
    <div
      style={{
        backgroundColor: '#fff',
        border: `solid ${mainTheme.siteVariables.colorScheme.brand.border} 1px`,
        height: '100%',
        width: '100%',
        overflow: 'scroll',
      }}
    >
      <Flex vAlign="center" space="between" styles={{ padding: '10px' }}>
        <h2>Notification</h2>
        <Button icon={<CloseIcon />} text iconOnly size="large" onClick={(): void => onDismiss()} />
      </Flex>
      <Button text content="Clear All" onClick={clearAll} />
      <Flex column hAlign="center" gap="gap.medium" styles={{ padding: '10px' }}>
        {notifications.map((e) => (
          <NotificationCard key={e.id} notification={e} />
        ))}
      </Flex>
    </div>
  );
};
