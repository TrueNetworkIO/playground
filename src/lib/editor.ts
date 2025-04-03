export const getExampleCode = (templateName: string): string => {
  switch (templateName) {
    case 'Create an Attestation':
      return `// Importing the trueApi from the helper function.
const trueApi = await getTrueNetworkInstance();

// User wallet address, could be any: EVM, Solana, DOT.
const userWalletAddress = 'nJrsrH8dov9Z36kTDpabgCZT8CbK1FbmjJvfU6qbMTG4g4c';

// IPFS CID: an example usage for schema property.
const ipfsCid = 'baguqeerasords4njcts6vs7qvdjfcvgnume4hqohf65zsfguprqphs3icwea';

const userSignupSchema = Schema.create({
  name: Text,
  dateOfRegistry: U64,
  profileCid: Text
})

// Attesting to the user.
const response = await userSignupSchema.attest(
    trueApi,
    userWalletAddress,
    {
      name: "Ram",
      dateOfRegistry: Date.now(),
      profileCid: ipfsCid
    }
  );

// Return the response for viewing in the side window.
return response;
`;

    case 'Update an Attestation':
      return `// Importing the trueApi from the helper function.
const trueApi = await getTrueNetworkInstance();

// User wallet address, could be any: EVM, Solana, DOT.
const userWalletAddress = 'nJrsrH8dov9Z36kTDpabgCZT8CbK1FbmjJvfU6qbMTG4g4c';

// IPFS CID: updated value to change in the attestation.
const ipfsCid = 'bafyreicnokmhmrnlp2wjhyk2haep4tqxiptwfrp2rrs7rzq7uk766chqvq';

// Attestation to update on-chain.
const attestationIndex = 0;

const userSignupSchema = Schema.create({
  name: Text,
  dateOfRegistry: U64,
  profileCid: Text
})

// Attesting to the user.
const response = await userSignupSchema.updateAttestation(
    trueApi,
    userWalletAddress,
    attestationIndex,
    {
      name: "Ram",
      dateOfRegistry: Date.now(),
      profileCid: ipfsCid
    }
  );

// Return the response for viewing in the side window.
return response;
`;

    case 'Read Attestations':
      return `// Importing the trueApi from the helper function.
const trueApi = await getTrueNetworkInstance();

// User wallet address, could be any: EVM, Solana, DOT.
const userWalletAddress = 'nJrsrH8dov9Z36kTDpabgCZT8CbK1FbmjJvfU6qbMTG4g4c';

const userSignupSchema = Schema.create({
  name: Text,
  dateOfRegistry: U64,
  profileCid: Text
})

// Attesting to the user.
const response = await userSignupSchema.getAttestations(
    trueApi,
    userWalletAddress
  );

// Return the response for viewing in the side window.
return response;
`;
    case 'Get Reputation Score':
      return `// Importing the trueApi from the helper function.
const trueApi = await getTrueNetworkInstance();

// Algorithm Id to get the reputation score.
const algoId = 158;

// User wallet address, could be any: EVM, Solana, DOT.
const userWalletAddress = 'nJrsrH8dov9Z36kTDpabgCZT8CbK1FbmjJvfU6qbMTG4g4c';

const reputation = await trueApi.getReputationScore(algoId, userWalletAddress);

// Return the response for viewing in the side window.
return reputation;`;

    case 'Get Free Balance':
      return `// Importing the trueApi from the helper function.
const trueApi = await getTrueNetworkInstance();

// User wallet address, could be any: EVM, Solana, DOT.
const userWalletAddress = 'nJrsrH8dov9Z36kTDpabgCZT8CbK1FbmjJvfU6qbMTG4g4c';

const balance = await trueApi.getBalance(userWalletAddress);

// Return the response for viewing in the side window.
return balance;`;

    case 'String To Hash':
      return `// Any random string to get the hash.
const randomString = 'ABCDEFHGHIJKLMNOPQRSTUVWXYZ';

const hash = '0x' + stringToBlakeTwo256Hash(randomString);

// Return the response for viewing in the side window.
return hash;`;


    case 'Get Schema Hash':
      return `// Using a simple schema object.
const userSignupSchema = Schema.create({
  name: Text,
  dateOfRegistry: U64,
  profileCid: Text
})

const hash = userSignupSchema.getSchemaHash();

// Return the response for viewing in the side window.
return hash;`;

    case 'Trust Algorithm':
      return `// Import True Network SDK
import { TrueNetwork } from '@true-network/sdk';

/**
 * This example demonstrates writing an algorithm that computes
 * a trust score based on attestations from multiple sources.
 */

// Initialize the True Network client
const trueNetwork = new TrueNetwork({
  network: 'testnet',
  apiKey: 'YOUR_API_KEY'
});

// Define a custom trust algorithm
function trustAlgorithm(attestations) {
  // Filter only trust-related attestations
  const trustAttestations = attestations.filter(
    att => att.property.startsWith('trust.')
  );
  
  // Calculate a weighted score based on issuer reputation
  let totalScore = 0;
  let totalWeight = 0;
  
  for (const att of trustAttestations) {
    // Get issuer's own reputation (simplistic approach)
    const issuerWeight = Math.min(1, att.issuerReputation / 100);
    
    // Sum up weighted values
    totalWeight += issuerWeight;
    totalScore += att.value * issuerWeight;
  }
  
  // Return the final normalized score
  return {
    score: totalWeight > 0 ? totalScore / totalWeight : 0,
    confidence: Math.min(1, trustAttestations.length / 10), // Higher with more attestations
    attestationCount: trustAttestations.length
  };
}

// Execute the algorithm for a specific address
async function computeTrustScore(address) {
  // Fetch attestations for the address
  const attestations = await trueNetwork.getAttestationsForSubject(address);
  
  // Add issuer reputation to each attestation
  const enhancedAttestations = await Promise.all(
    attestations.map(async (att) => {
      const issuerRep = await trueNetwork.computeReputationScore(att.issuer);
      return {
        ...att,
        issuerReputation: issuerRep.score
      };
    })
  );
  
  // Compute the trust score
  const result = trustAlgorithm(enhancedAttestations);
  
  return result;
}

export default computeTrustScore;`;

    default:
      return `// Import True Network SDK
import { TrueNetwork } from '@true-network/sdk';

// Initialize the True Network client
const trueNetwork = new TrueNetwork({
  network: 'testnet',
  apiKey: 'YOUR_API_KEY'
});

// Write your code here

async function main() {
  // Your implementation
  return { result: 'Hello True Network!' };
}

export default main;`;
  }
};
