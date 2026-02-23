import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { ImageResponse } from 'next/og'

export const runtime = 'nodejs'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

const title = 'Rights Issue Acceptance/Renunciation e-Form'

export default async function OpenGraphImage() {
  const logoPath = path.join(process.cwd(), 'public', 'apple-icon.png')
  const logoBuffer = await readFile(logoPath)
  const logoDataUri = `data:image/png;base64,${logoBuffer.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          alignItems: 'center',
          backgroundColor: '#ffffff',
          color: '#0f172a',
          display: 'flex',
          flexDirection: 'column',
          gap: 32,
          height: '100%',
          justifyContent: 'center',
          padding: '48px 72px',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <img
          src={logoDataUri}
          alt="Crescent Registrars Limited logo"
          style={{
            height: 220,
            objectFit: 'contain',
            width: 340,
          }}
        />
        <div
          style={{
            display: 'flex',
            fontSize: 54,
            fontWeight: 700,
            lineHeight: 1.15,
            maxWidth: 1000,
          }}
        >
          {title}
        </div>
      </div>
    ),
    size
  )
}
