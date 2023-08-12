# Fast React Pizza

A React application that lets users browse a pizza menu and place orders.

## Features

- users can order one or more pizzas from a menu
- does not require login; users input their name before placing an order
- menu is loaded from an API
- users can add pizzas to a cart and change quantity
- user's address is pre-filled based on their GPS location
- users can mark their order as a priority order
- users can update their order to make it a priority order
- each order has a unique ID that can be used to search an order and see order details later

## Technologies used

- React
- React Router
- Redux Toolkit
- TypeScript
- TailwindCSS
- Vite

## Get Started

Open up a terminal and clone this repo:

```bash
# Clone this repository
$ git clone https://github.com/Ayon95/react-birthday-reminder.git

# Go into the repository
$ cd react-birthday-reminder

# Remove current origin repository
$ git remote remove origin
```

Install project dependencies:

```bash
# Install dependencies
$ npm install

# Start development server
$ npm run dev
```

## Creating a production build

Run the following command:

```bash
npm run build
```

This will generate a `dist` folder in the project root directory. It contains optimized bundled CSS and JS files. You can use this folder to deploy the app to a hosting service like [Netlify](https://netlify.com)
