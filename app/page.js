import Image from "next/image";
import { products } from "./data/products";

// The shop. A Server Component: it just maps over inventory data and renders
// it. No state, no interactivity, exactly what Server Components are good at.
export default function Home() {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-12">
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Gear that sparks joy
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-zinc-600 dark:text-zinc-400">
          The best tech gadgets on the internet. Also, the most ads. 
        </p>
      </section>

      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <article
            key={product.id}
            className="flex flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-white/10 dark:bg-zinc-900"
          >
            <div className="relative aspect-square w-full bg-zinc-100 dark:bg-zinc-800">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col p-4">
              <h2 className="font-semibold">{product.name}</h2>
              <p className="mt-1 flex-1 text-sm text-zinc-600 dark:text-zinc-400">
                {product.blurb}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-bold">
                  ${product.price.toFixed(2)}
                </span>
                <button className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 dark:bg-white dark:text-black dark:hover:bg-zinc-200">
                  Add to cart
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
