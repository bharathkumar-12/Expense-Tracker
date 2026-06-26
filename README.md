# Expense Tracker 💰

[![Netlify Status](https://img.shields.io/badge/Live-Netlify-00C7B7?logo=netlify&logoColor=white)](https://track-transactions.netlify.app/)
[![Vue 3](https://img.shields.io/badge/Vue-3.3-4FC08D?logo=vue.js&logoColor=white)](https://vuejs.org)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com)

A modern, feature-rich expense tracking application built with Vue 3, Vite, and Tailwind CSS. Track your income and expenses with an intuitive interface, real-time balance calculations, and beautiful data visualizations.

🔗 **Live Demo**: [https://track-transactions.netlify.app/](https://track-transactions.netlify.app/)

<img width="1600" height="1511" alt="screen" src="https://github.com/user-attachments/assets/446bfbec-bb62-48a7-93b5-dbf645040d1f" />



## ✨ Features

### Core Functionality

- **Transaction Management**: Add, view, and delete income/expense transactions
- **Real-time Balance**: Automatic calculation of total balance, income, and expenses
- **Transaction History**: Comprehensive list of all transactions with timestamps
- **Recent Activity**: Quick view of the most recent transactions
- **Local Storage**: Persist data across browser sessions
- **Form Validation**: Client-side validation with FormKit

### User Experience

- **Modern UI/UX**: Dark theme with gradient backgrounds and glassmorphism effects
- **Responsive Design**: Fully responsive layout for mobile, tablet, and desktop
- **Toast Notifications**: Instant feedback for user actions
- **Font Awesome Icons**: Beautiful icons throughout the interface
- **Smooth Animations**: Hover effects and transitions for better interactivity

### Technical Highlights

- **Vue 3 Composition API**: Modern Vue development patterns
- **Vite Build Tool**: Lightning-fast HMR and optimized builds
- **Component Architecture**: Modular, reusable components
- **FormKit Integration**: Advanced form handling with validation
- **Tailwind CSS**: Utility-first styling with custom configurations

## 🚀 Quick Start

### Prerequisites

- Node.js 16.x or higher
- npm, pnpm, or yarn

### Setup

```bash

# Clone the repository

git clone https://github.com/yourusername/expense-tracker.git
cd expense-tracker

# Install dependencies

npm install
```

### Development

Start the development server with hot-reload at `http://localhost:5173`:

```bash
npm run dev
```

### Production Build

```bash

# Build for production

npm run build

# Preview production build

npm run preview
```

## 📁 Project Structure

```
expense-tracker/
├── public/                    # Static assets

├── src/
│   ├── assets/
│   │   └── style.css         # Global styles and Tailwind directives

│   ├── components/
│   │   ├── AddTransaction.vue      # Transaction form component

│   │   ├── Balance.vue             # Total balance display

│   │   ├── Footer.vue              # Footer component

│   │   ├── Header.vue              # Header component

│   │   ├── IncomeExpenseChart.vue  # Chart visualization

│   │   ├── IncomeExpenses.vue      # Income/expense summary

│   │   ├── RecentTransactionList.vue  # Recent transactions

│   │   └── TransactionList.vue     # Full transaction list

│   ├── App.vue               # Root component

│   └── main.js               # Application entry point

├── formkit.config.js         # FormKit configuration

├── formkit.theme.mjs         # FormKit theme customization

├── tailwind.config.js        # Tailwind CSS configuration

└── vite.config.js            # Vite configuration

```

## 🛠️ Tech Stack

### Frontend Framework

- **[Vue 3](https://vuejs.org)** - Progressive JavaScript framework with Composition API
- **[Vite](https://vitejs.dev)** - Next generation frontend tooling with instant HMR

### Styling & UI

- **[Tailwind CSS](https://tailwindcss.com)** - Utility-first CSS framework
- **[Font Awesome](https://fontawesome.com)** - Icon library for consistent visual elements
- **Custom Glassmorphism** - Modern UI design with backdrop blur effects

### Form Management

- **[FormKit](https://formkit.com)** - Vue form library with validation
- **Custom Validation Rules** - Client-side form validation

### User Feedback

- **[Vue Toastification](https://vue-toastification.maronato.dev/)** - Beautiful toast notifications

### Build Tools

- **[PostCSS](https://postcss.org)** - CSS transformation
- **[Autoprefixer](https://github.com/postcss/autoprefixer)** - Automatic vendor prefixing

## 🎨 Component Overview

### AddTransaction

Form component for adding new income or expense transactions with validation.

**Features:**
- Text input for transaction name
- Number input for amount
- Select dropdown for transaction type (Income/Expense)
- Real-time form validation
- FormKit integration

### Balance

Displays the total balance calculated from all transactions.

**Props:**
- `total` - Calculated total balance (income - expenses)

### TransactionList

Complete list of all transactions with delete functionality.

**Features:**
- Chronological transaction display
- Delete transaction capability
- Income/expense differentiation
- Formatted amounts and dates

### RecentTransactionList

Quick view of the most recent transactions for at-a-glance information.

### IncomeExpenses

Summary component showing total income and total expenses side by side.

**Props:**
- `income` - Total income amount
- `expenses` - Total expense amount

## 💾 Data Persistence

The application uses browser's `localStorage` to persist transaction data across sessions. All transactions are automatically saved and retrieved on page load.

## 🎯 Key Features Explained

### Transaction Management

- Add transactions with name, amount, and type
- Automatically generates unique IDs and timestamps
- Delete transactions with confirmation
- Persists to localStorage

### Real-time Calculations

- Total Balance = Total Income - Total Expenses
- Income and expenses are calculated in real-time
- Updates immediately on transaction add/delete

### Form Validation

- Required field validation
- Number type validation for amounts
- Transaction type selection required
- Custom error messages

## 🚢 Deployment

### Netlify (Current Deployment)

The project is currently deployed on Netlify. To deploy your own version:

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist/` folder to Netlify via:
   - Drag and drop in Netlify dashboard
   - Connect GitHub repository for automatic deployments
   - Use Netlify CLI

### Other Hosting Options

The built application can be deployed to any static hosting service:
- **Vercel**: Import from GitHub and deploy automatically
- **GitHub Pages**: Use `gh-pages` to deploy the `dist/` folder
- **AWS S3**: Upload `dist/` folder to S3 bucket with static hosting
- **Firebase Hosting**: Use Firebase CLI to deploy

## 🧪 Development Best Practices

- **Component Composition**: Small, focused components with single responsibilities
- **Reactive Data**: Leveraging Vue 3's reactivity system with `ref` and `computed`
- **Props & Events**: Proper parent-child communication patterns
- **Local Storage**: Efficient data persistence without backend
- **Utility-First CSS**: Tailwind for consistent and maintainable styling
- **Form Handling**: FormKit for advanced form management

## 🔧 Configuration Files

### tailwind.config.js

Custom Tailwind configuration with extended color palette and theme customization.

### formkit.config.js

FormKit configuration for form behavior and validation rules.

### vite.config.js

Vite configuration with path aliases and plugin setup.

## 📈 Performance

- **Fast Loading**: Vite's optimized build process ensures minimal bundle size
- **Code Splitting**: Automatic code splitting for optimal loading
- **Lazy Loading**: Components loaded on demand
- **Efficient Updates**: Vue 3's reactivity system for minimal re-renders

## 🤝 Contribute

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🐛 Known Issues & Roadmap

### Future Enhancements

- [ ] Add data export functionality (CSV, JSON)
- [ ] Implement transaction categories
- [ ] Add filtering and sorting options
- [ ] Create monthly/yearly reports
- [ ] Add charts and data visualization
- [ ] Implement transaction editing
- [ ] Add search functionality
- [ ] Dark/light theme toggle
- [ ] Multi-currency support
- [ ] Budget planning features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Resources

- [Vue 3 Documentation](https://vuejs.org/guide/introduction.html)
- [Vite Documentation](https://vitejs.dev/guide/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [FormKit Documentation](https://formkit.com/getting-started/introduction)
- [Font Awesome Icons](https://fontawesome.com/icons)

## 💬 Support

For questions, issues, or feedback:
- Open an [issue](https://github.com/yourusername/expense-tracker/issues)
- Check existing [discussions](https://github.com/yourusername/expense-tracker/discussions)

---

**Built with ❤️ using Vue 3 and Modern Web Technologies**

---

## Maintenance

Last maintenance update: <!--LAST_UPDATED-->2026-06-12<!--/LAST_UPDATED-->
