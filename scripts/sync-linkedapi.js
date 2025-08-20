#!/usr/bin/env node
/* eslint-disable no-console */
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const REPO_URL = 'https://github.com/Linked-API/linkedapi-node.git';
const BRANCH = process.env.LINKEDAPI_BRANCH || 'custom-http-client';

const repoRoot = path.resolve(__dirname, '..');
const cacheDir = path.join(repoRoot, '.vendor-cache');
const cloneDir = path.join(cacheDir, 'linkedapi-node');
const linkedNodeDir = path.join(repoRoot, 'nodes', 'LinkedApi', 'linkedapi-node');

function rimraf(targetPath) {
    if (fs.existsSync(targetPath)) {
        fs.rmSync(targetPath, { recursive: true, force: true });
    }
}

function ensureDir(dirPath) {
    fs.mkdirSync(dirPath, { recursive: true });
}

function copyRecursive(src, dest) {
    rimraf(dest);
    ensureDir(path.dirname(dest));
    fs.cpSync(src, dest, { recursive: true, force: true });
}

function main() {
    console.log(`[vendor] Fetching linkedapi-node from ${REPO_URL} (branch: ${BRANCH})`);

    ensureDir(cacheDir);
    rimraf(cloneDir);

    try {
        // Fallback: shallow clone the repo and copy only the src folder
        execFileSync('git', ['clone', '--depth', '1', '--branch', BRANCH, REPO_URL, cloneDir], {
            stdio: 'inherit',
        });
    } catch (err) {
        console.error('[vendor] Failed to clone repository');
        throw err;
    }

    const srcDir = path.join(cloneDir, 'src');
    if (!fs.existsSync(srcDir)) {
        throw new Error(`[vendor] Source directory not found at ${srcDir}`);
    }

    console.log('[vendor] Copying source files into nodes/LinkedApi/linkedapi-node');
    copyRecursive(srcDir, linkedNodeDir);

    console.log('[vendor] Overwriting linked-api-http-client.ts with a stub');
    const stub = `import {
  HttpClient,
  TLinkedApiConfig,
} from "../types";

export function buildLinkedApiHttpClient(config: TLinkedApiConfig): HttpClient {
  throw new Error('Not supported');
}
`;
    const httpClientPath = path.join(linkedNodeDir, 'core', 'linked-api-http-client.ts');
    fs.writeFileSync(httpClientPath, stub);
    rimraf(cacheDir);

    console.log('[vendor] Done. Vendored linkedapi-node source is available at nodes/LinkedApi/linkedapi-node');
}

main();


