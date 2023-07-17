import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

type SidebarContextType = {
  isCollapsed: boolean;
  setIsCollapsed: (state: boolean) => void;
  isHovered: boolean;
  setIsHovered: (state: boolean) => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(window.innerWidth < 1024 ? true : false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleResize = () => {
    if (window.innerWidth < 1024) {
      setIsCollapsed(true);
    } else {
      setIsCollapsed(false);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <SidebarContext.Provider
      value={{
        isCollapsed,
        setIsCollapsed,
        isHovered,
        setIsHovered,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

const useSidebarContext = () => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebarContext must be used within a SidebarProvider');
  }
  return context;
};

export { SidebarProvider, useSidebarContext };
