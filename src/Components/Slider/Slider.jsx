const Banner = () => {
  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* আগের মতো শ্যাডো এবং হাইট সেট করা হয়েছে */}
        <div className="relative overflow-hidden shadow-2xl rounded-2xl">
          <img
            src="https://i.ibb.co.com/zT9Gt302/Untitled-design.jpg"
            alt="Banner"
            /* প্রধান পরিবর্তন: aspect-ratio ব্যবহার করা হয়েছে */
            className="w-full h-auto object-contain object-center aspect-[3/1] md:aspect-[3/1]"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
