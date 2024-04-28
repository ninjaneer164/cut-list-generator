export const getRandomColor = (greyscale: boolean = false): string => {
  const getRandom = () => {
    return Math.trunc(Math.random() * 128 + 64)
      .toString(16)
      .padStart(2, '0');
  };
  const gs = greyscale ? getRandom() : null;
  const rgb = Array.from({ length: 3 }, () => gs ?? getRandom());
  return `#${rgb.join('')}`;
};

export const hsl2Rgb = (h: number, s: number, l: number): string => {
  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    const _ = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    r = _(p, q, h + 1 / 3);
    g = _(p, q, h);
    b = _(p, q, h - 1 / 3);
  }

  const rgb = [r, g, b].map((c) => Math.round(c * 255).toString(16)).join('');

  return `#${rgb}`;
};
