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

    case 'Simple Attestation':
      return `// Import True Network SDK
import { TrueNetwork, Attestation } from '@true-network/sdk';

/**
 * This example demonstrates creating and issuing a basic attestation
 * to a blockchain address using the True Network protocol.
 */

// Initialize the True Network client
const trueNetwork = new TrueNetwork({
  network: 'testnet',
  apiKey: 'YOUR_API_KEY'
});

// Create a new attestation
async function createAttestation() {
  const attestation = new Attestation({
    issuer: '0x1234567890abcdef1234567890abcdef12345678',
    subject: '0xabcdef1234567890abcdef1234567890abcdef12',
    property: 'trust.rating',
    value: 85,
    expirationTime: Math.floor(Date.now() / 1000) + 86400 // 24 hours
  });
  
  // Issue the attestation on-chain
  const result = await trueNetwork.issueAttestation(attestation);
  return result;
}

export default createAttestation;`;

    case 'Weighted Score':
      return `// Import True Network SDK
import { TrueNetwork, ReputationModel } from '@true-network/sdk';

/**
 * This example demonstrates creating a reputation model
 * that computes weighted scores based on attestations.
 */

// Initialize the True Network client
const trueNetwork = new TrueNetwork({
  network: 'testnet',
  apiKey: 'YOUR_API_KEY'
});

// Create a reputation model
async function createReputationModel() {
  const model = new ReputationModel({
    name: 'Weighted Trust Score',
    description: 'Computes trust scores with configurable weights for different attestation types',
    parameters: {
      weights: {
        'trust.rating': 0.6,
        'identity.verified': 0.3,
        'activity.score': 0.1
      },
      threshold: 50,
      decayRate: 0.05 // 5% decay per month
    },
    algorithm: \`
      function computeScore(attestations, params) {
        let totalScore = 0;
        let totalWeight = 0;
        
        for (const att of attestations) {
          const weight = params.weights[att.property] || 0;
          if (weight > 0) {
            totalWeight += weight;
            totalScore += att.value * weight;
          }
        }
        
        return totalWeight > 0 ? totalScore / totalWeight : 0;
      }
    \`
  });
  
  // Deploy the model to the network
  const result = await model.deploy();
  
  // Compute scores for some addresses
  const scores = await model.computeScores([
    '0x1234567890abcdef1234567890abcdef12345678',
    '0xabcdef1234567890abcdef1234567890abcdef12',
    '0x7890abcdef1234567890abcdef1234567890abcd'
  ]);
  
  return { modelId: result.id, scores };
}

export default createReputationModel;`;

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
