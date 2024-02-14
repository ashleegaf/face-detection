'use client';

import Image from 'next/image';
import plusIcon from '@assets/plus_24.svg';
import Spinner from '@assets/spinner.gif';

interface FileInputProps {
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
    isDisabled: boolean;
}

const FileInput: React.FC<FileInputProps> = ({ handleChange, isDisabled }) => {
    return (
        <div
            className={`flex bg-blue-300 w-full min-h-12 rounded-md font-bold ${!isDisabled && 'hover:bg-blue-400 focus:bg-blue-400 focus-within:bg-blue-400'}`}
        >
            <label
                htmlFor='uploadedImage'
                className={`flex justify-center items-center gap-3 text-md p-3 w-full ${!isDisabled && 'cursor-pointer'}`}
            >
                {isDisabled ? (
                    <Image src={Spinner} alt='Loader' width={20} height={20} priority />
                ) : (
                    <>
                        <Image src={plusIcon} alt='Add icon' width={20} height={20} priority />
                        Upload Image
                    </>
                )}
            </label>
            <input
                type='file'
                id='uploadedImage'
                name='uploadedImage'
                accept='image/png, image/jpeg'
                className='visually-hidden'
                onChange={handleChange}
                disabled={isDisabled}
            />
        </div>
    );
};

export default FileInput;
