import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'AI Face Detection Processor',
    description: 'Detect faces in an image.',
};

export type ReadOnlyPropsType = Readonly<{
    children: React.ReactNode;
}>;

const RootLayout: React.FC<ReadOnlyPropsType> = ({ children }) => {
    return (
        <html lang='en'>
            <body className={inter.className}>{children}</body>
        </html>
    );
};

export default RootLayout;
