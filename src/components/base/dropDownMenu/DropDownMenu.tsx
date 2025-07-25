import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { Fragment, type ReactNode } from 'react'
import '../../../styles/baseComponentsStyles/dropDowns/dropDownClass.scss'

type AnchorPosition = 
  | 'top'
  | 'top start'
  | 'top end'
  | 'right'
  | 'right start'
  | 'right end'
  | 'bottom'
  | 'bottom start'
  | 'bottom end'
  | 'left'
  | 'left start'
  | 'left end'

interface DropdownMenuProps {
  triggerIcon: ReactNode
  panelContent: ReactNode
  triggerClassName?: string
  panelClassName?: string
  anchor?: AnchorPosition
  onOpen?: () => void
  onClose?: () => void
  asButton?: boolean
  activeTriggerIcon?: ReactNode
  withIconSwap?: boolean 
  menuType?: 'default' | 'workspace' | 'header' | 'create'
}

export const DropdownMenu = ({
  triggerIcon,
  panelContent,
  triggerClassName = '',
  panelClassName = '',
  anchor = 'bottom',
  onOpen,
  onClose,
  asButton = true, // Возвращаем true по умолчанию для совместимости
  activeTriggerIcon,
  withIconSwap = false,
  menuType = 'default' 
}: DropdownMenuProps) => {
  return (
    <Popover className={`dropdown-menu-wrapper ${menuType === 'workspace' ? 'workspace-menu-dropdown' : ''}`}>
      {({ open }) => {
        if (open && onOpen) {
          onOpen();
        } else if (!open && onClose) {
          onClose();
        }
        
        const currentTriggerIcon = withIconSwap && open && activeTriggerIcon 
          ? activeTriggerIcon 
          : triggerIcon;

        return (
          <>
            <PopoverButton 
              as={asButton ? 'button' : Fragment} 
              className={`
                ${menuType === 'workspace' ? 'workspace-menu-dropdown__trigger' : ''}
                ${menuType === 'header' ? 'header-menu-trigger' : ''}
                ${menuType === 'create' ? 'create-menu-trigger' : ''}
                ${triggerClassName}
              `}
            >
              {currentTriggerIcon}
            </PopoverButton>
            <PopoverPanel 
              anchor={anchor} 
              className={`
                ${menuType === 'workspace' ? 'workspace-menu-dropdown__popover' : ''}
                ${menuType === 'header' ? 'header-menu-panel' : ''}
                ${menuType === 'create' ? 'create-menu-panel' : ''}
                ${panelClassName}
              `}
            >
              {panelContent}
            </PopoverPanel>
          </>
        );
      }}
    </Popover>
  )
}