import React from 'react'
import Alert from '@/components/Alert'
import Footer from '@/components/Footer'
  
type Props = {
    children: React.ReactNode
}

const Layout = ({ children }: Props): React.ReactElement => {
    return (
        <>
            <div className="min-h-screen">
                <Alert />
                <main>{children}</main>
            </div>
            <Footer />
        </>
    )
}

export default Layout