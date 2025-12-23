export const sendNotification = async ({ phone, message }) => {
  // MOCK MODE (Interview-safe)
  console.log(`📲 Notification sent to ${phone}: ${message}`);

  return {
    success: true,
    provider: 'mock'
  };
};
