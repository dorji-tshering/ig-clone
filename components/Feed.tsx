import Stories from "./Stories";
import Posts from "./Posts";

const Feed = () => {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 md:max-w-3xl lg:grid-cols-3 lg:max-w-5xl mx-auto">
        <section className="col-span-2">
            <Stories/>  
            <Posts/>
        </section>

        {/* section */}
        <section>
            {/* Mini profile */}
            {/* Suggestions */}
        </section>
    </main>
  )
}

export default Feed;