
import '../../../../../styles/pagesStyles/MainPage/MainPageParts/mainPartCreateDelete.scss'
import { CreateMenuDropdown } from "../CreateMenuDropdown/CreateMenuDropdown";
import { useState } from "react";

const MainComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState('');

  const handleCreate = () => {
    console.log('Создание с текстом:', inputValue);
    setInputValue(''); 
  };

  return (
    <div className="main-content">
      <CreateMenuDropdown
        menuTitle="Создать доску"
        triggerIcon={
          <div className="button-trigger-wrapper">
            <div className="buttom-name">Создать доску</div>
          </div>
        }
        inputValue={inputValue}
        onInputChange={setInputValue}
        inputPlaceholder="Введите название доски"
        createButtonText="Создать"
        onCreate={handleCreate}
        className="main-component-create-menu"
      />
    </div>
  );
};

export default MainComponent;