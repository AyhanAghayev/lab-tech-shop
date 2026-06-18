'use client';

import { useState } from 'react';

export default function PremiumPage() {
  const [form, setForm] = useState({
    name: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
    email: '',
  });
  const [errors, setErrors] = useState({});
  const [paid, setPaid] = useState(false);

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required.';
    if (!/^\d{13,19}$/.test(form.cardNumber.replace(/\s/g, '')))
      e.cardNumber = 'Enter a valid card number (13–19 digits).';
    if (!/^\d{2}\/\d{2}$/.test(form.expiry))
      e.expiry = 'Use MM/YY format.';
    if (!/^\d{3,4}$/.test(form.cvc)) e.cvc = 'CVC must be 3–4 digits.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'Enter a valid email.';
    return e;
  }

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    localStorage.setItem('isPremium', 'true');
    setPaid(true);
  }

  if (paid) {
    return (
      <main className="mx-auto w-full max-w-md flex-1 px-6 py-20 text-center">
        <div className="rounded-2xl border border-green-300 bg-green-50 p-10 dark:border-green-700 dark:bg-green-950">
          <p className="text-5xl">✅</p>
          <h1 className="mt-4 text-2xl font-bold text-green-800 dark:text-green-200">
            Payment complete, ads removed!
          </h1>
          <p className="mt-2 text-sm text-green-700 dark:text-green-400">
            Welcome to TechCart Premium. Enjoy the clean, ad-free experience.
          </p>
          <a
            href="/"
            className="mt-6 inline-block rounded-full bg-green-700 px-6 py-2 text-sm font-semibold text-white hover:bg-green-600"
          >
            Back to shop
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-md flex-1 px-6 py-12">
      <h1 className="mb-2 text-3xl font-bold">Go Premium</h1>
      <p className="mb-8 text-zinc-600 dark:text-zinc-400">
        One-time payment. No more ads, ever.
      </p>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <Field
          label="Cardholder name"
          name="name"
          type="text"
          placeholder="Jane Smith"
          value={form.name}
          onChange={handleChange}
          error={errors.name}
        />
        <Field
          label="Card number"
          name="cardNumber"
          type="text"
          inputMode="numeric"
          placeholder="4242 4242 4242 4242"
          value={form.cardNumber}
          onChange={handleChange}
          error={errors.cardNumber}
          maxLength={19}
        />
        <div className="grid grid-cols-2 gap-4">
          <Field
            label="Expiry"
            name="expiry"
            type="text"
            placeholder="MM/YY"
            value={form.expiry}
            onChange={handleChange}
            error={errors.expiry}
            maxLength={5}
          />
          <Field
            label="CVC"
            name="cvc"
            type="text"
            inputMode="numeric"
            placeholder="123"
            value={form.cvc}
            onChange={handleChange}
            error={errors.cvc}
            maxLength={4}
          />
        </div>
        <Field
          label="Email"
          name="email"
          type="email"
          placeholder="jane@example.com"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
        />

        <button
          type="submit"
          className="w-full rounded-full bg-indigo-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-500"
        >
          Pay $4.99 — Remove Ads Forever
        </button>
      </form>
    </main>
  );
}

function Field({ label, name, error, ...props }) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        {...props}
        className={`w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-zinc-900 dark:text-white ${
          error
            ? 'border-red-500'
            : 'border-zinc-300 dark:border-zinc-700'
        }`}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
