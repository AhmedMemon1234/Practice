import { GetServerSideProps } from "next";
import { urlFor } from "@/sanity/lib/image"; // Sanity image helper
import { Types } from "../../Type"; // Assuming this is the Type for product
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client"; // Sanity client
import Image from "next/image";

interface ProductProps {
  post: Types;
}

export default function ProductDetails({ post }: ProductProps) {
  return (
    <section className="product-details">
      <div className="image-section">
        <Image
          src={urlFor(post.image)}
          alt={post.title}
          width={500}
          height={500}
          className="object-cover rounded"
        />
      </div>

      <div className="text-section">
        <h2>{post.title}</h2>
        <p>Price: {post.price}</p>

        {/* Add to Cart Button */}
        <button
          className="snipcart-add-item"
          data-item-id={post.slug}  // Using slug.current as the unique ID
          data-item-name={post.title}
          data-item-price={post.price}
          data-item-url={`https://practice-hdec.vercel.app/productdetails/${post.slug}`}  // Full URL with slug
          data-item-description={post.summary}
          data-item-image={urlFor(post.image)}  // Correct image URL
        >
          Add to Cart
        </button>

      </div>
    </section>
  );
}

// Fetch data for the product based on the slug
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slug = params?.slug;

  const query = `
    *[_type == "details" && slug.current == "${slug}"][0] {
      title,
      slug,
      price,
      image,
    }
  `;

  const post = await client.fetch(query, { slug });

  return {
    props: {
      post,
    },
  };
};
