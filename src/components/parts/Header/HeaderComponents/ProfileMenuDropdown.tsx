import Avatar from "../../../../assets/img/icon/Avatar";
import UserGroupIcon from "../../../../assets/img/icon/UserGroupIcon";
import MenuGroup from "../../../base/menuItemGroup/MenuGroup";


const ProfileMenuDropdown = () => {
  const menuGroups = [
    {
      title: "Профиль",
      items: [
        { icon: <Avatar />, text: "user@example.com" },
        { text: "Переключение аккаунтов" },
        { text: "Управление аккаунтом" }
      ]
    },
    {
      title: "TRELLO",
      items: [
        { text: "Профиль и доступ" },
        { text: "Действия" },
        { text: "Карточки" },
        { text: "Настройки" },
        { text: "Выбор темы" }
      ]
    },
    {
      items: [
        { icon: <UserGroupIcon size={16} style={{ margin: '4px' }} />, text: "Создать рабочее пространство" }
      ]
    },
    {
      items: [
        { text: "Помощь" },
        { text: "Горячие клавиши" }
      ]
    },
    {
      items: [
        { text: "Выйти" }
      ]
    }
  ];

  return (
    <div className="drop-menu">
      {menuGroups.map((group, index) => (
        <MenuGroup key={index} title={group.title} items={group.items} />
      ))}
    </div>
  );
};

export default ProfileMenuDropdown;