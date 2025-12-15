interface BlogSearchProps {
  defaultQuery?: string;
}

export function BlogSearch({ defaultQuery = "" }: BlogSearchProps) {
  return (
    <form
      action="/blog"
      method="get"
      className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm"
    >
      <input
        type="search"
        name="q"
        defaultValue={defaultQuery}
        placeholder="Search articles"
        className="w-full bg-transparent text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
        aria-label="Search blog articles"
      />
      <button
        type="submit"
        className="flex items-center gap-1 rounded-full bg-slate-900 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-amber-700"
      >
        <span>Search</span>
      </button>
    </form>
  );
}
