export const metadata = {
    title: 'CRUD',
    description: 'HDs CRUD application',
  }
  
  export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <body>{children}</body>
      </html>
    )
  }