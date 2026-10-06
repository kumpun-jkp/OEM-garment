# Shared silk disclosure arrows

All existing expand chevrons now use the article arrow's 420ms silk easing. Shared rules target native details/summary and aria-expanded buttons. Removed the article-specific duplicate styling and replaced the old 150ms base transition.

Covered components: article disclosures, shrinkage calculator, Home and Journey FAQs, desktop Our Work dropdown, mobile Our Work disclosure, adult product directory and nested category disclosures. Directional navigation and carousel arrows retain their direction.

Production build and git diff --check passed. In-app browser verification:

- Calculator and desktop dropdown open: computed transition 0.42s with cubic-bezier(0.22, 1, 0.36, 1); arrow approaches and settles at 180 degrees.
- Journey FAQ: keyboard Enter opens the native details; settled arrow is 180 degrees.
- Mobile menu and adult group: open arrows are 180 degrees; closed nested category arrows remain unrotated.
- Nested trousers category: pointer opens and rotates; keyboard Enter closes and returns to an unrotated state. The closed shirts sibling stays unrotated.
- Screenshot: mobile-menu.png, showing the independent nested states.

Chrome remains unconnected. This focused rendering check used the in-app browser; Chrome production sign-off remains pending. Preview is running on port 3003.
