import * as React from "react";
import { Link } from "remix";
import { useHydrated } from "remix-utils";

type Props = {
  className?: string;
  children: React.ReactNode;
  url: string;
  onClick: () => void;
};

function AjaxLink({ className, children, url, onClick }: Props) {
  const isHydrated = useHydrated();

  if (!isHydrated) {
    return (
      <Link className={className} to={url}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={className} onClick={onClick}>
      {children}
    </button>
  );
}

export default AjaxLink;
