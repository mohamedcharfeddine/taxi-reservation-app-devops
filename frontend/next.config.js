// /** @type {import('next').NextConfig} */

// const path = require("path");
// const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");
// const TerserPlugin = require("terser-webpack-plugin");

// const isDev = false;

// const withPWA = require("next-pwa")({
// 	dest: "public",

// 	disable: isDev,
// 	runtimeCaching: [
// 		{
// 			urlPattern: /^\/(assets|fonts|locales\/(en|fl|fr)\/common\.json)$/,
// 			handler: "CacheFirst",
// 			options: {
// 				cacheName: "static-assets",
// 				expiration: {
// 					maxEntries: 150,
// 					maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
// 				},
// 			},
// 		},
// 	],
// 	buildExcludes: ["app-build-manifest.json"],
// });

// const generateAppDirEntry = (entry) => {
// 	const packagePath = require.resolve("next-pwa");

// 	const packageDirectory = path.dirname(packagePath);

// 	const registerJs = path.join(packageDirectory, "register.js");

// 	return entry().then((entries) => {
// 		// Register SW on App directory, solution: https://github.com/shadowwalker/next-pwa/pull/427

// 		if (entries["main-app"] && !entries["main-app"].includes(registerJs)) {
// 			if (Array.isArray(entries["main-app"])) {
// 				entries["main-app"].unshift(registerJs);
// 			} else if (typeof entries["main-app"] === "string") {
// 				entries["main-app"] = [registerJs, entries["main-app"]];
// 			}
// 		}

// 		return entries;
// 	});
// };

// const nextConfig = {
// 	experimental: {
// 		appDir: true,
// 	},

// 	reactStrictMode: true,
// 	images: {
// 		domains: ["http://localhost:8080"],
// 	},
// 	webpack(config, { buildId, dev, isServer, defaultLoaders, webpack }) {
// 		new webpack.IgnorePlugin({ resourceRegExp: /canvas/ });
// 		config.optimization = config.optimization || {}; // Ensure optimization field exists

// 		config.optimization.splitChunks = {
// 			chunks: "all",

// 			cacheGroups: {
// 				vendors: {
// 					test: /[\\/]node_modules[\\/]/,
// 					priority: -10,
// 				},
// 				default: {
// 					minChunks: 2,
// 					priority: -20,
// 					reuseExistingChunk: true,
// 				},
// 			},
// 		};
// 		if (!dev) {
// 			config.optimization.minimizer = [
// 				new TerserPlugin({
// 					terserOptions: {
// 						compress: {
// 							drop_console: true,
// 							drop_debugger: true,
// 						},
// 						mangle: {},
// 						output: {
// 							comments: false,
// 						},
// 					},
// 					parallel: true,
// 					extractComments: false,
// 				}),
// 			];
// 		}
// 		config.optimization.concatenateModules = true;
// 		config.plugins.push(new DuplicatePackageCheckerPlugin());
// 		config.resolve.modules = [path.resolve("./src"), "node_modules"];

// 		config.plugins.push(
// 			new webpack.IgnorePlugin({
// 				resourceRegExp: /^\.\/locale$/,
// 				contextRegExp: /moment$/,
// 			})
// 		);
// 		config.module.rules.push({
// 			test: /\.svg$/,
// 			use: ["@svgr/webpack"],
// 		});
// 		config.resolve.alias = {
// 			...config.resolve.alias,
// 			src: path.join(__dirname, "src"),
// 		};

// 		config.performance = {
// 			hints: process.env.NODE_ENV === "production" ? "warning" : false,
// 			maxAssetSize: 600000, // size in bytes
// 			maxEntrypointSize: 600000, // size in bytes
// 		};
// 		if (!dev) {
// 			config.devtool = false;
// 		}

// 		if (!isDev) {
// 			const entry = generateAppDirEntry(config.entry);

// 			config.entry = () => entry;
// 		}

// 		return config;
// 	},
// };

// module.exports = withPWA(nextConfig);

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ["localhost"],
	},
};

module.exports = nextConfig;
