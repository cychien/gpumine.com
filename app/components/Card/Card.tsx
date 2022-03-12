import cx from "classnames";

type Props = {
  className?: string;
  children: React.ReactNode;
};

function Card({ className, children }: Props) {
  return (
    <div
      className={cx(
        "p-4 rounded-[20px] bg-card-bg border border-[#d6d6d6]",
        className
      )}
      style={{ boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.16)" }}
      children={children}
    />
  );
}

export default Card;
