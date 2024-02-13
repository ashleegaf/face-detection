import Sidebar from '@/components/ui/Sidebar';

const Home = () => {
    return (
        <div className='min-h-screen flex'>
            <Sidebar />
            <main className='flex flex-col flex-1 items-center p-10 bg-emerald-200 overflow-y-hidden'>
                <header>
                    <h1>AI Face Detection Processor</h1>
                </header>
            </main>
        </div>
    );
};

export default Home;
