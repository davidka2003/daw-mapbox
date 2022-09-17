export const formatWalletAddress = (walletAddress: string) => {
  const first = walletAddress.slice(0, 4);
  const last = walletAddress.slice(walletAddress.length - 4, walletAddress.length);
  return [first, last].join("...");
};
