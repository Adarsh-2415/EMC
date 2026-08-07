/* eslint-disable no-undef */
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  // Assign environment variables to process.env for local serverless execution
  Object.assign(process.env, env)

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'local-api-middleware',
        configureServer(server) {
          server.middlewares.use('/api/send-notification', (req, res) => {
            if (req.method !== 'POST') {
              res.statusCode = 405
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ error: 'Method Not Allowed' }))
              return
            }

            let body = ''
            req.on('data', (chunk) => {
              body += chunk.toString()
            })

            req.on('end', async () => {
              try {
                const parsedBody = body ? JSON.parse(body) : {}
                const fakeReq = { method: req.method, body: parsedBody }

                let responseStatus = 200

                const fakeRes = {
                  status(code: number) {
                    responseStatus = code
                    return fakeRes
                  },
                  json(data: unknown) {
                    res.statusCode = responseStatus
                    res.setHeader('Content-Type', 'application/json')
                    res.end(JSON.stringify(data))
                    return fakeRes
                  },
                }

                // Dynamically import the local serverless handler
                const { default: handler } = await import('./api/send-notification.js')
                await handler(fakeReq as never, fakeRes as never)
              } catch (err: unknown) {
                const errMsg = err instanceof Error ? err.message : 'Internal Server Error'
                console.error('[Local API Middleware Execution Error]:', err)
                res.statusCode = 500
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ error: errMsg }))
              }
            })
          })
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  }
})
