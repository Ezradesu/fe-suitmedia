import Image from "next/image";

interface Post {
  id: number;
  title: string;
  published_at: string;
  small_image: {
    id: number;
    mime: string;
    file_name: string;
    url: string;
  }[];
}

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <div className="bg-white shadow rounded overflow-hidden">
      <div className="relative w-full h-48 bg-gray-200">
        {post.small_image && post.small_image.length > 0 ? (
          <Image
            src={post.small_image[0].url}
            alt={post.title}
            className="w-full h-full object-cover"
            width={500}
            height={500}
            loading="lazy"
            onError={(e) => {
              // Fallback: Hide image, show placeholder
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
              target.nextElementSibling?.classList.remove("hidden");
            }}
          />
        ) : null}
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400">
          <div className="text-center">
            <svg
              className="w-12 h-12 mx-auto mb-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-xs">Image not available</p>
          </div>
        </div>
      </div>
      <div className="p-4">
        <p className="text-xs text-gray-500 mb-1">
          {new Date(post.published_at).toLocaleDateString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <h2 className="text-base font-semibold text-gray-800 line-clamp-3">
          {post.title}
        </h2>
      </div>
    </div>
  );
}
