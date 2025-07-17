const HomeIcon = ({
  size = 24,
  color = 'currentColor',
  containerColor = '#dddee1', // Цвет рамки по умолчанию
  className = '',
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >

    <path
      fill={containerColor}
      d="M0 6a6 6 0 0 1 6-6h12a6 6 0 0 1 6 6v12a6 6 0 0 1-6 6H6a6 6 0 0 1-6-6z"
    />
    
    
    <path
      d="M5.875 10.688v7.437h4.375V13.75h3.5v4.375h4.375v-7.437L12 5z"
      fill={color}
    />
  </svg>
);

export default HomeIcon;