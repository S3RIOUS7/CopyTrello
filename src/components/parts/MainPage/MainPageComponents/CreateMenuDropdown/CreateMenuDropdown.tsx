
import type { ReactNode } from 'react';
import { DropdownMenu } from '../../../../base/dropDownMenu/DropDownMenu';
import { Input } from '../../../../base/input/Input';
import Button from '../../../../base/button/Button';
import '../../../../../styles/baseComponentsStyles/dropDowns/createDropdownMenu.scss'

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
}: CreateMenuDropdownProps) => {
  return (
    <DropdownMenu
      triggerIcon={triggerIcon}
      panelClassName={`create-menu-dropdown ${className}`}
      triggerClassName={`create-menu-trigger ${triggerClassName}`}
      panelContent={
        <div className="create-menu-content">
          <h3 className="create-menu-title">{menuTitle}</h3>
          
          {beforeInputContent && (
            <div className="create-menu-section before-input">
              {beforeInputContent}
            </div>
          )}
          
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
    />
  );
};