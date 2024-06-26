// twilioService.js
const twilio = require('twilio');
const dotenv = require('dotenv');

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceId = process.env.TWILIO_SERVICE_SID; // Use Twilio Verify Service SID

const client = twilio(accountSid, authToken);

const sendVerification = async (phoneNumber) => {
  try {
    const verification = await client.verify.services(serviceId)
      .verifications
      .create({ to: `+91${phoneNumber}`, channel: 'sms' });

    return verification;
  } catch (error) {
    console.error('Error sending verification:', error);
    throw error;
  }
};

const checkVerification = async (phoneNumber, code) => {
  try {
    const verificationCheck = await client.verify.services(serviceId)
      .verificationChecks
      .create({ to: phoneNumber, code });

    return verificationCheck;
  } catch (error) {
    console.error('Error checking verification:', error);
    throw error;
  }
};

module.exports = {
  sendVerification,
  checkVerification,
};