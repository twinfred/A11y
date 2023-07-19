import { forwardRef, useEffect, useRef, useState } from "react";
import { useIntl } from "react-intl";

interface DropdownProps {
  menuItems: {
    href: string;
    id: string;
  }[];
}

export const Dropdown = ({ menuItems }: DropdownProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const menuItemsRefs = useRef<HTMLAnchorElement[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const intl = useIntl();

  useEffect(() => {
    const keydownHandler = (e: KeyboardEvent) => {
      if (!isMenuOpen) return;

      if (e.key === "Escape") {
        menuButtonRef.current?.focus();
        setIsMenuOpen(false);
      }

      if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        e.preventDefault();

        if (menuItemsRefs.current.length === 0) return;

        const lastIndex = menuItemsRefs.current.length - 1;
        let newIndex;

        if (e.key === "ArrowUp") {
          newIndex = activeIndex <= 0 ? lastIndex : activeIndex - 1;
        } else {
          newIndex = activeIndex >= lastIndex ? 0 : activeIndex + 1;
        }

        setActiveIndex(newIndex);
        menuItemsRefs.current[newIndex]?.focus();
      }
    };

    const clickHandler = (e: MouseEvent) => {
      if (!isMenuOpen || menuButtonRef.current?.contains(e.target as Node)) {
        return;
      }

      if (!menuRef.current?.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    const focusOutHandler = (e: FocusEvent) => {
      if (!isMenuOpen) return;

      const isInsideMenu = menuItemsRefs.current.some((itemRef) =>
        itemRef?.contains(e.relatedTarget as Node)
      );

      if (!isInsideMenu) setIsMenuOpen(false);
    };

    window.addEventListener("keydown", keydownHandler);
    window.addEventListener("click", clickHandler);
    window.addEventListener("focusout", focusOutHandler);

    return () => {
      window.removeEventListener("keydown", keydownHandler);
      window.removeEventListener("click", clickHandler);
      window.removeEventListener("focusout", focusOutHandler);
    };
  }, [activeIndex, isMenuOpen]);

  useEffect(() => {
    if (isMenuOpen) {
      setActiveIndex(0);
      menuItemsRefs.current[0]?.focus();
    }
  }, [isMenuOpen, menuRef]);

  return (
    <div className="dropdown-container">
      <button
        id="MenuButton"
        aria-haspopup="true"
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen)}
        ref={menuButtonRef}
        className="menu-button"
      >
        {intl.formatMessage({ id: "menuButton" })}
      </button>
      {isMenuOpen && (
        <ul
          role="menu"
          aria-labelledby="MenuButton"
          ref={menuRef}
          className="menu-dropdown"
        >
          {menuItems.map((item, idx) => (
            <MenuItem
              href={item.href}
              ref={(element) => {
                menuItemsRefs.current[idx] = element as HTMLAnchorElement;
              }}
              key={item.id}
            >
              {intl.formatMessage({ id: item.id })}
            </MenuItem>
          ))}
        </ul>
      )}
    </div>
  );
};

interface MenuItemprops {
  href: string;
  children: React.ReactNode;
}

const MenuItem = forwardRef<HTMLAnchorElement, MenuItemprops>(
  ({ href, children }, ref) => {
    return (
      <li role="presentation">
        <a role="menuitem" href={href} ref={ref} className="menu-link">
          {children}
        </a>
      </li>
    );
  }
);
