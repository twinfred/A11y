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
  const menuRef = useRef<HTMLDivElement>(null);
  const menuItemsRefs = useRef<HTMLAnchorElement[]>([]);
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

        if (e.key === "ArrowUp") {
          (document.activeElement?.previousSibling as HTMLElement)?.focus();
        } else {
          (document.activeElement?.nextSibling as HTMLElement)?.focus();
        }
      }
    };

    const focusOutHandler = (e: FocusEvent) => {
      if (!isMenuOpen) return;

      const isInsideMenu = menuRef.current?.contains(e.relatedTarget as Node);

      !isInsideMenu && setIsMenuOpen(false);
    };

    window.addEventListener("keydown", keydownHandler);
    window.addEventListener("focusout", focusOutHandler);

    return () => {
      window.removeEventListener("keydown", keydownHandler);
      window.removeEventListener("focusout", focusOutHandler);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (isMenuOpen) {
      menuItemsRefs.current[0]?.focus();
    }
  }, [isMenuOpen]);

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
        <div
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
        </div>
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
      <a role="menuitem" href={href} ref={ref} className="menu-link">
        {children}
      </a>
    );
  }
);
