'use client';

import { useState } from 'react';

const Sidebar = () => {
    const [thumbnails, setThumbnails] = useState<any[]>([]);

    return (
        <div className='overflow-y-auto'>
            <div className='flex flex-col items-center gap-y-6 bg-gray-100 overflow-y-auto pt-5 w-60 h-screen max-h-screen'>
                <FileInput />
                <div>{thumbnails}</div>
            </div>
        </div>
    );
};

export default Sidebar;
