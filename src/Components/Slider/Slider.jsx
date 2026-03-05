import banner from '../../assets/img/banner.jpg';
const Banner = () => {
  return (
    <div className="w-full">
      <img src={banner} alt="Banner" className="w-full h-auto object-cover" />
    </div>
  );
};

export default Banner;

