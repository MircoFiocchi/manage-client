import React, { FC, createContext, useReducer, useContext } from 'react';
import ModalAlert from '@/components/modal/ModalAlert';

interface ModalContextData {
  showModal: boolean;
  messageModal: string;
  errorModal: boolean;
  openModal: (payload: ModalType) => void;
  closeModal: () => void;
  onClick?: () => void;
}

interface ModalType {
  messageModal: string;
  errorModal: boolean;
  onClick?: () => void;
}

const ModalContext = createContext<ModalContextData | undefined>(undefined);

interface ModalProviderProps {
  children: React.ReactNode;
}

type Action =
  | { type: 'SET_MODAL'; payload: ModalType }
  | { type: 'CLOSE_MODAL' };

interface State {
  showModal: boolean;
  messageModal: string;
  errorModal: boolean;
  onClick?: () => void;
}

const initialState: State = {
  showModal: false,
  errorModal: false,
  messageModal: '',
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_MODAL':
      return {
        showModal: true,
        errorModal: action.payload.errorModal,
        messageModal: action.payload.messageModal,
        onClick: action.payload.onClick,
      };
    case 'CLOSE_MODAL':
      return {
        showModal: false,
        errorModal: false,
        messageModal: '',
        onClick: undefined,
      };
    default:
      return state;
  }
};

const ModalProvider: FC<ModalProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const openModal = (payload: ModalType) => {
    dispatch({ type: 'SET_MODAL', payload });
  };

  const closeModal = () => {
    dispatch({ type: 'CLOSE_MODAL' });
  };

  const contextValue: ModalContextData = {
    showModal: state.showModal,
    errorModal: state.errorModal,
    messageModal: state.messageModal,
    openModal,
    closeModal,
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {state.showModal && (
        <ModalAlert
          error={state.errorModal}
          message={state.messageModal}
          onClose={state.onClick || closeModal}
        />
      )}
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;

export function useModalContext() {
  return useContext(ModalContext) as ModalContextData;
}
