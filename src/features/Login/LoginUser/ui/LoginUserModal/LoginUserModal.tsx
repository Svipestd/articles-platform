import { FC, memo, Suspense } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './LoginUserModal.module.scss';
import { Modal } from '@/shared/ui/Modal/Modal';
import { Loader } from '@/shared/ui/Loader/Loader';
import { LoginUserFormAsync } from '../LoginUserForm/LoginUserForm.async';

interface LoginUserModalProps {
  className?: string;
  children?: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export const LoginUserModal: FC<LoginUserModalProps> = memo((props) => {
  const { className = '', isOpen, onClose } = props;

  return (
    <Modal
      className={classNames(cls.LoginModal, {}, [className])}
      isOpen={isOpen}
      lazy
      onClose={onClose}
    >
      <Suspense fallback={<Loader />}>
        <LoginUserFormAsync />
      </Suspense>
    </Modal>
  );
});
