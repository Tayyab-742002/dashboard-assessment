export interface NavItem {
    label: string;
    path: string;
    icon: React.ReactNode;
  }
  
  export interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
  }
  