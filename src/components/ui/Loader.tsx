import Image from 'next/image';
import spinner from '@assets/spinner.gif';

type LoaderProps = {
    loading: boolean;
    text?: string;
};

const Loader: React.FC<LoaderProps> = ({ loading, text }) => {
    return (
        loading && (
            <div className='flex flex-col items-center justify-center gap-4'>
                {text}
                <Image src={spinner} alt='Spinner' width={50} height={50} priority />
            </div>
        )
    );
};

export default Loader;
