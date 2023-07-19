## Dropdown

### ARIA Roles & Labels

1. #MenuButton

- aria-haspopup
- aria-expanded

2. ul

- role="menu"
- aria-labelledby

3. MenuItem

- role="menuitem"

### Managing Accessibility (A11y)

1. Keyboard Handlers

- Pressing Enter or Space bar on #MenuButton opens menu
- Escape key closes menu
- Up & down arrow keys to navigate menu items

2. Click Handlers

- Clicking #MenuButton opens menu
- Clicking outside of menu closes menu

3. Focus Handler

- Tabbing outside of menu closes menu

4. Focus Management

- When the menu opens, focus shifts to the first menu item

## Internationalization (I18n)

### react-intl

1. The `react-intl` library was added to manage the changing between English and Spanish.
2. The `react-helmet-async` library was added to update the `html` `lang` tag.
