import { forwardRef, useEffect, useMemo, useRef, useState } from "react";

export const Dropdown = () => {
  const menuItems = useMemo(
    () => [
      { href: "#", text: "How much does it cost?" },
      { href: "#", text: "How do I buy it?" },
      { href: "#", text: "How can I pay my bill?" },
    ],
    []
  );

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const menuItemsRefs = useRef<HTMLAnchorElement[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);

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

    window.addEventListener("keydown", keydownHandler);
    window.addEventListener("click", clickHandler);

    return () => {
      window.removeEventListener("keydown", keydownHandler);
      window.removeEventListener("click", clickHandler);
    };
  }, [activeIndex, isMenuOpen]);

  useEffect(() => {
    if (isMenuOpen) {
      setActiveIndex(0);
      menuItemsRefs.current[0]?.focus();
    }
  }, [isMenuOpen, menuRef]);

  return (
    <>
      <button
        id="MenuButton"
        aria-haspopup="true"
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen)}
        ref={menuButtonRef}
      >
        FAQ
      </button>
      {isMenuOpen && (
        <ul
          style={{ backgroundColor: "lightgrey" }}
          role="menu"
          aria-labelledby="MenuButton"
          ref={menuRef}
        >
          {menuItems.map((item, idx) => (
            <MenuItem
              href={item.href}
              ref={(element) => {
                menuItemsRefs.current[idx] = element as HTMLAnchorElement;
              }}
              key={item.text}
            >
              {item.text}
            </MenuItem>
          ))}
        </ul>
      )}
    </>
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
        <a role="menuitem" href={href} ref={ref}>
          {children}
        </a>
      </li>
    );
  }
);
