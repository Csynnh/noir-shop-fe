import ItemDetails from '@images/item-primary.png';

const GiftCard = () => {
  return (
    <div>
      <div className=''>
        <div className='mb-16 px-16 py-20 max-w-[48vw] w-full mx-auto text-center'>
          <h1 className='text-5xl font-bold text-center leading-[1.5] mb-6'>Gift Card (4)</h1>
          <p className='font-[gilroy-light] text-[13px] leading-[1.5]'>
            Our Noir Gift Cards offer the ultimate flexibility. Whether your recipient is a fashion
            enthusiast or simply appreciates a thoughtful gift, they can choose the perfect handbag
            to suit their style. From everyday essentials to statement pieces, our collection has
            something for everyone.
          </p>
        </div>
        <div className='relative overflow-hidden h-[400px] w-full flex justify-center'>
          <div className='w-[230vw] h-[230vw] absolute  top-0 left-2/4 -translate-x-2/4 translate-y-10 '>
            <div className='w-full h-full absolute rounded-full border  flex justify-center animate-repeat-rotate z-10'>
              <img
                src={ItemDetails}
                alt='ItemDetails'
                className='w-fit h-32 relative -translate-y-24 px-8 z-20 bg-[#fefcf9]'
              />
            </div>
            <div className=' z-10 w-full h-full absolute rounded-full   flex justify-center animate-repeat-rotate-2'>
              <img
                src={ItemDetails}
                alt='ItemDetails'
                className='w-fit h-32 relative -translate-y-24 px-8 z-20 bg-[#fefcf9]'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiftCard;
