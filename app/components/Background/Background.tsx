import bgDesktopLight from "~/assets/images/bg-desktop-light.png";
import bgDesktopDark from "~/assets/images/bg-desktop-dark.png";
import bgDesktopLightWebp from "~/assets/images/bg-desktop-light.webp";
import bgDesktopDarkWebp from "~/assets/images/bg-desktop-dark.webp";
import bgMobileLight from "~/assets/images/bg-mobile-light.png";
import bgMobileDark from "~/assets/images/bg-mobile-dark.png";

function Background() {
  return (
    <div className="absolute right-0 top-[100px] pointer-events-none lg:top-0">
      <picture className="hidden lg:block dark:lg:hidden">
        <source type="image/webp" srcSet={bgDesktopLightWebp} />
        <img alt="" src={bgDesktopLight} />
      </picture>
      <picture className="hidden dark:lg:block">
        <source type="image/webp" srcSet={bgDesktopDarkWebp} />
        <img alt="" src={bgDesktopDark} />
      </picture>
      <img className="block dark:hidden lg:hidden" src={bgMobileLight} alt="" />
      <img
        className="hidden dark:block lg:hidden dark:lg:hidden"
        src={bgMobileDark}
        alt=""
      />
    </div>
  );
}

export default Background;
