import { createFileRoute, Link } from "@tanstack/react-router";
import { useStore } from "@/lib/store";
import { ProductCard } from "@/components/ProductCard";
import { HeartIcon } from "@/components/Icons";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Wishlist — Meditrust Life Science" },
      { name: "description", content: "Healthcare products you saved for later." },
      { property: "og:title", content: "Wishlist — Meditrust" },
      { property: "og:description", content: "Your saved healthcare products." },
    ],
  }),
  component: Wishlist,
});

function Wishlist() {
  const { wishlist, products } = useStore();
  const list = products.filter((p) => p.visible && wishlist.includes(p.id));
  return (
    <div className="container-x py-12">
      <h1 className="text-3xl font-extrabold text-navy">Wishlist</h1>
      {list.length === 0 ? (
        <div className="py-20 text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-mint text-primary"><HeartIcon size={30} /></div>
          <p className="mt-4 text-muted-foreground">You haven't saved any products yet.</p>
          <Link to="/products" className="btn btn-primary mt-6">Explore Products</Link>
        </div>
      ) : <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{list.map((p) => <ProductCard key={p.id} p={p} />)}</div>}
    </div>
  );
}
