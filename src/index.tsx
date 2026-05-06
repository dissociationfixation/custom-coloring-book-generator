import { Hono } from 'hono'
import { renderer } from './renderer'
import { Ai } from '@cloudflare/ai'
import script from '../assets/script.js'

type Bindings = {
  AI: any
}

const app = new Hono<{ Bindings: Bindings }>()

app.get('/script.js', (c) => {
  return c.body(script, 200, {
    'Content-Type': 'text/javascript'
  })
})

app.get('*', renderer)

app.get('/', (c) => {
  return c.render(
    <>
      <h2>Custom Coloring Book Generator</h2>
      <p>Create personalized coloring books! Enter a name and pick a theme.</p>
      <form id="input-form" autocomplete="off" method="post">
        <label for="childName">Child's Name:</label><br/>
        <input type="text" id="childName" name="childName" placeholder="e.g. Emma" style={{ width: '89%', marginBottom: '10px', padding: '8px' }} /><br/>
        <label for="theme">Theme:</label><br/>
        <select id="theme" name="theme" style={{ width: '92%', marginBottom: '10px', padding: '8px' }}>
          <option value="dinosaurs">Dinosaurs</option>
          <option value="unicorns and princesses">Unicorns &amp; Princesses</option>
          <option value="outer space and rockets">Space &amp; Rockets</option>
          <option value="ocean animals and mermaids">Ocean &amp; Mermaids</option>
          <option value="trucks and construction">Trucks &amp; Construction</option>
          <option value="puppies and kittens">Puppies &amp; Kittens</option>
          <option value="superheroes">Superheroes</option>
          <option value="fairies and butterflies">Fairies &amp; Butterflies</option>
        </select><br/>
        <label for="pages">Number of Pages:</label><br/>
        <select id="pages" name="pages" style={{ width: '92%', marginBottom: '10px', padding: '8px' }}>
          <option value="5">5 Pages</option>
          <option value="10">10 Pages</option>
          <option value="15">15 Pages</option>
          <option value="20">20 Pages</option>
        </select><br/>
        <button type="submit" style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>Generate Coloring Book</button>
      </form>
      <div id="status" style={{ marginTop: '20px', fontWeight: 'bold' }}></div>
      <div id="gallery" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '20px' }}></div>
    </>
  )
})

app.post('/ai', async (c) => {
  const json = await c.req.json()
  const { childName, theme, pageNumber } = json

  const ai = new Ai(c.env.AI)

  const scenes = [
    'in a fun adventure',
    'playing in a garden',
    'at a birthday party',
    'on a treasure hunt',
    'in a magical forest',
    'playing sports',
    'having a picnic',
    'building a sandcastle at the beach',
    'flying through clouds',
    'reading a book under a tree',
    'in a race car',
    'baking cookies',
    'camping under the stars',
    'dancing in the rain',
    'at a carnival',
    'exploring a cave',
    'ice skating',
    'planting flowers',
    'riding a hot air balloon',
    'at a playground'
  ]

  const scene = scenes[(pageNumber - 1) % scenes.length]
  const prompt = `A simple black and white coloring book page for a child. The scene shows ${theme} ${scene}. Bold thick outlines, no shading, no gray, white background, suitable for ages 4-8. The name "${childName}" is written in bubble letters at the top of the page.`

  const image: Uint8Array = await ai.run('@cf/stabilityai/stable-diffusion-xl-base-1.0', {
    prompt: prompt
  })

  const binaryString = new Uint8Array(image).reduce((acc, byte) => acc + String.fromCharCode(byte), '')
  const base64Image = btoa(binaryString)

  return c.json({
    image: `data:image/png;base64,${base64Image}`,
    page: pageNumber
  })
})

export default app
