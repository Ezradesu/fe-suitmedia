"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "./PostCard";
import LoadingSpinner from "./LoadingSpinner";
import FilterControls from "./FilterControl";
import Pagination from "./Pagination";

const API_URL = "https://suitmedia-backend.suitdev.com/api/ideas";

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

interface ApiResponse {
  data: Post[];
  meta: {
    total: number;
  };
}

const getUrlParams = () => {
  if (typeof window === "undefined")
    return {
      page: 1,
      perPage: 10,
      sort: "-published_at",
    };

  const params = new URLSearchParams(window.location.search);
  return {
    page: parseInt(params.get("page") || "1", 10),
    perPage: parseInt(params.get("perPage") || "10", 10),
    sort: params.get("sort") || "-published_at",
  };
};

const updateUrlParams = (page: number, perPage: number, sort: string) => {
  if (typeof window === "undefined") return;

  const url = new URL(window.location.href);
  url.searchParams.set("page", page.toString());
  url.searchParams.set("perPage", perPage.toString());
  url.searchParams.set("sort", sort);

  window.history.replaceState({}, "", url.toString());
};

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [sort, setSort] = useState("-published_at");
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);

  const totalPages = Math.ceil(totalItems / perPage);

  useEffect(() => {
    const urlParams = getUrlParams();
    setPage(urlParams.page);
    setPerPage(urlParams.perPage);
    setSort(urlParams.sort);
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await axios.get<ApiResponse>(API_URL, {
          params: {
            "page[number]": page,
            "page[size]": perPage,
            append: ["small_image", "medium_image"],
            sort,
          },
        });
        setPosts(res.data.data);
        setTotalItems(res.data.meta.total);

        updateUrlParams(page, perPage, sort);
      } catch (err) {
        console.error("Failed to fetch posts", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page, perPage, sort]);

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPerPage = Number(e.target.value);
    setPerPage(newPerPage);
    setPage(1);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = e.target.value;
    setSort(newSort);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center flex-wrap gap-4 mb-6">
        <p className="text-xs text-gray-500 mt-4">
          Showing {(page - 1) * perPage + 1} -{" "}
          {Math.min(page * perPage, totalItems)} of {totalItems} posts
        </p>

        <FilterControls
          sort={sort}
          perPage={perPage}
          loading={loading}
          onSortChange={handleSortChange}
          onPerPageChange={handlePerPageChange}
        />
      </div>

      {loading && <LoadingSpinner />}

      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        loading={loading}
        onPageChange={handlePageChange}
      />
    </section>
  );
}
