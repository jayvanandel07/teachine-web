import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ContextMenuContextType {
  isVisible: boolean;
  position: { top: number; left: number };
  showContextMenu: (position: { top: number; left: number }) => void;
  showContextMenuAtMousePosition: (event: React.MouseEvent) => void;
  hideContextMenu: () => void;
}

const ContextMenuContext = createContext<ContextMenuContextType | undefined>(undefined);

export const useContextMenu = (): ContextMenuContextType => {
  const context = useContext(ContextMenuContext);
  if (!context) {
    throw new Error('useContextMenu must be used within a ContextMenuProvider');
  }
  return context;
};

interface ContextMenuProviderProps {
  children: ReactNode;
}

export const ContextMenuProvider: React.FC<ContextMenuProviderProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [position, setPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  const showContextMenu = (newPosition: { top: number; left: number }) => {
    setPosition(newPosition);
    setIsVisible(true);
  };

  const showContextMenuAtMousePosition = (event: React.MouseEvent) => {
    showContextMenu({ top: event.clientY, left: event.clientX });
  };
  const hideContextMenu = () => {
    setIsVisible(false);
  };

  const contextValue: ContextMenuContextType = {
    isVisible,
    position,
    showContextMenu,
    showContextMenuAtMousePosition,
    hideContextMenu,
  };

  return (
    <ContextMenuContext.Provider value={contextValue}>
      {children}
    </ContextMenuContext.Provider>
  );
};
