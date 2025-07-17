import Banner from "@/components/banner";
import PostList from "@/components/PostList";

export default function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center">
      <Banner title="Ideas" subtitle="where all our great thing begin" />

      <section>
        <PostList />
      </section>
    </div>
  );
}
