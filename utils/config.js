const DATABASE_URL =
  "mongodb+srv://daniel:ZaAWyI6qJdF3u1R5@samuraj.vnd9qmc.mongodb.net/?retryWrites=true&w=majority";

module.exports = {
  DATABASE_URL,
  keySession: ["TWOJKLUCZ"],
  maxAgeSession: 24 * 60 * 60 * 1000,
};
