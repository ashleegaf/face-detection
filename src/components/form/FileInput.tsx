'use client';

import Image from 'next/image';
import plusIcon from '@root/public/plus_24.svg';

interface FileInputProps {
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
}

const FileInput: React.FC<FileInputProps> = ({ handleChange }) => {
    return (
        <div className='flex bg-blue-300 hover:bg-blue-400 focus:bg-blue-400 focus-within:bg-blue-400 w-full rounded-md font-bold'>
            <label
                htmlFor='uploadedImage'
                className='flex justify-center items-center gap-3 text-md cursor-pointer p-3 w-full'
            >
                <Image src={plusIcon} alt='Add icon' width={20} height={20} priority />
                Upload Image
            </label>
            <input
                type='file'
                id='uploadedImage'
                name='uploadedImage'
                accept='image/png, image/jpeg'
                className='visually-hidden'
                onChange={handleChange}
            />
        </div>
    );
};

export default FileInput;
