const description = require("eleventy-plugin-description");
const readingTime = require("reading-time");

module.exports = function (config) {
	config.addPassthroughCopy("src/fonts");
	config.addPassthroughCopy("src/img");

	config.addFilter("dateFormat", (date) =>
		new Intl.DateTimeFormat("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
			timeZone: "UTC",
		}).format(date),
	);

	config.addPlugin(description, {
		htmlToTextOptions: {
			selectors: ["h1", "h2", "h3", "h4", "h5", "h6"].map((selector) => ({
				selector,
				format: "skip",
			})),
		},
	});

	config.addFilter("readingTime", (templateContent) =>
		Math.ceil(readingTime(templateContent).minutes),
	);

	return {
		dir: {
			input: "src",
			output: "build",
		},
	};
};
