type Opacity = 0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1;

const hexToRgba = (hex: string, alpha: Opacity): string => {
	let c: any = hex.substring(1).split('')
	if (c.length == 3) {
		c = [c[0], c[0], c[1], c[1], c[2], c[2]]
	}
	c = '0x' + c.join('')
	return `rgba(${[(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',')}, ${alpha})`
}

export default hexToRgba
