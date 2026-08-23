import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  Plus,
  Search,
  Trash2,
  MoreHorizontal,
  Send,
  Sparkles,
  User,
  Bot,
  Copy,
  ThumbsUp,
  ThumbsDown,
  Paperclip,
  Mic,
  Menu,
  X,
  BookOpen,
  Clock,
} from "lucide-react";


/* =====================================================
   SAMPLE CHAT HISTORY
===================================================== */

const initialChats = [
  {
    id: 1,
    title: "React Hooks Explanation",
    preview: "Can you explain useEffect...",
    time: "Today",
  },
  {
    id: 2,
    title: "JavaScript Promises",
    preview: "What is async and await...",
    time: "Today",
  },
  {
    id: 3,
    title: "MERN Interview Preparation",
    preview: "Give me some React interview...",
    time: "Yesterday",
  },
  {
    id: 4,
    title: "Database Normalization",
    preview: "Explain 1NF, 2NF and 3NF...",
    time: "Yesterday",
  },
  {
    id: 5,
    title: "JavaScript Array Methods",
    preview: "Explain map, filter and find...",
    time: "2 days ago",
  },
];


/* =====================================================
   SAMPLE MESSAGES
===================================================== */

const initialMessages = [
  {
    id: 1,
    role: "assistant",
    content:
      "Hello Rahul! 👋 I'm your AI StudyMate. I can help you understand concepts, summarize topics, prepare for interviews, solve coding problems, and create study plans.",
    time: "10:32 AM",
  },
  {
    id: 2,
    role: "user",
    content:
      "Can you explain React useEffect in simple terms?",
    time: "10:33 AM",
  },
  {
    id: 3,
    role: "assistant",
    content:
      "Of course! Think of useEffect as a way to tell React: \"After the component renders, perform this task.\" It is commonly used for API calls, timers, event listeners, and other side effects.\n\nFor example, you can use useEffect to fetch student data when a page loads.",
    time: "10:33 AM",
  },
];


/* =====================================================
   SUGGESTED PROMPTS
===================================================== */

const suggestedPrompts = [
  "Explain React Hooks",
  "Give me a JavaScript coding question",
  "Create a study plan for today",
  "Prepare me for a MERN interview",
];


/* =====================================================
   MAIN COMPONENT
===================================================== */

function AIChat() {

  const [chats, setChats] = useState(initialChats);

  const [messages, setMessages] = useState(initialMessages);

  const [input, setInput] = useState("");

  const [activeChat, setActiveChat] = useState(1);

  const [isTyping, setIsTyping] = useState(false);

  const [showSidebar, setShowSidebar] = useState(false);


  /* =====================================================
     SEND MESSAGE
  ===================================================== */

  const sendMessage = (text = input) => {

    const messageText = text.trim();

    if (!messageText) return;


    const userMessage = {
      id: Date.now(),
      role: "user",
      content: messageText,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };


    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    setInput("");

    setIsTyping(true);


    /* Temporary AI response */

    setTimeout(() => {

      const aiMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content:
          "That's a great question! I'm processing your request. Once the AI API is connected, I'll provide a personalized answer based on your study requirements.",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };


      setMessages((prev) => [
        ...prev,
        aiMessage,
      ]);

      setIsTyping(false);

    }, 1200);

  };


  /* =====================================================
     NEW CHAT
  ===================================================== */

  const createNewChat = () => {

    const newChat = {
      id: Date.now(),
      title: "New Conversation",
      preview: "Start a new conversation...",
      time: "Now",
    };


    setChats((prev) => [
      newChat,
      ...prev,
    ]);

    setActiveChat(newChat.id);

    setMessages([]);

    setInput("");

    setShowSidebar(false);

  };


  /* =====================================================
     DELETE CHAT
  ===================================================== */

  const deleteChat = (id) => {

    setChats((prev) =>
      prev.filter((chat) => chat.id !== id)
    );


    if (activeChat === id) {

      setActiveChat(null);

      setMessages([]);

    }

  };


  /* =====================================================
     SELECT CHAT
  ===================================================== */

  const selectChat = (id) => {

    setActiveChat(id);

    setShowSidebar(false);

    /*
      Later we will fetch messages
      from MongoDB using the chat ID.
    */

  };


  return (
    <div className="relative flex h-[calc(100vh-64px)] overflow-hidden bg-slate-50">


      {/* =================================================
          MOBILE OVERLAY
      ================================================= */}

      <AnimatePresence>

        {showSidebar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSidebar(false)}
            className="fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-sm lg:hidden"
          />
        )}

      </AnimatePresence>


      {/* =================================================
          CHAT SIDEBAR
      ================================================= */}

      <motion.aside
        initial={false}
        animate={{
          x: showSidebar ? 0 : undefined,
        }}
        className={`
          fixed bottom-0 left-0 top-16 z-40
          flex w-[290px] flex-col
          border-r border-slate-200
          bg-white
          lg:static lg:z-auto lg:flex
          ${showSidebar ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >

        {/* Sidebar Header */}

        <div className="border-b border-slate-100 p-4">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-xs font-bold tracking-wider text-indigo-600">
                AI STUDYMATE
              </p>

              <h2 className="mt-1 text-lg font-black text-slate-900">
                Conversations
              </h2>

            </div>


            <button
              onClick={() => setShowSidebar(false)}
              className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 lg:hidden"
            >
              <X size={19} />
            </button>

          </div>


          {/* New Chat */}

          <button
            onClick={createNewChat}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-100 transition hover:-translate-y-0.5 hover:shadow-xl"
          >

            <Plus size={17} />

            New Chat

          </button>


          {/* Search */}

          <div className="relative mt-3">

            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-2 focus:ring-indigo-100"
            />

          </div>

        </div>


        {/* Chat History */}

        <div className="flex-1 overflow-y-auto p-3">

          <p className="mb-2 px-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Recent Chats
          </p>


          <div className="space-y-1">

            {chats.map((chat) => (

              <motion.div
                key={chat.id}
                layout
                className={`group relative rounded-xl transition ${
                  activeChat === chat.id
                    ? "bg-indigo-50"
                    : "hover:bg-slate-50"
                }`}
              >

                <button
                  onClick={() => selectChat(chat.id)}
                  className="w-full px-3 py-3 text-left"
                >

                  <div className="flex items-start gap-3">

                    <div
                      className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                        activeChat === chat.id
                          ? "bg-indigo-600 text-white"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >

                      <MessageCircle size={15} />

                    </div>


                    <div className="min-w-0 flex-1">

                      <p
                        className={`truncate text-sm font-semibold ${
                          activeChat === chat.id
                            ? "text-indigo-700"
                            : "text-slate-700"
                        }`}
                      >
                        {chat.title}
                      </p>

                      <p className="mt-1 truncate text-xs text-slate-400">
                        {chat.preview}
                      </p>

                    </div>

                  </div>

                </button>


                {/* Delete */}

                <button
                  onClick={() => deleteChat(chat.id)}
                  className="absolute right-2 top-3 hidden rounded-lg p-1.5 text-slate-300 hover:bg-red-50 hover:text-red-500 group-hover:block"
                >

                  <Trash2 size={14} />

                </button>

              </motion.div>

            ))}

          </div>

        </div>


        {/* Sidebar Footer */}

        <div className="border-t border-slate-100 p-4">

          <div className="flex items-center gap-3 rounded-xl bg-indigo-50 p-3">

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-white">
              <Sparkles size={17} />
            </div>

            <div>

              <p className="text-xs font-bold text-indigo-700">
                AI Assistant
              </p>

              <p className="text-[11px] text-indigo-500">
                Ready to help you learn
              </p>

            </div>

            <span className="ml-auto h-2 w-2 rounded-full bg-green-500" />

          </div>

        </div>

      </motion.aside>


      {/* =================================================
          MAIN CHAT
      ================================================= */}

      <main className="flex min-w-0 flex-1 flex-col">


        {/* Chat Header */}

        <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur-xl sm:px-6">

          <div className="flex items-center gap-3">

            {/* Mobile Sidebar */}

            <button
              onClick={() => setShowSidebar(true)}
              className="rounded-xl p-2 text-slate-600 transition hover:bg-slate-100 lg:hidden"
            >

              <Menu size={20} />

            </button>


            {/* AI Avatar */}

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-100">

              <Sparkles size={19} />

            </div>


            <div>

              <div className="flex items-center gap-2">

                <h1 className="text-sm font-bold text-slate-900 sm:text-base">
                  AI StudyMate
                </h1>

                <span className="rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-semibold text-green-600">
                  Online
                </span>

              </div>

              <p className="hidden text-xs text-slate-400 sm:block">
                Your personal AI learning assistant
              </p>

            </div>

          </div>


          {/* Header Actions */}

          <div className="flex items-center gap-1">

            <button
              className="rounded-xl p-2.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
              title="More options"
            >
              <MoreHorizontal size={19} />
            </button>

          </div>

        </header>


        {/* =================================================
            MESSAGES
        ================================================= */}

        <div className="flex-1 overflow-y-auto">

          <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6">

            {messages.length === 0 ? (

              /* Empty Chat */

              <EmptyChat
                onPromptClick={sendMessage}
                createNewChat={createNewChat}
              />

            ) : (

              <div className="space-y-6">

                {messages.map((message) => (

                  <ChatMessage
                    key={message.id}
                    message={message}
                  />

                ))}


                {/* Typing */}

                <AnimatePresence>

                  {isTyping && (
                    <motion.div
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
                      }}
                      className="flex items-start gap-3"
                    >

                      <AIAvatar />

                      <div className="rounded-2xl rounded-tl-md border border-slate-200 bg-white px-5 py-4 shadow-sm">

                        <div className="flex items-center gap-1.5">

                          <span className="h-2 w-2 animate-bounce rounded-full bg-indigo-400" />

                          <span
                            className="h-2 w-2 animate-bounce rounded-full bg-indigo-400"
                            style={{ animationDelay: "0.15s" }}
                          />

                          <span
                            className="h-2 w-2 animate-bounce rounded-full bg-indigo-400"
                            style={{ animationDelay: "0.3s" }}
                          />

                        </div>

                      </div>

                    </motion.div>
                  )}

                </AnimatePresence>

              </div>

            )}

          </div>

        </div>


        {/* =================================================
            INPUT AREA
        ================================================= */}

        <div className="shrink-0 border-t border-slate-200 bg-white/95 px-4 py-4 backdrop-blur-xl sm:px-6">

          <div className="mx-auto max-w-4xl">

            {/* Suggestions */}

            {messages.length > 0 && (
              <div className="mb-3 hidden gap-2 overflow-x-auto md:flex">

                {suggestedPrompts.slice(0, 3).map((prompt) => (

                  <button
                    key={prompt}
                    onClick={() => sendMessage(prompt)}
                    className="whitespace-nowrap rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-500 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                  >
                    {prompt}
                  </button>

                ))}

              </div>
            )}


            {/* Input Box */}

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-2 shadow-sm transition focus-within:border-indigo-300 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-50">

              <div className="flex items-end gap-2">

                {/* Attachment */}

                <button
                  className="mb-1 rounded-xl p-2.5 text-slate-400 transition hover:bg-white hover:text-indigo-600"
                  title="Attach file"
                >

                  <Paperclip size={19} />

                </button>


                {/* Text Input */}

                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {

                    if (
                      e.key === "Enter" &&
                      !e.shiftKey
                    ) {

                      e.preventDefault();

                      sendMessage();

                    }

                  }}
                  rows={1}
                  placeholder="Ask AI StudyMate anything..."
                  className="max-h-32 min-h-[44px] flex-1 resize-none bg-transparent px-2 py-2.5 text-sm text-slate-700 outline-none placeholder:text-slate-400"
                />


                {/* Voice */}

                <button
                  className="mb-1 hidden rounded-xl p-2.5 text-slate-400 transition hover:bg-white hover:text-indigo-600 sm:block"
                  title="Voice input"
                >

                  <Mic size={19} />

                </button>


                {/* Send */}

                <motion.button
                  whileTap={{
                    scale: 0.92,
                  }}
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || isTyping}
                  className={`mb-1 flex h-11 w-11 items-center justify-center rounded-xl transition ${
                    input.trim() && !isTyping
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-200 hover:shadow-lg"
                      : "bg-slate-200 text-slate-400"
                  }`}
                >

                  <Send size={18} />

                </motion.button>

              </div>

            </div>


            <p className="mt-2 text-center text-[10px] text-slate-400">
              AI StudyMate may make mistakes. Verify important information.
            </p>

          </div>

        </div>

      </main>

    </div>
  );
}


/* =====================================================
   EMPTY CHAT
===================================================== */

function EmptyChat({
  onPromptClick,
  createNewChat,
}) {

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="flex min-h-[55vh] flex-col items-center justify-center text-center"
    >

      {/* AI Logo */}

      <motion.div
        animate={{
          y: [0, -6, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-xl shadow-indigo-200"
      >

        <Sparkles size={34} />

        <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-green-400 ring-4 ring-white" />

      </motion.div>


      <h2 className="mt-7 text-2xl font-black text-slate-900 sm:text-3xl">
        How can I help you learn?
      </h2>


      <p className="mt-3 max-w-lg text-sm leading-6 text-slate-500">
        Ask questions, explain difficult concepts, practice coding,
        summarize topics, or prepare for your next interview.
      </p>


      {/* Suggestions */}

      <div className="mt-8 grid w-full max-w-2xl gap-3 sm:grid-cols-2">

        {suggestedPrompts.map((prompt, index) => (

          <motion.button
            key={prompt}
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: index * 0.08,
            }}
            onClick={() => onPromptClick(prompt)}
            className="group rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-100/40"
          >

            <div className="flex items-center justify-between">

              <span className="text-sm font-semibold text-slate-700 transition group-hover:text-indigo-600">
                {prompt}
              </span>

              <ArrowRight
                size={15}
                className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-indigo-600"
              />

            </div>

          </motion.button>

        ))}

      </div>


      <button
        onClick={createNewChat}
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
      >

        <Plus size={16} />

        Start a new conversation

      </button>

    </motion.div>
  );
}


/* =====================================================
   CHAT MESSAGE
===================================================== */

function ChatMessage({ message }) {

  const isUser = message.role === "user";


  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 12,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.3,
      }}
      className={`flex items-start gap-3 ${
        isUser ? "flex-row-reverse" : ""
      }`}
    >

      {/* Avatar */}

      {isUser ? (
        <UserAvatar />
      ) : (
        <AIAvatar />
      )}


      <div
        className={`max-w-[85%] sm:max-w-[75%] ${
          isUser ? "items-end" : "items-start"
        }`}
      >

        {/* Message */}

        <div
          className={`whitespace-pre-line rounded-2xl px-4 py-3 text-sm leading-6 ${
            isUser
              ? "rounded-tr-md bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-100"
              : "rounded-tl-md border border-slate-200 bg-white text-slate-700 shadow-sm"
          }`}
        >
          {message.content}
        </div>


        {/* Time + Actions */}

        <div
          className={`mt-1.5 flex items-center gap-2 ${
            isUser
              ? "justify-end"
              : "justify-start"
          }`}
        >

          <span className="text-[10px] text-slate-400">
            {message.time}
          </span>


          {!isUser && (
            <div className="flex items-center gap-0.5">

              <button
                className="rounded-md p-1 text-slate-300 hover:bg-slate-100 hover:text-slate-500"
                title="Copy"
              >
                <Copy size={12} />
              </button>

              <button
                className="rounded-md p-1 text-slate-300 hover:bg-slate-100 hover:text-green-500"
                title="Helpful"
              >
                <ThumbsUp size={12} />
              </button>

              <button
                className="rounded-md p-1 text-slate-300 hover:bg-slate-100 hover:text-red-500"
                title="Not helpful"
              >
                <ThumbsDown size={12} />
              </button>

            </div>
          )}

        </div>

      </div>

    </motion.div>
  );
}


/* =====================================================
   AI AVATAR
===================================================== */

function AIAvatar() {

  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-100">

      <Sparkles size={17} />

    </div>
  );
}


/* =====================================================
   USER AVATAR
===================================================== */

function UserAvatar() {

  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">

      <User size={17} />

    </div>
  );
}


export default AIChat;