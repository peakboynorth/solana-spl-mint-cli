import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import {
  keypairIdentity,
  generateSigner,
  percentAmount,
  createSignerFromKeypair,
} from '@metaplex-foundation/umi';
import {
  createAndMint,
  mplTokenMetadata,
  TokenStandard,
} from '@metaplex-foundation/mpl-token-metadata';
import { Connection, Keypair, LAMPORTS_PER_SOL, clusterApiUrl } from '@solana/web3.js';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

dotenv.config();

async function main() {
  console.log('🚀 Connecting to Solana Devnet RPC...');
  const rpcUrl = process.env.SOLANA_RPC_URL || clusterApiUrl('devnet');
  const connection = new Connection(rpcUrl, 'confirmed');

  // Load or generate payer keypair
  let keypair: Keypair;
  if (process.env.PRIVATE_KEY) {
    try {
      const secretKey = Uint8Array.from(JSON.parse(process.env.PRIVATE_KEY));
      keypair = Keypair.fromSecretKey(secretKey);
      console.log('🔑 Loaded keypair from PRIVATE_KEY environment variable.');
    } catch {
      console.error(
        '❌ Invalid PRIVATE_KEY environment variable. Expected a JSON byte array string, e.g. [1,2,3...]'
      );
      process.exit(1);
    }
  } else {
    const keypairPath = path.join(process.cwd(), 'id.json');
    if (fs.existsSync(keypairPath)) {
      const secretKey = Uint8Array.from(JSON.parse(fs.readFileSync(keypairPath, 'utf-8')));
      keypair = Keypair.fromSecretKey(secretKey);
      console.log(`🔑 Loaded existing keypair from local file: ${keypairPath}`);
    } else {
      keypair = Keypair.generate();
      fs.writeFileSync(keypairPath, JSON.stringify(Array.from(keypair.secretKey)));
      console.log(`🔑 Generated new test keypair and saved to local file: ${keypairPath}`);
    }
  }

  const payerAddress = keypair.publicKey.toBase58();
  console.log(`👤 Payer Wallet Address: ${payerAddress}`);

  // Check balance and request airdrop if insufficient
  let balance = await connection.getBalance(keypair.publicKey);
  console.log(`💰 Current Wallet Balance: ${balance / LAMPORTS_PER_SOL} SOL`);

  if (balance < LAMPORTS_PER_SOL * 0.5) {
    console.log('🪂 Requesting 1 SOL Devnet airdrop...');
    try {
      const airdropSig = await connection.requestAirdrop(keypair.publicKey, LAMPORTS_PER_SOL);
      const latestBlockhash = await connection.getLatestBlockhash();
      await connection.confirmTransaction({
        signature: airdropSig,
        blockhash: latestBlockhash.blockhash,
        lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
      });
      balance = await connection.getBalance(keypair.publicKey);
      console.log(`✅ Airdrop successful! New Balance: ${balance / LAMPORTS_PER_SOL} SOL`);
    } catch (err) {
      console.warn(
        '⚠️ Devnet airdrop request failed or rate-limited. If transaction fails, please fund the wallet manually.'
      );
    }
  }

  // Initialize Metaplex Umi SDK
  const umi = createUmi(rpcUrl).use(mplTokenMetadata());
  const umiKeypair = umi.eddsa.createKeypairFromSecretKey(keypair.secretKey);
  const signer = createSignerFromKeypair(umi, umiKeypair);
  umi.use(keypairIdentity(signer));

  // Generate a keypair for the Token Mint account
  const mintSigner = generateSigner(umi);

  // Token configuration parameters
  const decimals = Number(process.env.TOKEN_DECIMALS) || 9;
  const initialSupplyTokens = Number(process.env.INITIAL_SUPPLY) || 1_000_000;
  const initialSupplyBaseUnits = BigInt(initialSupplyTokens) * BigInt(10 ** decimals);

  const tokenMetadata = {
    name: process.env.TOKEN_NAME || 'Solana Devnet Token',
    symbol: process.env.TOKEN_SYMBOL || 'SDT',
    uri:
      process.env.TOKEN_URI ||
      'https://raw.githubusercontent.com/solana-developers/opp-sess/main/assets/metadata.json',
  };

  console.log('\n🛠️  Creating SPL Token Mint with Metaplex Metadata...');
  console.log(`   Name: ${tokenMetadata.name}`);
  console.log(`   Symbol: ${tokenMetadata.symbol}`);
  console.log(`   URI: ${tokenMetadata.uri}`);
  console.log(`   Decimals: ${decimals}`);
  console.log(`   Initial Supply: ${initialSupplyTokens.toLocaleString()} ${tokenMetadata.symbol}`);

  // Execute createAndMint transaction (Mint Account + Metadata Account + Initial Token Minting)
  const tx = await createAndMint(umi, {
    mint: mintSigner,
    name: tokenMetadata.name,
    symbol: tokenMetadata.symbol,
    uri: tokenMetadata.uri,
    sellerFeeBasisPoints: percentAmount(0),
    decimals,
    amount: initialSupplyBaseUnits,
    tokenOwner: umi.identity.publicKey,
    tokenStandard: TokenStandard.Fungible,
  });

  console.log('⏳ Confirming transaction on Solana Devnet...');
  await tx.sendAndConfirm(umi);

  const mintAddress = mintSigner.publicKey.toString();

  console.log('\n🎉 SPL Token with Metaplex Metadata Created Successfully!');
  console.log('--------------------------------------------------');
  console.log(`🪙 Token Mint Address: ${mintAddress}`);
  console.log(`🔗 Solana Explorer Link: https://explorer.solana.com/address/${mintAddress}?cluster=devnet`);
  console.log('--------------------------------------------------');
}

main().catch((error) => {
  console.error('❌ Error creating token:', error);
  process.exit(1);
});
