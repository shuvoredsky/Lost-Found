import { useEffect, useRef, useState } from "react";
import { FaMapMarkerAlt, FaHandsHelping, FaSearch } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";

const AnimatedCounter = () => {
  const [lostItemsCount, setLostItemsCount] = useState(0);
  const [foundMatchesCount, setFoundMatchesCount] = useState(0);
  const [recoveryRateCount, setRecoveryRateCount] = useState(0);
  const [isAnimated, setIsAnimated] = useState(false);
  const counterRef = useRef(null);

  const targetValues = {
    lostItems: 876,
    foundMatches: 789,
    recoveryRate: 88,
  };
  const duration = 2000;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isAnimated) {
            setIsAnimated(true);
            startCountAnimation();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) observer.observe(counterRef.current);

    return () => {
      if (counterRef.current) observer.unobserve(counterRef.current);
    };
  }, [isAnimated]);

  const startCountAnimation = () => {
    const startTime = Date.now();
    const endTime = startTime + duration;

    const animate = () => {
      const currentTime = Date.now();
      const progress = Math.min(1, (currentTime - startTime) / duration);

      setLostItemsCount(Math.floor(targetValues.lostItems * progress));
      setFoundMatchesCount(Math.floor(targetValues.foundMatches * progress));
      setRecoveryRateCount(Math.floor(targetValues.recoveryRate * progress));

      if (currentTime < endTime) {
        requestAnimationFrame(animate);
      } else {
        setLostItemsCount(targetValues.lostItems);
        setFoundMatchesCount(targetValues.foundMatches);
        setRecoveryRateCount(targetValues.recoveryRate);
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <div className="py-12 px-4 bg-base-100 text-base-content">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-primary mb-8">
          Our Community Achievements
        </h2>
        <div
          ref={counterRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {[
            {
              icon: <FaSearch size={40} className="text-secondary" />,
              count: lostItemsCount,
              label: "Lost Items Reported",
              suffix: "+",
            },
            {
              icon: <FaHandsHelping size={36} className="text-secondary" />,
              count: foundMatchesCount,
              label: "Successful Matches",
              suffix: "+",
            },
            {
              icon: <IoMdTime size={38} className="text-secondary" />,
              count: recoveryRateCount,
              label: "Recovery Rate",
              suffix: "%",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="p-6 text-center rounded-xl bg-base-200 border border-base-300 hover:shadow-md hover:shadow-secondary/30 transition-all duration-300"
            >
              <div className="flex justify-center mb-3">{item.icon}</div>
              <h2 className="text-4xl font-bold my-2">
                {item.count}
                <span className="text-secondary">{item.suffix}</span>
              </h2>
              <p className="text-sm md:text-base tracking-wide">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnimatedCounter;
