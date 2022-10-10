export const formatWalletAddress = (walletAddress: string) => {
  const first = walletAddress.slice(0, 3);
  const last = walletAddress.slice(walletAddress.length - 3, walletAddress.length);
  return [first, last].join("..");
};
