
import type { ReactNode } from "react";
import MenuItem from "./MenuItem";

interface MenuGroupProps {
  title?: string;
  items: Array<{
    icon?: ReactNode;
    text: string;
  }>;
}

const MenuGroup = ({ title, items }: MenuGroupProps) => (
  <div className="menu-group">
    {title && <div className="group-title">{title}</div>}
    {items.map((item, index) => (
      <MenuItem key={index} icon={item.icon} text={item.text} />
    ))}
  </div>
);

export default MenuGroup;