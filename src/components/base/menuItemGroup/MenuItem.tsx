import type { ReactNode } from "react";


interface MenuItemProps {
  icon?: ReactNode;
  text: string;
  className?: string;
}

const MenuItem = ({ icon, text, className = '' }: MenuItemProps) => (
  <div className={`menu-item ${className}`}>
    {icon}
    <div className="trello">{text}</div>
  </div>
);

export default MenuItem;