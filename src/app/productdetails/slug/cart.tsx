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
        <p>{post.summary}</p>
        <p>Price: {1500}</p>

        {/* Add to Cart Button */}
        <button
          className="snipcart-add-item"
          data-item-id={post.slug} // Dynamic ID
          data-item-name={post.title} // Product name
          data-item-price={1500} // Dynamic price
          data-item-url={`/productdetails/${post.slug}/cart`} // Cart URL
          data-item-description={post.summary} // Product description
          data-item-image={urlFor(post.image)} // Image URL
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

  const query = groq`
    *[_type == "product" && slug.current == $slug][0] {
      title,
      slug,
      description,
      price,
      image
    }
  `;

  const post = await client.fetch(query, { slug });

  return {
    props: {
      post,
    },
  };
};
