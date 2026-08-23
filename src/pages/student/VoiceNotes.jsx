import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic,
  MicOff,
  Play,
  Pause,
  Square,
  Search,
  Trash2,
  Download,
  Star,
  Pin,
  Edit3,
  Check,
  X,
  Clock,
  Headphones,
  FileAudio,
  Sparkles,
  Volume2,
} from "lucide-react";

/* =====================================================
   HELPER FUNCTION
   Available to the entire file
===================================================== */

function formatTime(seconds = 0) {
  const safeSeconds = Math.max(0, Math.floor(seconds));

  const mins = Math.floor(safeSeconds / 60);
  const secs = safeSeconds % 60;

  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(
    2,
    "0"
  )}`;
}

/* =====================================================
   SAMPLE VOICE NOTES
===================================================== */

const initialVoiceNotes = [
  {
    id: 1,
    title: "React Hooks Lecture",
    duration: 142,
    date: "Today, 10:30 AM",
    category: "React",
    favorite: true,
    pinned: true,
    url: null,
  },

  {
    id: 2,
    title: "JavaScript Promises",
    duration: 95,
    date: "Yesterday, 04:20 PM",
    category: "JavaScript",
    favorite: false,
    pinned: false,
    url: null,
  },

  {
    id: 3,
    title: "MERN Interview Preparation",
    duration: 210,
    date: "Aug 20, 2026",
    category: "Placement",
    favorite: true,
    pinned: false,
    url: null,
  },
];

const categories = [
  "All",
  "React",
  "JavaScript",
  "Placement",
  "Other",
];

/* =====================================================
   MAIN COMPONENT
===================================================== */

function VoiceNotes() {
  const [voiceNotes, setVoiceNotes] =
    useState(initialVoiceNotes);

  const [selectedNote, setSelectedNote] =
    useState(initialVoiceNotes[0]);

  const [search, setSearch] = useState("");

  const [category, setCategory] =
    useState("All");

  const [isRecording, setIsRecording] =
    useState(false);

  const [recordingTime, setRecordingTime] =
    useState(0);

  const [isPlaying, setIsPlaying] =
    useState(false);

  const [currentTime, setCurrentTime] =
    useState(0);

  const [editing, setEditing] =
    useState(false);

  const [editTitle, setEditTitle] =
    useState("");

  const [recordingError, setRecordingError] =
    useState("");

  const mediaRecorderRef =
    useRef(null);

  const audioChunksRef =
    useRef([]);

  const audioRef =
    useRef(null);

  const timerRef =
    useRef(null);

  /* =====================================================
     FILTER NOTES
  ===================================================== */

  const filteredNotes = voiceNotes.filter(
    (note) => {
      const matchesSearch =
        note.title
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" ||
        note.category === category;

      return (
        matchesSearch &&
        matchesCategory
      );
    }
  );

  /* =====================================================
     RECORDING TIMER
  ===================================================== */

  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setRecordingTime((previous) => previous + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => {
      clearInterval(timerRef.current);
    };
  }, [isRecording]);

  /* =====================================================
     CLEANUP AUDIO URL
  ===================================================== */

  useEffect(() => {
    return () => {
      voiceNotes.forEach((note) => {
        if (note.url) {
          URL.revokeObjectURL(note.url);
        }
      });
    };
  }, []);

  /* =====================================================
     START RECORDING
  ===================================================== */

  const startRecording = async () => {
    try {
      setRecordingError("");

      if (
        !navigator.mediaDevices ||
        !navigator.mediaDevices.getUserMedia
      ) {
        setRecordingError(
          "Your browser does not support microphone recording."
        );
        return;
      }

      const stream =
        await navigator.mediaDevices.getUserMedia({
          audio: true,
        });

      const recorder =
        new MediaRecorder(stream);

      mediaRecorderRef.current =
        recorder;

      audioChunksRef.current = [];

      setRecordingTime(0);

      recorder.ondataavailable = (
        event
      ) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(
            event.data
          );
        }
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(
          audioChunksRef.current,
          {
            type: "audio/webm",
          }
        );

        const audioUrl =
          URL.createObjectURL(
            audioBlob
          );

        const newVoiceNote = {
          id: Date.now(),
          title: `Voice Note ${
            voiceNotes.length + 1
          }`,
          duration: recordingTime,
          date: "Just now",
          category: "Other",
          favorite: false,
          pinned: false,
          url: audioUrl,
        };

        setVoiceNotes((previous) => [
          newVoiceNote,
          ...previous,
        ]);

        setSelectedNote(newVoiceNote);

        setRecordingTime(0);

        stream
          .getTracks()
          .forEach((track) =>
            track.stop()
          );
      };

      recorder.start();

      setIsRecording(true);
    } catch (error) {
      console.error(
        "Microphone error:",
        error
      );

      setRecordingError(
        "Microphone permission is required to record voice notes."
      );
    }
  };

  /* =====================================================
     STOP RECORDING
  ===================================================== */

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !==
        "inactive"
    ) {
      mediaRecorderRef.current.stop();
    }

    setIsRecording(false);
  };

  /* =====================================================
     PLAY / PAUSE
  ===================================================== */

  const togglePlay = () => {
    if (!selectedNote?.url) {
      return;
    }

    if (!audioRef.current) {
      return;
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.error(
            "Audio play error:",
            error
          );
        });
    }
  };

  /* =====================================================
     AUDIO TIME UPDATE
  ===================================================== */

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;

    setCurrentTime(
      audioRef.current.currentTime
    );
  };

  /* =====================================================
     AUDIO ENDED
  ===================================================== */

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  /* =====================================================
     SELECT NOTE
  ===================================================== */

  const selectNote = (note) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }

    setIsPlaying(false);
    setCurrentTime(0);
    setSelectedNote(note);
    setEditing(false);
  };

  /* =====================================================
     DELETE NOTE
  ===================================================== */

  const deleteNote = (id) => {
    const noteToDelete =
      voiceNotes.find(
        (note) => note.id === id
      );

    if (noteToDelete?.url) {
      URL.revokeObjectURL(
        noteToDelete.url
      );
    }

    const remaining =
      voiceNotes.filter(
        (note) => note.id !== id
      );

    setVoiceNotes(remaining);

    if (selectedNote?.id === id) {
      setSelectedNote(
        remaining.length > 0
          ? remaining[0]
          : null
      );

      setIsPlaying(false);
      setCurrentTime(0);
    }
  };

  /* =====================================================
     FAVORITE
  ===================================================== */

  const toggleFavorite = (id) => {
    const updatedNotes =
      voiceNotes.map((note) =>
        note.id === id
          ? {
              ...note,
              favorite:
                !note.favorite,
            }
          : note
      );

    setVoiceNotes(updatedNotes);

    const updatedSelected =
      updatedNotes.find(
        (note) =>
          note.id === selectedNote?.id
      );

    if (updatedSelected) {
      setSelectedNote(
        updatedSelected
      );
    }
  };

  /* =====================================================
     PIN
  ===================================================== */

  const togglePin = (id) => {
    const updatedNotes =
      voiceNotes.map((note) =>
        note.id === id
          ? {
              ...note,
              pinned: !note.pinned,
            }
          : note
      );

    setVoiceNotes(updatedNotes);

    const updatedSelected =
      updatedNotes.find(
        (note) =>
          note.id === selectedNote?.id
      );

    if (updatedSelected) {
      setSelectedNote(
        updatedSelected
      );
    }
  };

  /* =====================================================
     START EDITING
  ===================================================== */

  const startEditing = () => {
    if (!selectedNote) return;

    setEditTitle(
      selectedNote.title
    );

    setEditing(true);
  };

  /* =====================================================
     SAVE TITLE
  ===================================================== */

  const saveTitle = () => {
    if (!selectedNote) return;

    if (!editTitle.trim()) {
      return;
    }

    const updatedNote = {
      ...selectedNote,
      title: editTitle.trim(),
    };

    setVoiceNotes((previous) =>
      previous.map((note) =>
        note.id === selectedNote.id
          ? updatedNote
          : note
      )
    );

    setSelectedNote(updatedNote);

    setEditing(false);
  };

  /* =====================================================
     DOWNLOAD AUDIO
  ===================================================== */

  const downloadAudio = () => {
    if (!selectedNote?.url) {
      return;
    }

    const link =
      document.createElement("a");

    link.href = selectedNote.url;

    link.download = `${selectedNote.title}.webm`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };

  /* =====================================================
     CHANGE AUDIO POSITION
  ===================================================== */

  const changeAudioPosition = (
    event
  ) => {
    if (!audioRef.current) return;

    const value =
      Number(event.target.value);

    audioRef.current.currentTime =
      value;

    setCurrentTime(value);
  };

  /* =====================================================
     TOTAL DURATION
  ===================================================== */

  const totalDuration =
    voiceNotes.reduce(
      (total, note) =>
        total + (note.duration || 0),
      0
    );

  /* =====================================================
     FAVORITES COUNT
  ===================================================== */

  const favoriteCount =
    voiceNotes.filter(
      (note) => note.favorite
    ).length;

  /* =====================================================
     RENDER
  ===================================================== */

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

              <Mic size={18} />

            </div>

            <p className="text-xs font-bold tracking-wider text-indigo-600">
              VOICE LEARNING
            </p>

          </div>

          <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Voice Notes
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            Record lectures, ideas, revision points,
            and important concepts so you can listen
            to them anytime.
          </p>

        </div>

        {!isRecording ? (
          <button
            onClick={startRecording}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            <Mic size={18} />
            Start Recording
          </button>
        ) : (
          <button
            onClick={stopRecording}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-red-100 transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            <Square
              size={16}
              fill="currentColor"
            />
            Stop Recording
          </button>
        )}

      </motion.div>

      {/* =================================================
          ERROR
      ================================================= */}

      <AnimatePresence>
        {recordingError && (
          <motion.div
            initial={{
              opacity: 0,
              y: -10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
            }}
            className="mt-5 flex items-center justify-between rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600"
          >

            <div className="flex items-center gap-2">
              <MicOff size={17} />
              {recordingError}
            </div>

            <button
              onClick={() =>
                setRecordingError("")
              }
              className="rounded-lg p-1 hover:bg-red-100"
            >
              <X size={15} />
            </button>

          </motion.div>
        )}
      </AnimatePresence>

      {/* =================================================
          RECORDING PANEL
      ================================================= */}

      <AnimatePresence>
        {isRecording && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
              y: -10,
            }}
            animate={{
              opacity: 1,
              height: "auto",
              y: 0,
            }}
            exit={{
              opacity: 0,
              height: 0,
              y: -10,
            }}
            className="mt-6 overflow-hidden rounded-3xl border border-red-100 bg-gradient-to-br from-red-50 via-white to-indigo-50 p-6 shadow-sm"
          >

            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">

              <div className="flex items-center gap-4">

                <motion.div
                  animate={{
                    scale: [
                      1,
                      1.08,
                      1,
                    ],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                  }}
                  className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500 text-white shadow-lg shadow-red-200"
                >

                  <Mic size={27} />

                  <motion.span
                    animate={{
                      scale: [
                        1,
                        1.5,
                        1,
                      ],
                      opacity: [
                        0.5,
                        0,
                        0.5,
                      ],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                    }}
                    className="absolute inset-0 rounded-2xl border-2 border-red-400"
                  />

                </motion.div>

                <div>

                  <div className="flex items-center gap-2">

                    <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-red-500" />

                    <p className="text-sm font-bold text-red-600">
                      Recording in progress
                    </p>

                  </div>

                  <p className="mt-1 text-xs text-slate-500">
                    Speak clearly and keep your
                    device microphone close.
                  </p>

                </div>

              </div>

              <div className="text-center">

                <p className="font-mono text-4xl font-black tracking-wider text-slate-900">
                  {formatTime(
                    recordingTime
                  )}
                </p>

                <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Recording time
                </p>

              </div>

              <button
                onClick={stopRecording}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500 text-white shadow-lg shadow-red-200 transition hover:scale-105 hover:bg-red-600"
              >
                <Square
                  size={18}
                  fill="currentColor"
                />
              </button>

            </div>

            {/* Wave */}

            <div className="mt-6 flex h-10 items-center justify-center gap-1 overflow-hidden">

              {[...Array(40)].map(
                (_, index) => (
                  <motion.div
                    key={index}
                    animate={{
                      height: [
                        6,
                        10 +
                          ((index * 13) %
                            25),
                        6,
                      ],
                    }}
                    transition={{
                      duration:
                        0.4 +
                        (index % 5) *
                          0.1,
                      repeat: Infinity,
                      delay:
                        index * 0.025,
                    }}
                    className="w-1 rounded-full bg-gradient-to-t from-indigo-500 to-purple-500"
                  />
                )
              )}

            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* =================================================
          STATISTICS
      ================================================= */}

      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <StatCard
          icon={FileAudio}
          title="Total Recordings"
          value={voiceNotes.length}
        />

        <StatCard
          icon={Clock}
          title="Total Duration"
          value={formatTime(
            totalDuration
          )}
        />

        <StatCard
          icon={Star}
          title="Favorites"
          value={favoriteCount}
        />

        <StatCard
          icon={Headphones}
          title="Listening Time"
          value="8m"
        />

      </div>

      {/* =================================================
          MAIN WORKSPACE
      ================================================= */}

      <div className="mt-7 grid gap-6 lg:grid-cols-5">

        {/* =================================================
            LIBRARY
        ================================================= */}

        <motion.section
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
                  setSearch(
                    e.target.value
                  )
                }
                placeholder="Search voice notes..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-2 focus:ring-indigo-100"
              />

            </div>

          </div>

          {/* Categories */}

          <div className="border-b border-slate-100 p-4">

            <div className="flex gap-2 overflow-x-auto">

              {categories.map(
                (item) => (
                  <button
                    key={item}
                    onClick={() =>
                      setCategory(item)
                    }
                    className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                      category === item
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-100"
                        : "bg-slate-100 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600"
                    }`}
                  >
                    {item}
                  </button>
                )
              )}

            </div>

          </div>

          {/* List */}

          <div className="max-h-[550px] overflow-y-auto p-3">

            <div className="mb-2 flex items-center justify-between px-2">

              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Recordings
              </p>

              <span className="text-[11px] text-slate-400">
                {filteredNotes.length}
              </span>

            </div>

            <div className="space-y-2">

              <AnimatePresence>
                {filteredNotes.map(
                  (note) => (
                    <VoiceNoteCard
                      key={note.id}
                      note={note}
                      active={
                        selectedNote?.id ===
                        note.id
                      }
                      onClick={() =>
                        selectNote(note)
                      }
                      onPin={() =>
                        togglePin(
                          note.id
                        )
                      }
                      onFavorite={() =>
                        toggleFavorite(
                          note.id
                        )
                      }
                      onDelete={() =>
                        deleteNote(
                          note.id
                        )
                      }
                    />
                  )
                )}
              </AnimatePresence>

              {filteredNotes.length ===
                0 && (
                <div className="py-12 text-center">

                  <Mic
                    size={35}
                    className="mx-auto text-slate-300"
                  />

                  <p className="mt-3 text-sm font-semibold text-slate-500">
                    No voice notes found
                  </p>

                </div>
              )}

            </div>

          </div>

        </motion.section>

        {/* =================================================
            PLAYER
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

            <div className="flex h-full flex-col">

              {/* Player Header */}

              <div className="border-b border-slate-100 p-5">

                <div className="flex items-start justify-between gap-4">

                  <div className="flex min-w-0 items-center gap-3">

                    <motion.div
                      animate={
                        isPlaying
                          ? {
                              scale: [
                                1,
                                1.05,
                                1,
                              ],
                            }
                          : {}
                      }
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                      }}
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-100"
                    >
                      <Volume2 size={21} />
                    </motion.div>

                    <div className="min-w-0">

                      {editing ? (

                        <div className="flex items-center gap-2">

                          <input
                            value={
                              editTitle
                            }
                            onChange={(e) =>
                              setEditTitle(
                                e.target.value
                              )
                            }
                            className="w-full rounded-lg border border-indigo-200 px-2 py-1 text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-100"
                          />

                          <button
                            onClick={
                              saveTitle
                            }
                            className="rounded-lg bg-indigo-600 p-1.5 text-white"
                          >
                            <Check
                              size={14}
                            />
                          </button>

                          <button
                            onClick={() =>
                              setEditing(
                                false
                              )
                            }
                            className="rounded-lg bg-slate-100 p-1.5 text-slate-500"
                          >
                            <X
                              size={14}
                            />
                          </button>

                        </div>

                      ) : (

                        <h2 className="truncate text-lg font-black text-slate-900">
                          {selectedNote.title}
                        </h2>

                      )}

                      <div className="mt-1 flex items-center gap-2">

                        <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-[10px] font-semibold text-indigo-600">
                          {selectedNote.category}
                        </span>

                        <span className="text-[11px] text-slate-400">
                          {selectedNote.date}
                        </span>

                      </div>

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
                      className={`rounded-xl p-2 ${
                        selectedNote.pinned
                          ? "bg-indigo-50 text-indigo-600"
                          : "text-slate-400 hover:bg-slate-100"
                      }`}
                      title="Pin"
                    >
                      <Pin
                        size={17}
                        fill={
                          selectedNote.pinned
                            ? "currentColor"
                            : "none"
                        }
                      />
                    </button>

                    <button
                      onClick={() =>
                        toggleFavorite(
                          selectedNote.id
                        )
                      }
                      className={`rounded-xl p-2 ${
                        selectedNote.favorite
                          ? "bg-amber-50 text-amber-500"
                          : "text-slate-400 hover:bg-slate-100"
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

                    <button
                      onClick={
                        startEditing
                      }
                      className="rounded-xl p-2 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600"
                      title="Rename"
                    >
                      <Edit3 size={17} />
                    </button>

                    <button
                      onClick={
                        downloadAudio
                      }
                      disabled={
                        !selectedNote.url
                      }
                      className="rounded-xl p-2 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-30"
                      title="Download"
                    >
                      <Download
                        size={17}
                      />
                    </button>

                    <button
                      onClick={() =>
                        deleteNote(
                          selectedNote.id
                        )
                      }
                      className="rounded-xl p-2 text-slate-400 hover:bg-red-50 hover:text-red-500"
                      title="Delete"
                    >
                      <Trash2 size={17} />
                    </button>

                  </div>

                </div>

              </div>

              {/* Player Body */}

              <div className="flex flex-1 flex-col justify-center p-6 sm:p-10">

                {/* Visualizer */}

                <div className="flex h-32 items-center justify-center gap-1 overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-50 via-purple-50 to-white px-5">

                  {[...Array(55)].map(
                    (_, index) => (
                      <motion.div
                        key={index}
                        animate={
                          isPlaying
                            ? {
                                height: [
                                  8,
                                  15 +
                                    ((index *
                                      17) %
                                      65),
                                  8,
                                ],
                              }
                            : {
                                height:
                                  8 +
                                  (index %
                                    5) *
                                    5,
                              }
                        }
                        transition={{
                          duration:
                            0.5 +
                            (index % 5) *
                              0.1,
                          repeat:
                            isPlaying
                              ? Infinity
                              : 0,
                          delay:
                            index * 0.015,
                        }}
                        className="w-1 rounded-full bg-gradient-to-t from-indigo-500 to-purple-400"
                      />
                    )
                  )}

                </div>

                {/* Time */}

                <div className="mt-5 flex items-center justify-between text-xs font-medium text-slate-400">

                  <span>
                    {formatTime(
                      currentTime
                    )}
                  </span>

                  <span>
                    {formatTime(
                      selectedNote.duration
                    )}
                  </span>

                </div>

                {/* Progress Slider */}

                <input
                  type="range"
                  min="0"
                  max={
                    selectedNote.duration ||
                    0
                  }
                  step="0.1"
                  value={Math.min(
                    currentTime,
                    selectedNote.duration ||
                      0
                  )}
                  onChange={
                    changeAudioPosition
                  }
                  disabled={
                    !selectedNote.url
                  }
                  className="mt-2 h-2 w-full cursor-pointer accent-indigo-600 disabled:cursor-not-allowed disabled:opacity-40"
                />

                {/* Controls */}

                <div className="mt-8 flex items-center justify-center gap-5">

                  <button
                    onClick={() => {
                      if (
                        audioRef.current
                      ) {
                        audioRef.current.currentTime =
                          Math.max(
                            0,
                            currentTime -
                              10
                          );
                      }

                      setCurrentTime(
                        Math.max(
                          0,
                          currentTime -
                            10
                        )
                      );
                    }}
                    disabled={
                      !selectedNote.url
                    }
                    className="rounded-xl px-3 py-2 text-xs font-bold text-slate-400 hover:bg-slate-100 hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    -10s
                  </button>

                  <motion.button
                    whileTap={{
                      scale: 0.92,
                    }}
                    onClick={
                      togglePlay
                    }
                    disabled={
                      !selectedNote.url
                    }
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-xl shadow-indigo-200 transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {isPlaying ? (
                      <Pause
                        size={25}
                        fill="currentColor"
                      />
                    ) : (
                      <Play
                        size={25}
                        fill="currentColor"
                        className="ml-1"
                      />
                    )}
                  </motion.button>

                  <button
                    onClick={() => {
                      if (
                        audioRef.current
                      ) {
                        audioRef.current.currentTime =
                          Math.min(
                            selectedNote.duration,
                            currentTime +
                              10
                          );
                      }

                      setCurrentTime(
                        Math.min(
                          selectedNote.duration,
                          currentTime +
                            10
                        )
                      );
                    }}
                    disabled={
                      !selectedNote.url
                    }
                    className="rounded-xl px-3 py-2 text-xs font-bold text-slate-400 hover:bg-slate-100 hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    +10s
                  </button>

                </div>

                {/* Sample Message */}

                {!selectedNote.url && (
                  <div className="mx-auto mt-6 max-w-md rounded-xl bg-amber-50 px-4 py-3 text-center text-xs leading-5 text-amber-600">
                    This is a sample recording.
                    Click <b>Start Recording</b> to
                    create a real voice recording.
                  </div>
                )}

                {/* AI Section */}

                <div className="mt-8 rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-50/70 to-purple-50/70 p-4">

                  <div className="flex items-center gap-2">

                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
                      <Sparkles
                        size={15}
                      />
                    </div>

                    <div>

                      <p className="text-xs font-bold text-slate-800">
                        AI Study Assistant
                      </p>

                      <p className="text-[10px] text-slate-400">
                        Coming with AI integration
                      </p>

                    </div>

                  </div>

                  <p className="mt-3 text-xs leading-5 text-slate-500">
                    AI StudyMate can later
                    transcribe this recording,
                    summarize it, extract key
                    points, and save the important
                    information directly to your notes.
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">

                    <span className="rounded-full bg-white px-3 py-1.5 text-[10px] font-semibold text-indigo-600 shadow-sm">
                      AI Transcript
                    </span>

                    <span className="rounded-full bg-white px-3 py-1.5 text-[10px] font-semibold text-indigo-600 shadow-sm">
                      AI Summary
                    </span>

                    <span className="rounded-full bg-white px-3 py-1.5 text-[10px] font-semibold text-indigo-600 shadow-sm">
                      Key Points
                    </span>

                  </div>

                </div>

              </div>

              {/* Audio Element */}

              {selectedNote.url && (
                <audio
                  ref={audioRef}
                  src={selectedNote.url}
                  onTimeUpdate={
                    handleTimeUpdate
                  }
                  onEnded={
                    handleAudioEnded
                  }
                  onLoadedMetadata={() => {
                    if (
                      audioRef.current
                    ) {
                      const duration =
                        audioRef.current
                          .duration;

                      if (
                        Number.isFinite(
                          duration
                        )
                      ) {
                        setVoiceNotes(
                          (previous) =>
                            previous.map(
                              (note) =>
                                note.id ===
                                selectedNote.id
                                  ? {
                                      ...note,
                                      duration,
                                    }
                                  : note
                            )
                        );

                        setSelectedNote(
                          (previous) =>
                            previous
                              ? {
                                  ...previous,
                                  duration,
                                }
                              : previous
                        );
                      }
                    }
                  }}
                />
              )}

            </div>

          ) : (

            /* =================================================
               EMPTY STATE
            ================================================= */

            <div className="flex min-h-[500px] flex-col items-center justify-center p-8 text-center">

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">

                <Mic size={28} />

              </div>

              <h2 className="mt-5 text-xl font-black text-slate-900">
                No Voice Note Selected
              </h2>

              <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                Start a recording or select a voice
                note from your library.
              </p>

              <button
                onClick={
                  startRecording
                }
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-100 hover:bg-indigo-700"
              >

                <Mic size={17} />

                Start Recording

              </button>

            </div>

          )}

        </motion.section>

      </div>

    </div>
  );
}

/* =====================================================
   VOICE NOTE CARD
===================================================== */

function VoiceNoteCard({
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
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
              active
                ? "bg-indigo-600 text-white"
                : "bg-indigo-50 text-indigo-600"
            }`}
          >
            <Mic size={18} />
          </div>

          <div className="min-w-0 flex-1">

            <div className="flex items-center gap-2">

              <p className="truncate text-sm font-bold text-slate-800">
                {note.title}
              </p>

              {note.pinned && (
                <Pin
                  size={11}
                  className="shrink-0 text-indigo-500"
                  fill="currentColor"
                />
              )}

            </div>

            <div className="mt-1 flex items-center gap-2">

              <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-semibold text-slate-500">
                {note.category}
              </span>

              <span className="text-[10px] text-slate-400">
                {formatTime(
                  note.duration
                )}
              </span>

            </div>

            <p className="mt-1 text-[10px] text-slate-400">
              {note.date}
            </p>

          </div>

        </div>

      </button>

      {/* Hover Actions */}

      <div className="absolute right-2 top-2 hidden items-center gap-0.5 rounded-lg bg-white shadow-sm group-hover:flex">

        <button
          onClick={(event) => {
            event.stopPropagation();
            onPin();
          }}
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
          onClick={(event) => {
            event.stopPropagation();
            onFavorite();
          }}
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
          onClick={(event) => {
            event.stopPropagation();
            onDelete();
          }}
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

export default VoiceNotes;