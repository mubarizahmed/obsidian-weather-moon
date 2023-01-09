import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';

// Remember to rename these classes and interfaces!

interface WeatherMoonSettings {
	location: string;
	unit: string;
	inlineFormatWeather: string;
	inlineFormatMoon: string;
}

const DEFAULT_SETTINGS: WeatherMoonSettings = {
	location: 'Kleve, Germany',
	unit: 'm',
	inlineFormatWeather: '%l:+%c+🌡️%t+🌬️%w\n',
	inlineFormatMoon: '%m+D:%20%M\n'
}

export default class WeatherMoon extends Plugin {
	settings: WeatherMoonSettings;

	async onload() {
		await this.loadSettings();

		// This adds a new command that inserts current weather data into the active editor
		this.addCommand({
			id: 'current-weather',
			name: 'Current weather (Inline)',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				// this.getWeatherDataOWM();
				
				this.getWeatherDataWttr().then((weatherData) => {
					// This will insert the text at the current cursor position					
					editor.replaceSelection(weatherData);
				});

			}
		});

		// This adds a new command that inserts Today's moon phase data into the active editor
		this.addCommand({
			id: 'moon-phase',
			name: 'Moon phase (Inline)',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				this.getMoonPhase().then((moonPhase) => {
					// This will insert the text at the current cursor position
					editor.replaceSelection(moonPhase);
				});
			}
		});

		//Ths adds a new command that inserts current weather data into the active editor as a HTML element
		this.addCommand({
			id: 'current-weather-html',
			name: 'Current weather (HTML)',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				// this.getWeatherDataOWM();

				this.getWeatherHTML().then((weatherData) => {
					// This will insert the text at the current cursor position
					editor.replaceSelection(weatherData);
				});

			}
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new SampleSettingTab(this.app, this));

		// If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
		// Using this function will automatically remove the event listener when this plugin is disabled.
		this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
			console.log('click', evt);
		});

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	// function to fetch weather data from openweathermap.org
	// async getWeatherDataOWM() {
	// 	const response = await fetch("https://api.openweathermap.org/data/2.5/weather?q="+this.settings.location+"&appid="+process.env.OPENWEATHER_API);
	// 	const data = await response.json();
	// 	console.log(data);
	// 	return data;
	// }

	// function to fetch weather data from wttr.in
	async getWeatherDataWttr() {
		const response = await fetch('https://wttr.in/'+this.settings.location+'?'+this.settings.unit+'&format='+this.settings.inlineFormatWeather+'&lang=en');
		const data = await response.text();
		console.log(data);
		return data;
	}

	// function to fetch moon phase data from wttr.in
	async getMoonPhase() {
		const response = await fetch('https://wttr.in/'+this.settings.location+'?'+this.settings.unit+'&format='+this.settings.inlineFormatMoon+'&lang=en');
		const data = await response.text();
		console.log(data);
		return data;
	}

	// function to insert weather data into a HTML element and return it
	async getWeatherHTML() {
		const response = await fetch('https://wttr.in/'+this.settings.location+'?'+this.settings.unit+'&format=%t|%l|%w|%m|%c&lang=en');
		const data = await response.text();
		const dataSplit = data.split("|",5);

		const dataHTML = '<div style="display:flex; border-radius:0.5em; width=100%; border: 0.1em solid lavender; color:black;"> <div style="display:flex; flex:2; background-color:lavender; border-radius:0.5rem 0 0 0.5em; padding:0em; align-items:center; justify-content:space-evenly; text-align:center;"><div><p style="font-size:5em; margin:0; font-weight:300">'+dataSplit[0]+'</p></div><div style="text-align:justify"><p style="margin:0.1em; font-weight:bold">'+dataSplit[1]+'</p><p style="margin:0.1em;">'+dataSplit[2]+'</p><p style="margin:0.0em;">'+dataSplit[3]+'</p></div></div><div style="display:flex; flex:1; background-color:white;border-radius:0 0.5rem 0.5em 0; padding:0em; align-items:center; justify-content:space-evenly;"><p style="font-size:5em; margin:0;">'+dataSplit[4]+'</p></div></div>\n';
		return dataHTML;
	}
}


class SampleSettingTab extends PluginSettingTab {
	plugin: WeatherMoon;

	constructor(app: App, plugin: WeatherMoon) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		containerEl.createEl('h1', {text: 'Weather & Moon Phases Settings'});

		new Setting(containerEl)
			.setName('Location')
			.setDesc('Set a location to fetch weather. [City, Country]')
			.addText(text => text
				.setPlaceholder('Kleve, Germany')
				.setValue(this.plugin.settings.location)
				.onChange(async (value) => {
					this.plugin.settings.location = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Temperature Unit')
			.setDesc('Set a temperature unit to display.')
			.addDropdown(dropdown => dropdown
				.addOption('m', 'Celsius')
				.addOption('u', 'Fahrenheit')
				.setValue(this.plugin.settings.unit)	
				.onChange(async (value) => {
					this.plugin.settings.unit = value;
					await this.plugin.saveSettings();
				}));
		
		new Setting(containerEl)
			.setName('Weather Inline Format')
			.setDesc('Set a format for inline weather data. (See https://github.com/chubin/wttr.in#one-line-output for placeholders.)')
			.addText(text => text
				.setPlaceholder('%l:+%c+🌡️%t+🌬️%w\n')
				.setValue(this.plugin.settings.inlineFormatWeather)
				.onChange(async (value) => {
					if (value == '') {
						this.plugin.settings.inlineFormatWeather = '%l:+%c+🌡️%t+🌬️%w\n';
					}else{
						this.plugin.settings.inlineFormatWeather = value;
					}
					await this.plugin.saveSettings();
				}
			))


		new Setting(containerEl)
			.setName('Moon Phase Inline Format')
			.setDesc('Set a format for inline moon phase data. (See https://github.com/chubin/wttr.in#one-line-output for placeholders.)')
			.addText(text => text
				.setPlaceholder('%m+D:%20%M\n')
				.setValue(this.plugin.settings.inlineFormatMoon)
				.onChange(async (value) => {
					if (value == '') {
						this.plugin.settings.inlineFormatMoon = '%m+D:%20%M\n';
					}else{
						this.plugin.settings.inlineFormatMoon = value;
					}
					await this.plugin.saveSettings();
				}
			));
	}
}
