import Logo from "./Logo";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import useToggle from "react-use/lib/useToggle";

function Navbar() {
  const [isMobileMenuOpen, toggleMobileMenu] = useToggle(false);
  const [isMobileSearchOpen, toggleMobileSearch] = useToggle(false);

  return (
    <div>
      {(isMobileMenuOpen || isMobileSearchOpen) && (
        <div
          className="fixed inset-0"
          style={{ backgroundColor: "rgba(128, 128, 128, 0.5)" }}
        />
      )}

      <header className="flex justify-between items-center h-[70px] px-[22px] lg:h-[100px] lg:px-[48px] bg-white">
        <Logo />
        <div className="hidden lg:block">
          <DesktopNav />
        </div>
        <div className="block lg:hidden">
          <MobileNav
            isMenuOpen={isMobileMenuOpen}
            toggleMenu={toggleMobileMenu}
            isSearchOpen={isMobileSearchOpen}
            toggleSearch={toggleMobileSearch}
          />
        </div>
      </header>
    </div>
  );
}

export default Navbar;
