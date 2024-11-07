# Optional Lab Tasks

## Make Our Nav Bar "Better"

- The links should be underlined if they are "active". In otherwords, if the user is on the `/counter` route, the `Counter` link in the navbar should be underlined.
-   - Hint - lookup `routerLinkActive` on Angular.dev.
- Create a child component for the `<li><a ...` items in the navbar that create the display the link. The NavBar component should iterate over an array of links and pass the values needed to this new component.
-   - You will need required inputs for the link, the text to display and an *optional* input if the route is behind a feature toggle.

## Cleaning Up Banking
- The `/banking/statement` component needs an affordance (link) to get back to the dashboard.
- The buttons are a bit of a mess. Standardize them.
 - create a `shared` folder in the `banking` feature.
 - Decide if you want to implement the buttons as a component or a directive.
 - Make them pretty. Or at least better.
- The `/banking/statement` table is atrocious.
  - The transaction ID isn't available to the user. How would you fix that?
    - You could display it in the table.
    - You could make it so that when they hover over the date of transaction, it displays in a tool tip.
    - We could *not* display them in a table, and use another mechanism (like a DaisyUI Card?)
    - Extra credit - maybe we could each option? Use feature flags to allow us to toggle between each version so we can get some feedback

## The Counter
- Make it so that if they just go to `/counter`, it defaults them to `/counter/ui`. (See our banking routes for an example)
- On the UI component, add a "Reset" button. This should reset both the current value and the amount they are counting by back to the defaults.
- Don't allow the current value to get above $100. If their next increment would take them to 100, or over it, disable the increment button and display a message to the user that "Large Numbers Require an In App Purchase"
