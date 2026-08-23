import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  NotebookPen,
  Plus,
  Search,
  Pin,
  Star,
  Trash2,
  Edit3,
  Save,
  X,
  MoreVertical,
  Clock,
  Tag,
  FileText,
  Sparkles,
  Check,
  ChevronRight,
  BookOpen,
  FolderOpen,
} from "lucide-react";


/* =====================================================
   SAMPLE NOTES
===================================================== */

const initialNotes = [
  {
    id: 1,
    title: "React Hooks",
    content:
      "React Hooks allow functional components to use state and other React features. Important hooks include useState, useEffect, useContext, useRef, useMemo, useCallback and useReducer.",
    category: "React",
    tags: ["React", "Hooks", "Frontend"],
    updatedAt: "Today, 10:30 AM",
    pinned: true,
    favorite: true,
  },

  {
    id: 2,
    title: "JavaScript Promises",
    content:
      "A Promise represents the eventual completion or failure of an asynchronous operation. A Promise can be pending, fulfilled or rejected. async and await make asynchronous code easier to read.",
    category: "JavaScript",
    tags: ["JavaScript", "Async"],
    updatedAt: "Today, 09:15 AM",
    pinned: false,
    favorite: true,
  },

  {
    id: 3,
    title: "MongoDB Basics",
    content:
      "MongoDB is a NoSQL database that stores data in flexible JSON-like documents. Important concepts include databases, collections, documents, CRUD operations and indexes.",
    category: "Database",
    tags: ["MongoDB", "Database"],
    updatedAt: "Yesterday, 04:20 PM",
    pinned: false,
    favorite: false,
  },

  {
    id: 4,
    title: "MERN Interview Questions",
    content:
      "Prepare important MERN concepts including React components, props, state, hooks, Express middleware, REST APIs, JWT authentication, MongoDB queries and Node.js.",
    category: "Placement",
    tags: ["MERN", "Interview"],
    updatedAt: "Yesterday, 02:10 PM",
    pinned: false,
    favorite: false,
  },

  {
    id: 5,
    title: "SQL Joins",
    content:
      "SQL joins are used to combine data from multiple tables. Important joins include INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL JOIN and SELF JOIN.",
    category: "Database",
    tags: ["SQL", "Database"],
    updatedAt: "Aug 20, 2026",
    pinned: false,
    favorite: false,
  },
];


const categories = [
  "All Notes",
  "React",
  "JavaScript",
  "Database",
  "Placement",
];


/* =====================================================
   MAIN COMPONENT
===================================================== */

function Notes() {

  const [notes, setNotes] =
    useState(initialNotes);

  const [selectedNote, setSelectedNote] =
    useState(initialNotes[0]);

  const [search, setSearch] =
    useState("");

  const [activeCategory, setActiveCategory] =
    useState("All Notes");

  const [isEditing, setIsEditing] =
    useState(false);

  const [showEditor, setShowEditor] =
    useState(false);

  const [isSaving, setIsSaving] =
    useState(false);

  const [saved, setSaved] =
    useState(true);


  /* =====================================================
     FILTER NOTES
  ===================================================== */

  const filteredNotes = notes.filter((note) => {

    const matchesSearch =
      note.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      note.content
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      note.tags.some((tag) =>
        tag.toLowerCase().includes(
          search.toLowerCase()
        )
      );


    const matchesCategory =
      activeCategory === "All Notes" ||
      note.category === activeCategory;


    return (
      matchesSearch &&
      matchesCategory
    );

  });


  /* =====================================================
     CREATE NOTE
  ===================================================== */

  const createNote = () => {

    const newNote = {
      id: Date.now(),
      title: "Untitled Note",
      content: "",
      category: "React",
      tags: [],
      updatedAt: "Just now",
      pinned: false,
      favorite: false,
    };


    setNotes((prev) => [
      newNote,
      ...prev,
    ]);

    setSelectedNote(newNote);

    setIsEditing(true);

    setShowEditor(true);

    setSaved(true);

  };


  /* =====================================================
     UPDATE NOTE
  ===================================================== */

  const updateNote = (field, value) => {

    const updatedNote = {
      ...selectedNote,
      [field]: value,
      updatedAt: "Just now",
    };


    setSelectedNote(updatedNote);

    setSaved(false);


    setNotes((prev) =>
      prev.map((note) =>
        note.id === updatedNote.id
          ? updatedNote
          : note
      )
    );

  };


  /* =====================================================
     SAVE NOTE
  ===================================================== */

  const saveNote = () => {

    setIsSaving(true);

    setSaved(false);


    setTimeout(() => {

      setIsSaving(false);

      setSaved(true);

      setIsEditing(false);

    }, 600);

  };


  /* =====================================================
     DELETE NOTE
  ===================================================== */

  const deleteNote = (id) => {

    const remaining =
      notes.filter(
        (note) => note.id !== id
      );


    setNotes(remaining);


    if (selectedNote?.id === id) {

      setSelectedNote(
        remaining.length > 0
          ? remaining[0]
          : null
      );

      setShowEditor(false);

    }

  };


  /* =====================================================
     PIN NOTE
  ===================================================== */

  const togglePin = (id) => {

    const updated = notes.map(
      (note) =>
        note.id === id
          ? {
              ...note,
              pinned: !note.pinned,
            }
          : note
    );


    setNotes(updated);


    const updatedSelected =
      updated.find(
        (note) =>
          note.id === selectedNote?.id
      );


    if (updatedSelected) {
      setSelectedNote(updatedSelected);
    }

  };


  /* =====================================================
     FAVORITE NOTE
  ===================================================== */

  const toggleFavorite = (id) => {

    const updated = notes.map(
      (note) =>
        note.id === id
          ? {
              ...note,
              favorite: !note.favorite,
            }
          : note
    );


    setNotes(updated);


    const updatedSelected =
      updated.find(
        (note) =>
          note.id === selectedNote?.id
      );


    if (updatedSelected) {
      setSelectedNote(updatedSelected);
    }

  };


  /* =====================================================
     WORD COUNT
  ===================================================== */

  const wordCount =
    selectedNote?.content
      ?.trim()
      ? selectedNote.content
          .trim()
          .split(/\s+/)
          .length
      : 0;


  const characterCount =
    selectedNote?.content?.length || 0;


  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">


      {/* =================================================
          HEADER
      ================================================= */}

      <motion.div
        initial={{
          opacity: 0,
          y: 15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"
      >

        <div>

          <div className="flex items-center gap-2">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-md">

              <NotebookPen size={18} />

            </div>

            <p className="text-xs font-bold tracking-wider text-indigo-600">
              STUDY NOTES
            </p>

          </div>


          <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            My Notes
          </h1>


          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            Organize your ideas, class notes, important concepts,
            and revision material in one place.
          </p>

        </div>


        <button
          onClick={createNote}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:shadow-xl"
        >

          <Plus size={18} />

          New Note

        </button>

      </motion.div>


      {/* =================================================
          STATISTICS
      ================================================= */}

      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <StatCard
          icon={NotebookPen}
          title="Total Notes"
          value={notes.length}
        />

        <StatCard
          icon={Pin}
          title="Pinned"
          value={
            notes.filter(
              (note) => note.pinned
            ).length
          }
        />

        <StatCard
          icon={Star}
          title="Favorites"
          value={
            notes.filter(
              (note) => note.favorite
            ).length
          }
        />

        <StatCard
          icon={FileText}
          title="Words Written"
          value="2.4K"
        />

      </div>


      {/* =================================================
          NOTES WORKSPACE
      ================================================= */}

      <div className="mt-7 grid gap-6 lg:grid-cols-5">


        {/* =================================================
            LEFT SIDEBAR
        ================================================= */}

        <motion.aside
          initial={{
            opacity: 0,
            x: -15,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            delay: 0.15,
          }}
          className="rounded-3xl border border-slate-200 bg-white shadow-sm lg:col-span-2"
        >

          {/* Search */}

          <div className="border-b border-slate-100 p-4">

            <div className="relative">

              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search your notes..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-2 focus:ring-indigo-100"
              />

            </div>

          </div>


          {/* Categories */}

          <div className="border-b border-slate-100 p-4">

            <p className="mb-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Categories
            </p>


            <div className="flex gap-2 overflow-x-auto pb-1 lg:flex-wrap">

              {categories.map(
                (category) => (

                  <button
                    key={category}
                    onClick={() =>
                      setActiveCategory(
                        category
                      )
                    }
                    className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                      activeCategory === category
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-100"
                        : "bg-slate-100 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600"
                    }`}
                  >

                    {category}

                  </button>

                )
              )}

            </div>

          </div>


          {/* Notes List */}

          <div className="max-h-[560px] overflow-y-auto p-3">

            <div className="mb-2 flex items-center justify-between px-2">

              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Your Notes
              </p>

              <span className="text-[11px] text-slate-400">
                {filteredNotes.length}
              </span>

            </div>


            <div className="space-y-2">

              <AnimatePresence mode="popLayout">

                {filteredNotes.map(
                  (note) => (

                    <NoteCard
                      key={note.id}
                      note={note}
                      active={
                        selectedNote?.id ===
                        note.id
                      }
                      onClick={() => {
                        setSelectedNote(note);
                        setIsEditing(false);
                      }}
                      onPin={() =>
                        togglePin(note.id)
                      }
                      onFavorite={() =>
                        toggleFavorite(
                          note.id
                        )
                      }
                      onDelete={() =>
                        deleteNote(note.id)
                      }
                    />

                  )
                )}

              </AnimatePresence>


              {filteredNotes.length === 0 && (

                <div className="py-12 text-center">

                  <FolderOpen
                    size={36}
                    className="mx-auto text-slate-300"
                  />

                  <p className="mt-3 text-sm font-semibold text-slate-500">
                    No notes found
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Try another search or category.
                  </p>

                </div>

              )}

            </div>

          </div>

        </motion.aside>


        {/* =================================================
            NOTE EDITOR
        ================================================= */}

        <motion.section
          initial={{
            opacity: 0,
            x: 15,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            delay: 0.2,
          }}
          className="rounded-3xl border border-slate-200 bg-white shadow-sm lg:col-span-3"
        >

          {selectedNote ? (

            <>

              {/* Editor Header */}

              <div className="border-b border-slate-100 p-5">

                <div className="flex items-start justify-between gap-4">

                  <div className="min-w-0 flex-1">

                    {isEditing ? (

                      <input
                        value={selectedNote.title}
                        onChange={(e) =>
                          updateNote(
                            "title",
                            e.target.value
                          )
                        }
                        className="w-full border-none bg-transparent text-2xl font-black text-slate-900 outline-none placeholder:text-slate-300"
                        placeholder="Note title..."
                      />

                    ) : (

                      <h2 className="truncate text-2xl font-black text-slate-900">
                        {selectedNote.title}
                      </h2>

                    )}


                    <div className="mt-2 flex flex-wrap items-center gap-3">

                      <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2.5 py-1 text-[11px] font-semibold text-indigo-600">

                        <Tag size={11} />

                        {selectedNote.category}

                      </span>


                      <span className="inline-flex items-center gap-1 text-[11px] text-slate-400">

                        <Clock size={12} />

                        {selectedNote.updatedAt}

                      </span>


                      <span
                        className={`inline-flex items-center gap-1 text-[11px] ${
                          saved
                            ? "text-green-500"
                            : "text-amber-500"
                        }`}
                      >

                        {saved ? (
                          <>
                            <Check size={12} />
                            Saved
                          </>
                        ) : (
                          "Unsaved changes"
                        )}

                      </span>

                    </div>

                  </div>


                  {/* Actions */}

                  <div className="flex shrink-0 items-center gap-1">

                    <button
                      onClick={() =>
                        togglePin(
                          selectedNote.id
                        )
                      }
                      className={`rounded-xl p-2 transition ${
                        selectedNote.pinned
                          ? "bg-indigo-50 text-indigo-600"
                          : "text-slate-400 hover:bg-slate-100 hover:text-indigo-600"
                      }`}
                      title="Pin note"
                    >

                      <Pin size={17} />

                    </button>


                    <button
                      onClick={() =>
                        toggleFavorite(
                          selectedNote.id
                        )
                      }
                      className={`rounded-xl p-2 transition ${
                        selectedNote.favorite
                          ? "bg-amber-50 text-amber-500"
                          : "text-slate-400 hover:bg-slate-100 hover:text-amber-500"
                      }`}
                      title="Favorite"
                    >

                      <Star
                        size={17}
                        fill={
                          selectedNote.favorite
                            ? "currentColor"
                            : "none"
                        }
                      />

                    </button>


                    {!isEditing ? (

                      <button
                        onClick={() =>
                          setIsEditing(true)
                        }
                        className="rounded-xl p-2 text-slate-400 transition hover:bg-indigo-50 hover:text-indigo-600"
                        title="Edit"
                      >

                        <Edit3 size={17} />

                      </button>

                    ) : (

                      <button
                        onClick={saveNote}
                        className="rounded-xl bg-indigo-600 p-2 text-white shadow-md shadow-indigo-100 transition hover:bg-indigo-700"
                        title="Save"
                      >

                        {isSaving ? (
                          <div className="h-[17px] w-[17px] animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        ) : (
                          <Save size={17} />
                        )}

                      </button>

                    )}


                    <button
                      onClick={() =>
                        deleteNote(
                          selectedNote.id
                        )
                      }
                      className="rounded-xl p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                      title="Delete"
                    >

                      <Trash2 size={17} />

                    </button>

                  </div>

                </div>

              </div>


              {/* Editor Body */}

              <div className="p-5 sm:p-6">

                {isEditing ? (

                  <>

                    {/* Category */}

                    <div className="mb-4">

                      <label className="mb-2 block text-xs font-bold text-slate-500">
                        Category
                      </label>

                      <select
                        value={
                          selectedNote.category
                        }
                        onChange={(e) =>
                          updateNote(
                            "category",
                            e.target.value
                          )
                        }
                        className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
                      >

                        <option>
                          React
                        </option>

                        <option>
                          JavaScript
                        </option>

                        <option>
                          Database
                        </option>

                        <option>
                          Placement
                        </option>

                      </select>

                    </div>


                    {/* Content */}

                    <textarea
                      value={
                        selectedNote.content
                      }
                      onChange={(e) =>
                        updateNote(
                          "content",
                          e.target.value
                        )
                      }
                      placeholder="Start writing your note..."
                      className="min-h-[400px] w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm leading-7 text-slate-700 outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                    />


                    {/* Editor Footer */}

                    <div className="mt-3 flex flex-wrap items-center justify-between gap-3">

                      <div className="flex items-center gap-4 text-xs text-slate-400">

                        <span>
                          {wordCount} words
                        </span>

                        <span>
                          {characterCount} characters
                        </span>

                      </div>


                      <button
                        onClick={saveNote}
                        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-100 transition hover:-translate-y-0.5 hover:shadow-lg"
                      >

                        <Save size={15} />

                        {isSaving
                          ? "Saving..."
                          : "Save Note"}

                      </button>

                    </div>

                  </>

                ) : (

                  <>

                    {/* Read Mode */}

                    <div className="min-h-[400px] rounded-2xl bg-slate-50 p-5">

                      {selectedNote.content ? (

                        <p className="whitespace-pre-line text-sm leading-7 text-slate-600">
                          {selectedNote.content}
                        </p>

                      ) : (

                        <div className="flex h-full min-h-[350px] flex-col items-center justify-center text-center">

                          <NotebookPen
                            size={35}
                            className="text-slate-300"
                          />

                          <p className="mt-3 text-sm font-semibold text-slate-500">
                            This note is empty
                          </p>

                          <button
                            onClick={() =>
                              setIsEditing(true)
                            }
                            className="mt-3 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                          >
                            Start writing
                          </button>

                        </div>

                      )}

                    </div>


                    {/* Tags */}

                    {selectedNote.tags.length > 0 && (

                      <div className="mt-5">

                        <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                          Tags
                        </p>

                        <div className="flex flex-wrap gap-2">

                          {selectedNote.tags.map(
                            (tag) => (

                              <span
                                key={tag}
                                className="rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-600"
                              >
                                #{tag}
                              </span>

                            )
                          )}

                        </div>

                      </div>

                    )}

                  </>

                )}

              </div>


              {/* Bottom Information */}

              <div className="border-t border-slate-100 px-5 py-4">

                <div className="flex flex-wrap items-center justify-between gap-3">

                  <div className="flex items-center gap-2 text-xs text-slate-400">

                    <BookOpen size={14} />

                    Keep learning. Keep writing.

                  </div>


                  <span className="text-xs text-slate-400">
                    Last updated {selectedNote.updatedAt}
                  </span>

                </div>

              </div>

            </>

          ) : (

            /* Empty */

            <div className="flex min-h-[550px] flex-col items-center justify-center p-8 text-center">

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">

                <NotebookPen size={28} />

              </div>

              <h2 className="mt-5 text-xl font-black text-slate-900">
                No Note Selected
              </h2>

              <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                Select a note from your library or create a new note to start writing.
              </p>

              <button
                onClick={createNote}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-100 hover:bg-indigo-700"
              >

                <Plus size={17} />

                Create Note

              </button>

            </div>

          )}

        </motion.section>

      </div>

    </div>
  );
}


/* =====================================================
   NOTE CARD
===================================================== */

function NoteCard({
  note,
  active,
  onClick,
  onPin,
  onFavorite,
  onDelete,
}) {

  return (
    <motion.div
      layout
      initial={{
        opacity: 0,
        y: 10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        scale: 0.95,
      }}
      whileHover={{
        y: -2,
      }}
      className={`group relative rounded-2xl border p-3 transition ${
        active
          ? "border-indigo-200 bg-indigo-50/60 shadow-sm"
          : "border-transparent hover:border-slate-200 hover:bg-slate-50"
      }`}
    >

      <button
        onClick={onClick}
        className="w-full text-left"
      >

        <div className="flex gap-3">

          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
              active
                ? "bg-indigo-600 text-white"
                : "bg-indigo-50 text-indigo-600"
            }`}
          >

            <NotebookPen size={17} />

          </div>


          <div className="min-w-0 flex-1">

            <div className="flex items-center gap-2">

              <p className="truncate text-sm font-bold text-slate-800">
                {note.title}
              </p>


              {note.pinned && (
                <Pin
                  size={12}
                  className="shrink-0 text-indigo-500"
                  fill="currentColor"
                />
              )}

            </div>


            <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-400">
              {note.content ||
                "Empty note"}
            </p>


            <div className="mt-2 flex items-center gap-2">

              <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-semibold text-slate-500">
                {note.category}
              </span>

              <span className="text-[10px] text-slate-400">
                {note.updatedAt}
              </span>

            </div>

          </div>

        </div>

      </button>


      {/* Actions */}

      <div className="absolute right-2 top-2 hidden items-center gap-0.5 rounded-lg bg-white shadow-sm group-hover:flex">

        <button
          onClick={onPin}
          className={`rounded-lg p-1.5 ${
            note.pinned
              ? "text-indigo-600"
              : "text-slate-300 hover:text-indigo-600"
          }`}
          title="Pin"
        >

          <Pin
            size={13}
            fill={
              note.pinned
                ? "currentColor"
                : "none"
            }
          />

        </button>


        <button
          onClick={onFavorite}
          className={`rounded-lg p-1.5 ${
            note.favorite
              ? "text-amber-500"
              : "text-slate-300 hover:text-amber-500"
          }`}
          title="Favorite"
        >

          <Star
            size={13}
            fill={
              note.favorite
                ? "currentColor"
                : "none"
            }
          />

        </button>


        <button
          onClick={onDelete}
          className="rounded-lg p-1.5 text-slate-300 hover:text-red-500"
          title="Delete"
        >

          <Trash2 size={13} />

        </button>

      </div>

    </motion.div>
  );
}


/* =====================================================
   STAT CARD
===================================================== */

function StatCard({
  icon: Icon,
  title,
  value,
}) {

  return (
    <motion.div
      whileHover={{
        y: -3,
      }}
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-indigo-100 hover:shadow-lg hover:shadow-indigo-100/40"
    >

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-slate-500">
            {title}
          </p>

          <p className="mt-2 text-2xl font-black text-slate-900">
            {value}
          </p>

        </div>


        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">

          <Icon size={20} />

        </div>

      </div>

    </motion.div>
  );
}


export default Notes;