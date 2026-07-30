# Solana Devnet SPL Token Creator

This script connects to Solana Devnet, creates a new SPL Token mint, attaches Metaplex Token Metadata (Name, Symbol, URI, Decimals), and mints an initial token supply to your payer wallet.

## Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables (Optional)

Create a `.env` file in the project root:

```env
# Optional: Set a custom RPC endpoint (defaults to Solana Devnet public RPC)
SOLANA_RPC_URL="https://api.devnet.solana.com"

# Optional: Set your existing private key as a JSON byte array string
# PRIVATE_KEY="[1,2,3,...,64]"

# Optional: Customize Token Metadata parameters
TOKEN_NAME="Solana Devnet Token"
TOKEN_SYMBOL="SDT"
TOKEN_URI="https://raw.githubusercontent.com/solana-developers/opp-sess/main/assets/metadata.json"
TOKEN_DECIMALS="9"
INITIAL_SUPPLY="1000000"
```

> **Note:** If no `PRIVATE_KEY` environment variable is defined, the script will automatically check for or generate a local `id.json` keypair file and attempt to request a 1 SOL Devnet airdrop if needed.

### 3. Request Devnet SOL

If you wish to pre-fund your wallet address before running the script:
1. Obtain your public address from `id.json` or your `.env` private key.
2. Request SOL via the CLI or web faucet:
   ```bash
   solana airdrop 2 <YOUR_WALLET_ADDRESS> --url devnet
   ```
   Or visit [https://faucet.solana.com/](https://faucet.solana.com/).

### 4. Run the Script

Execute the script using `ts-node`:

```bash
npx ts-node scripts/create-token.ts
```

Or using npm script:

```bash
npm run create-token
```

### 5. Expected Output

Upon successful execution, the script will output the new **Token Mint Address** and a **Solana Explorer link**:

```text
🚀 Connecting to Solana Devnet RPC...
🔑 Loaded existing keypair from local file: /path/to/id.json
👤 Payer Wallet Address: 8x2...K9p
💰 Current Wallet Balance: 1.5 SOL

🛠️  Creating SPL Token Mint with Metaplex Metadata...
   Name: Solana Devnet Token
   Symbol: SDT
   URI: https://raw.githubusercontent.com/solana-developers/opp-sess/main/assets/metadata.json
   Decimals: 9
   Initial Supply: 1,000,000 SDT
⏳ Confirming transaction on Solana Devnet...

🎉 SPL Token with Metaplex Metadata Created Successfully!
--------------------------------------------------
🪙 Token Mint Address: 7Yn...mQ4
🔗 Solana Explorer Link: https://explorer.solana.com/address/7Yn...mQ4?cluster=devnet
--------------------------------------------------
```
