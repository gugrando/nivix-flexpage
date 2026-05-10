import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'nivix-cms-plugin',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          // 1. SALVAR CONFIG
          if (req.method === 'POST' && req.url === '/api/save-config') {
            let body = '';
            req.on('data', chunk => body += chunk.toString());
            req.on('end', () => {
              try {
                const configPath = path.resolve(__dirname, 'src/data/clientConfig.json');
                fs.writeFileSync(configPath, JSON.stringify(JSON.parse(body), null, 2));
                res.statusCode = 200;
                res.end(JSON.stringify({ message: 'Saved' }));
              } catch { res.statusCode = 500; res.end('Error'); }
            });
          } 
          // 2. UPLOAD DE IMAGEM
          else if (req.method === 'POST' && req.url === '/api/upload') {
            let body = '';
            req.on('data', chunk => body += chunk.toString());
            req.on('end', () => {
              try {
                const { fileName, base64 } = JSON.parse(body);
                const uploadDir = path.resolve(__dirname, 'public/uploads');
                if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
                const filePath = path.join(uploadDir, fileName);
                fs.writeFileSync(filePath, Buffer.from(base64.split(',')[1], 'base64'));
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ url: `/uploads/${fileName}` }));
              } catch { res.statusCode = 500; res.end('Upload Error'); }
            });
          }
          // 3. EXCLUSÃO DE ARQUIVO (Limpeza de poluição)
          else if (req.method === 'POST' && req.url === '/api/delete-asset') {
            let body = '';
            req.on('data', chunk => body += chunk.toString());
            req.on('end', () => {
              try {
                const { url } = JSON.parse(body);
                if (url && url.startsWith('/uploads/')) {
                  const filePath = path.join(__dirname, 'public', url);
                  if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                    console.log(`[CMS] Arquivo removido: ${url}`);
                  }
                }
                res.statusCode = 200;
                res.end(JSON.stringify({ message: 'Deleted' }));
              } catch { res.statusCode = 200; res.end('File not found or error'); } // Respondemos 200 mesmo se falhar para não travar a UI
            });
          }
          // 4. SALVAR PRESET (Novo ou Edição)
          else if (req.method === 'POST' && req.url === '/api/save-preset') {
            let body = '';
            req.on('data', chunk => body += chunk.toString());
            req.on('end', () => {
              try {
                const { id, config } = JSON.parse(body);
                const presetPath = path.resolve(__dirname, `src/data/presets/${id}.json`);
                fs.writeFileSync(presetPath, JSON.stringify(config, null, 2));
                res.statusCode = 200;
                res.end(JSON.stringify({ message: 'Preset Saved' }));
              } catch (err) { 
                res.statusCode = 500; 
                res.end(JSON.stringify({ error: err.message })); 
              }
            });
          }
          // 5. EXCLUIR PRESET
          else if (req.method === 'POST' && req.url === '/api/delete-preset') {
            let body = '';
            req.on('data', chunk => body += chunk.toString());
            req.on('end', () => {
              try {
                const { id } = JSON.parse(body);
                const presetPath = path.resolve(__dirname, `src/data/presets/${id}.json`);
                if (fs.existsSync(presetPath)) {
                  fs.unlinkSync(presetPath);
                }
                res.statusCode = 200;
                res.end(JSON.stringify({ message: 'Preset Deleted' }));
              } catch (err) { 
                res.statusCode = 500; 
                res.end(JSON.stringify({ error: err.message })); 
              }
            });
          }
          // 6. SALVAR NICHOS
          else if (req.method === 'POST' && req.url === '/api/save-niches') {
            let body = '';
            req.on('data', chunk => body += chunk.toString());
            req.on('end', () => {
              try {
                const niches = JSON.parse(body);
                const nichesPath = path.resolve(__dirname, 'src/data/niches.json');
                fs.writeFileSync(nichesPath, JSON.stringify(niches, null, 2));
                res.statusCode = 200;
                res.end(JSON.stringify({ message: 'Niches Saved' }));
              } catch (err) { 
                res.statusCode = 500; 
                res.end(JSON.stringify({ error: err.message })); 
              }
            });
          }
          // 7. LISTAR PRESETS DINAMICAMENTE
          else if (req.method === 'GET' && req.url === '/api/list-presets') {
            try {
              const presetsDir = path.resolve(__dirname, 'src/data/presets');
              const files = fs.readdirSync(presetsDir).filter(f => f.endsWith('.json'));
              const presets = {};
              files.forEach(file => {
                const content = fs.readFileSync(path.join(presetsDir, file), 'utf-8');
                const json = JSON.parse(content);
                const id = file.replace('.json', '');
                const key = id.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
                json._fileId = id;
                presets[key] = json;
              });
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(presets));
            } catch (err) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: err.message }));
            }
          }
          else { next(); }
        });
      }
    }
  ],
})
