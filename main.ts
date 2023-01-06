import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';

// Remember to rename these classes and interfaces!

interface WeatherMoonSettings {
	location: string;
	unit: string;
}

const DEFAULT_SETTINGS: WeatherMoonSettings = {
	location: 'Kleve, Germany',
	unit: 'm'
}

export default class WeatherMoon extends Plugin {
	settings: WeatherMoonSettings;

	async onload() {
		await this.loadSettings();

		// This adds a new command that inserts current weather data into the active editor
		this.addCommand({
			id: 'current-weather',
			name: 'Current weather',
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
			name: 'Moon phase',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				this.getMoonPhase().then((moonPhase) => {
					// This will insert the text at the current cursor position
					editor.replaceSelection(moonPhase);
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
		const response = await fetch('https://wttr.in/'+this.settings.location+'?'+this.settings.unit+'&format=4&lang=en');
		const data = await response.text();
		console.log(data);
		return data;
	}

	// function to fetch moon phase data from wttr.in
	async getMoonPhase() {
		const response = await fetch('https://wttr.in/'+this.settings.location+'?'+this.settings.unit+'&format=%m+D:%20%M\n&lang=en');
		const data = await response.text();
		console.log(data);
		return data;
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
					console.log('Location: ' + value);
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
					console.log('Temperature Unit: ' + value);
					this.plugin.settings.unit = value;
					await this.plugin.saveSettings();
				}));
	}
}
