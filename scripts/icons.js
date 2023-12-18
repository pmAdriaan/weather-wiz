// # Credit for the SVG ICONS from /assets/icons/ goes to @noahblon
// #
// #  URL: https://github.com/noahblon/animated-climacons
// #
// # Icons mapping inspired by this post:
// #  URL: https://community.openhab.org/t/animated-weather-condition-icons-for-openweathermap/61410
// #
// #################################################################


// Creates a weather icon element
function createWeatherIcon(iconCode, isMidDay) {
    let iconMapping = {};

    if (isMidDay) {
        iconMapping = {
            200: "cloud_lightning_sun",
            201: "cloud_lightning_sun",
            202: "cloud_lightning_sun",
            210: "cloud_lightning_sun",
            211: "cloud_lightning_sun",
            212: "cloud_lightning_sun",
            221: "cloud_lightning_sun",
            230: "cloud_lightning_sun",
            231: "cloud_lightning_sun",
            232: "cloud_lightning_sun",
            300: "cloud_drizzle_sun",
            301: "cloud_drizzle_sun",
            302: "cloud_drizzle_sun",
            310: "cloud_drizzle_sun",
            311: "cloud_drizzle_sun",
            312: "cloud_drizzle_sun",
            313: "cloud_drizzle_sun",
            314: "cloud_drizzle_sun",
            321: "cloud_drizzle_sun",
            500: "cloud_rain_sun",
            501: "cloud_rain_sun",
            502: "cloud_rain_sun",
            503: "cloud_rain_sun",
            504: "cloud_rain_sun",
            511: "cloud_hail_sun",
            520: "cloud_rain_alt_sun",
            521: "cloud_rain_alt_sun",
            522: "cloud_rain_alt_sun",
            531: "cloud_rain_alt_sun",
            600: "cloud_snow_sun",
            601: "cloud_snow_alt_sun",
            602: "cloud_snow_alt_sun",
            611: "cloud_hail_alt_sun",
            612: "cloud_hail_alt_sun",
            615: "cloud_hail_alt_sun",
            616: "cloud_hail_alt_sun",
            620: "cloud_snow_sun",
            621: "cloud_snow_sun",
            622: "cloud_snow_alt_sun",
            701: "cloud_fog_sun",
            711: "cloud_fog_alt_sun",
            721: "cloud_fog_sun",
            731: "tornado",
            741: "cloud_fog_sun",
            751: "cloud_fog_alt_sun",
            761: "cloud_fog_alt_sun",
            762: "cloud_fog_alt_sun",
            771: "cloud_fog_alt_sun",
            781: "tornado",
            800: "sun",
            801: "cloud_sun",
            802: "cloud_sun",
            803: "cloud_sun",
            804: "cloud_sun"
        };
    } else {
        iconMapping = {
            200: "cloud_lightning_moon",
            201: "cloud_lightning_moon",
            202: "cloud_lightning_moon",
            210: "cloud_lightning_moon",
            211: "cloud_lightning_moon",
            212: "cloud_lightning_moon",
            221: "cloud_lightning_moon",
            230: "cloud_lightning_moon",
            231: "cloud_lightning_moon",
            232: "cloud_lightning_moon",
            300: "cloud_drizzle_moon",
            301: "cloud_drizzle_moon",
            302: "cloud_drizzle_moon",
            310: "cloud_drizzle_moon",
            311: "cloud_drizzle_moon",
            312: "cloud_drizzle_moon",
            313: "cloud_drizzle_moon",
            314: "cloud_drizzle_moon",
            321: "cloud_drizzle_moon",
            500: "cloud_rain_moon",
            501: "cloud_rain_moon",
            502: "cloud_rain_moon",
            503: "cloud_rain_moon",
            504: "cloud_rain_moon",
            511: "cloud_hail_moon",
            520: "cloud_rain_alt_moon",
            521: "cloud_rain_alt_moon",
            522: "cloud_rain_alt_moon",
            531: "cloud_rain_alt_moon",
            600: "cloud_snow_moon",
            601: "cloud_snow_alt_moon",
            602: "cloud_snow_alt_moon",
            611: "cloud_hail_alt_moon",
            612: "cloud_hail_alt_moon",
            615: "cloud_hail_alt_moon",
            616: "cloud_hail_alt_moon",
            620: "cloud_snow_moon",
            621: "cloud_snow_moon",
            622: "cloud_snow_alt_moon",
            701: "cloud_fog_moon",
            711: "cloud_fog_alt_moon",
            721: "cloud_fog_moon",
            731: "tornado",
            741: "cloud_fog_moon",
            751: "cloud_fog_alt_moon",
            761: "cloud_fog_alt_moon",
            762: "cloud_fog_alt_moon",
            771: "cloud_fog_alt_moon",
            781: "tornado",
            800: "moon",
            801: "cloud_moon",
            802: "cloud_moon",
            803: "cloud_moon",
            804: "cloud_moon"
        };
    }

    const iconName = iconMapping[iconCode];
    return $(`<img id="weather-icon" src="./assets/icons/climacon-${iconName}.svg" alt="Weather Icon">`);
}
