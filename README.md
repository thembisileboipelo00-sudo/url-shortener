# URL Shortener

A serverless URL shortener built on Cloudflare Workers, using KV storage to store and look up short links.

**Live demo:** https://url-shortener.thembisile-dev.workers.dev

## How it works

- `GET /new?url=<destination>&code=<optional-custom-code>` creates a short link and stores it in Cloudflare KV. If no code is given, a random 6-character one is generated.
- `GET /<code>` looks up the code in KV and redirects (302) to the stored destination.
- Requests to `/` return a short usage message.

## Stack

- **Cloudflare Workers** — serverless edge compute, no server to manage
- **Workers KV** — key-value storage for the code → URL mapping
- **Wrangler** — Cloudflare's CLI for local development and deployment

## Running locally

```bash
npm install
npx wrangler dev
```

Then visit `http://localhost:8787/new?url=https://example.com&code=demo` to create a link, and `http://localhost:8787/demo` to test the redirect.

## Deploying

```bash
npx wrangler deploy
```

## Why I built this

Built as a Cloud Computing elective project, to get hands-on with serverless architecture and edge key-value storage rather than just reading about them.
