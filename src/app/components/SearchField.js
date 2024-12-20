export const SearchField = (props) => (
  <form className="w-full min-w-[300px]">
    <label
      htmlFor="default-search"
      className="text-sm font-medium text-gray-900 sr-only dark:text-white"
    >
      Search
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
        <svg
          className="w-4 h-4 text-secondary"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 15L11.6167 11.6167M13.4444 7.22222C13.4444 10.6587 10.6587 13.4444 7.22222 13.4444C3.78578 13.4444 1 10.6587 1 7.22222C1 3.78578 3.78578 1 7.22222 1C10.6587 1 13.4444 3.78578 13.4444 7.22222Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <input
        type="search"
        id="default-search"
        className=" w-full p-4 ps-12 pe-28 text-black border rounded-full border-border-default focus:outline-none"
        placeholder={props.placeholder}
        required
      />
      <button
        type="submit"
        className="absolute end-5 bottom-1/2 translate-y-1/2 font-semibold px-3 py-1 rounded-lg text-brand-white bg-brand hover:bg-secondary focus:ring-2 focus:outline-none focus-visible:ring-secondary"
      >
        Search
      </button>
    </div>
  </form>
);
