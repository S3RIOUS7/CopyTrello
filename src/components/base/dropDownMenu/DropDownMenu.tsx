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
  menuType?: 'default' | 'workspace' | 'header' | 'create' | 'color-picker'
  triggerAs?: 'button' | 'div'
}

export const DropdownMenu = ({
  triggerIcon,
  panelContent,
  triggerClassName = '',
  panelClassName = '',
  anchor = 'bottom',
  onOpen,
  onClose,
  asButton = true,
  activeTriggerIcon,
  withIconSwap = false,
  menuType = 'default',
  triggerAs = 'button'
}: DropdownMenuProps) => {
  return (
    <Popover className={`dropdown-menu-wrapper ${menuType}-dropdown-wrapper`}>
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
              as={asButton ? triggerAs : Fragment} 
              className={`
                ${menuType}-dropdown-trigger
                ${triggerClassName}
              `}
            >
              {currentTriggerIcon}
            </PopoverButton>
            <PopoverPanel 
              anchor={anchor} 
              className={`
                ${menuType}-dropdown-panel
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