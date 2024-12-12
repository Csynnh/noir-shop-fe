import Upload from '@components/Icons/Upload';
import React, { useEffect, useState } from 'react';

type UploadImageProps = {
  name: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  image?: ImgSelectedType;
};

type ImgSelectedType = {
  url: string;
  name: string;
};

export const UploadImage = ({ name, label, onChange, className = '', image }: UploadImageProps) => {
  const [imgSelected, setImgSelected] = useState<ImgSelectedType | null>(null);
  useEffect(() => {
    if (image) {
      let url = image.url;
      if (!!image.url && typeof image.url !== 'string') {
        url = URL.createObjectURL(image.url);
        image.url = url;
      }
      setImgSelected(image);
    }
  }, [image]);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImgSelected({ url, name: file.name });
    }
  };

  return (
    <div className='mb-5 min-h-16'>
      <label
        className={`w-full h-20 border-[0.5px] border-dashed border-[#837F83] flex items-center gap-3 px-3 cursor-pointer ${className}`}
      >
        <input
          type='file'
          accept='image/png, image/jpg'
          name={name}
          onChange={handleFileChange}
          className='mt-1 w-full px-3 py-2 border border-gray-300 rounded-md !hidden'
        />
        {imgSelected ? (
          <img
            src={imgSelected.url || ''}
            alt='preview'
            className='rounded-[8px] h-20  py-1 object-cover aspect-square'
          />
        ) : (
          <div className='w-20 h-20  flex items-center justify-center'>
            <Upload />
          </div>
        )}
        <div>
          <p className='text-[13px]'>
            Drop your{' '}
            <span className='font-[gilroy-light-italic] text-[15px]'>{label || 'image'}</span> here,
            or <span className='font-[gilroy-bold]'>browse</span>
          </p>
          {imgSelected ? (
            <p className='font-[gilroy-light] text-[12px]'>{imgSelected.name}</p>
          ) : (
            <p className='font-[gilroy-light] text-[12px]'>Supports JPG, PNG</p>
          )}
        </div>
      </label>
    </div>
  );
};
