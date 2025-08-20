export const getColorBrightness = (color: string): number => {
  if (!color || color.startsWith('linear-gradient')) return 128;
  
  try {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    return (r * 299 + g * 587 + b * 114) / 1000;
  } catch {
    return 128; // В случае ошибки возвращаем среднюю яркость
  }
};

export const isLightColor = (color: string): boolean => {
  return getColorBrightness(color) > 128;
};