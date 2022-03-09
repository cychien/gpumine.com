import { useHydrated } from "remix-utils";
import cx from "classnames";
import { Menu as JSMenu } from "@headlessui/react";

type MenuProps = Parameters<typeof JSMenu>[0];

type MenuButtonProps = { ariaLabel?: string } & Parameters<
  typeof JSMenu.Button
>[0];

type MenuItemsProps = { isStatic?: boolean } & Parameters<
  typeof JSMenu.Items
>[0];

type MenuItemProps = Parameters<typeof JSMenu.Item>[0];

function Menu({ className, children }: MenuProps) {
  const isHydrated = useHydrated();

  if (!isHydrated) {
    return <div className={cx("dropdown", className)}>{children}</div>;
  }

  return (
    <JSMenu as="div" className={className}>
      {children}
    </JSMenu>
  );
}

function MenuButton({ className, children, ariaLabel }: MenuButtonProps) {
  const isHydrated = useHydrated();

  if (!isHydrated) {
    return (
      <label tabIndex={0} className={className} aria-label={ariaLabel}>
        {children}
      </label>
    );
  }

  return (
    <JSMenu.Button aria-label={ariaLabel} className={cx("block", className)}>
      {children}
    </JSMenu.Button>
  );
}

function MenuItems({ className, children, isStatic = false }: MenuItemsProps) {
  const isHydrated = useHydrated();

  if (!isHydrated) {
    return (
      <ul tabIndex={0} className={cx("dropdown-content menu", className)}>
        {children}
      </ul>
    );
  }

  return (
    <JSMenu.Items as="ul" className={className} static={isStatic}>
      {children}
    </JSMenu.Items>
  );
}

function MenuItem({ className, children }: MenuItemProps) {
  const isHydrated = useHydrated();

  if (!isHydrated) {
    return <li className={className}>{children}</li>;
  }

  return (
    <JSMenu.Item as="li" className={className}>
      {children}
    </JSMenu.Item>
  );
}

export { Menu, MenuButton, MenuItems, MenuItem };
