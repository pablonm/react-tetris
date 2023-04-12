import './globals.css'

export const metadata = {
  title: 'React Tetris!',
  description: 'Tetris built with React and TypeScript by Pablo Miceli',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
