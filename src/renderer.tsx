import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(({ children }) => (
  <html>
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Custom Coloring Book Generator</title>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@exampledev/new.css@1.1.2/new.min.css" />
      <script src="/script.js"></script>
      <style>{`
        body { max-width: 900px; margin: 0 auto; padding: 20px; }
        header h1 { color: #6B21A8; }
        button[type="submit"] { background: #6B21A8; color: white; border: none; border-radius: 5px; }
        button[type="submit"]:hover { background: #7C3AED; }
        button[type="submit"]:disabled { background: #ccc; cursor: not-allowed; }
        #gallery { display: flex; flex-wrap: wrap; justify-content: center; }
      `}</style>
    </head>
    <body>
      <header>
        <h1>DreamLines Custom Coloring Books</h1>
        <p>Personalized coloring books made with AI. Enter a name, pick a theme, get pages instantly.</p>
      </header>
      <div>{children}</div>
    </body>
  </html>
))
