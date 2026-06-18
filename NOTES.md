# Notes: my design log

**Live URL (Vercel):** _paste your deployed link here_

## 1. Route and storage choice

- **Route:** `app/premium/page.js` → `/premium`. That name is already wired into the navbar's `href`, so it was the obvious choice. Putting it under `app/` follows the App Router convention — each folder becomes a segment, no extra configuration needed.
- **Storage:** `localStorage`.
- **Why localStorage, not the alternatives?**
  - `sessionStorage` forgets when the tab closes, so a user who paid and came back next day would see ads again — that breaks the core promise.
  - A cookie would work and could even be read server-side, but it adds complexity (setting `Max-Age`, handling `HttpOnly` vs. JS-readable) without any benefit here since there's no server that needs to act on it.
  - `localStorage` persists across tabs and browser restarts, is synchronous to read, and needs no configuration. It's the right fit for a purely client-side "did this user pay?" flag.

## 2. Server vs Client Components

| File | Type | Why |
|---|---|---|
| `app/layout.js` | **Server** | No interactivity; just imports fonts and wraps children. |
| `app/page.js` | **Server** | Pure data rendering — maps over a products array, no state or events. |
| `app/components/Navbar.js` | **Server** | Only renders static links. No browser APIs needed. |
| `app/components/AdBanner.js` | **Client** (`'use client'`) | Must read `localStorage` (browser-only) inside `useEffect` after mount to decide whether to render ads. |
| `app/premium/page.js` | **Client** (`'use client'`) | Needs `useState` for controlled form inputs and `localStorage.setItem` on submit. |

Keeping `layout.js`, `page.js`, and `Navbar.js` as Server Components means their HTML is fully generated on the server, so the initial HTML is complete and SEO-friendly with no JS overhead for those parts.

## 3. The first-render problem

**The trap:** `localStorage` doesn't exist on the server. If `AdBanner` tried to read it during render (not inside `useEffect`), Next.js would throw `ReferenceError: localStorage is not defined` during SSR. Even if guarded with `typeof window !== 'undefined'`, the server would render the ads (since premium is unknown), the client would immediately hide them (since localStorage says premium), and React would log a hydration mismatch warning.

**The fix:** `AdBanner` initialises `isPremium` state to `null`. During SSR (and the matching first client render), `isPremium === null` so the component returns `null` — no ads, no mismatch. After the component mounts, `useEffect` runs, reads `localStorage`, and sets `isPremium` to `true` or `false`. Only then does the component decide to show the ads (if `false`) or stay empty (if `true`).

**How I verified it's fixed:** opened the browser DevTools Console on a fresh load and confirmed zero hydration warnings. I also toggled the `isPremium` key in Application → Local Storage and hard-refreshed to confirm the ads appear/disappear correctly with no console errors.

## 4. How the pieces connect

User fills in the form on `/premium` and clicks submit → `handleSubmit` validates the fields, calls `localStorage.setItem('isPremium', 'true')`, and flips `paid` to `true` → the form swaps out for a confirmation card. Meanwhile (or on any subsequent page visit), `AdBanner` mounts and its `useEffect` reads `localStorage`; since the flag is set, `isPremium` becomes `true` and the component renders `null`, leaving the page completely ad-free. A hard refresh re-runs the same `useEffect` path, so the ads stay gone.

## 5. If I had another hour

I'd add **server-side validation via a Route Handler** (`app/api/premium/route.js`). Right now the flag is set entirely in the browser, meaning anyone can open DevTools and type `localStorage.setItem('isPremium', 'true')` for free. Moving to a signed cookie set by a server action (or a lightweight API route) would make the premium state tamper-resistant. On the front end I'd also replace the raw `localStorage` reads/writes with a small custom hook (`usePremium`) that encapsulates the `useEffect` logic, making it reusable if other components ever need to check premium status.
