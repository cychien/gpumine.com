import * as React from "react";
import svgSprites from "~/assets/icons/sprites.svg";
import useWindowScroll from "react-use/lib/useWindowScroll";

function QuickActions() {
  const [shouldShowSocialLinks, setShouldShowSocialLinks] =
    React.useState(true);
  const [shouldShowToTopButton, setShouldShowToTopButton] =
    React.useState(false);

  const { y } = useWindowScroll();

  React.useEffect(() => {
    if (y > 100 && !shouldShowToTopButton) {
      setShouldShowToTopButton(true);
    }
    if (y <= 100 && shouldShowToTopButton) {
      setShouldShowToTopButton(false);
    }
    if (y <= 1585 && !shouldShowSocialLinks) {
      setShouldShowSocialLinks(true);
    }
    if (y > 1585 && shouldShowSocialLinks) {
      setShouldShowSocialLinks(false);
    }
  }, [shouldShowSocialLinks, shouldShowToTopButton, y]);

  return (
    <div className="hidden lg:block lg:fixed lg:right-[40px] lg:bottom-[40px] lg:space-y-[10px]">
      {shouldShowToTopButton && (
        <button className="flex w-[50px] h-[50px] justify-center items-center bg-gray-300 rounded-full">
          <span className="sr-only">go to top</span>
          <svg className="min-w-[30px] min-h-[30px] w-[30px] h-[30px] text-white">
            <use href={`${svgSprites}#chevron-up`} />
          </svg>
        </button>
      )}
      {shouldShowSocialLinks && (
        <a
          href="https://m.me/gpumine.org"
          target="_blank"
          rel="noreferrer"
          className="flex w-[50px] h-[50px] justify-center items-center bg-primary-500 rounded-full"
        >
          <span className="sr-only">Messenger</span>
          <svg className="min-w-[30px] min-h-[30px] w-[30px] h-[30px] text-white">
            <use href={`${svgSprites}#messenger`} />
          </svg>
        </a>
      )}
      {shouldShowSocialLinks && (
        <a
          href="https://gpumine.link/gpuminegroup"
          target="_blank"
          rel="noreferrer"
          className="flex w-[50px] h-[50px] justify-center items-center bg-primary-500 rounded-full"
        >
          <span className="sr-only">Line</span>
          <svg className="min-w-[30px] min-h-[30px] w-[30px] h-[30px] text-white">
            <use href={`${svgSprites}#line`} />
          </svg>
        </a>
      )}
    </div>
  );
}

export default QuickActions;
