import { loadTheme } from "office-ui-fabric-react";

export function loadThemeLight() {
    loadTheme({
        palette: {
            themePrimary: "#0078d4",
            themeLighterAlt: "#eff6fc",
            themeLighter: "#deecf9",
            themeLight: "#c7e0f4",
            themeTertiary: "#71afe5",
            themeSecondary: "#2b88d8",
            themeDarkAlt: "#106ebe",
            themeDark: "#005a9e",
            themeDarker: "#004578",
            neutralLighterAlt: "#f8f8f8",
            neutralLighter: "#f4f4f4",
            neutralLight: "#eaeaea",
            neutralQuaternaryAlt: "#dadada",
            neutralQuaternary: "#d0d0d0",
            neutralTertiaryAlt: "#c8c8c8",
            neutralTertiary: "#c2c2c2",
            neutralSecondary: "#858585",
            neutralPrimaryAlt: "#4b4b4b",
            neutralPrimary: "#333333",
            neutralDark: "#272727",
            black: "#1d1d1d",
            white: "#ffffff",
        },
    });
}

export function loadThemeDark() {
    loadTheme({
        palette: {
            themePrimary: "#0078d4",
            themeLighterAlt: "#000508",
            themeLighter: "#001322",
            themeLight: "#00243f",
            themeTertiary: "#00487f",
            themeSecondary: "#006aba",
            themeDarkAlt: "#1684d8",
            themeDark: "#3595de",
            themeDarker: "#66afe7",
            neutralLighterAlt: "#3c3c3c",
            neutralLighter: "#444444",
            neutralLight: "#515151",
            neutralQuaternaryAlt: "#595959",
            neutralQuaternary: "#5f5f5f",
            neutralTertiaryAlt: "#7a7a7a",
            neutralTertiary: "#c8c8c8",
            neutralSecondary: "#d0d0d0",
            neutralPrimaryAlt: "#dadada",
            neutralPrimary: "#ffffff",
            neutralDark: "#f4f4f4",
            black: "#f8f8f8",
            white: "#333333",
        },
    });
}
