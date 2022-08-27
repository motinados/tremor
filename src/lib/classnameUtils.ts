import { ColorTypes, colorVariantMapping } from './colorVariantMapping';
import {
    Height,
    MarginTop,
    PaddingBottom,
    PaddingLeft,
    PaddingRight,
    PaddingTop,
    Width
} from './inputTypes';
import { twColorsHex } from 'lib/colors';

interface StringJoiner {
    (...classes: (string)[]): string
}

interface TailwindClassConverter {
    (twClassName: string): string
}

interface BoolClassParser {
    (twClassName: boolean): string
}

export const classNames: StringJoiner = (
    ...classes: string[]
): string => {
    return classes.filter(Boolean).join(' ');
};

export const getPixelsFromTwClassName = (
    twClassName: MarginTop | PaddingLeft | PaddingRight | PaddingTop | PaddingBottom | Height | Width
): number => {
    const classNameParts = twClassName.split('-');
    return Number(classNameParts[classNameParts.length - 1]) * 4;
};

export const getColorVariantsFromTwClassName = (twClassName: string): ColorTypes => {
    const classNameParts = twClassName.split('-');
    const baseColor = classNameParts[1];
    const colorValue = classNameParts[2] ? classNameParts[2] : 'none';
    const colorVariants = colorVariantMapping[baseColor][colorValue];
    return colorVariants;
};

export const getColorVariantsFromColorThemeValue = (colorThemeValue: string): ColorTypes => {
    const colorThemeValueParts = colorThemeValue.split('-');
    const baseColor = colorThemeValueParts[0];
    const colorValue = colorThemeValueParts[1];
    const colorVariants = colorVariantMapping[baseColor][colorValue];
    return colorVariants;
};

export const getHexFromColorThemeValue = (colorThemeValue: string): string => {
    const colorThemeValueParts = colorThemeValue.split('-');
    if (!colorThemeValue || colorThemeValueParts.length != 2) return '';
    const baseColor = colorThemeValueParts[0];
    // Currenlty only 500 is supported
    const hexValue = twColorsHex[baseColor][500];
    return hexValue;
};

export const toBorderColorClass: TailwindClassConverter = (twClassName: string): string => {
    const colorTypes = getColorVariantsFromTwClassName(twClassName);
    return colorTypes.borderColor;
};

export const parseTruncateOption: BoolClassParser = (option) => {
    return option===true ? 'truncate' : '';
};

export const parseHFullOption: BoolClassParser = (option) => {
    return option===true ? 'h-full' : '';
};

export const parseWFullOption: BoolClassParser = (option) => {
    return option===true ? 'w-full' : '';
};
