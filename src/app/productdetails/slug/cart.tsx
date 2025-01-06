import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client"; // Sanity client
import { urlFor } from "@/sanity/lib/image"; // Sanity image helper
import Image from "next/image";

// Define the ProductDetails component
const ProductDetails = ({ post }: { post: any }) => {
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
          data-item-id={post.slug.current}  // Using slug as the unique ID
          data-item-name={post.title}
          data-item-price={post.price}
          data-item-url={`https://practice-hdec.vercel.app/productdetails/${post.slug.current}`}  // Full URL with slug
          data-item-description={post.summary}
          data-item-image={urlFor(post.image)}  // Correct image URL
        >
          Add to Cart
        </button>
      </div>
    </section>
  );
};

// Fetch data for the product based on the slug
export const getServerSideProps = async ({ params }: any) => {
  const slug = params?.slug;

  const query = `
   *[_type == "post"]{
      "slug":slug.current,
      title,
      slug,
      price,
      image,
      summary
    }
  `;

  const post = await client.fetch(query);

  return {
    props: {
      post,
    },
  };
};

export default ProductDetails;
