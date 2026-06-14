export const metadata = {
  title: 'Alpha API Developer Portal',
  description: 'Next.js API Developer Portal and Documentation',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0, fontFamily: "'Plus Jakarta Sans', sans-serif", backgroundColor: '#090a0f', color: '#f8fafc' }}>
        {children}
      </body>
    </html>
  )
}
