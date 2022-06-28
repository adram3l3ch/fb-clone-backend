const isDevelopmentMode = process.env.MODE === "DEV";

const clientURL = isDevelopmentMode
	? "http://localhost:3000"
	: ["https://adramelech-social-media-app.netlify.app", "https://fb-clone-frontend.vercel.app/"];

module.exports = { clientURL };
