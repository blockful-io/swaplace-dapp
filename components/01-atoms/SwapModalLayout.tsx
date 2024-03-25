import { CloseCTA } from "@/components/01-atoms";
import { Transition, Dialog } from "@headlessui/react";
import React, { Fragment } from "react";

interface ConfirmSwapModalToggle {
  open: boolean;
  onClose: () => void;
}

interface ConfirmSwapModalText {
  title: string;
  description?: string;
}

interface ISwapModalLayout {
  toggleCloseButton: ConfirmSwapModalToggle;
  text: ConfirmSwapModalText;
  body: React.ReactNode;
  footer?: React.ReactNode;
}

export const SwapModalLayout = ({
  toggleCloseButton,
  text,
  body,
  footer,
}: ISwapModalLayout) => {
  return (
    <>
      <Transition
        show={toggleCloseButton.open}
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          role="button"
          onClick={toggleCloseButton.onClose}
          className="z-40 fixed inset-0 bg-black/30 backdrop-blur-sm"
        />
      </Transition>
      <Dialog open={toggleCloseButton.open} onClose={toggleCloseButton.onClose}>
        <Transition
          show={toggleCloseButton.open}
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
          className="w-[80%] md:w-auto fixed left-1/2 top-1/2 z-50 bg-[#f8f8f8] dark:bg-[#212322] -translate-x-1/2 -translate-y-1/2 rounded-[20px] border-[#353836] "
        >
          <Dialog.Panel
            className={
              "flex flex-col md:min-w-[480px] md:max-w-[480px] md:max-h-[620px] border border-[#353836] rounded-[20px] shadow"
            }
          >
            <div className="border-b border-[#353836]">
              <Dialog.Title
                className={
                  "dark:text-white text-black text-xl font-bold h-[76px] justify-between flex p-6"
                }
              >
                <p className="items-center flex dark:title-h3-normal-dark title-h3-normal">
                  {text.title}
                </p>
                <div role="button" onClick={toggleCloseButton.onClose}>
                  <CloseCTA onClick={toggleCloseButton.onClose} />
                </div>
              </Dialog.Title>
            </div>

            <div className="flex flex-col gap-6 p-6 no-scrollbar overflow-x-hidden overflow-y-auto">
              {text.description && (
                <div className="flex dark:p-normal-2-dark p-normal-2">
                  <Dialog.Description>{text.description}</Dialog.Description>
                </div>
              )}

              {body}
            </div>

            {footer && (
              <div className="flex justify-between items-center w-full p-6 border-t border-[#353836]">
                {footer}
              </div>
            )}
          </Dialog.Panel>
        </Transition>
      </Dialog>
    </>
  );
};
