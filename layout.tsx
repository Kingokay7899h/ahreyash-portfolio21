import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Shreyash Desai | Computer Engineer & Designer',
  description: 'Computer Engineering student and UI/UX Designer crafting innovative digital solutions. Experience in web development, database systems, and user-centered design.',
  keywords: [
    'Shreyash Desai',
    'Computer Engineer',
    'UI/UX Designer',
    'Web Developer',
    'Portfolio',
    'Goa College of Engineering',
    'PHP Developer',
    'JavaScript',
    'MySQL',
    'Figma Designer'
  ],
  authors: [{ name: 'Shreyash Desai' }],
  creator: 'Shreyash Desai',
  publisher: 'Shreyash Desai',
  metadataBase: new URL('https://shreyash.fun'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://shreyash.fun',
    title: 'Shreyash Desai | Computer Engineer & Designer',
    description: 'Computer Engineering student and UI/UX Designer crafting innovative digital solutions.',
    siteName: 'Shreyash Desai Portfolio',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Shreyash Desai - Computer Engineer & Designer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shreyash Desai | Computer Engineer & Designer',
    description: 'Computer Engineering student and UI/UX Designer crafting innovative digital solutions.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0A0E27" />
        <meta name="msapplication-TileColor" content="#0A0E27" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Shreyash Desai",
              "url": "https://shreyash.fun",
              "jobTitle": "Computer Engineer",
              "description": "Computer Engineering student and UI/UX Designer",
              "email": "shreyashdesai60@gmail.com",
              "telephone": "+91 7666987026",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Ponda",
                "addressRegion": "Goa",
                "addressCountry": "India"
              },
              "alumniOf": [
                {
                  "@type": "EducationalOrganization",
                  "name": "Goa College of Engineering"
                },
                {
                  "@type": "EducationalOrganization", 
                  "name": "Indian School Muscat"
                }
              ],
              "worksFor": {
                "@type": "Organization",
                "name": "Fluxatic™ Global"
              },
              "knowsAbout": [
                "Computer Engineering",
                "UI/UX Design", 
                "Web Development",
                "PHP",
                "MySQL",
                "JavaScript",
                "Figma"
              ]
            })
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <div id="root">
          {children}
        </div>
        
        {/* Custom Cursor */}
        <div id="custom-cursor" className="custom-cursor" />
        
        {/* Loading Screen */}
        <div id="loading-screen" className="loading-screen">
          <div className="flex flex-col items-center">
            <div className="loading-pulse w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-accent font-mono text-sm">Initializing Experience...</p>
          </div>
        </div>
      </body>
    </html>
  )
}