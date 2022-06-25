const isDevelopmentMode = process.env.MODE === "DEV";

const clientURL = isDevelopmentMode
	? "http://localhost:3000"
	: "https://adramelech-social-media-app.netlify.app";

const serverURL = isDevelopmentMode
	? "http://localhost:5000"
	: "https://adram3l3ch-fb-clone.herokuapp.com/api/v1";

module.exports = { clientURL, serverURL };
