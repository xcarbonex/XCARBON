# Phase 3 Implementation Plan: Route Consolidation
**XCARBON DApp Screen Rationalization**  
**Date:** November 1, 2025  
**Status:** 🚀 In Progress

---

## Executive Summary

Phase 3 integrates all Phase 2 overlay components to consolidate routes from **23 to 15** (35% reduction). This improves UX by keeping users in context with overlays instead of full page navigations.

### Goals
1. ✅ Reduce route count from 23 to 15
2. ✅ Convert 8+ full-page routes to overlay patterns
3. ✅ Implement URL state management for deep linking
4. ✅ Add toast notifications for all user feedback
5. ✅ Integrate Stepper for multi-step wizards
6. ✅ Add mobile BottomSheets for quick actions
7. ✅ Maintain backward compatibility with redirects

---

## Current Route Analysis

### Existing Routes (23 total)

**Authentication (5)**
1. `/login`
2. `/signup`
3. `/2fa`
4. `/forgot-password` ❌ → Modal
5. `/reset-password` ❌ → Modal

**Main App (18 within Layout)**
6. `/` (Dashboard Home)
7. `/marketplace`
8. `/project-detail/:assets-id`
9. `/portfolio`
10. `/wallet`
11. `/wallet/deposit` ❌ → Drawer
12. `/wallet/withdraw-tokenized-carbon-credit` ❌ → Drawer
13. `/membership`
14. `/settings`
15. `/help`
16. `/logout`
17. `/notifications`
18. `/notifications/:id` ❌ → Drawer
19. `/assets` (Registry Assets)
20. `/assets/look-up`
21. `/list-tokenized-assets`
22. `/carbon-credit-tokenization` → Add Stepper
23. `/MintCarbonCreditsSummary` → Add Stepper

---

## Target Route Structure (15 routes)

### Authentication (3)
1. `/login` (+ ForgotPassword Modal, ResetPassword Modal)
2. `/signup`
3. `/2fa`

### Main App (12 within Layout)
4. `/` (Dashboard Home)
5. `/marketplace` (+ Mobile Filter BottomSheet)
6. `/project-detail/:assets-id` (Keep for SEO)
7. `/portfolio`
8. `/wallet` (+ Deposit Drawer, Withdraw Drawer)
9. `/membership`
10. `/settings` (+ Section Drawers if needed)
11. `/help`
12. `/logout`
13. `/notifications` (+ Detail Drawer with navigation)
14. `/assets` (Registry Assets)
15. `/assets/look-up`
16. `/list-tokenized-assets`
17. `/carbon-credit-tokenization` (+ Stepper)
18. `/MintCarbonCreditsSummary` (+ Stepper)

**Note:** Still evaluating if some routes can be further consolidated.

---

## Implementation Tasks

### Task 1: Add ToastProvider to App ⏳

**File:** `src/main.tsx`

**Current:**
```tsx
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
```

**Target:**
```tsx
import { ToastProvider } from "@/components";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToastProvider>
      <RouterProvider router={router} />
    </ToastProvider>
  </StrictMode>
);
```

**Acceptance:**
- ✅ ToastProvider wraps entire app
- ✅ useToast() hook works in any component
- ✅ Toasts render in top-right corner
- ✅ No console errors

---

### Task 2: Convert Forgot/Reset Password to Modals ⏳

**Files:**
- `src/pages/Login.tsx` (update)
- `src/pages/ForgotPassword.tsx` (reference for content)
- `src/pages/ResetPassword.tsx` (reference for content)
- `src/routes.tsx` (remove routes)

**Current:** Separate pages at `/forgot-password` and `/reset-password`

**Target:** Modals on `/login` page

**Implementation:**
```tsx
// In Login.tsx
import { Modal } from "@/components";
import { useState } from "react";

export const Login = () => {
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);

  return (
    <>
      {/* Login Form */}
      <button onClick={() => setShowForgotPassword(true)}>
        Forgot Password?
      </button>

      {/* Forgot Password Modal */}
      <Modal
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
        title="Reset Password"
        description="Enter your email to receive a reset link"
        size="sm"
      >
        <ForgotPasswordForm onSuccess={() => {
          setShowForgotPassword(false);
          toast.success("Check your email", "Password reset link sent");
        }} />
      </Modal>

      {/* Reset Password Modal */}
      <Modal
        isOpen={showResetPassword}
        onClose={() => setShowResetPassword(false)}
        title="Create New Password"
        size="sm"
      >
        <ResetPasswordForm onSuccess={() => {
          setShowResetPassword(false);
          toast.success("Password updated", "You can now log in");
        }} />
      </Modal>
    </>
  );
};
```

**Routes to Remove:**
```tsx
// Remove from routes.tsx
{
  path: "/forgot-password",
  element: <ForgotPassword />,
},
{
  path: "/reset-password",
  element: <ResetPassword />,
}
```

**Acceptance:**
- ✅ Forgot Password opens as Modal from Login page
- ✅ Reset Password opens as Modal (from email link with token)
- ✅ Old URLs redirect to `/login`
- ✅ Toast shows success/error messages
- ✅ Modal closes on success

---

### Task 3: Convert Deposit/Withdraw to Drawers ⏳

**Files:**
- `src/pages/Wallet/index.tsx` (update)
- `src/pages/Deposit.tsx` (reference for content)
- `src/pages/Wallet/WithdrawTokenizedCarbonCredit.tsx` (reference for content)
- `src/routes.tsx` (remove nested routes)

**Current:** Nested routes `/wallet/deposit` and `/wallet/withdraw-tokenized-carbon-credit`

**Target:** Drawers on `/wallet` with URL state

**Implementation:**
```tsx
// In Wallet/index.tsx
import { Drawer } from "@/components";
import { useSearchParams } from "react-router-dom";
import { DepositForm } from "./DepositForm";
import { WithdrawForm } from "./WithdrawForm";

export const Wallet = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const action = searchParams.get("action"); // "deposit" or "withdraw"

  const closeDrawer = () => {
    searchParams.delete("action");
    setSearchParams(searchParams);
  };

  return (
    <>
      {/* Main Wallet View */}
      <div>
        <Button onClick={() => setSearchParams({ action: "deposit" })}>
          Deposit
        </Button>
        <Button onClick={() => setSearchParams({ action: "withdraw" })}>
          Withdraw
        </Button>
      </div>

      {/* Deposit Drawer */}
      <Drawer
        isOpen={action === "deposit"}
        onClose={closeDrawer}
        title="Deposit Funds"
        description="Choose your deposit method"
        size="lg"
        urlParam="action"
        urlParamValue="deposit"
        footer={
          <Button variant="primary" onClick={handleDeposit}>
            Confirm Deposit
          </Button>
        }
      >
        <DepositForm />
      </Drawer>

      {/* Withdraw Drawer */}
      <Drawer
        isOpen={action === "withdraw"}
        onClose={closeDrawer}
        title="Withdraw Funds"
        size="lg"
        urlParam="action"
        urlParamValue="withdraw"
      >
        <WithdrawForm />
      </Drawer>
    </>
  );
};
```

**Routes to Update:**
```tsx
// In routes.tsx - Remove nested routes
{
  path: "wallet",
  element: <Wallet />,
  // Remove children - handle in component
}
```

**Deep Linking:**
- `/wallet?action=deposit` → Opens deposit drawer
- `/wallet?action=withdraw` → Opens withdraw drawer

**Acceptance:**
- ✅ Deposit drawer opens from button
- ✅ Withdraw drawer opens from button
- ✅ URL updates to `/wallet?action=deposit`
- ✅ Direct URL navigation opens correct drawer
- ✅ Browser back button closes drawer
- ✅ Toast shows success/error messages

---

### Task 4: Convert Notification Detail to Drawer ⏳

**Files:**
- `src/pages/Notifications/index.tsx` (update)
- `src/pages/Notifications/NotificationDetail.tsx` (reference for content)
- `src/routes.tsx` (remove `/notifications/:id` route)

**Current:** Separate page `/notifications/:id`

**Target:** Drawer on `/notifications` with navigation arrows

**Implementation:**
```tsx
// In Notifications/index.tsx
import { Drawer } from "@/components";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

export const NotificationsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const detailId = searchParams.get("detail");
  const [notifications, setNotifications] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    if (detailId) {
      const index = notifications.findIndex(n => n.id === detailId);
      setCurrentIndex(index);
    }
  }, [detailId, notifications]);

  const currentNotification = notifications[currentIndex];

  const goToPrevious = () => {
    const prevIndex = Math.max(0, currentIndex - 1);
    const prevId = notifications[prevIndex]?.id;
    setSearchParams({ detail: prevId });
  };

  const goToNext = () => {
    const nextIndex = Math.min(notifications.length - 1, currentIndex + 1);
    const nextId = notifications[nextIndex]?.id;
    setSearchParams({ detail: nextId });
  };

  const closeDrawer = () => {
    searchParams.delete("detail");
    setSearchParams(searchParams);
  };

  return (
    <>
      {/* Notifications List */}
      <div>
        {notifications.map(notification => (
          <div
            key={notification.id}
            onClick={() => setSearchParams({ detail: notification.id })}
          >
            {notification.title}
          </div>
        ))}
      </div>

      {/* Detail Drawer */}
      <Drawer
        isOpen={!!detailId && !!currentNotification}
        onClose={closeDrawer}
        title={currentNotification?.title}
        description={currentNotification?.timestamp}
        size="md"
        urlParam="detail"
        urlParamValue={detailId || ""}
        navigation={{
          onPrevious: goToPrevious,
          onNext: goToNext,
          hasPrevious: currentIndex > 0,
          hasNext: currentIndex < notifications.length - 1,
        }}
      >
        <NotificationDetailContent notification={currentNotification} />
      </Drawer>
    </>
  );
};
```

**Routes to Remove:**
```tsx
// Remove from routes.tsx
{
  path: "notifications/:id",
  element: <NotificationDetail />,
}
```

**Deep Linking:**
- `/notifications?detail=123` → Opens notification #123
- Previous/Next arrows cycle through notifications

**Acceptance:**
- ✅ Clicking notification opens drawer
- ✅ URL updates to `/notifications?detail=123`
- ✅ Direct URL opens correct notification
- ✅ Previous/Next arrows work
- ✅ First/last notification disables arrows correctly
- ✅ Browser back button closes drawer

---

### Task 5: Add Toast Feedback to All Actions ⏳

**Target:** Replace all `alert()`, `console.log()`, and manual error displays with Toast

**Patterns:**

**Form Submission:**
```tsx
// Before
try {
  await submitForm(data);
  alert("Success!");
} catch (error) {
  alert("Error: " + error.message);
}

// After
import { useToast } from "@/components";
const { toast } = useToast();

try {
  await submitForm(data);
  toast.success("Form submitted", "We'll get back to you soon");
} catch (error) {
  toast.error("Failed to submit", error.message, {
    action: {
      label: "Retry",
      onClick: () => submitForm(data),
    },
  });
}
```

**Clipboard Actions:**
```tsx
const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
  toast.success("Copied to clipboard", text);
};
```

**Blockchain Transactions:**
```tsx
const sendTransaction = async () => {
  toast.info("Transaction pending", "Waiting for confirmation...", {
    duration: 0, // Don't auto-dismiss
  });

  try {
    const tx = await contract.transfer(amount);
    await tx.wait();
    
    toast.success("Transaction confirmed", "Tokens transferred successfully", {
      action: {
        label: "View on Explorer",
        onClick: () => window.open(`https://explorer.com/tx/${tx.hash}`),
      },
    });
  } catch (error) {
    toast.error("Transaction failed", error.message);
  }
};
```

**File Upload:**
```tsx
const uploadFile = async (file: File) => {
  const toastId = toast.info("Uploading file...", file.name, { duration: 0 });
  
  try {
    await api.upload(file);
    toast.success("File uploaded", `${file.name} (${formatSize(file.size)})`);
  } catch (error) {
    toast.error("Upload failed", error.message);
  }
};
```

**Files to Update:**
- `src/pages/Login.tsx`
- `src/pages/SignUp.tsx`
- `src/pages/Wallet/*.tsx`
- `src/pages/Portfolio/*.tsx`
- `src/pages/Settings.tsx`
- `src/pages/CarbonCreditTokenization/*.tsx`
- All forms and API calls

**Acceptance:**
- ✅ No `alert()` calls remain
- ✅ Success messages use `toast.success()`
- ✅ Error messages use `toast.error()`
- ✅ Info messages use `toast.info()`
- ✅ Warnings use `toast.warning()`
- ✅ Long operations show persistent toast (duration: 0)

---

### Task 6: Add Stepper to Tokenization Flow ⏳

**File:** `src/pages/CarbonCreditTokenization/index.tsx`

**Current:** Multi-step form without visual progress indicator

**Target:** Stepper component with linear validation

**Implementation:**
```tsx
import { Stepper, StepperControls } from "@/components";
import { useState } from "react";

export const CarbonCreditTokenization = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});

  const steps = [
    { id: 1, label: "Select Asset", description: "Choose carbon credits" },
    { id: 2, label: "Set Quantity", description: "Enter amount" },
    { id: 3, label: "Set Price", description: "Price per credit" },
    { id: 4, label: "Review", description: "Confirm details" },
    { id: 5, label: "Complete", description: "Finalize tokenization" },
  ];

  const validateStep = async (stepIndex: number): Promise<boolean> => {
    // Validation logic for each step
    switch (stepIndex) {
      case 0:
        return !!formData.assetType;
      case 1:
        return !!formData.quantity && formData.quantity >= 100;
      case 2:
        return !!formData.price && formData.price > 0;
      default:
        return true;
    }
  };

  const handleComplete = async () => {
    try {
      await api.tokenize(formData);
      toast.success("Tokenization complete", "Credits added to your wallet");
      // Navigate or reset
    } catch (error) {
      toast.error("Tokenization failed", error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Tokenize Carbon Credits</h1>

      <Stepper
        steps={steps}
        currentStep={currentStep}
        onStepChange={setCurrentStep}
        linear={true}
        validateStep={validateStep}
      />

      <div className="mt-8 p-6 bg-white dark:bg-neutral-900 rounded-lg">
        {/* Render step content based on currentStep */}
        {currentStep === 0 && <SelectAssetStep data={formData} onChange={setFormData} />}
        {currentStep === 1 && <SetQuantityStep data={formData} onChange={setFormData} />}
        {currentStep === 2 && <SetPriceStep data={formData} onChange={setFormData} />}
        {currentStep === 3 && <ReviewStep data={formData} />}
        {currentStep === 4 && <CompleteStep />}
      </div>

      <StepperControls
        currentStep={currentStep}
        totalSteps={steps.length}
        onPrevious={() => setCurrentStep(s => Math.max(0, s - 1))}
        onNext={async () => {
          const isValid = await validateStep(currentStep);
          if (isValid) {
            setCurrentStep(s => Math.min(steps.length - 1, s + 1));
          } else {
            toast.warning("Please complete this step", "Fill in all required fields");
          }
        }}
        onComplete={handleComplete}
        isNextDisabled={false}
      />
    </div>
  );
};
```

**Acceptance:**
- ✅ Stepper shows 5 steps with progress
- ✅ Linear validation prevents skipping steps
- ✅ Back button works
- ✅ Next button validates current step
- ✅ Complete button triggers tokenization
- ✅ Toast shows success/error feedback

---

### Task 7: Add Stepper to Minting Flow ⏳

**File:** `src/pages/MintCarbonCreditsSummary/index.tsx`

**Similar to Task 6** - Add Stepper for minting wizard

**Steps:**
1. Select Registry Asset
2. Enter Quantity
3. Review Details
4. Confirm Minting

---

### Task 8: Add Mobile BottomSheets ⏳

**Target:** Add BottomSheet for mobile-specific interactions

**Use Cases:**

**1. Marketplace Filters (Mobile)**
```tsx
// In Marketplace page
import { BottomSheet } from "@/components";
import { useState } from "react";

const [showFilters, setShowFilters] = useState(false);

<BottomSheet
  isOpen={showFilters}
  onClose={() => setShowFilters(false)}
  title="Filter Options"
  snapPoints={[0.5, 0.9]}
  footer={
    <>
      <Button variant="border-secondary" onClick={() => clearFilters()}>
        Clear
      </Button>
      <Button variant="primary" onClick={() => {
        applyFilters();
        setShowFilters(false);
      }}>
        Apply Filters
      </Button>
    </>
  }
>
  <FilterForm />
</BottomSheet>
```

**2. Share Dialog (Mobile)**
```tsx
<BottomSheet
  isOpen={showShare}
  onClose={() => setShowShare(false)}
  title="Share Project"
  snapPoints={[0.4]}
>
  <div className="grid grid-cols-4 gap-4">
    {shareOptions.map(option => (
      <button key={option.label} onClick={() => share(option.type)}>
        <span className="text-3xl">{option.icon}</span>
        <span className="text-xs">{option.label}</span>
      </button>
    ))}
  </div>
</BottomSheet>
```

**3. Quick Actions (Mobile)**
```tsx
<BottomSheet
  isOpen={showActions}
  onClose={() => setShowActions(false)}
  title="Quick Actions"
  snapPoints={[0.5]}
>
  <div className="space-y-2">
    <button onClick={() => handleAction("buy")}>Buy Carbon Credits</button>
    <button onClick={() => handleAction("sell")}>Sell Carbon Credits</button>
    <button onClick={() => handleAction("transfer")}>Transfer Credits</button>
  </div>
</BottomSheet>
```

**Acceptance:**
- ✅ BottomSheet only shows on mobile (<768px)
- ✅ Swipe gestures work on touch devices
- ✅ Snap points function correctly
- ✅ Backdrop closes sheet
- ✅ Replaces desktop modals on mobile

---

### Task 9: Update Routes & Redirects ⏳

**File:** `src/routes.tsx`

**Redirects to Add:**
```tsx
import { Navigate } from "react-router-dom";

// Add redirect routes
{
  path: "/forgot-password",
  element: <Navigate to="/login" replace />,
},
{
  path: "/reset-password",
  element: <Navigate to="/login" replace />,
},
{
  path: "/wallet/deposit",
  element: <Navigate to="/wallet?action=deposit" replace />,
},
{
  path: "/wallet/withdraw-tokenized-carbon-credit",
  element: <Navigate to="/wallet?action=withdraw" replace />,
},
{
  path: "/notifications/:id",
  element: <Navigate to={(props) => `/notifications?detail=${props.params.id}`} replace />,
},
```

**Acceptance:**
- ✅ Old URLs redirect to new patterns
- ✅ Bookmarks still work (redirect + open overlay)
- ✅ No broken links in app
- ✅ Analytics track redirects

---

### Task 10: Testing & Documentation ⏳

**Manual Testing Checklist:**

**Overlays:**
- [ ] Modal opens/closes correctly
- [ ] Drawer opens/closes correctly
- [ ] BottomSheet swipe gestures work
- [ ] Focus trap works (Tab, Shift+Tab)
- [ ] ESC key closes overlays
- [ ] Backdrop click closes overlays

**URL State:**
- [ ] `/wallet?action=deposit` opens deposit drawer
- [ ] `/notifications?detail=123` opens notification drawer
- [ ] Browser back button closes overlay
- [ ] Direct URL navigation opens overlay
- [ ] Refreshing page preserves overlay state

**Toast Notifications:**
- [ ] Success toasts show for form submissions
- [ ] Error toasts show for API failures
- [ ] Info toasts show for long operations
- [ ] Warning toasts show for validation
- [ ] Toast stacking works (max 5)
- [ ] Auto-dismiss works (5 seconds)

**Stepper:**
- [ ] Linear validation prevents skipping
- [ ] Back button works
- [ ] Next validates current step
- [ ] Complete button triggers action
- [ ] Mobile vertical layout works

**Acceptance:**
- ✅ All manual tests pass
- ✅ No console errors
- ✅ Accessibility tested (keyboard + screen reader)
- ✅ Mobile tested on iOS/Android
- ✅ PHASE_3_COMPLETION_REPORT.md created

---

## Success Metrics

**Route Reduction:**
- Before: 23 routes
- After: 15 routes
- **Reduction: 35%**

**UX Improvements:**
- ✅ 8+ full-page routes converted to overlays
- ✅ Context preservation (users stay on main page)
- ✅ Deep linking maintained (bookmarkable URLs)
- ✅ Toast feedback for all actions
- ✅ Mobile-optimized with BottomSheet

**Technical Quality:**
- ✅ 0 TypeScript errors
- ✅ 0 ESLint errors
- ✅ WCAG AA accessible
- ✅ Mobile responsive
- ✅ Backward compatible (redirects)

---

## Timeline

**Estimated Duration:** 12-16 hours

| Task | Duration | Priority |
|------|----------|----------|
| 1. ToastProvider | 0.5h | High |
| 2. Forgot/Reset Password Modal | 2h | High |
| 3. Deposit/Withdraw Drawers | 3h | High |
| 4. Notification Detail Drawer | 2h | High |
| 5. Toast Feedback | 2h | Medium |
| 6. Tokenization Stepper | 2h | Medium |
| 7. Minting Stepper | 1.5h | Medium |
| 8. Mobile BottomSheets | 2h | Low |
| 9. Routes & Redirects | 1h | High |
| 10. Testing & Docs | 3h | High |

---

**Report Created:** November 1, 2025  
**Agent:** GitHub Copilot  
**Project:** XCARBON DApp Modernization  
**Branch:** modernization/typescript-and-brand  
**Status:** 🚀 Ready to Begin
