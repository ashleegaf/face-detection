'use client';

import Image from 'next/image';
import plusIcon from '@assets/plus_24.svg';
import spinner from '@assets/spinner.gif';

interface FileInputProps {
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
    isDisabled: boolean;
}

const FileInput: React.FC<FileInputProps> = ({ handleChange, isDisabled }) => {
    return (
        <div
            className={`flex min-h-12 w-full rounded-md bg-blue-300 font-bold ${!isDisabled && 'focus-within:bg-blue-400 hover:bg-blue-400 focus:bg-blue-400'}`}
        >
            <label
                htmlFor='uploadedImage'
                className={`text-md flex w-full items-center justify-center gap-3 p-3 ${!isDisabled && 'cursor-pointer'}`}
            >
                {isDisabled ? (
                    <Image src={spinner} alt='Loader' width={20} height={20} priority />
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
