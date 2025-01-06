import { urlFor } from "@/sanity/lib/image";
import { Types } from "./Type";
import Image from "next/image";
import Link from "next/link";

export default function Products({ post }: { post: Types }) {
  return (
    <section className="flex w-[20vw] flex-col justify-between h-[480px] rounded bg-light/90 dark:bg-dark/40 shadow-md shadow-gray-300 dark:shadow-black/80 group hover:scale-105 transition-transform ease-out duration-700">
      {/* Image Section */}
      <div className="relative max-h-76 flex-1">
        <Image
          src={urlFor(post.image)}
          alt={post.title}
          fill
          className="object-cover rounded-t"
        />
      </div>

      {/* Title and Summary */}
      <div className="flex flex-col justify-between gap-y-4 p-4">
        <h2 className="text-lg font-semibold line-clamp-2 text-dark dark:text-light leading-tight mb-2">
          {post.title}
        </h2>
        <p className="text-dark/70 dark:text-light/70 line-clamp-3">
          {post.summary}
        </p>

        {/* Add to Cart Button with Dynamic Data */}
        <button
  className="snipcart-add-item block px-4 py-1 text-center bg-accentDarkSecondary rounded text-dark font-semibold mt-4"
  data-item-id={post.slug} // Unique ID
  data-item-name={post.title} // Product name
  data-item-price={1500} // Dynamic price
  data-item-url={`https://https://practice-hdec.vercel.app/productdetails/${post.slug}/cart`} // Replace with your live URL
  data-item-description={post.summary} // Description
  data-item-image={urlFor(post.image)} // Image URL
>
  Add to Cart
</button>


      </div>
    </section>
  );
}
