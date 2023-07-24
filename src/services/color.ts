import { RGBColor } from "react-color";

function componentToHex(c: number): string {
  const hex = c.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

export function RGBAToHex(color: RGBColor): string {
    const hexR = componentToHex(color.r);
    const hexG = componentToHex(color.g);
    const hexB = componentToHex(color.b);

    const alphaByte = Math.round(color.a!*255);
    const hexA = componentToHex(alphaByte);

    return `#${hexR}${hexG}${hexB}${hexA}`;
};