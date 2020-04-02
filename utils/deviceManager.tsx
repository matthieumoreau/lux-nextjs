import MobileDetect from 'mobile-detect';

/**
 * @description Module Cookies - Manage cookies front side
 * @module Cookies
 */
const deviceManager = userAgent => {
  const mobileDetect = new MobileDetect(userAgent);

  if (mobileDetect.mobile()) {
    if (mobileDetect.phone()) {
      return 'phone';
    } else if (mobileDetect.tablet()) {
      return 'tablet';
    } else {
      return 'mobile';
    }
  } else if (!mobileDetect.mobile()) {
    return 'desktop';
  }
};

export default deviceManager;
