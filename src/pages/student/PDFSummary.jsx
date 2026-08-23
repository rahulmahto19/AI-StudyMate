import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Upload,
  Search,
  Trash2,
  Download,
  Eye,
  Copy,
  Check,
  Sparkles,
  Clock,
  File,
  X,
  MoreVertical,
  Edit3,
  RefreshCw,
  BookOpen,
  CheckCircle2,
  Loader2,
  ChevronRight,
  FileCheck2,
  Plus,
} from "lucide-react";


/* =====================================================
   SAMPLE DOCUMENTS
===================================================== */

const initialDocuments = [
  {
    id: 1,
    name: "React_Complete_Guide.pdf",
    size: "2.4 MB",
    pages: 42,
    date: "Today, 10:30 AM",
    status: "Completed",
    summary:
      "React is a JavaScript library used for building user interfaces. It uses components, props, state, hooks, and a virtual DOM to create interactive applications.",
  },
  {
    id: 2,
    name: "JavaScript_Interview_Notes.pdf",
    size: "1.8 MB",
    pages: 28,
    date: "Yesterday, 04:20 PM",
    status: "Completed",
    summary:
      "This document covers important JavaScript interview concepts including closures, promises, async/await, hoisting, prototypes, array methods, and ES6 features.",
  },
  {
    id: 3,
    name: "Database_Management.pdf",
    size: "3.1 MB",
    pages: 65,
    date: "Aug 20, 2026",
    status: "Processing",
    summary: "",
  },
];


/* =====================================================
   MAIN COMPONENT
===================================================== */

function PDFSummary() {

  const fileInputRef = useRef(null);

  const [documents, setDocuments] =
    useState(initialDocuments);

  const [selectedDocument, setSelectedDocument] =
    useState(initialDocuments[0]);

  const [search, setSearch] = useState("");

  const [isDragging, setIsDragging] =
    useState(false);

  const [uploading, setUploading] =
    useState(false);

  const [summarizing, setSummarizing] =
    useState(false);

  const [showViewer, setShowViewer] =
    useState(false);

  const [copied, setCopied] =
    useState(false);

  const [editing, setEditing] =
    useState(false);

  const [editedSummary, setEditedSummary] =
    useState("");


  /* =====================================================
     FILTER DOCUMENTS
  ===================================================== */

  const filteredDocuments = documents.filter((document) =>
    document.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );


  /* =====================================================
     FILE UPLOAD
  ===================================================== */

  const handleFile = (file) => {

    if (!file) return;


    if (file.type !== "application/pdf") {

      alert("Please upload a PDF file.");

      return;

    }


    setUploading(true);


    setTimeout(() => {

      const newDocument = {
        id: Date.now(),
        name: file.name,
        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        pages: "--",
        date: "Just now",
        status: "Uploaded",
        summary: "",
      };


      setDocuments((prev) => [
        newDocument,
        ...prev,
      ]);

      setSelectedDocument(newDocument);

      setUploading(false);

    }, 1200);

  };


  /* =====================================================
     FILE INPUT
  ===================================================== */

  const handleFileInput = (event) => {

    const file = event.target.files?.[0];

    handleFile(file);

  };


  /* =====================================================
     DRAG & DROP
  ===================================================== */

  const handleDrop = (event) => {

    event.preventDefault();

    setIsDragging(false);

    const file = event.dataTransfer.files?.[0];

    handleFile(file);

  };


  /* =====================================================
     SUMMARIZE
  ===================================================== */

  const generateSummary = () => {

    if (!selectedDocument) return;


    setSummarizing(true);


    setTimeout(() => {

      const generatedSummary =
        "This PDF contains important academic information. AI StudyMate analyzed the document and identified the main concepts, important definitions, key points, and practical examples. The document can be reviewed section by section for better understanding and exam preparation.";


      const updatedDocument = {
        ...selectedDocument,
        status: "Completed",
        summary: generatedSummary,
      };


      setDocuments((prev) =>
        prev.map((doc) =>
          doc.id === selectedDocument.id
            ? updatedDocument
            : doc
        )
      );


      setSelectedDocument(updatedDocument);

      setSummarizing(false);

    }, 1800);

  };


  /* =====================================================
     DELETE
  ===================================================== */

  const deleteDocument = (id) => {

    const remaining =
      documents.filter(
        (document) => document.id !== id
      );


    setDocuments(remaining);


    if (selectedDocument?.id === id) {

      setSelectedDocument(
        remaining.length > 0
          ? remaining[0]
          : null
      );

    }

  };


  /* =====================================================
     COPY SUMMARY
  ===================================================== */

  const copySummary = async () => {

    if (!selectedDocument?.summary) return;

    await navigator.clipboard.writeText(
      selectedDocument.summary
    );

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);

  };


  /* =====================================================
     SAVE EDITED SUMMARY
  ===================================================== */

  const saveSummary = () => {

    const updatedDocument = {
      ...selectedDocument,
      summary: editedSummary,
    };


    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === selectedDocument.id
          ? updatedDocument
          : doc
      )
    );


    setSelectedDocument(updatedDocument);

    setEditing(false);

  };


  /* =====================================================
     DOWNLOAD SUMMARY
  ===================================================== */

  const downloadSummary = () => {

    if (!selectedDocument?.summary) return;


    const content = `
AI StudyMate
PDF Summary

Document:
${selectedDocument.name}

Generated:
${selectedDocument.date}

Summary:
${selectedDocument.summary}
`;


    const blob = new Blob(
      [content],
      { type: "text/plain" }
    );


    const url =
      URL.createObjectURL(blob);


    const link =
      document.createElement("a");


    link.href = url;

    link.download =
      `${selectedDocument.name.replace(
        ".pdf",
        ""
      )}_Summary.txt`;


    link.click();


    URL.revokeObjectURL(url);

  };


  return (

    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">


      {/* =================================================
          PAGE HEADER
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
              <Sparkles size={18} />
            </div>

            <p className="text-xs font-bold tracking-wider text-indigo-600">
              AI POWERED LEARNING
            </p>

          </div>


          <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            AI PDF Summary
          </h1>


          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            Upload your study materials and let AI turn long PDFs
            into clear, easy-to-understand summaries.
          </p>

        </div>


        {/* Upload Button */}

        <button
          onClick={() =>
            fileInputRef.current?.click()
          }
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:shadow-xl"
        >

          <Plus size={18} />

          Upload PDF

        </button>


        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,application/pdf"
          onChange={handleFileInput}
          className="hidden"
        />

      </motion.div>


      {/* =================================================
          STATISTICS
      ================================================= */}

      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <StatCard
          icon={FileText}
          title="Total PDFs"
          value={documents.length}
        />

        <StatCard
          icon={FileCheck2}
          title="Summarized"
          value={
            documents.filter(
              (doc) => doc.status === "Completed"
            ).length
          }
        />

        <StatCard
          icon={Clock}
          title="Processing"
          value={
            documents.filter(
              (doc) =>
                doc.status === "Processing"
            ).length
          }
        />

        <StatCard
          icon={BookOpen}
          title="Pages Studied"
          value="135"
        />

      </div>


      {/* =================================================
          UPLOAD AREA
      ================================================= */}

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.15,
        }}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() =>
          setIsDragging(false)
        }
        onDrop={handleDrop}
        className={`mt-7 rounded-3xl border-2 border-dashed p-8 text-center transition-all sm:p-10 ${
          isDragging
            ? "border-indigo-500 bg-indigo-50"
            : "border-slate-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/30"
        }`}
      >

        {uploading ? (

          <div className="mx-auto max-w-md">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">

              <Loader2
                size={26}
                className="animate-spin"
              />

            </div>

            <h3 className="mt-4 font-bold text-slate-900">
              Uploading your PDF...
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Please wait while your document is uploaded.
            </p>

            <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100">

              <motion.div
                initial={{
                  width: "0%",
                }}
                animate={{
                  width: "100%",
                }}
                transition={{
                  duration: 1.1,
                }}
                className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-purple-600"
              />

            </div>

          </div>

        ) : (

          <>

            <motion.div
              animate={
                isDragging
                  ? {
                      scale: 1.08,
                      y: -5,
                    }
                  : {
                      scale: 1,
                      y: 0,
                    }
              }
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 text-indigo-600"
            >

              <Upload size={28} />

            </motion.div>


            <h3 className="mt-5 text-lg font-bold text-slate-900">
              Drop your PDF here
            </h3>


            <p className="mt-2 text-sm text-slate-500">
              or choose a file from your computer
            </p>


            <button
              onClick={() =>
                fileInputRef.current?.click()
              }
              className="mt-5 rounded-xl border border-indigo-200 bg-white px-5 py-2.5 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-50"
            >
              Browse PDF
            </button>


            <p className="mt-4 text-xs text-slate-400">
              Supported format: PDF • Maximum recommended size: 20 MB
            </p>

          </>

        )}

      </motion.div>


      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <div className="mt-8 grid gap-6 lg:grid-cols-5">


        {/* =================================================
            DOCUMENT LIST
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
            delay: 0.2,
          }}
          className="rounded-3xl border border-slate-200 bg-white shadow-sm lg:col-span-2"
        >

          <div className="border-b border-slate-100 p-5">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-xs font-bold tracking-wider text-indigo-600">
                  YOUR DOCUMENTS
                </p>

                <h2 className="mt-1 text-xl font-black text-slate-900">
                  PDF Library
                </h2>

              </div>


              <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-600">
                {documents.length} PDFs
              </span>

            </div>


            {/* Search */}

            <div className="relative mt-4">

              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search PDFs..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-2 focus:ring-indigo-100"
              />

            </div>

          </div>


          {/* Documents */}

          <div className="max-h-[520px] overflow-y-auto p-3">

            {filteredDocuments.length === 0 ? (

              <div className="py-12 text-center">

                <FileText
                  size={35}
                  className="mx-auto text-slate-300"
                />

                <p className="mt-3 text-sm font-semibold text-slate-500">
                  No PDFs found
                </p>

              </div>

            ) : (

              <div className="space-y-2">

                {filteredDocuments.map(
                  (document) => (

                    <DocumentCard
                      key={document.id}
                      document={document}
                      active={
                        selectedDocument?.id ===
                        document.id
                      }
                      onClick={() =>
                        setSelectedDocument(
                          document
                        )
                      }
                      onDelete={() =>
                        deleteDocument(
                          document.id
                        )
                      }
                    />

                  )
                )}

              </div>

            )}

          </div>

        </motion.section>


        {/* =================================================
            SUMMARY PANEL
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
            delay: 0.25,
          }}
          className="rounded-3xl border border-slate-200 bg-white shadow-sm lg:col-span-3"
        >

          {selectedDocument ? (

            <>

              {/* Summary Header */}

              <div className="border-b border-slate-100 p-5">

                <div className="flex items-start justify-between gap-4">

                  <div className="flex min-w-0 items-start gap-3">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-500">

                      <FileText size={21} />

                    </div>


                    <div className="min-w-0">

                      <h2 className="truncate text-base font-bold text-slate-900">
                        {selectedDocument.name}
                      </h2>

                      <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-400">

                        <span>
                          {selectedDocument.size}
                        </span>

                        <span>•</span>

                        <span>
                          {selectedDocument.pages} pages
                        </span>

                        <span>•</span>

                        <span>
                          {selectedDocument.date}
                        </span>

                      </div>

                    </div>

                  </div>


                  {/* Actions */}

                  <div className="flex shrink-0 items-center gap-1">

                    <button
                      onClick={() =>
                        setShowViewer(true)
                      }
                      disabled={
                        !selectedDocument.summary
                      }
                      className="rounded-xl p-2 text-slate-400 transition hover:bg-indigo-50 hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-40"
                      title="View"
                    >
                      <Eye size={18} />
                    </button>


                    <button
                      onClick={() => {

                        setEditing(true);

                        setEditedSummary(
                          selectedDocument.summary
                        );

                      }}
                      disabled={
                        !selectedDocument.summary
                      }
                      className="rounded-xl p-2 text-slate-400 transition hover:bg-indigo-50 hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-40"
                      title="Edit summary"
                    >
                      <Edit3 size={17} />
                    </button>


                    <button
                      onClick={downloadSummary}
                      disabled={
                        !selectedDocument.summary
                      }
                      className="rounded-xl p-2 text-slate-400 transition hover:bg-indigo-50 hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-40"
                      title="Download"
                    >
                      <Download size={18} />
                    </button>


                    <button
                      onClick={() =>
                        deleteDocument(
                          selectedDocument.id
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


              {/* Summary Body */}

              <div className="p-5 sm:p-6">

                {selectedDocument.status ===
                "Completed" ? (

                  <>

                    {/* AI Header */}

                    <div className="flex items-center justify-between">

                      <div className="flex items-center gap-2">

                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white">

                          <Sparkles size={16} />

                        </div>

                        <div>

                          <p className="text-sm font-bold text-slate-900">
                            AI Generated Summary
                          </p>

                          <p className="text-[11px] text-slate-400">
                            Generated by AI StudyMate
                          </p>

                        </div>

                      </div>


                      <div className="flex items-center gap-1">

                        <button
                          onClick={copySummary}
                          className="flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-indigo-600"
                        >

                          {copied ? (
                            <Check size={14} />
                          ) : (
                            <Copy size={14} />
                          )}

                          {copied
                            ? "Copied"
                            : "Copy"}

                        </button>

                      </div>

                    </div>


                    {/* Summary */}

                    {editing ? (

                      <div className="mt-5">

                        <textarea
                          value={editedSummary}
                          onChange={(e) =>
                            setEditedSummary(
                              e.target.value
                            )
                          }
                          rows={9}
                          className="w-full resize-none rounded-2xl border border-indigo-200 bg-indigo-50/40 p-4 text-sm leading-7 text-slate-700 outline-none focus:ring-4 focus:ring-indigo-50"
                        />


                        <div className="mt-3 flex justify-end gap-2">

                          <button
                            onClick={() =>
                              setEditing(false)
                            }
                            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                          >
                            Cancel
                          </button>


                          <button
                            onClick={saveSummary}
                            className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                          >
                            Save Changes
                          </button>

                        </div>

                      </div>

                    ) : (

                      <div className="mt-5 rounded-2xl bg-slate-50 p-5">

                        <p className="whitespace-pre-line text-sm leading-7 text-slate-600">
                          {selectedDocument.summary}
                        </p>

                      </div>

                    )}


                    {/* Key Information */}

                    <div className="mt-5 grid gap-3 sm:grid-cols-3">

                      <InfoBox
                        label="Document"
                        value="PDF"
                      />

                      <InfoBox
                        label="Pages"
                        value={
                          selectedDocument.pages
                        }
                      />

                      <InfoBox
                        label="Status"
                        value="Ready"
                      />

                    </div>

                  </>

                ) : (

                  /* Not Summarized */

                  <div className="flex min-h-[350px] flex-col items-center justify-center text-center">

                    <motion.div
                      animate={{
                        y: [0, -5, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                      }}
                      className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 text-indigo-600"
                    >

                      {summarizing ? (
                        <Loader2
                          size={27}
                          className="animate-spin"
                        />
                      ) : (
                        <Sparkles size={27} />
                      )}

                    </motion.div>


                    <h3 className="mt-5 text-lg font-bold text-slate-900">

                      {summarizing
                        ? "AI is analyzing your PDF..."
                        : "Ready to summarize"}

                    </h3>


                    <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">

                      {summarizing
                        ? "We're extracting important concepts and creating an easy-to-understand summary."
                        : "Generate an AI-powered summary containing the key concepts, important points, and useful information from this document."}

                    </p>


                    {summarizing ? (

                      <div className="mt-6 w-full max-w-sm">

                        <div className="h-2 overflow-hidden rounded-full bg-slate-100">

                          <motion.div
                            initial={{
                              width: "0%",
                            }}
                            animate={{
                              width: "100%",
                            }}
                            transition={{
                              duration: 1.7,
                            }}
                            className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-purple-600"
                          />

                        </div>

                      </div>

                    ) : (

                      <button
                        onClick={generateSummary}
                        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:shadow-xl"
                      >

                        <Sparkles size={17} />

                        Generate AI Summary

                      </button>

                    )}

                  </div>

                )}

              </div>

            </>

          ) : (

            /* No Document */

            <div className="flex min-h-[500px] flex-col items-center justify-center p-8 text-center">

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">

                <FileText size={28} />

              </div>

              <h2 className="mt-5 text-xl font-black text-slate-900">
                No PDF Selected
              </h2>

              <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                Upload a PDF document to start creating your AI-powered summary.
              </p>

            </div>

          )}

        </motion.section>

      </div>


      {/* =================================================
          PDF VIEWER MODAL
      ================================================= */}

      <AnimatePresence>

        {showViewer &&
          selectedDocument && (

            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
            >

              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.95,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.95,
                  y: 20,
                }}
                className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl"
              >

                {/* Modal Header */}

                <div className="flex items-center justify-between border-b border-slate-100 p-5">

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">

                      <Sparkles size={18} />

                    </div>

                    <div>

                      <h2 className="font-bold text-slate-900">
                        Summary Preview
                      </h2>

                      <p className="text-xs text-slate-400">
                        {selectedDocument.name}
                      </p>

                    </div>

                  </div>


                  <button
                    onClick={() =>
                      setShowViewer(false)
                    }
                    className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                  >
                    <X size={20} />
                  </button>

                </div>


                {/* Modal Content */}

                <div className="overflow-y-auto p-6">

                  <div className="rounded-2xl bg-slate-50 p-6">

                    <div className="mb-5 flex items-center gap-2">

                      <Sparkles
                        size={17}
                        className="text-indigo-600"
                      />

                      <h3 className="font-bold text-slate-900">
                        AI Summary
                      </h3>

                    </div>


                    <p className="whitespace-pre-line text-sm leading-7 text-slate-600">
                      {selectedDocument.summary}
                    </p>

                  </div>

                </div>


                {/* Modal Footer */}

                <div className="flex justify-end gap-2 border-t border-slate-100 p-4">

                  <button
                    onClick={copySummary}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                  >

                    <Copy size={15} />

                    Copy

                  </button>


                  <button
                    onClick={downloadSummary}
                    className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
                  >

                    <Download size={15} />

                    Download

                  </button>

                </div>

              </motion.div>

            </motion.div>

          )}

      </AnimatePresence>

    </div>
  );
}


/* =====================================================
   DOCUMENT CARD
===================================================== */

function DocumentCard({
  document,
  active,
  onClick,
  onDelete,
}) {

  return (
    <motion.div
      layout
      whileHover={{
        y: -2,
      }}
      className={`group relative rounded-2xl border p-3 transition ${
        active
          ? "border-indigo-200 bg-indigo-50/60"
          : "border-transparent hover:border-slate-200 hover:bg-slate-50"
      }`}
    >

      <button
        onClick={onClick}
        className="flex w-full items-center gap-3 text-left"
      >

        {/* PDF Icon */}

        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
            active
              ? "bg-indigo-600 text-white"
              : "bg-red-50 text-red-500"
          }`}
        >

          <FileText size={19} />

        </div>


        {/* Information */}

        <div className="min-w-0 flex-1">

          <div className="flex items-center gap-2">

            <p className="truncate text-sm font-bold text-slate-800">
              {document.name}
            </p>

          </div>


          <div className="mt-1 flex items-center gap-2 text-[11px] text-slate-400">

            <span>
              {document.size}
            </span>

            <span>•</span>

            <span>
              {document.pages} pages
            </span>

          </div>


          <div className="mt-2">

            <Status status={document.status} />

          </div>

        </div>


        <ChevronRight
          size={17}
          className={`shrink-0 ${
            active
              ? "text-indigo-500"
              : "text-slate-300"
          }`}
        />

      </button>


      {/* Delete */}

      <button
        onClick={(event) => {

          event.stopPropagation();

          onDelete();

        }}
        className="absolute right-8 top-2 hidden rounded-lg p-1.5 text-slate-300 hover:bg-red-50 hover:text-red-500 group-hover:block"
      >

        <Trash2 size={13} />

      </button>

    </motion.div>
  );
}


/* =====================================================
   STATUS
===================================================== */

function Status({ status }) {

  const styles = {

    Completed:
      "bg-green-50 text-green-600",

    Processing:
      "bg-amber-50 text-amber-600",

    Uploaded:
      "bg-indigo-50 text-indigo-600",

  };


  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-semibold ${styles[status] || "bg-slate-100 text-slate-500"}`}
    >

      {status === "Completed" && (
        <CheckCircle2 size={11} />
      )}

      {status === "Processing" && (
        <Loader2
          size={11}
          className="animate-spin"
        />
      )}

      {status}

    </span>
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


/* =====================================================
   INFO BOX
===================================================== */

function InfoBox({
  label,
  value,
}) {

  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">

      <p className="text-[11px] text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-bold text-slate-700">
        {value}
      </p>

    </div>
  );
}


export default PDFSummary;