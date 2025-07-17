

const Avatar = ({
  name = "Игорь Тандура",
  username = "user76138005",
  avatarUrl = "https://trello-members.s3.amazonaws.com/683ac8ddffde1af60e943f7e/e52359c5399789dcb713e91d59ea9a75/30.png",
  size = 24,
  className = "",
  ...props
}) => (
  <span
    aria-label={`${name} (${username})`}
    role="img"
    title={`${name} (${username})`}
    className={`DweEFaF5owOe02 S7RWiPL9Qgl9P9 kFZ3hS99jGmKWk ${className}`}
    style={{
      backgroundImage: `url("${avatarUrl}")`,
      height: `${size}px`,
      width: `${size}px`,
      lineHeight: `${size}px`,
      display: 'inline-block',
      backgroundSize: 'cover',
      borderRadius: '50%',
    }}
    {...props}
  />
);

export default Avatar;