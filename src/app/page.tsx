import { client } from "@/sanity/lib/client";
import Header from "./Header";
import Hero from "./Hero";
import Products from "./Product";
import { Types } from "./Type";

export default async function Home() {
  const query = `*[_type=="post"] | order(_createdAt asc){
  title,image,price,
  "slug":slug.current
  }`;
  const response = await client.fetch(query)
  return (
   <div>
    <Hero/>
    <div className="flex flex-wrap gap-6 justify-center p-4">
      {response.map((post:any) => (
        <Products key={post.slug} post={post} />
      ))}
    </div>
   </div>
  );
}
