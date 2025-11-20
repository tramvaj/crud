export const metadata = {
    title: 'CRUD',
    description: 'HD's CRUD application',
  }
  
  export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <body>{children}</body>
      </html>
    )
  }