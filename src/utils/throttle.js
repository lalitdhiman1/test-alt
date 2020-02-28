/* function to restrict user to search beyond given frequency in given timeLimit */
const throttle = (func, timeLimit, frequency = 15) => {
  let inThrottle = 0;
  return () => {
    const args = [func, timeLimit, frequency];
    const context = this;
    if (inThrottle < frequency) {
      func.apply(context, args);
      inThrottle += 1;
      setTimeout(() => inThrottle -= 1, timeLimit); // eslint-disable-line
    }
  };
};
export default throttle; 

