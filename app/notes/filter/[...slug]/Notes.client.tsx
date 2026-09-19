"use client";

import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchNotes } from "../../../../lib/api";
import { useDebouncedCallback } from "use-debounce";
import Link from "next/link";
import SearchBox from "../../../../components/SearchBox/SearchBox";
import Pagination from "../../../../components/Pagination/Pagination";
import NoteList from "../../../../components/NoteList/NoteList";
import css from "./NotesPage.module.css";

interface NotesProps {
  tag?: string;
}

export default function Notes({ tag }: NotesProps) {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");

  const { data } = useQuery({
    queryKey: ["notes", page, search, tag],
    queryFn: () => fetchNotes({ page, perPage: 12, search, tag }),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const handlePageChange = (selectedPage: number) => setPage(selectedPage);

  const handleSearch = useDebouncedCallback((query: string) => {
    setSearch(query);
    setPage(1);
  }, 300);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={handleSearch} />

        {data?.totalPages && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            currentPage={page}
            onPageChange={handlePageChange}
          />
        )}

        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>

      {data?.notes && data.notes.length > 0 && <NoteList notes={data.notes} />}
    </div>
  );
}
