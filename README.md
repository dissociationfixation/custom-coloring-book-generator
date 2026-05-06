# DreamLines - Custom Coloring Book Generator

A personalized coloring book generator powered by Cloudflare Workers AI (FREE). Customers give you a kid's name and theme, you generate their book in minutes, send them the pages, and get paid.

## Cost to Run: $0

Cloudflare Workers AI free tier includes Stable Diffusion image generation. No API keys to pay for.

## How It Works

1. You type in the child's name and pick a theme
2. The app generates 5-20 personalized coloring pages
3. You download the pages and send them to your customer as a PDF or PNG zip
4. Customer pays you $12-$25 on Facebook Marketplace

## Setup (One Time, 5 Minutes)

1. Create a free Cloudflare account: https://dash.cloudflare.com/sign-up
2. Clone this repo:
   ```bash
   git clone https://github.com/dissociationfixation/custom-coloring-book-generator.git
   cd custom-coloring-book-generator
   npm install
   ```
3. Login to Cloudflare:
   ```bash
   npx wrangler login
   ```
4. Deploy (free):
   ```bash
   npm run deploy
   ```
5. Done. Your generator is live at `https://custom-coloring-book-generator.<your-subdomain>.workers.dev`

## Local Development

```bash
npm run dev
```

Opens at http://localhost:8787

## Themes Available

- Dinosaurs
- Unicorns & Princesses
- Space & Rockets
- Ocean & Mermaids
- Trucks & Construction
- Puppies & Kittens
- Superheroes
- Fairies & Butterflies

## Business Model

| Pages | Your Price | Your Cost | Profit |
|-------|-----------|-----------|--------|
| 5     | $10       | $0        | $10    |
| 10    | $15       | $0        | $15    |
| 15    | $20       | $0        | $20    |
| 20    | $25       | $0        | $25    |

## Tech Stack

- **Runtime:** Cloudflare Workers (free tier)
- **AI:** Stable Diffusion XL via Workers AI (free)
- **Framework:** Hono.js
- **Language:** TypeScript

## License

MIT
