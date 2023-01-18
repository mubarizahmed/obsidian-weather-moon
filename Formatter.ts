import { Hemisphere, Moon } from "lunarphase-js";

export default class Formatter {


	renderTemperature(data: any, unit: string) {
		if (unit == "m") {
			return `${data.current_condition[0].temp_C}°C`;
		} else {
			return `${data.current_condition[0].temp_F}°F`;
		}
	}
	renderFeelLikeTemperature(data: any, unit: string) {
		if (unit == "m") {
			return `${data.current_condition[0].FeelsLikeC}°C`;
		} else {
			return `${data.current_condition[0].FeelsLikeF}°F`;
		}
	}
	renderCondition(data: any, unit: string) {
		let wwoCode = Object.create(null);
		wwoCode = {
			"113": "Sunny",
			"116": "PartlyCloudy",
			"119": "Cloudy",
			"122": "VeryCloudy",
			"143": "Fog",
			"176": "LightShowers",
			"179": "LightSleetShowers",
			"182": "LightSleet",
			"185": "LightSleet",
			"200": "ThunderyShowers",
			"227": "LightSnow",
			"230": "HeavySnow",
			"248": "Fog",
			"260": "Fog",
			"263": "LightShowers",
			"266": "LightRain",
			"281": "LightSleet",
			"284": "LightSleet",
			"293": "LightRain",
			"296": "LightRain",
			"299": "HeavyShowers",
			"302": "HeavyRain",
			"305": "HeavyShowers",
			"308": "HeavyRain",
			"311": "LightSleet",
			"314": "LightSleet",
			"317": "LightSleet",
			"320": "LightSnow",
			"323": "LightSnowShowers",
			"326": "LightSnowShowers",
			"329": "HeavySnow",
			"332": "HeavySnow",
			"335": "HeavySnowShowers",
			"338": "HeavySnow",
			"350": "LightSleet",
			"353": "LightShowers",
			"356": "HeavyShowers",
			"359": "HeavyRain",
			"362": "LightSleetShowers",
			"365": "LightSleetShowers",
			"368": "LightSnowShowers",
			"371": "HeavySnowShowers",
			"374": "LightSleetShowers",
			"377": "LightSleet",
			"386": "ThunderyShowers",
			"389": "ThunderyHeavyRain",
			"392": "ThunderySnowShowers",
			"395": "HeavySnowShowers",
		};
    let weatherSymbol = Object.create(null);
    weatherSymbol = {
      Unknown: "✨",
      Cloudy: "☁️",
      Fog: "🌫",
      HeavyRain: "🌧",
      HeavyShowers: "🌧",
      HeavySnow: "❄️",
      HeavySnowShowers: "❄️",
      LightRain: "🌦",
      LightShowers: "🌦",
      LightSleet: "🌧",
      LightSleetShowers: "🌧",
      LightSnow: "🌨",
      LightSnowShowers: "🌨",
      Overcast: "☁️",
      PartlyCloudy: "⛅️",
      Sunny: "☀️",
      ThunderyHeavyRain: "🌩",
      ThunderyShowers: "⛈",
      ThunderySnowShowers: "⛈",
      VeryCloudy: "☁️",
    };

    let weatherSymbolWidthVTE = Object.create(null);
    weatherSymbolWidthVTE = {
      "✨": 2,
      "☁️": 1,
      "🌫": 2,
      "🌧": 2,
      "🌧": 2,
      "❄️": 1,
      "❄️": 1,
      "🌦": 1,
      "🌦": 1,
      "🌧": 1,
      "🌧": 1,
      "🌨": 2,
      "🌨": 2,
      "⛅️": 2,
      "☀️": 1,
      "☀️": 1,
      "🌩": 2,
      "⛈": 1,
      "⛈": 1,
      "☁️": 1,
    };

		const icon = weatherSymbol[wwoCode[data.current_condition[0].weatherCode]];
    const space = " "
    const width = space.repeat(3 - weatherSymbolWidthVTE[icon]);
		return icon + width;
	}
	renderConditionFullname(data: any, unit: string) {
		return `${data.current_condition[0].weatherDesc[0].value}`;
	}
	renderConditionPlain(data: any, unit: string) {
		let weatherSymbolPlain = Object.create(null);
    weatherSymbolPlain = {
      Unknown: "?",
      Cloudy: "mm",
      Fog: "=",
      HeavyRain: "///",
      HeavyShowers: "//",
      HeavySnow: "**",
      HeavySnowShowers: "*/*",
      LightRain: "/",
      LightShowers: ".",
      LightSleet: "x",
      LightSleetShowers: "x/",
      LightSnow: "*",
      LightSnowShowers: "*/",
      Overcast: "mmm",
      PartlyCloudy: "m",
      Sunny: "o",
      ThunderyHeavyRain: "/!/",
      ThunderyShowers: "!/",
      ThunderySnowShowers: "*!*",
      VeryCloudy: "mmm",
    };
		return weatherSymbolPlain[data.current_condition[0].weatherDesc[0].value];
	}
	renderHumidity(data: any, unit: string) {
		return `${data.current_condition[0].humidity}%`;
	}
	renderPrecipitation(data: any, unit: string) {
		if (unit == "m") {
			return `${data.current_condition[0].precipMM}mm`;
		} else {
			return `${data.current_condition[0].precipInches}in`;
		}
	}
	renderPrecipitationChance(data: any, unit: string) {
		//TODO
		return "";
	}
	renderPressure(data: any, unit: string) {
		if (unit == "m") {
			return `${data.current_condition[0].pressure}hPa`;
		} else {
			return `${data.current_condition[0].pressureInches}in`;
		}
	}
	renderWind(data: any, unit: string) {

    let wind = "";
    const windDirection = ["↓", "↙", "←", "↖", "↑", "↗", "→", "↘", "↓", "↙", "←", "↖"];
    wind += windDirection[Math.trunc(((parseFloat(data.current_condition[0].winddirDegree)+22.5)%360)/45)];

    if (unit == "m") {
      wind += `${data.current_condition[0].windspeedKmph}km/h`;
    } else {
      wind += `${data.current_condition[0].windspeedMiles}mph`;
    }
		return wind;
	}
	renderUvIndex(data: any, unit: string) {
		return `${data.current_condition[0].uvIndex}`;
	}
	renderLocation(data: any, unit: string, location: string) {
		return location;
	}
  renderLocationStation(data: any, unit: string) {
		return (
			`${data.nearest_area[0].areaName[0].value}` +
			"," +
			` ${data.nearest_area[0].country[0].value}`
		);
	}
	renderMoonphase(data: any, unit: string) {
		const date = new Date();

		if (data.nearest_area[0].latitude < 0) {
			return Moon.lunarPhaseEmoji(date, {
				hemisphere: Hemisphere.SOUTHERN,
			});
		} else {
			return Moon.lunarPhaseEmoji(date, {
				hemisphere: Hemisphere.NORTHERN,
			});
		}
	}
	renderMoonday(data: any, unit: string) {
		return parseInt(Moon.lunarAge());
	}
	renderMoonphaseText(data: any, unit: string) {
		return Moon.lunarPhase();
	}
	renderSunrise(data: any, unit: string) {
		return `${data.weather[0].astronomy[0].sunrise}`;
	}
	renderSunset(data: any, unit: string) {
		return `${data.weather[0].astronomy[0].sunset}`;
	}

	dataToString(data: any, format: string, unit: string, location: string) {
		let render = Object.create(null);
		render = {
			c: this.renderCondition,
			C: this.renderConditionFullname,
			x: this.renderConditionPlain,
			h: this.renderHumidity,
			t: this.renderTemperature,
			f: this.renderFeelLikeTemperature,
			w: this.renderWind,
			p: this.renderPrecipitation,
			o: this.renderPrecipitationChance,
			P: this.renderPressure,
			u: this.renderUvIndex,
			l: this.renderLocation,
      L: this.renderLocationStation,
			m: this.renderMoonphase,
			M: this.renderMoonday,
			n: this.renderMoonphaseText,
			S: this.renderSunrise,
			s: this.renderSunset,
		};

		let result = format;
		for (const key of Object.keys(render)) {
			const value = render[key];
			console.log(key, value, typeof value);
			if (typeof value === "function") {
				const re = new RegExp(`%${key}`, "g");
				console.log(re);
				result = result.replace(re, value(data, unit, location));
			}
		}
		return result;
	}
}
