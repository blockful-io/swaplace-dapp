// import { Fragment, useState } from "react";
// import { Dialog, Transition } from "@headlessui/react";
// import { TransactionResult, LoadingIndicator } from "@/components/01-atoms";
// import { DangerIcon } from "@/components/01-atoms/icons";
// import { CheckmarkIcon } from "react-hot-toast";

// interface TransactionResultModalProps {
//   onClose: () => void;
//   transactionResult: TransactionResult | null;
// }

// export const TransactionResultModal = ({
//   transactionResult,
//   onClose,
// }: TransactionResultModalProps) => {
//   if (!transactionResult) {
//     return null;
//   }

//   const [open, setOpen] = useState(true);

//   const closeModal = () => {
//     setOpen(false);
//     onClose();
//   };

//   return (
//     <>
//       <Transition
//         show={open}
//         as={Fragment}
//         enter="ease-out duration-300"
//         enterFrom="opacity-0"
//         enterTo="opacity-100"
//         leave="ease-in duration-200"
//         leaveFrom="opacity-100"
//         leaveTo="opacity-0"
//       >
//         <div className="z-[51] fixed inset-0 bg-black/30 backdrop-blur-sm" />
//       </Transition>
//       <Dialog open={open} onClose={closeModal}>
//         <Transition
//           show={open}
//           enter="transition duration-100 ease-out"
//           enterFrom="transform scale-95 opacity-0"
//           enterTo="transform scale-100 opacity-100"
//           leave="transition duration-75 ease-out"
//           leaveFrom="transform scale-100 opacity-100"
//           leaveTo="transform scale-95 opacity-0"
//           className="fixed left-1/2 top-1/2 z-[52] bg-[#1A1B1F] -translate-x-1/2 -translate-y-1/2 rounded-lg"
//         >
//           <Dialog.Panel className={"p-6 flex flex-col rounded-lg"}>
//             {transactionResult === TransactionResult.LOADING ? (
//               <div className="flex space-x-4 items-center justify-center">
//                 <LoadingIndicator />
//                 <h1 className="text-center text-2xl font-semibold text-white">
//                   Loading
//                 </h1>
//               </div>
//             ) : transactionResult === TransactionResult.FAILURE ? (
//               <div className="flex space-x-4 items-center justify-center">
//                 <DangerIcon />
//                 <h1 className="text-center text-2xl font-semibold text-white">
//                   Could not create offer
//                 </h1>
//               </div>
//             ) : transactionResult === TransactionResult.SUCCESS ? (
//               <div className="flex space-x-4 items-center justify-center">
//                 <CheckmarkIcon />
//                 <h1 className="text-center text-2xl font-semibold text-white">
//                   Offer created successfully
//                 </h1>
//               </div>
//             ) : null}
//           </Dialog.Panel>
//         </Transition>
//       </Dialog>
//     </>
//   );
// };
