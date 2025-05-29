export const handleNetworkError = (error: any, retries: number, maxRetries: number) => {
  console.error('Network Error Details:', {
    code: error.code,
    message: error.message,
    response: error.response?.data
  });

  if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK') {
    if (retries < maxRetries) {
      return true; // Continue retrying
    }
    throw new Error(
      `Network connection failed after ${maxRetries} retries. ` +
      `Please check your internet connection or try again later.`
    );
  }

  throw new Error(`API Error: ${error.response?.data?.message || error.message}`);
};