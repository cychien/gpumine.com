import usePages from "./usePages";
import Link from "./Link";
import SearchInput from "./SearchInput";

function DesktopNav() {
  const pages = usePages();

  return (
    <div className="flex items-center space-x-5">
      <ul className="flex items-center space-x-5">
        {pages.map((page) => (
          <li key={page.id}>
            <Link to={page.link}>{page.name}</Link>
          </li>
        ))}
      </ul>
      <SearchInput />
    </div>
  );
}

export default DesktopNav;
