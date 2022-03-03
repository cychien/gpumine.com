import desktopLogo from "~/assets/images/logo-desktop.svg";
import { Listbox } from "@headlessui/react";
import ethIcon from "~/assets/icons/eth.svg";
import { useState } from "react";

const PAGES = [
  { name: "首頁", link: "/tw", id: "home" },
  { name: "幫助", link: "https://gpumine.zendesk.com/hc/zh-tw", id: "help" },
];

const ADDRESS_TYPES = [{ name: "ETH", icon: ethIcon, id: "eth" }];

function Navbar() {
  const [addressType, setAddressType] = useState("eth");

  return (
    <header className="flex justify-between items-center h-[100px] px-[48px]">
      <a href="/tw">
        <img src={desktopLogo} alt="GPUMINE logo" className="h-[32px]" />
      </a>
      <div className="flex items-center space-x-5">
        <ul className="flex items-center space-x-5">
          {PAGES.map((page) => (
            <li key={page.id} className="px-[15px]">
              <a href={page.link} className="text-primary-700 text-[15px]">
                {page.name}
              </a>
            </li>
          ))}
        </ul>
        <form method="get">
          <div className="flex">
            <div>
              <div className="hideWhenNoJS">
                <Listbox value={addressType} onChange={setAddressType}>
                  <div className="relative">
                    <Listbox.Button className="relative">
                      {
                        ADDRESS_TYPES.find((type) => type.id === addressType)
                          .name
                      }
                    </Listbox.Button>
                    <Listbox.Options className="absolute">
                      {ADDRESS_TYPES.map((type) => (
                        <Listbox.Option key={type.id} value={type.id}>
                          {type.name}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </div>
                </Listbox>
                {/* <input name="address_type" value={addressType} hidden /> */}
              </div>

              <select name="address_type" className="showWhenNoJS">
                {ADDRESS_TYPES.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </form>
      </div>
    </header>
  );
}

export default Navbar;
