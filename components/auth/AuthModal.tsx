import React from 'react';
import SignUpModal from './SignUpModal';
import LoginModal from './LoginModal';
import { useSelector } from '../../redux/store';

interface IProps {
  closeModal: () => void;
}

const AuthModal: React.FC<IProps> = ({ closeModal }): any => {
  const authMode = useSelector((state) => state.auth.authModalMode);

  switch (authMode) {
    case 'signup':
      return <SignUpModal closeModal={closeModal} />;
    case 'login':
      return <LoginModal closeModal={closeModal} />;
    default:
      return;
  }
};

export default AuthModal;
