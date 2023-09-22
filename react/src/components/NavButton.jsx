// interface Props {
//   text: string;
//   className: string;
//   onClick: () => void;
// }

const NavButton = (props) => {
  return (
    <button type="submit" className={props.className} onClick={props.onClick}>
      {props.text}
    </button>
  );
};

export default NavButton;
