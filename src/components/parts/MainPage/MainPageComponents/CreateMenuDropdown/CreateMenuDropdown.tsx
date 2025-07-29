import type { ReactNode } from 'react';
import { DropdownMenu } from '../../../../base/dropDownMenu/DropDownMenu';
import { Input } from '../../../../base/input/Input';
import Button from '../../../../base/button/Button';
import '../../../../../styles/baseComponentsStyles/dropDowns/createDropdownMenu.scss';
import SampleTrelloIcon from '../../../../../assets/img/helpMenuPictures/sampleIcon';
import { backgroundButtons, colorButtons } from '../../../../../utils/constants/mainPageConstants/buttonsBackground/backgroundButtons';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../../../../store/storage/store';
import { selectBackground, selectColor } from '../../../../base/features/background/backgroundSlice';
import { CheckIcon } from '../../../../base/icons/CheckIcon';
import { OverflowMenuHorizontalIcon } from '../../../../../assets/img/icon/HorizontalMenuIcon';
import { additionalColorButtons } from '../../../../../utils/constants/mainPageConstants/buttonsBackground/backgroundColorButton';

interface CreateMenuDropdownProps {
  menuTitle: string;
  triggerIcon: ReactNode;
  inputValue: string;
  onInputChange: (value: string) => void;
  inputPlaceholder?: string;
  createButtonText?: string;
  onCreate: () => void;
  beforeInputContent?: ReactNode;
  afterInputContent?: ReactNode;
  className?: string;
  onOpen?: () => void;
  onClose?: () => void;
  triggerClassName?: string;
  showTrelloIcon?: boolean;
}

export const CreateMenuDropdown = ({
  menuTitle,
  triggerIcon,
  inputValue,
  onInputChange,
  inputPlaceholder = '',
  createButtonText = 'Создать',
  onCreate,
  beforeInputContent,
  afterInputContent,
  className = '',
  onOpen,
  onClose,
  triggerClassName = '',
  showTrelloIcon = false,
}: CreateMenuDropdownProps) => {
  const dispatch = useDispatch();
  const { selectedBackground, selectedColor, lastSelectedType } = useSelector((state: RootState) => state.background);

  const handleBackgroundSelect = (button: typeof backgroundButtons[0]) => {
    dispatch(selectBackground(button));
  };

  const handleColorSelect = (button: typeof colorButtons[0]) => {
    dispatch(selectColor(button));
  };

  const getIconStyle = (): React.CSSProperties => {
    if (selectedBackground) {
      return { 
        backgroundImage: `url(${selectedBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      };
    }
    if (selectedColor) {
      return { 
        backgroundColor: selectedColor,
        backgroundImage: 'none'
      };
    }
    return {};
  };

  return (
    <div className="create-menu-wrapper">
      <DropdownMenu
        triggerIcon={
          <div className="create-menu-trigger-content">
            {triggerIcon}
          </div>
        }
        panelClassName={`create-menu-dropdown ${className}`}
        triggerClassName={`create-menu-trigger ${triggerClassName}`}
        panelContent={
          <div className="create-menu-content">
            <h3 className="create-menu-title">{menuTitle}</h3>
            
            {showTrelloIcon && (
              <div className="create-menu-icon-wrapper">
                <div 
                  className="create-menu-trello-icon-container"
                  style={getIconStyle()}
                >
                  <SampleTrelloIcon 
                    width={186} 
                    height={103}
                    primaryColor="#E3E3E3"
                    secondaryColor="white"
                    className="create-menu-trello-icon"
                  />
                </div>
              </div>
            )}
            
            {beforeInputContent && (
              <div className="create-menu-section before-input">
                {beforeInputContent}
              </div>
            )}
            
            <h4 className="create-menu-subtitle">Фон</h4>
            
            <div className="background-buttons-grid">
              {backgroundButtons.map((button) => (
                <button
                  key={button.id}
                  className={`background-button ${lastSelectedType === 'background' && selectedBackground === button.background ? 'selected' : ''}`}
                  style={{ backgroundImage: `url(${button.background})` }}
                  title={button.title}
                  onClick={() => handleBackgroundSelect(button)}
                >
                  {lastSelectedType === 'background' && selectedBackground === button.background && (
                    <span className="selected-check">
                      <CheckIcon size={16} color="#fff" />
                    </span>
                  )}
                </button>
              ))}
            </div>
            
            <h4 className="create-menu-subtitle">Цвет</h4>
            
            <div className="color-buttons-grid">
              {colorButtons.map((button) => {
                if (button.id === 'color6') {
                  return (
                    <DropdownMenu
    key={button.id}
    triggerIcon={
      <div className="button-trigger-wrapper">
        <div
          className={`color-button ${lastSelectedType === 'color' && selectedColor === button.color ? 'selected' : ''}`}
          style={{ backgroundColor: button.color }}
          title={button.title}
        >
          <OverflowMenuHorizontalIcon size={16} color="#42526E" />
          {lastSelectedType === 'color' && selectedColor === button.color && (
            <span className="selected-check">
              <CheckIcon size={16} color="#fff" />
            </span>
          )}
        </div>
      </div>
    }
    panelContent={
      <div className="additional-colors-menu">
        <h4 className="additional-colors-title">Дополнительные цвета</h4>
        <div className="additional-colors-grid">
          {additionalColorButtons.map((btn) => (
            <button
              key={btn.id}
              className={`color-button ${lastSelectedType === 'color' && selectedColor === btn.color ? 'selected' : ''}`}
              style={{ backgroundColor: btn.color }}
              title={btn.title}
              onClick={() => handleColorSelect(btn)}
            >
              {lastSelectedType === 'color' && selectedColor === btn.color && (
                <span className="selected-check">
                  <CheckIcon size={16} color="#fff" />
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    }
    panelClassName="additional-colors-dropdown"
    anchor="right start"
    menuType="color-picker"
    triggerAs="div"
  />
);
                }

                return (
                  <button
                    key={button.id}
                    className={`color-button ${lastSelectedType === 'color' && selectedColor === button.color ? 'selected' : ''}`}
                    style={{ backgroundColor: button.color }}
                    title={button.title}
                    onClick={() => handleColorSelect(button)}
                  >
                    {lastSelectedType === 'color' && selectedColor === button.color && (
                      <span className="selected-check">
                        <CheckIcon size={16} color="#fff" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            
            <Input
              value={inputValue}
              onChange={onInputChange}
              placeholder={inputPlaceholder}
              className="create-menu-input"
            />
            
            {afterInputContent && (
              <div className="create-menu-section after-input">
                {afterInputContent}
              </div>
            )}

            <Button
              buttonStyle="create"
              onClick={onCreate}
              className="create-menu-button"
            >
              {createButtonText}
            </Button>
          </div>
        }
        onOpen={onOpen}
        onClose={onClose}
        asButton={false}
        menuType="create"
      />
    </div>
  );
};