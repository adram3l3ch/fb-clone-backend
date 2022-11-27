const isDevelopmentMode = process.env.MODE === "DEV";

const clientURL = isDevelopmentMode
	? "http://localhost:3000"
	: ["https://adra-amie.netlify.app", "https://fb-clone-frontend.vercel.app"];

module.exports = { clientURL };
