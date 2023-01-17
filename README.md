# Obsidian Weather & Moon Phases Plugin 

This is a plugin for [Obsidian](https://obsidian.md) that inserts the current weather and moon phase into your notes.

![Screenshot](screenshots/1.gif)

As of now, this plugin only supports the following weather providers:
- [WTTR.in](https://wttr.in)

## Features
- Insert the current weather (single-line).
- Insert the current Moon phase and day.
- Insert the current weather as a HTML block
- Customizable formatting

![Screenshot](screenshots/2.jpg)


## Installation
- Clone this repo.
- `npm i` or `yarn` to install dependencies
- `npm run build` to generate build.
- Copy the contents of the build folder to your vault `VaultFolder/.obsidian/plugins/obsidian-weather-moon/`.
- Reload installed plugins in Obsidian settings.

## Usage
- Open the command palette (Ctrl/Cmd + P) and type `Weather & Moon` to see the available commands.
- The commands are:
    - `Current weather (Inline)`: Inserts the current weather as line of text.
    - `Current weather (HTML)`: Inserts the current weather as a HTML block.
    - `Moon phase (Inline)`: Inserts the current Moon phase and day.
- The command palette can also be opened by typing '/' followed by the command.

## Settings
- Location: This should be a city name, or a city name followed by a comma and a Country. For example, "London" or "London, UK".
- Units: This should be either "metric" or "imperial".
- Format: This should be a string that will be used to format the weather data.

The following is a list of placeholders that can be used in the format string:

| Placeholder | Description |
| ----------- | ----------- |
| %c | weather condition icon |
| %C | weather condition text |
| %x | weather condition plain|
| %h | humidity |
| %t | temperature |
| %f | feels like temperature |
| %w | wind speed |
| %p | precipitation |
| %o | precipitation chance |
| %P | pressure |
| %u | UV index |
| %l | requested location |
| %L | weather station location |
| %m | moon phase icon |
| %M | moon age |
| %n | moon phase name |
| %S | sunrise time |
| %s | sunset time |

## Feedback
If you have any feedback, please feel free to open an issue on the [GitHub repo](https://github.com/mubarizahmed/obsidian-weather-moon/issues). 

## Credits
- [WTTR.in](https://wttr.in) for the weather data.

