

/**
 * Проверяет, является ли имя файла пустым или состоит только из пробелов/точек
 * @param filename - Имя файла для проверки
 * @returns `true` если имя пустое или некорректное, иначе `false`
 */
export const isEmptyOrDots = (filename: string): boolean => {
  return !filename.trim() || /^\.+$/.test(filename);
};

/**
 * Проверяет, заканчивается ли имя файла точкой или пробелом (недопустимо в Windows)
 * @param filename - Имя файла для проверки
 * @returns `true` если имя заканчивается точкой/пробелом, иначе `false`
 */
export const endsWithDotOrSpace = (filename: string): boolean => {
  return /[.\s]$/.test(filename);
};

/**
 * Проверяет, превышает ли длина имени файла допустимый лимит (255 символов)
 * @param filename - Имя файла для проверки
 * @returns `true` если имя слишком длинное, иначе `false`
 */
export const isTooLong = (filename: string): boolean => {
  return filename.length > 255;
};

/**
 * Основная функция валидации имени файла
 * @param filename - Имя файла для проверки
 * @returns `string | null` - возвращает строку с ошибкой или `null`, если валидация пройдена
 */

export const validateFilename = (filename: string): string | null => {
  if (!filename) return "Имя файла не может быть пустым";
  if (isEmptyOrDots(filename)) return "Имя файла не может состоять только из точек или пробелов";
  if (endsWithDotOrSpace(filename)) return "Имя файла не может заканчиваться точкой или пробелом";
  if (isTooLong(filename)) return "Имя файла слишком длинное (макс. 255 символов)";
  return null; // Валидация пройдена
};