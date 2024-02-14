import Image from 'next/image';
import Spinner from '@root/public/spinner.gif';

type LoaderProps = {
    loading: boolean;
    text?: string;
};

const Loader: React.FC<LoaderProps> = ({ loading, text }) => {
    return (
        loading && (
            <div className='flex flex-col items-center justify-center gap-4'>
                {text}
                <Image src={Spinner} alt='Loader' width={50} height={50} priority />
            </div>
        )
    );
};

export default Loader;
