import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client"; // Sanity client
import { urlFor } from "@/sanity/lib/image"; // Sanity image helper
import Image from "next/image";

// Define the ProductDetails component
const ProductDetails = ({ post }: { post: any }) => {
  // Check if post.slug exists and post.slug.current is valid
  if (!post || !post.slug || !post.slug.current) {
    return <div>Product not found</div>; // Handling case where slug or post is missing
  }

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
          data-item-id={post.slug.current}  // Ensure we're using slug.current
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
    *[_type == "post" && slug.current == "${slug}"]{
      title,
      slug,
      price,
      image,
      summary
    }[0]
  `;

  const post = await client.fetch(query);

  if (!post) {
    return {
      notFound: true, // Return a 404 if the product is not found
    };
  }

  return {
    props: {
      post,
    },
  };
};

export default ProductDetails;
