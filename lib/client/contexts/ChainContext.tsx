// import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
// // eslint-disable-next-line import/named
// import { Chain, mainnet } from 'viem/chains';

// interface ChainContextType {
//   chain: Chain;
//   changeChain: (chain: Chain) => void; // Update this line to match the function signature
// }

// const SidebarContext = createContext<ChainContextType | undefined>(undefined);

// export const ChainProvider = ({ children }: { children: ReactNode }) => {
//   const [chain, setChain] = useState<Chain>(mainnet);

//   const changeChain = useCallback((newChain: Chain) => {
//     setChain(newChain);
//   }, []);

//   return (
//     <SidebarContext.Provider value={{ chain, changeChain }}>
//       {children}
//     </SidebarContext.Provider>
//   );
// };

// export const useConnectedChain = () => {
//   const context = useContext(SidebarContext);
//   if (context === undefined) {
//     throw new Error('useConnectedChain must be used within a ChainProvider');
//   }
//   return context;
// };
