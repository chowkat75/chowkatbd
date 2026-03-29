import React, { useEffect, useRef } from 'react';

export default function Header() {
  const titleRef = useRef(null);
  const ribbonRef = useRef(null);

  useEffect(() => {
    const elements = [titleRef.current, ribbonRef.current];
    elements.forEach((el, index) => {
      if (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        setTimeout(() => {
          el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, index * 200);
      }
    });
  }, []);

  return (
    <header className="relative flex items-center justify-center bg-gradient-to-br from-[#c8b6ff]/20 via-[#f8edeb]/10 to-[#c8b6ff]/10 px-4 py-8 md:py-12 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full border-2 border-[#9d4edd]/20 animate-float-slow"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full border-2 border-[#5a189a]/20 animate-float"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#c8b6ff]/5"></div>
      </div>

      <div className="relative max-w-4xl lg:max-w-6xl mx-auto w-full px-4">
        <div className="text-center">
          {/* Badge */}
          <div
            ref={ribbonRef}
            className="inline-flex items-center gap-2 md:gap-3 bg-white/80 backdrop-blur-sm px-4 py-2 md:px-5 md:py-3 rounded-xl md:rounded-2xl border border-[#9d4edd]/20 shadow-lg mb-6 md:mb-8 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:border-[#9d4edd]/40"
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#9d4edd] to-[#5a189a] rounded-full blur opacity-20 animate-pulse"></div>
              <div className="relative w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#9d4edd]/10 to-[#5a189a]/10 rounded-xl md:rounded-2xl flex items-center justify-center shadow-inner">
                <span className="text-lg md:text-xl lg:text-2xl">🎁</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-gradient-to-r from-[#9d4edd] to-[#5a189a] rounded-full animate-pulse"></div>
              <span className="text-xs md:text-sm font-semibold text-[#5a189a] tracking-wide">
                প্রিমিয়াম ঈদ কালেকশন
              </span>
            </div>
          </div>

          <div className="relative max-w-5xl mx-auto w-full">
            <div className="text-center">
              {/* Main Title */}
              <div className="mb-2 text-center" ref={titleRef}>
                <h1
                  className="
                    font-bold text-gray-900 
                    text-center whitespace-nowrap
                     sm:text-xl md:text-4xl
                    flex items-center justify-center gap-2
                  "
                >
                  <span className="bg-gradient-to-r from-[#5a189a] to-[#9d4edd] bg-clip-text text-transparent">
                    নববর্ষের নতুন সাজে
                  </span>
                  <span className="text-gray-500">|</span>
                  <span className="text-gray-800">ঐতিহ্যের রঙে নিজেকে রাঙান 
                </h1>
              </div>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-gray-600">
                <span className="text-[#5a189a] font-medium">বৈশাখী কালেকশনে এবার থাকছ </span>{' '}
                <span className="text-[#9d4edd] font-medium">ভালোবাসার ছোঁয়া</span>{' '}
               প্রতিটি ভাঁজেে
              </p>
            </div>
          </div>

          {/* Decorative Separator */}
          <div className="flex items-center justify-center gap-3 md:gap-4">
            <div className="w-8 md:w-12 h-px bg-gradient-to-r from-transparent to-[#9d4edd]/50"></div>
            <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-gradient-to-r from-[#5a189a] to-[#9d4edd] animate-spin-slow"></div>
            <div className="w-8 md:w-12 h-px bg-gradient-to-r from-[#9d4edd]/50 to-transparent"></div>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(1deg);
          }
        }
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(-1deg);
          }
        }
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </header>
  );
}
