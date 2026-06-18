import { App as AntdApp } from 'antd';
import { useEffect, type PropsWithChildren } from 'react';
import { useAuthStore } from '@/app/store/auth.store';
import { antdUtils } from '@/shared/utils/antd';

/**
 * 认证上下文 Provider
 *
 * 承接 syndra-admin App.tsx 中的 antd App 实例初始化。
 * 菜单与按钮权限加载会在后续真实接口和权限 store 完成后接入这里。
 */
export function AuthProvider({ children }: PropsWithChildren) {
  const { notification, message, modal } = AntdApp.useApp();
  const isLogin = useAuthStore((state) => state.isLogin);
  const roleId = useAuthStore((state) => state.roleId);

  useEffect(() => {
    antdUtils.setMessageInstance(message);
    antdUtils.setNotificationInstance(notification);
    antdUtils.setModalInstance(modal);
  }, [message, modal, notification]);

  useEffect(() => {
    if (!isLogin || !roleId) {
      return;
    }

    // TODO: 接入菜单与按钮权限接口后，在这里触发权限数据预加载。
  }, [isLogin, roleId]);

  return children;
}
