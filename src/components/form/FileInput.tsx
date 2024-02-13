'use client';

import Image from 'next/image';
import plusIcon from '@root/public/plus_24.svg';

interface IFileInput {
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
}

const FileInput: React.FC<IFileInput> = ({ handleChange }) => {
    return (
        <form className='flex bg-blue-100 hover:bg-blue-300 focus:bg-blue-300 focus-within:bg-blue-300 w-full rounded-md'>
            <label
                htmlFor='image_picker'
                className='flex justify-center items-center gap-3 text-md cursor-pointer p-3 w-full'
            >
                <Image src={plusIcon} alt='Add icon' width={20} height={20} priority />
                Choose an Image
            </label>
            <input
                type='file'
                id='image_picker'
                name='image_picker'
                accept='image/png, image/jpeg'
                className='visually-hidden'
                onChange={handleChange}
            />
        </form>
    );
};

export default FileInput;
