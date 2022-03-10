import cx from "classnames";
import { NavLink } from "remix";

type LinkProps = {
  to: string;
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
};

function Link({ to, onClick, className, children }: LinkProps) {
  const linkStyle =
    "block px-[15px] text-primary-700 dark:text-white dark:hover:text-[#a0a0a0] text-[15px] text-sm leading-[32px]";

  if (to.startsWith("https://")) {
    return (
      <a
        href={to}
        onClick={onClick}
        className={cx(linkStyle, className)}
        children={children}
      />
    );
  }

  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        cx(linkStyle, {
          "border-b border-primary-700 dark:border-white": isActive,
        })
      }
      end
      children={children}
    />
  );
}

export default Link;
