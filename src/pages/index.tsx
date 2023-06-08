import { useInfiniteQuery } from "@tanstack/react-query"
import { IndexInfo } from "typescript";
import Posts from "../data/posts.json"



const fetchPost = async (page: number) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const slicedPosts =  Posts.slice((page - 1) * 2, page * 2);

  return(slicedPosts);
}

export default function Home() {
    const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
      ["query"],
      async ({ pageParam = 1 }) => {
        const response = await fetchPost(pageParam);
        return response;
      },
      {
        //inbuilt function which helps in fetching the next page, 
        //which is the current page is adding with 1 goes to the net succeding page
        getNextPageParam: (_, pages) => {
          return pages.length+1;
        },

        //we have to pass the initial data here in our case posts,
        // this is sliced and send to pages initially how much data we should show in the page and the page number
        initialData: {
          pages: [Posts.slice(0, 2)],
          pageParams: [1],
        }
      }
 
    )
  return (
    <main
      className="px-24 py-10"
    >
      <h1 className='font-bold uppercase text-3xl text-center'>Next.JS Infinite-Scroll Application</h1>
      <div className="py-20">
        <h1 className="font-bold uppercase text-xl text-center">posts</h1>
      </div>
      <div>
        POSTS:
        {
          data?.pages.map((page: any, i: any) => (
            <div key={i} className="border">
              {page.map((post: any) => (
                <div key={post.id} className="border flex px-10 justify-between">
                  <p className="py-5">{post.id}</p>
                  <p className="py-5">
                    {post.title}
                  </p>
                  <p className="py-5">{post.description}</p>
                  <div className="flex gap-4">
                    <button className="text-red-300">delete</button>
                    <button className="text-yellow-300">edit</button>
                  </div>
                </div>
              ))}
            </div>
          ))
        }
      </div>
    </main>
  )
}
