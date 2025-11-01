# XCARBON DApp - Screen Documentation

**Version:** 1.0  
**Last Updated:** November 1, 2025  
**Purpose:** Comprehensive guide to all screens and functionality in the XCARBON decentralized application

---

## Table of Contents

1. [Authentication Screens](#1-authentication-screens)
2. [Dashboard](#2-dashboard)
3. [Portfolio](#3-portfolio)
4. [Wallet](#4-wallet)
5. [Tokenization & Minting](#5-tokenization--minting)
6. [Marketplace & Registry](#6-marketplace--registry)
7. [Membership](#7-membership)
8. [Settings](#8-settings)
9. [Notifications](#9-notifications)
10. [Help & Support](#10-help--support)

---

## 1. Authentication Screens

### 1.1 Login Screen (`/login`)

**Purpose:** Secure user authentication gateway to the platform

**Key Components:**

- Email/username input field
- Password input field with show/hide toggle
- "Remember Me" checkbox
- Two-factor authentication (2FA) trigger
- "Forgot Password" link
- Social login options (if enabled)

**User Flow:**

1. User enters credentials
2. System validates credentials
3. If 2FA is enabled, redirects to 2FA screen
4. Upon success, redirects to Dashboard
5. Failed attempts show error message

**Business Logic:**

- Maximum 5 login attempts before account lockout
- Session expires after 30 minutes of inactivity
- JWT tokens for authentication
- OAuth integration for social logins

**Modifications to Consider:**

- Add biometric authentication support
- Implement CAPTCHA after failed attempts
- Add "Login with Wallet" option for Web3 users
- Session management settings

---

### 1.2 Sign Up Screen (`/signup`)

**Purpose:** New user registration and account creation

**Key Components:**

- Account type selection (Individual vs Enterprise)
- Full name / Company name
- Email address field
- Password field with strength indicator
- Password confirmation field
- Terms of Service acceptance checkbox
- Privacy Policy acceptance checkbox
- Email verification trigger

**User Flow:**

1. User selects account type
2. Fills in required information
3. Accepts terms and conditions
4. Submits registration
5. Email verification sent
6. Upon email verification, account activated

**Validation Rules:**

- Password: Minimum 8 characters, 1 uppercase, 1 number, 1 special character
- Email: Valid email format, unique in system
- Terms: Must be accepted to proceed

**Modifications to Consider:**

- Add phone verification
- Implement referral code system
- Add country/region selection for compliance
- KYC requirements during signup

---

### 1.3 Two-Factor Authentication (`/2fa`)

**Purpose:** Additional security layer for user accounts

**Key Components:**

- 6-digit verification code input
- QR code for authenticator app setup
- Backup codes display
- "Trust this device" option
- Resend code button

**Supported Methods:**

- Authenticator apps (Google Authenticator, Authy)
- SMS verification
- Email verification

**User Flow:**

1. User enters code from authenticator app
2. System validates code
3. On success, grants access
4. Option to trust device for 30 days

**Modifications to Consider:**

- Add hardware key support (YubiKey)
- Implement backup authentication methods
- Add biometric verification
- Recovery options for lost 2FA device

---

### 1.4 Forgot Password (`/forgot-password`)

**Purpose:** Password recovery mechanism

**Key Components:**

- Email input field
- Security question (optional)
- Email verification trigger
- Success confirmation message

**User Flow:**

1. User enters registered email
2. System sends password reset link
3. Link expires in 1 hour
4. User clicks link, redirected to reset password screen

---

### 1.5 Reset Password (`/reset-password`)

**Purpose:** Set new password after verification

**Key Components:**

- New password field
- Confirm password field
- Password strength indicator
- Submit button

**Security Measures:**

- Token validation from email link
- Password history check (prevent reuse of last 5 passwords)
- Forced logout from all devices after reset

---

## 2. Dashboard

### 2.1 Dashboard Home (`/`)

**Purpose:** Central hub showing portfolio overview and quick actions

**Key Sections:**

#### A. Hero Section - Portfolio Value Card

**Displays:**

- Total Portfolio Value (large, prominent number)
- YTD Change (dollar amount and percentage)
- 24H Change
- All-Time High
- Total Returns

**Styling:**

- Gradient background (brand colors)
- Hero typography for main value
- Color-coded changes (green for positive, red for negative)
- Glassmorphism effects

**Data Source:**

- Real-time portfolio calculations
- Aggregated from all assets and staking positions

#### B. Quick Actions Column

**Primary Actions:**

- **Stake Credits** - Main CTA for staking carbon credits
- **Buy Credits** - Purchase carbon credits from marketplace
- **Claim Rewards** - Claim available staking rewards (shows pending amount)

**Button Hierarchy:**

- Primary button: Stake Credits (largest, most prominent)
- Secondary buttons: Buy Credits, Claim Rewards

#### C. Financial Overview - Metrics Grid

**Metric Cards:**

1. **Total Staked**
   - Current staked amount
   - 30-day change percentage
   - Trend indicator
   - Icon: Lock

2. **Monthly Earnings**
   - Current month's earnings
   - Month-over-month comparison
   - Trend indicator
   - Icon: Chart Line

3. **Available Balance**
   - Liquid assets ready to stake
   - Recent change
   - Trend indicator
   - Icon: Wallet

**Design System:**

- MetricCard component with consistent styling
- 3-column grid layout
- Icons for visual identification
- Color-coded trend indicators

#### D. Environmental Impact Section

**Purpose:** Show user's contribution to sustainability

**Displays:**

1. **Carbon Retired**
   - Metric tons of CO₂ equivalent offset
   - Tooltip explaining calculation

2. **Tree Equivalent**
   - Number of trees representing carbon offset
   - Visual comparison metric

3. **Community Score**
   - User's impact points within platform
   - Gamification element

4. **Tier Progress**
   - Progress to next membership tier
   - Visual progress bar
   - Percentage complete

**Styling:**

- Eco-themed gradient background
- Subtle green color palette
- Information tooltips
- Progress visualization

#### E. Active Positions (Coming Soon)

**Planned Features:**

- List of active staking positions
- Position details and performance
- Quick actions per position

**Current State:**

- Placeholder with "Coming Soon" message
- Empty state design

**Modifications to Consider:**

- Add portfolio allocation chart (pie/donut chart)
- Include recent transaction feed
- Add price alerts/notifications
- Market news/updates section
- Comparison with market benchmarks
- Add export functionality for tax reporting

---

### 2.2 Marketplace Assets (`/marketplace`)

**Purpose:** Browse and purchase carbon credits from marketplace

**Key Components:**

- Asset grid/list view toggle
- Filter panel (project type, vintage, location, price range)
- Sort options (price, vintage, popularity, rating)
- Asset cards with:
  - Project name and type
  - Available quantity
  - Price per unit
  - Vintage year
  - Verification badges
  - "Buy Now" button

**User Flow:**

1. Browse available assets
2. Apply filters to narrow selection
3. Click asset card for details
4. Navigate to project detail page

**Modifications to Consider:**

- Add "favorite" functionality
- Implement advanced search
- Add comparison tool (compare up to 3 assets)
- Price history charts
- Bulk purchase options

---

### 2.3 Project Detail (`/project-detail/:assets-id`)

**Purpose:** Detailed information about specific carbon credit project

**Key Sections:**

- Project overview and description
- Location map
- Verification status and certifications
- Available quantity and pricing
- Project timeline
- Environmental impact metrics
- Purchase options
- Similar projects recommendations

**Modifications to Consider:**

- Add project photo gallery
- Include video presentations
- Project updates timeline
- Community reviews and ratings
- Impact calculator

---

## 3. Portfolio

### 3.1 Portfolio Overview (`/portfolio`)

**Purpose:** Comprehensive view of user's carbon credit holdings and trading activity

**Key Sections:**

#### A. Hero Section - Portfolio Value

**Displays:**

- Total Portfolio Value (large, prominent)
- YTD change (dollar and percentage)
- Total Credits (metric tons)
- Active Positions count
- Average Cost Basis

**Styling:**

- Eco-themed gradient (green palette)
- Hero typography
- MetricCard components
- Quick action buttons

#### B. Portfolio Metrics Grid

**Three Key Metrics:**

1. **Open Positions**
   - Current value of active investments
   - Change percentage
   - Trend indicator

2. **Historical Value**
   - Realized trades value
   - Total returns percentage
   - Performance indicator

3. **Pending Contracts**
   - Value awaiting settlement
   - Number of pending contracts
   - Status indicator

#### C. Portfolio Details - Tabbed Tables

**Tab 1: Open Positions**
**Columns:**

- Asset Name
- Project Type (REDD+, Renewable Energy, etc.)
- Quantity (metric tons)
- Market Value (current)
- Cost Basis (purchase price)
- Vintage (year)
- Location
- Status (Active, Staked, etc.)

**Tab 2: Historical Trades**
**Columns:**

- Trade ID
- Asset Name
- Project Type
- Quantity
- Traded Value
- Trade Type (Buy/Sell badge)
- Date
- Status

**Color Coding:**

- Buy trades: Green badge
- Sell trades: Red/orange badge

**Tab 3: Pending Contracts**
**Columns:**

- Contract ID
- Asset Name
- Project Type
- Quantity
- Value
- Due Date
- Status (Pending Approval badge)

**Table Features:**

- Search functionality
- Date range filter
- Export to CSV
- Pagination (5 items per page default)
- Column sorting

#### D. Active Agreements Section

**Separate Table for:**

- Recurring delivery agreements
- Forward purchase contracts
- Long-term commitments

**Columns:**

- Agreement ID
- Asset Name
- Project Type
- Next Delivery date
- Total Deliveries (completed/total)
- Quantity per delivery
- Status badges:
  - "On Track" (green)
  - "Delayed" (blue)
  - "At Risk" (orange)

**Modifications to Consider:**

- Add portfolio performance charts (line chart over time)
- Asset allocation pie chart
- Profit/Loss calculator
- Tax lot tracking
- Cost basis methods (FIFO, LIFO, Specific ID)
- Portfolio rebalancing suggestions
- Risk assessment metrics
- Dividend/reward history
- Asset correlation analysis

---

## 4. Wallet

### 4.1 Wallet Overview (`/wallet`)

**Purpose:** Manage digital assets, view balances, and execute transactions

**Key Sections:**

#### A. Hero Section - Total Wallet Balance

**Displays:**

- Total Wallet Balance (all assets combined in USD)
- Wallet address with copy button
- Network indicator (Ethereum/Polygon)
- Active status indicator (green dot)
- 24H Change percentage

**Quick Stats:**

- Network: Ethereum
- Number of Assets
- 24H Change percentage

**Styling:**

- Accent blue gradient background
- Large hero number
- Monospaced font for wallet address
- Copy to clipboard functionality

#### B. Quick Actions Column

**Primary Actions:**

1. **Send Assets** (Primary CTA)
   - Large, prominent button
   - Icon: Send/Arrow
2. **Receive** (Secondary)
   - Generate QR code
   - Display receive address

3. **Swap Tokens** (Tonal)
   - Token exchange functionality
   - Cross-chain swaps (if enabled)

#### C. Wallet Metrics Grid

**Three Key Metrics:**

1. **Liquid Assets**
   - Available balance
   - Ready to use
   - Change percentage

2. **Staked Assets**
   - Total staked amount
   - Earning rewards indicator
   - APY/APR display

3. **Total Assets**
   - Combined value
   - All holdings
   - Portfolio total

#### D. Your Assets - Premium Asset Cards

**For Each Asset (XCC, USDC, ETH, etc.):**

- Token symbol and icon
- Token name
- Balance amount
- USD equivalent value
- 24H change percentage with trend arrow
- Action buttons:
  - Send
  - Swap

**Card Features:**

- Gradient token icon backgrounds
- Hover effects with shadow
- Color-coded change indicators
- Premium glassmorphism styling

#### E. Recent Activity - Transaction History

**Filter Tabs:**

- All
- Sent
- Received
- Staking
- Claims

**Transaction Cards Display:**

- Transaction type icon (colored, gradient background)
  - Sent: Red gradient, up-right arrow
  - Received: Green gradient, down-left arrow
  - Staking: Blue gradient, lock icon
  - Claims: Green gradient, gift icon
- Transaction details:
  - Type (Sent/Received/Staked/Claimed)
  - Amount and token
  - Timestamp (relative: "2 days ago")
  - Status badge (Confirmed/Pending)
  - USD value
- Hover effects for interactivity

**Load More Functionality:**

- Button to load additional transactions
- Pagination

**Modifications to Consider:**

- Multi-wallet support
- Hardware wallet integration (Ledger, Trezor)
- WalletConnect integration
- Transaction details modal (gas fees, block explorer link)
- Transaction filtering by date range
- Export transaction history (CSV/PDF)
- Token approval management
- Address book for frequent recipients
- Advanced send options (gas price, nonce)
- Token hide/unhide feature
- Custom token addition
- NFT support section
- Multi-signature wallet support

---

### 4.2 Deposit (`/wallet/deposit`)

**Purpose:** Add funds to wallet via fiat or cryptocurrency

**Key Sections:**

#### A. Fiat Deposit (Left Column)

**Form Fields:**

1. **Currency Selection**
   - USD, EUR, GBP, JPY
   - Dropdown select

2. **Amount Input**
   - Minimum $10
   - Dollar sign prefix
   - Currency code suffix

3. **Payment Method Selection**
   - **Credit/Debit Card**
     - Visa, Mastercard, Amex icons
     - Card processing fees displayed
   - **Bank Transfer**
     - ACH, SEPA, Wire options
     - Processing time: 2-5 business days

**Submit Button:**

- "Continue to Payment"
- Redirects to payment processor
- Shows loading state during processing

#### B. Crypto Deposit (Right Column)

**Form Fields:**

1. **Asset Selection**
   - XCB, BTC, ETH
   - Dropdown with token icons

2. **Network Selection**
   - Polygon, BSC, Ethereum
   - Network fees displayed
   - Important: Must match network when sending

3. **Deposit Address Display**
   - Generated wallet address
   - Copy to clipboard button
   - QR code for scanning
   - **Warning box**: Only send selected asset on selected network

**Important Warnings:**

- Red/orange warning box
- Caution icon
- Clear instructions about network compatibility
- "Permanent loss of funds" warning for wrong network

#### C. Deposit History Table

**Columns:**

- Date
- Asset (XCB, USD, ETH)
- Amount with currency
- Status (color-coded badges):
  - Completed: Green
  - Pending: Yellow
  - Failed: Red
- Transaction ID (monospaced, clickable to block explorer)

**Table Features:**

- Search
- Date filter
- Status filter
- Pagination

**Modifications to Consider:**

- Add deposit limits display
- Bank account linking for ACH
- Saved payment methods
- Deposit fee calculator
- Promotional deposit bonuses
- Instant deposit options (higher fees)
- Multi-asset deposit
- Fiat on-ramp integration (Moonpay, Wyre)
- Deposit confirmations counter
- Estimated arrival time

---

### 4.3 Withdraw Tokenized Carbon Credit (`/wallet/withdraw-tokenized-carbon-credit`)

**Purpose:** Convert XCB tokens back to registry carbon credits or fiat

**Key Components:**

- Withdrawal type selection (To Bank, To Registry)
- Amount input with available balance
- Destination selection
- Withdrawal fee display
- Confirmation step
- Transaction status tracking

**Withdrawal Types:**

1. **Fiat Withdrawal**
   - Bank account selection
   - Amount in USD/EUR/etc.
   - Processing time: 3-5 business days
   - Minimum withdrawal amount
   - KYC verification required

2. **Registry Withdrawal**
   - Registry account selection (Verra, Gold Standard, etc.)
   - Amount in carbon credits
   - Registry transfer fees
   - Processing time: 5-10 business days
   - Retirement option

**Modifications to Consider:**

- Add withdrawal history
- Recurring withdrawal setup
- Batch withdrawals
- Express withdrawal (higher fees)
- Withdrawal limits display
- Two-factor confirmation
- Email/SMS confirmation
- Withdrawal address whitelist

---

## 5. Tokenization & Minting

### 5.1 Carbon Credit Tokenization (`/carbon-credit-tokenization`)

**Purpose:** Convert registry-held carbon credits into XCB tokens (on-chain)

**Key Components:**

#### A. Tokenization Form

**Fields:**

1. **Carbon Credit Registry**
   - Dropdown selection:
     - Verra Registry
     - Gold Standard
     - American Carbon Registry
     - Climate Action Reserve
   - Registry logo display

2. **Project ID**
   - Text input
   - Format: Registry-specific ID
   - Validation against registry database
   - Auto-lookup project details

3. **Credit Amount**
   - Number input
   - Unit: tCO2e (metric tons CO₂ equivalent)
   - Minimum: 1
   - Maximum: Available balance in registry

4. **Vintage Year**
   - Year selector (2000 - current year)
   - Dropdown or number input
   - Affects token value

5. **Verification Documents**
   - File upload component
   - Accepted formats: PDF, DOC, DOCX
   - Max size: 10MB
   - Multiple file upload
   - Drag-and-drop interface
   - File preview

**Submit Button:**

- "Submit for Tokenization"
- Disabled until all fields valid
- Shows loading state

#### B. Process Information Panel (Right Side)

**4-Step Process Display:**

1. **Submit Details**
   - Icon: Document upload
   - Description: Submit carbon credit details and documents

2. **Verification**
   - Icon: Checkmark shield
   - Description: Team verifies submitted information
   - Timeline: 2-3 business days

3. **Token Conversion**
   - Icon: Refresh/exchange
   - Description: Credits converted to XCB tokens
   - Smart contract execution

4. **Token Transfer**
   - Icon: Wallet
   - Description: Tokens transferred to user's wallet
   - Transaction confirmation

**Important Notes Panel:**

- Yellow/info color scheme
- Key reminders:
  - Ensure documents are clear and valid
  - 2-3 business days processing
  - Keep registry credentials ready
  - Wallet must be ready to receive tokens

**Modifications to Consider:**

- Add cost calculator (tokenization fees)
- Registry API integration for auto-verification
- Batch tokenization
- Project preview before submission
- Token ID tracking system
- Email notifications for status updates
- In-app status tracker
- Partial tokenization (split credits)
- Fractional ownership options
- Token metadata customization

---

### 5.2 Mint Carbon Credits (`/MintCarbonCreditsSummary`)

**Purpose:** Create new carbon credit tokens (for verified projects)

**Use Case:**

- For project developers who have verified carbon reduction projects
- Converts verified emission reductions into tradeable tokens

**Key Components:**

- Project verification upload
- Third-party audit reports
- Emission reduction calculations
- Token minting parameters
- Smart contract interaction
- Gas fee estimation

**Workflow:**

1. Upload project documentation
2. Submit for verification
3. Platform review (5-10 business days)
4. Upon approval, mint tokens
5. Tokens appear in wallet

**Requirements:**

- Project must be registered with recognized registry
- Must have MRV (Measurement, Reporting, Verification) documentation
- Third-party audit completion
- KYC/AML compliance
- Platform minting fees

**Modifications to Consider:**

- Add project wizard for guidance
- Integration with carbon registries APIs
- Automated MRV data upload
- Project dashboard for tracking
- Batch minting capabilities
- Co-benefits tokenization
- Vintage year selection
- Geographic tagging

---

### 5.3 List Tokenized Assets (`/list-tokenized-assets`)

**Purpose:** List owned tokenized carbon credits on marketplace for sale

**Key Sections:**

#### A. Asset Selection

**Dropdown Select:**

- Shows user's tokenized assets from wallet
- Format: "VCS-123456 - Amazon Rainforest Conservation"
- Displays available balance
- Token ID visible

#### B. Project Information Card (Auto-populated)

**Displays After Selection:**

- Project name
- Verification status badge
- Project details grid:
  - Project Type (REDD+, Renewable, etc.)
  - Vintage (year)
  - Available Balance (tCO2e)
  - Token ID

**Styling:**

- Light background in light mode
- Dark background in dark mode
- Rounded corners
- Verification badge (green)

#### C. Listing Details Form

**Fields:**

1. **Quantity to List**
   - Number input
   - Unit: tCO2e
   - Shows maximum available
   - Cannot exceed balance

2. **Listing Method**
   - Radio button selection:
     - **SPOT** (Fixed price, immediate sale)
     - **AUCTION** (Coming soon badge - disabled)

3. **Price Per Unit**
   - Number input
   - Currency: USD
   - Shows current market price as reference
   - Dollar sign prefix
   - "Market: $12.50" suffix for comparison

4. **List Duration**
   - Duration dropdown: 30, 60, 90 days
   - OR Custom date picker
   - Optional field

#### D. Transfer Restrictions (Optional)

**Toggle Section:**

- Toggle switch
- Label: "Apply Transfer Restrictions"
- Description: "Limit who can purchase this asset"
- When enabled, shows:
  - Verified buyers only
  - Geographic restrictions
  - Purchase limits per buyer

#### E. Action Buttons

- **Cancel** (secondary, outline)
- **Confirm** (primary, accent color)

**Confirmation Flow:**

1. User confirms listing details
2. Smart contract approval (if needed)
3. Listing created on marketplace
4. Confirmation message with listing ID
5. Redirect to marketplace view

**Modifications to Consider:**

- Add listing preview before confirmation
- Price suggestion based on market data
- Bulk listing functionality
- Listing templates (save settings)
- Dynamic pricing (adjust based on market)
- Reserve price for auctions
- Listing analytics (views, interest)
- Edit listing after creation
- Listing expiration notifications
- Automatic relisting option
- Commission/fee breakdown display

---

## 6. Marketplace & Registry

### 6.1 Carbon Credit Assets From Registry (`/assets`)

**Purpose:** Browse and search carbon credits available from official registries

**Key Sections:**

#### A. Registry Assets Tab (`/assets`)

**Shows Progress View:**

- Projects in various stages
- Pipeline visualization
- Status indicators:
  - Verification pending
  - Approved
  - Tokenization in progress
  - Available for purchase

**Filters:**

- Registry type
- Project type
- Status
- Region
- Vintage year

#### B. Look Up Tab (`/assets/look-up`)

**Search Functionality:**

- Project ID search
- Registry-specific lookup
- Advanced search filters:
  - Project name
  - Developer
  - Location
  - Methodology
  - Verification body

**Search Results Display:**

- Project cards with details
- Verification status
- Available quantity
- Link to full details

**Modifications to Consider:**

- Map view of projects
- Registry status sync (real-time)
- Project comparison tool
- Saved searches
- Search history
- Alert creation for new projects
- Registry integration for live data
- Project ratings and reviews

---

## 7. Membership

### 7.1 Membership Tiers (`/membership`)

**Purpose:** Manage XCB token staking for platform benefits and tier progression

**Key Sections:**

#### A. Current Balance Display

**Shows:**

- Total XCB Balance
- Large, prominent number
- Token symbol
- USD equivalent (optional)

**Styling:**

- White/light background card in light mode
- Bordered card
- Shadow effects

#### B. Current Membership Plan Card

**Displays:**

- Current tier name (Bronze/Silver/Gold/Platinum)
- Badge/icon for tier
- Staked amount
- Benefits summary
- Fee discount percentage
- Next review date

**Styling:**

- Dark background (#2F2F2F) with white text
- Distinct from other cards
- Highlighted as active plan

#### C. Available Membership Plans Grid

**4 Tiers Displayed:**

**1. Bronze Tier**

- **Requirement:** 1,000,000 XCB
- **Benefits:**
  - 5% fee discount
  - Basic support
  - Email notifications
  - Standard processing

**2. Silver Tier**

- **Requirement:** 5,000,000 XCB
- **Benefits:**
  - 10% fee discount
  - Priority support
  - Advanced analytics
  - Faster processing

**3. Gold Tier**

- **Requirement:** 10,000,000 XCB
- **Benefits:**
  - 15% fee discount
  - Premium support 24/7
  - API access
  - Market insights
  - Priority listing
  - Express processing

**4. Platinum Tier**

- **Requirement:** 25,000,000 XCB
- **Benefits:**
  - 20% fee discount
  - Dedicated account manager
  - Custom solutions
  - White-glove service
  - Beta features access
  - Governance voting rights
  - Exclusive events

**Card Design:**

- Each tier has unique background color
- Tier icon/badge
- "Choose Plan" button
- Checklist of benefits

#### D. Benefits of Staking XCB

**Three Key Benefits Cards:**

1. **Fee Discounts**
   - Icon: Divide/percentage
   - Description: Reduce transaction fees based on staking tier
   - Savings calculator

2. **Environmental Impact**
   - Icon: Globe/world
   - Description: Support sustainability initiatives
   - Contribution metrics

3. **Community Status**
   - Icon: Community/people
   - Description: Recognition, badges, special events
   - Social features

#### E. Transaction History Table

**Columns:**

- Date
- Plan (tier name)
- Type (Stake/Unstake/Reward)
- Amount (XCB tokens)
- Status (Confirmed/Pending/Completed badges)
- Blockchain Tx (clickable Etherscan link)

**Color-Coded Status:**

- Confirmed: Green
- Pending: Orange
- Completed: Blue

**Table Features:**

- Search functionality
- Date range filter
- Export to CSV
- Pagination
- Sort by column

**Modifications to Consider:**

- Add staking calculator (estimate rewards)
- Lock-up period display
- Unstaking cooldown timer
- Tier progression visualizer
- Rewards claim section
- Auto-compound option
- Staking APY display
- Historical APY chart
- Referral program integration
- Tier upgrade cost calculator
- Benefits comparison table
- Add seasonal/promotional tiers
- Governance proposal section
- Voting power display
- Community leaderboard

---

## 8. Settings

### 8.1 User Settings (`/settings`)

**Purpose:** Manage account preferences, security, and profile information

**Key Sections:**

#### A. Profile Header

**Displays:**

- User avatar (placeholder or uploaded)
- Edit button (pencil icon overlay)
- Full name
- Email address
- "Overview" button (opens detailed profile modal)

**Edit Profile Modal Trigger:**

- Opens comprehensive profile form
- Account type (Individual/Enterprise)
- All profile fields editable
- Document upload for verification

#### B. Security Settings Card

**Password Management:**

- Change Password button
- Opens modal with:
  - Current password field
  - New password field
  - Confirm password field
  - Password strength indicator
  - Submit button

**Multi-Factor Authorization:**

- Edit button
- Opens MFA modal:
  - Enable/Disable toggle
  - QR code for authenticator app
  - Backup codes generation
  - SMS option
  - Verification step

**API Keys Management:**

- Manage button
- Opens API modal:
  - List of active API keys
  - Create new key
  - Key permissions settings
  - Rate limits display
  - Regenerate/Revoke buttons
  - Copy key functionality

**Currency Selection:**

- Dropdown select
- Options: USD, EUR, CAD, AUD, JPY (JPY disabled)
- Affects all monetary displays

#### C. Preferences Card

**Language Selection:**

- Dropdown menu
- Options: English, Hindi, French
- Applies to entire interface
- Requires page reload

**Appearance Toggle:**

- Custom theme switcher component
- Light mode icon (sun)
- Dark mode icon (moon)
- Visual toggle indicator
- Instant theme switching
- Persists in local storage

**Styling:**

- Two-option selector
- Active state highlighting
- Smooth transitions

#### D. Active Sessions Section

**Currently Shows:**

- Delete Account option (red/destructive)
- Permanent deletion warning

**Planned Features:**

- List of active login sessions
- Device information
- Last activity timestamp
- Location (IP-based)
- "Sign out all devices" button
- "Sign out this device" per session

**Delete Account:**

- Red warning button
- Opens confirmation modal:
  - Warning message
  - Data deletion explanation
  - Password confirmation
  - "Are you sure?" checkbox
  - Permanent action warning
  - Final confirmation button

**User Overview Modal:**
**For Individual Users:**

- First Name, Last Name
- Date of Birth
- Nationality
- Address
- Phone
- Email
- KYC Status badge
- Uploaded documents list

**For Enterprise Users:**

- Company Name
- Registration Number
- Tax ID
- Company Address
- Company Phone
- Company Email
- Representative Information:
  - Name
  - Position
  - Email
  - Phone
- KYC Status
- Business documents list

**Edit Profile Modal:**

- Editable form fields
- File upload for documents
- Save changes button
- Real-time validation
- Success/error messages

**Modifications to Consider:**

- Add notification preferences:
  - Email notifications toggle
  - Push notifications
  - SMS alerts
  - Notification frequency
  - Event-specific settings
- Privacy settings:
  - Profile visibility
  - Transaction history visibility
  - Activity sharing
- Data export functionality:
  - Download all data
  - GDPR compliance
  - CSV/JSON format
- Connected apps/services:
  - OAuth connections
  - Wallet connections
  - Third-party integrations
- Account activity log
- Login history
- IP whitelist
- Trusted devices management
- Session timeout settings
- Advanced security options

---

## 9. Notifications

### 9.1 Notifications Page (`/notifications`)

**Purpose:** Central hub for all platform notifications and alerts

**Key Components:**

- Notification list (chronological)
- Filter options (All/Unread/Read)
- Notification types:
  - Transaction confirmations
  - Staking rewards
  - Membership updates
  - System announcements
  - Price alerts
  - Security alerts

**Each Notification Shows:**

- Icon (type-specific)
- Title
- Description/preview
- Timestamp
- Read/unread indicator
- Action buttons (if applicable)

**Notification Types:**

1. **Transaction Notifications**
   - Deposit confirmed
   - Withdrawal processed
   - Trade executed
   - Payment received

2. **Staking Notifications**
   - Rewards available
   - Staking period complete
   - Unstaking initiated
   - APY changes

3. **Marketplace Notifications**
   - Asset listed successfully
   - Sale completed
   - New offer received
   - Price alerts triggered

4. **System Notifications**
   - Maintenance scheduled
   - New features
   - Policy updates
   - Security notices

**Actions:**

- Mark as read
- Delete notification
- Go to related page
- Dismiss

**Modifications to Consider:**

- Add notification preferences per type
- Batch actions (mark all as read, delete all)
- Search notifications
- Archive functionality
- Export notifications
- Desktop push notifications
- Email digest option

---

### 9.2 Notification Detail (`/notifications/:id`)

**Purpose:** Detailed view of individual notification

**Displays:**

- Full notification content
- Related information
- Action buttons
- Timestamp
- Related links

---

## 10. Help & Support

### 10.1 Help Center (`/help`)

**Purpose:** Self-service support and documentation

**Key Sections:**

**Search Bar:**

- Prominent search functionality
- Auto-suggestions
- Popular searches

**Common Topics:**

- Getting Started
- Account Management
- Trading Carbon Credits
- Tokenization Process
- Wallet Management
- Security & Privacy
- Fees & Pricing
- Troubleshooting

**FAQ Accordion:**

- Expandable questions
- Categorized by topic
- Search within FAQs
- "Was this helpful?" feedback

**Contact Support:**

- Contact form
- Email support
- Live chat (if available)
- Support ticket system
- Response time indication

**Resources:**

- Video tutorials
- PDF guides
- API documentation
- Developer resources
- Glossary of terms

**Modifications to Consider:**

- AI chatbot for instant answers
- Community forum
- User guides library
- Video tutorial library
- Webinar calendar
- Status page (system health)
- Known issues tracker

---

## Additional Screens & Modals

### Logout (`/logout`)

**Purpose:** Secure session termination

**Flow:**

1. User clicks logout
2. Confirmation dialog (optional)
3. Session invalidated
4. JWT tokens cleared
5. Redirect to login page
6. Optional: "You've been logged out" message

---

### Not Found (`/404`)

**Purpose:** Handle invalid routes gracefully

**Displays:**

- 404 error message
- "Page not found" description
- Navigation links to:
  - Dashboard
  - Home
  - Search functionality
- Optional: Recent pages visited
- Back button

---

### Test Error (`/test-error`)

**Purpose:** Development/testing error boundary

**Use:** Testing error handling in development

---

## Navigation Structure

### Primary Navigation (Sidebar)

1. **Dashboard** - Home overview
2. **Portfolio** - Holdings and trades
3. **Wallet** - Asset management
4. **Marketplace** - Browse and buy
5. **Tokenization** - Convert credits
6. **Registry Assets** - Official listings
7. **Membership** - Staking and tiers
8. **Settings** - Account preferences
9. **Notifications** - Alerts and messages
10. **Help** - Support and docs
11. **Logout** - End session

### Secondary Navigation

- User profile dropdown
- Notification bell icon
- Theme toggle
- Language selector (if enabled)
- Search functionality

---

## Design System Overview

### Color Palette

**Brand Colors:**

- **Primary Brand (Green):** `#4C6663` - Eco/sustainability focus
- **Accent (Blue):** Financial/trust elements
- **Neutral Grays:** Text, backgrounds, borders

**Semantic Colors:**

- **Success (Green):** Positive changes, confirmations
- **Error (Red):** Warnings, errors, negative changes
- **Warning (Yellow/Orange):** Alerts, pending states
- **Info (Blue):** Informational messages

**Eco Palette:**

- **Eco Leaf:** `#A8C69F` - Light green for nature
- **Eco Forest:** `#2D5016` - Deep green for depth
- **Eco Water:** `#5B9BD5` - Blue for water/clean energy

### Typography

**Font Families:**

- **Body Text:** Inter (sans-serif)
- **Numbers:** JetBrains Mono (monospaced, tabular numerals)
- **Headings:** Inter (bold weights)

**Typography Classes:**

- `typography-hero-number` - Large dashboard numbers ($48,250)
- `typography-metric-medium` - Medium-sized metrics
- `typography-body-number` - Inline numbers in text
- `typography-percentage` - Percentage changes
- `typography-heading` - Section headings
- `typography-label` - Small labels
- `typography-caption` - Fine print

### Components

**MetricCard:**

- Standardized metric display
- Icon, label, value, change, trend
- Consistent sizing and spacing
- Used across Dashboard, Portfolio, Wallet

**Table Component:**

- Premium styling with gradients
- Loading states (skeleton)
- Zebra striping (alternating rows)
- Enhanced hover effects
- Empty states with helpful messages
- Search, filter, pagination
- Column sorting
- Export functionality

**Card Component:**

- Base container component
- Glassmorphism effects
- Consistent padding and borders
- Hover states
- Light/dark mode variations

**Button Variants:**

- **Primary:** Main actions (brand green)
- **Secondary:** Alternative actions
- **Tonal:** Subtle emphasis
- **Flat:** Minimal emphasis
- **Dark:** High contrast (settings)

**Form Components:**

- Input fields with prefix/suffix support
- SelectField with clear and search
- Toggle switches
- Radio buttons
- Checkboxes
- File upload with drag-and-drop

---

## Technical Architecture

### State Management

- **Zustand** for global state
- Individual stores per domain:
  - authStore
  - dashboardStore
  - portfolioStore
  - walletStore
  - settingsStore
  - notificationStore
  - etc.

### API Structure

- RESTful API architecture
- Service layer per domain
- Centralized API client (axios)
- Error handling
- Token refresh logic
- Request interceptors

### Routing

- React Router v6
- Nested routes for layouts
- Protected routes with authentication
- Error boundaries per route
- Lazy loading for code splitting

### Theme System

- React Context for theme management
- CSS variables for colors
- Tailwind dark mode classes
- Persistent theme in localStorage
- Smooth transitions

---

## Data Flow Examples

### Example 1: Dashboard Load

1. User logs in → Redirected to `/`
2. Dashboard component mounts
3. Fetches portfolio data (dashboardService)
4. Updates dashboardStore
5. Components re-render with data
6. MetricCards display formatted values
7. Charts render with portfolio history

### Example 2: Tokenization Flow

1. User navigates to `/carbon-credit-tokenization`
2. Form loads with empty state
3. User selects registry → Form validates
4. User enters project ID → API lookup
5. Project details auto-populate
6. User uploads documents
7. Form validation passes
8. User submits → Loading state
9. API processes request
10. Success → Redirect to status page
11. Notification created
12. Email sent with tracking info

### Example 3: Trade Execution

1. User browses marketplace
2. Clicks asset card → Project detail
3. Reviews project information
4. Clicks "Buy Now"
5. Purchase modal opens
6. Enters quantity
7. Reviews cost breakdown
8. Confirms transaction
9. Wallet approval (if needed)
10. Smart contract execution
11. Transaction pending
12. Confirmation received
13. Portfolio updated
14. Transaction appears in history
15. Notification sent

---

## Security Considerations

### Authentication

- JWT-based authentication
- Refresh token rotation
- Secure cookie storage
- XSS protection
- CSRF tokens

### Authorization

- Role-based access control (RBAC)
- API endpoint protection
- Feature flags per user type
- Admin vs user permissions

### Data Protection

- Encrypted data transmission (HTTPS)
- Sensitive data encryption at rest
- PII handling compliance
- GDPR/CCPA compliance
- Audit logs

### Smart Contract Security

- Audited contracts
- Multi-signature for critical operations
- Rate limiting
- Gas estimation
- Error handling

---

## Performance Optimizations

### Frontend

- Code splitting by route
- Lazy loading components
- Image optimization
- Memoization (React.memo, useMemo)
- Virtual scrolling for long lists
- Debounced search inputs
- Cached API responses
- Service worker for offline support

### Backend

- Database query optimization
- Caching layer (Redis)
- CDN for static assets
- Load balancing
- Rate limiting
- Pagination for large datasets

---

## Accessibility (A11Y)

### Standards

- WCAG 2.1 Level AA compliance
- Semantic HTML
- ARIA labels where needed
- Keyboard navigation support
- Focus indicators
- Screen reader testing

### Features

- Alt text for images
- Color contrast ratios met
- Focus trap in modals
- Skip to main content link
- Descriptive button/link text
- Form validation messages
- Error announcements

---

## Mobile Responsiveness

### Breakpoints

- **Mobile:** < 640px
- **Tablet:** 640px - 1024px
- **Desktop:** > 1024px

### Mobile Adaptations

- Hamburger menu for navigation
- Stacked layouts (grid → single column)
- Touch-friendly button sizes (min 44x44px)
- Swipe gestures
- Bottom navigation bar (optional)
- Responsive tables (horizontal scroll or card view)
- Optimized images for mobile bandwidth

---

## Browser Support

### Supported Browsers

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

### Progressive Enhancement

- Core functionality works without JavaScript
- Graceful degradation for older browsers
- Polyfills for modern features

---

## Testing Strategy

### Types of Testing

1. **Unit Tests** - Component logic
2. **Integration Tests** - API interactions
3. **E2E Tests** - Critical user flows
4. **Visual Regression** - UI consistency
5. **Performance Tests** - Load times
6. **Security Tests** - Vulnerability scanning

### Critical Flows to Test

- User registration and login
- 2FA setup and verification
- Deposit and withdrawal
- Carbon credit tokenization
- Marketplace browsing and purchase
- Portfolio tracking
- Wallet transactions
- Settings changes
- Theme switching

---

## Future Enhancements Roadmap

### Short-term (Q1 2026)

- Advanced charting for portfolio performance
- Mobile app (React Native)
- Enhanced marketplace filters
- Auction functionality for listings
- Batch operations
- Social features (profiles, following)

### Mid-term (Q2-Q3 2026)

- DAO governance integration
- Cross-chain bridge
- Fractional carbon credit ownership
- Automated market maker (AMM) for trading
- Advanced analytics dashboard
- Carbon offset calculator
- Corporate accounts and sub-accounts
- API for third-party integrations

### Long-term (Q4 2026+)

- Carbon credit derivatives
- Options trading
- Insurance products
- Carbon credit indices
- Integration with IoT for real-time MRV
- AI-powered project verification
- Satellite imagery integration
- Blockchain transparency dashboard
- Carbon credit backed loans

---

## Maintenance & Updates

### Regular Maintenance Tasks

- Security patches
- Dependency updates
- Performance monitoring
- Database optimization
- Backup verification
- Log analysis
- User feedback review

### Update Process

1. Development in feature branch
2. Code review
3. Testing in staging environment
4. User acceptance testing
5. Production deployment
6. Monitoring for issues
7. Rollback plan ready

---

## Glossary

**Carbon Credit:** One metric ton of CO₂ equivalent removed or prevented from atmosphere

**Tokenization:** Process of converting registry carbon credits into blockchain tokens (XCB)

**Vintage:** The year in which the carbon reduction occurred

**Registry:** Official body that issues and tracks carbon credits (Verra, Gold Standard, etc.)

**REDD+:** Reducing Emissions from Deforestation and Forest Degradation

**MRV:** Measurement, Reporting, and Verification - process to validate carbon reductions

**tCO2e:** Metric tons of CO₂ equivalent - standard unit for carbon credits

**KYC:** Know Your Customer - identity verification process

**2FA:** Two-Factor Authentication - additional security layer

**APY/APR:** Annual Percentage Yield/Rate - return on staked assets

**Smart Contract:** Self-executing contract on blockchain

**Gas Fees:** Transaction costs on blockchain network

**Wallet:** Digital account holding cryptocurrencies and tokens

**Staking:** Locking tokens to earn rewards and platform benefits

**Liquidity:** Ease of buying/selling assets

**Slippage:** Difference between expected and executed price

---

## Support & Contact

For questions or issues with any screen/feature:

- **Email:** support@xcarbon.com
- **Live Chat:** Available in-app 9 AM - 6 PM EST
- **Documentation:** docs.xcarbon.com
- **Developer API:** api-docs.xcarbon.com
- **Community:** community.xcarbon.com

---

**Document Version:** 1.0  
**Last Reviewed:** November 1, 2025  
**Next Review:** February 1, 2026

---

_This documentation is a living document and will be updated as the platform evolves. For the latest version, please refer to the internal documentation portal._
