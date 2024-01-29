import { ScriptProps } from "next/script";
import Button from "./Button";
import Typography from "./Typography";
import { useEffect, useState } from "react";

interface ModalProps extends ScriptProps {
  title: string;
  id: string;
  hidden: boolean;
  onCloseButtonClicked?: () => void;
  disableBg?: boolean;
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
}

export default function Modal({
  children,
  title,
  hidden,
  id,
  onCloseButtonClicked,
  ...props
}: ModalProps) {
  //const rest = props;
  /*const [modalVisible, setModalVisible] = useState<boolean>(!hidden!);

  useEffect(() => {
    setModalVisible(!hidden);
  }, [hidden]);*/

  return (
    <div>
      {/* Backdrop */}
      <div
        className={`${
          !props.modalVisible || props.disableBg ? "hidden" : ""
        } fixed inset-0 opacity-50 bg-black z-40`}
      ></div>

      {/* Modal */}
      <div
        id={id}
        data-modal-backdrop="static"
        aria-hidden="true"
        className={`${
          !props.modalVisible ? "hidden" : ""
        } fixed inset-0 overflow-y-auto overflow-x-hidden flex items-center justify-center z-50`}
      >
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative rounded-lg shadow bg-gray-300">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-600">
                <Typography>{title}</Typography>
              </div>
              <div className="p-4 md:p-5 space-y-4">{children}</div>
              <div className="flex items-center p-4 md:p-5 border-t border-gray-600 rounded-b justify-end">
                <Button
                  onClick={() => {
                    props.setModalVisible(false);
                    if (onCloseButtonClicked) onCloseButtonClicked();
                  }}
                >
                  OK
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
