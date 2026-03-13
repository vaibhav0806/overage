import { interpolate, Easing } from "remotion";

/**
 * Returns a substring of `text` based on current frame — typewriter effect.
 * Best practice: string slicing, not per-char opacity.
 * charFrames = frames per character (2 = fast, 3 = medium, 4 = slow)
 */
export function getTypedText(
	text: string,
	frame: number,
	startFrame: number,
	charFrames: number = 2,
): string {
	const elapsed = Math.max(0, frame - startFrame);
	const charCount = Math.min(text.length, Math.floor(elapsed / charFrames));
	return text.slice(0, charCount);
}

/**
 * Formats a number as USD.
 */
export function formatDollars(value: number, decimals: number = 2): string {
	return (
		"$" +
		value.toLocaleString("en-US", {
			minimumFractionDigits: decimals,
			maximumFractionDigits: decimals,
		})
	);
}

/**
 * Frame-driven cursor blink (no CSS animations — forbidden in Remotion).
 */
export function getCursorOpacity(frame: number, blinkFrames: number = 16): number {
	return interpolate(
		frame % blinkFrames,
		[0, blinkFrames / 2, blinkFrames],
		[1, 0, 1],
		{ extrapolateLeft: "clamp", extrapolateRight: "clamp" },
	);
}

/**
 * Smooth cursor position using easing.
 */
export function getCursorPosition(
	frame: number,
	startFrame: number,
	endFrame: number,
	from: { x: number; y: number },
	to: { x: number; y: number },
): { x: number; y: number } {
	return {
		x: interpolate(frame, [startFrame, endFrame], [from.x, to.x], {
			extrapolateLeft: "clamp",
			extrapolateRight: "clamp",
			easing: Easing.inOut(Easing.quad),
		}),
		y: interpolate(frame, [startFrame, endFrame], [from.y, to.y], {
			extrapolateLeft: "clamp",
			extrapolateRight: "clamp",
			easing: Easing.inOut(Easing.quad),
		}),
	};
}
