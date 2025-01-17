"use client";

import CountUp from "react-countup";

const Count = ({ count, duration }: { count: number; duration: number }) => {
  return <CountUp end={count} duration={duration} />;
};

export default Count;
