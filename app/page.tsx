'use client';

import React, { useState } from 'react';
import { Coins, Terminal, ExternalLink, Code2, Copy, Check, Cpu, ShieldCheck, Sparkles, Zap } from 'lucide-react';

export default function HomePage() {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'script' | 'readme'>('overview');

  const copyCommand = () => {
    navigator.clipboard.writeText('npx ts-node scripts/create-token.ts');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-purple-500 selection:text-white">
      {/* Background radial glow */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-950 to-slate-950" />

      {/* Header */}
      <header className="relative z-10 border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-md sticky top-0">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-500 to-emerald-400 p-0.5 shadow-lg shadow-purple-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Coins className="w-5 h-5 text-purple-400" />
              </div>
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-purple-300 bg-clip-text text-transparent">
                Solana SPL Token Creator
              </span>
              <span className="ml-2.5 px-2 py-0.5 text-xs font-mono bg-purple-500/10 text-purple-300 border border-purple-500/20 rounded-full">
                Devnet Umi
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={copyCommand}
              className="flex items-center space-x-2 px-3 py-1.5 text-xs font-mono bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700/80 rounded-lg transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
              <span>npx ts-node scripts/create-token.ts</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 py-10 space-y-8">
        {/* Hero Banner */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/90 to-slate-950/90 p-8 shadow-2xl">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>@solana/web3.js & @metaplex-foundation/umi</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              SPL Token Creation Engine for Solana Devnet
            </h1>
            <p className="text-slate-400 text-base leading-relaxed">
              Standalone, high-performance Node.js/TypeScript script that connects to Solana Devnet RPC, manages keypairs, creates token mint accounts, attaches Metaplex Token Metadata, and executes initial token minting.
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800 space-x-6 text-sm font-medium">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-3 transition-colors cursor-pointer flex items-center space-x-2 ${
              activeTab === 'overview'
                ? 'border-b-2 border-purple-500 text-purple-300'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>Architecture & Features</span>
          </button>
          <button
            onClick={() => setActiveTab('script')}
            className={`pb-3 transition-colors cursor-pointer flex items-center space-x-2 ${
              activeTab === 'script'
                ? 'border-b-2 border-purple-500 text-purple-300'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>scripts/create-token.ts</span>
          </button>
          <button
            onClick={() => setActiveTab('readme')}
            className={`pb-3 transition-colors cursor-pointer flex items-center space-x-2 ${
              activeTab === 'readme'
                ? 'border-b-2 border-purple-500 text-purple-300'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>Setup & Execution Guide</span>
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl border border-slate-800/80 bg-slate-900/50 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-lg text-slate-100">Solana Devnet RPC</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Connects directly to Devnet via <code className="text-purple-300 font-mono text-xs">@solana/web3.js</code>, automatically handles Devnet SOL balance checks and airdrop requests.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-800/80 bg-slate-900/50 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-lg text-slate-100">Metaplex Umi SDK</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Utilizes Metaplex Umi and <code className="text-indigo-300 font-mono text-xs">mpl-token-metadata</code> to construct and confirm atomic metadata & token mint transactions.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-800/80 bg-slate-900/50 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Coins className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-lg text-slate-100">Mint & Explorer Link</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Mints initial supply to the payer wallet and outputs formatted Solana Explorer links for instant block inspection.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'script' && (
          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">scripts/create-token.ts</span>
              <a
                href="https://explorer.solana.com/?cluster=devnet"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-purple-400 hover:text-purple-300 flex items-center space-x-1"
              >
                <span>Solana Devnet Explorer</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <pre className="p-4 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 font-mono text-xs overflow-x-auto leading-relaxed">
{`import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { keypairIdentity, generateSigner, percentAmount, createSignerFromKeypair } from '@metaplex-foundation/umi';
import { createAndMint, mplTokenMetadata, TokenStandard } from '@metaplex-foundation/mpl-token-metadata';
import { Connection, Keypair, LAMPORTS_PER_SOL, clusterApiUrl } from '@solana/web3.js';
import * as dotenv from 'dotenv';

// Full script source available in /scripts/create-token.ts
// Run directly using: npx ts-node scripts/create-token.ts`}
            </pre>
          </div>
        )}

        {activeTab === 'readme' && (
          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-4 text-slate-300 text-sm leading-relaxed">
            <h3 className="text-lg font-bold text-white">How to Run</h3>
            <ol className="list-decimal list-inside space-y-2 text-slate-300">
              <li>Run <code className="bg-slate-950 px-2 py-0.5 rounded text-purple-300 font-mono text-xs">npm install</code></li>
              <li>Optionally configure <code className="bg-slate-950 px-2 py-0.5 rounded text-purple-300 font-mono text-xs">.env</code> variables for custom TOKEN_NAME, TOKEN_SYMBOL, or PRIVATE_KEY</li>
              <li>Execute the script with <code className="bg-slate-950 px-2 py-0.5 rounded text-purple-300 font-mono text-xs">npx ts-node scripts/create-token.ts</code></li>
            </ol>
          </div>
        )}
      </main>
    </div>
  );
}
