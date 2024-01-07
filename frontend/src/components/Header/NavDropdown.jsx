import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const NavDropdown = () => {
  const router = useRouter();
  return (
    <div className="">
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button
          className={`${
            router.pathname.split("/")[1] === "Services"
              ? "text-primary underline-offset-4 underline"
              : "text-black "
          }`}
        >
          Services
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/Services/Services"
                    className={`${
                      active || router.pathname.split("/")[2] === "Services"
                        ? "bg-primary text-white"
                        : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Services
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/Services/Service1"
                    className={`${
                      active || router.pathname.split("/")[2] === "Service1"
                        ? "bg-primary text-white"
                        : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Service 1
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/Services/Service2"
                    className={`${
                      active || router.pathname.split("/")[2] === "Service2"
                        ? "bg-primary text-white"
                        : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Service 2
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/Services/Service3"
                    className={`${
                      active || router.pathname.split("/")[2] === "Service3"
                        ? "bg-primary text-white"
                        : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Service 3
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/Services/Service4"
                    className={`${
                      active || router.pathname.split("/")[2] === "Service4"
                        ? "bg-primary text-white"
                        : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Service 4
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/Services/Service5"
                    className={`${
                      active || router.pathname.split("/")[2] === "Service5"
                        ? "bg-primary text-white"
                        : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Service 5
                  </Link>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default NavDropdown;
