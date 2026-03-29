const Banner = () => {
  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* আগের কোডের মতো শ্যাডো এবং হাইট সেট করা হয়েছে */}
        <div className="relative overflow-hidden shadow-2xl rounded-2xl h-[240px] md:h-[500px]">
          <img
            src="https://i.ibb.co.com/zT9Gt302/Untitled-design.jpg"
            alt="Banner"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          
          {/* ইমেজ যাতে বেশি সাদা না লাগে তাই হালকা একটু ডার্ক ওভারলে (ঐচ্ছিক) */}
          <div className="absolute inset-0 bg-black/5"></div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
