const VERSION = "1.0.5";
const ANDROID_BULD_NO = 4;

export default {
	slug: "GameQA",
	extra: {
		eas: {
			projectId: "4122cc65-2b51-44d8-868e-f0e753814f79",
		},
	},
	ios: {
		supportsTablet: true,
		googleServicesFile: process.env.GOOGLE_SERVICES_PLIST,
		bundleIdentifier: "com.spurningaris.gameqaen",
		buildNumber: VERSION,
	},
	android: {
		adaptiveIcon: {
			foregroundImage: "./assets/adaptive-icon.png",
			backgroundColor: "#FFA800",
		},
		googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
		package: "com.gameqa.gameqaen",
		permissions: [],
		versionCode: ANDROID_BULD_NO,
		config: {
			branch: {
				apiKey: "key_live_kkWb728Kh7lmtcY9KFBT9hdfwrlTN6eD",
			},
		},
	},
	version: VERSION,
	orientation: "portrait",
	icon: "./assets/icon.png",
	splash: {
		image: "./assets/splash.png",
		resizeMode: "contain",
		backgroundColor: "#8950fc",
	},
	updates: {
		fallbackToCacheTimeout: 0,
	},
	assetBundlePatterns: ["*/"],
};