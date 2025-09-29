// Utility script to update contract addresses after deployment
// Run this script after deploying contracts to update the frontend configuration

export const updateContractAddress = (network: string, address: string) => {
  console.log(`Update CONTRACT_ADDRESSES.${network} to "${address}" in src/utils/contractUtils.ts`);

  // Instructions for manual update
  const instructions = `
  📝 Manual Update Required:

  1. Open: src/utils/contractUtils.ts
  2. Update the CONTRACT_ADDRESSES object:

  export const CONTRACT_ADDRESSES = {
    mainnet: '${network === 'mainnet' ? address : ''}',
    sepolia: '${network === 'sepolia' ? address : ''}',
    localhost: '${network === 'localhost' ? address : ''}',
    hardhat: '${network === 'hardhat' ? address : ''}'
  } as const;

  3. Save the file
  4. Rebuild the application: npm run build
  `;

  console.log(instructions);
};

// Usage examples:
// updateContractAddress('sepolia', '0x1234567890123456789012345678901234567890');
// updateContractAddress('mainnet', '0x1234567890123456789012345678901234567890');