interface Props {
  text: string;
  className: string;
  onClick: () => void;
}

const NavButton = ({ text, className, onClick }: Props) => {
  return (
    <button type="submit" className={className} onClick={onClick}>
      {text}
    </button>
  );
};

export default NavButton;
