import React, { useState, useContext } from 'react';
import { GlobalAlert } from '../components/GlobalAlert';

export type IAlert = {
  title: string,
  open: boolean,
  type: string,
  text: string,
  confirmButton: Function,
}

const GlobalContext = React.createContext([] as any);

function GlobalProvider({ children }: { children: React.ReactNode}) {
  const [options, setOptions] = useState<IAlert>({
    title: '',
    type: 'success', // success, error, warning, question
    open: false,
    text: '',
    confirmButton: () => {},
  });

  const handleClose = () => {
    setOptions({ ...options, open: false});
  };

  const { title, type, text, confirmButton } = options;

  return (
    <GlobalContext.Provider value={[options, setOptions]}>
      {options.open && (
        <GlobalAlert
          title={title}
          type={type}
          text={text}
          close={handleClose}
          confirmButton={confirmButton}
        />
      )}
      {children}
    </GlobalContext.Provider>
  );
}

export const useGlobalAlert = () => useContext(GlobalContext);

export default GlobalProvider;