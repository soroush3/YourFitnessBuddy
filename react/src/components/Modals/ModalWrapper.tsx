import {ReactNode} from "react";

type ModalWrapperProps = {
  readonly showContents: boolean;
  readonly closeModal: () => void;
  readonly children: ReactNode;
};

export default function ModalWrapper({
  showContents,
  closeModal,
  children,
}: ModalWrapperProps) {
  return showContents ? (
    <div className="modal-backdrop" tabIndex={-1} onClick={closeModal}>
      {children}
    </div>
  ) : null;
}
