import { Contract, ethers } from "ethers";
import React, { createContext, useContext, useState, useEffect, Context, Dispatch, SetStateAction } from "react";
import { login, logout, UserI } from "../utils/api";
type UseStateT<T> = [T, Dispatch<SetStateAction<T>>];
interface WalletContextI {
  useProviderState: UseStateT<ethers.providers.Web3Provider | null>;
  useSignerState: UseStateT<ethers.providers.JsonRpcSigner | null>;
  useInstanceState: UseStateT<any>;
  useConnectedState: UseStateT<boolean>;
  useAuthorizedState: UseStateT<boolean>;
  useAddressState: UseStateT<string | null>;
  useUserState: UseStateT<UserI | null>;
}
export const WalletContext = createContext<WalletContextI>({
  //@ts-ignore
  useProviderState: undefined,
  //@ts-ignore
  useSignerState: undefined,
  //@ts-ignore
  useInstanceState: undefined,
  //@ts-ignore
  useConnectedState: undefined,
  //@ts-ignore
  useAuthorizedState: undefined,
  //@ts-ignore
  useUserState: undefined,
});

export const getProvider = (instance: any) => {
  const provider = new ethers.providers.Web3Provider(instance);
  return provider;
};
export const getSigner = (provider: ethers.providers.Web3Provider) => provider.getSigner();

const WalletProvider = ({ children }: { children: JSX.Element }) => {
  const [provider, setProvider] = useState() as WalletContextI["useProviderState"];
  const [signer, setSigner] = useState() as WalletContextI["useSignerState"];
  const [instance, setInstance] = useState() as WalletContextI["useInstanceState"];
  const [connected, setConnected] = useState(false) as WalletContextI["useConnectedState"];
  const [authorized, setAuthorized] = useState(false) as WalletContextI["useAuthorizedState"];
  const [address, setAddress] = useState(null) as WalletContextI["useAddressState"];
  const [user, setUser] = useState(null) as WalletContextI["useUserState"];
  // console.log(connected);
  useEffect(() => {
    const init = async () => {
      // const provider = getProvider(instance);
      // setProvider(provider);
      // const signer = getSigner(provider);
      // setSigner(signer);
      if (provider) {
        instance.on("accountsChanged", async () => {
          if (signer) {
            const address = await signer.getAddress();
            setAddress(address);
            await logout();
            const user = await login(signer);
            setUser(user);
          }
        });
        provider.on("network", (newNetwork, oldNetwork) => {
          // console.log("network changed");
          oldNetwork && window.location.reload();
        });
      }
    };
    connected && instance && init();
  }, [connected]);

  return (
    <WalletContext.Provider
      value={{
        useProviderState: [provider, setProvider],
        useSignerState: [signer, setSigner],
        useConnectedState: [connected, setConnected],
        useAuthorizedState: [authorized, setAuthorized],
        useInstanceState: [instance, setInstance],
        useAddressState: [address, setAddress],
        useUserState: [user, setUser],
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export default WalletProvider;

declare global {
  interface Window {
    /**@ts-ignore */
    ethereum: {
      isMetamask: boolean;
    };
  }
}
//   "any"
