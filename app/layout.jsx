import React from 'react'

export const metadata = {
    title: "Watches",
    description: "We sell watches",
}

export default function RootLayout({ children }) {
    return (
        <html lang='en'>
            <body>
                <nav>
                    Navbar
                </nav>
                <main>
                    {children}
                </main>
                <footer>
                    Footer
                </footer>
            </body>
        </html>
    )
}
