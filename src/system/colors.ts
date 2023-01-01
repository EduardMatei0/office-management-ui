import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
    interface Theme {
        status: {
            danger: React.CSSProperties['color'];
        };
    }

    interface Palette {
        neutral: Palette['primary'];
    }
    interface PaletteOptions {
        neutral: PaletteOptions['primary'];
    }

    interface PaletteColor {
        darker?: string;
    }
    interface SimplePaletteColorOptions {
        darker?: string;
    }
    interface ThemeOptions {
        status: {
            danger: React.CSSProperties['color'];
        };
    }
}

export const COLORS = {
    GREEN: '#6a9639',
    LIGHT_GREEN: '#5c8132',
    WHITE: '#ffffff',
    RED: '#e53e3e'
}

export const theme = createTheme({
    status: {
        danger: '#e53e3e',
    },
    palette: {
        primary: {
            main: COLORS.GREEN,
            darker: COLORS.LIGHT_GREEN,
        },
        neutral: {
            main: '#64748B',
            contrastText: '#fff',
        },
    },
});
