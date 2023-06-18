import "./button.scss";

const Button = ({ name, size }: { name: string; size?: string }) => {
  return (
    <button className={size === "sx" ? "button button-sx" : "button"}>
      {name}
    </button>
  );
};

export default Button;
