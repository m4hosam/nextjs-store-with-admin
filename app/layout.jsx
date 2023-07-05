import React from 'react'
import Navbar from '@component/Navbar'
import Carousel from '@component/Carousel'
import Box from '@mui/material/Box'
import '@styles/global.css'

export const metadata = {
    title: "Watches",
    description: "We sell watches",
}

export default function RootLayout({ children }) {
    return (
        <html lang='en'>
            <body>
                <Navbar />

                <Carousel />


                <main>
                    {children}
                </main>
                <footer>
                    Footer
                </footer>
            </body>
        </html >
    )
}
