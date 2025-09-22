import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../../store/storage/store';
import type { ModalData } from '../../../store/types/modalWindowTypes/modalWindowType';
import { closeModal, openModal } from '../../../store/redusers/features/slices/modalWindow/modalWindowSlice';


export const useModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.modal.isOpen);
  const modalData = useSelector((state: RootState) => state.modal.data);

  const showModal = useCallback((data?: Partial<ModalData>) => {
    dispatch(openModal(data || {}));
  }, [dispatch]);

  const hideModal = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);

  return {
    isOpen,
    modalData,
    showModal,
    hideModal,
  };
};