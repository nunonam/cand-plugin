import Button from '@/src/components/Buttons'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/* <head>
        <link type="text/css" rel="stylesheet" href="https://source.zoom.us/2.13.0/css/bootstrap.css" />
        <link type="text/css" rel="stylesheet" href="https://source.zoom.us/2.13.0/css/react-select.css" />
      </head> */}
      <body className={inter.className} suppressHydrationWarning={true} >
        <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left border-b border-gray-700">
          <Button text={'Menu1'} buttonIndex={1} />
          <Button text={'Menu2'} buttonIndex={2} />
          <Button text={'ZOOM test'} buttonIndex={3} />
          <Button text={'Plugin test'} buttonIndex={4} />
        </div>
        {children}
      </body>
    </html>
  )
}
