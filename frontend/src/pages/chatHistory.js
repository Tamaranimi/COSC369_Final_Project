/* ------------------------------------------------------------------------------------------
/* LOADING CHAT HISTORY */

export async function loadChatHistory({ addMessage, showPage, getChatHistory, getCurrentConversationId, setCurrentConversationId}) {
    
    const list = document.querySelector(".chat-history-list");
    if (!list) return;

    try {
        const res = await fetch("http://localhost:3001/api/conversations");
        if (!res.ok) throw new Error("Failed to fetch conversations");

        const conversations = await res.json();
        list.innerHTML = "";

        if (!conversations.length) {
            const empty = document.createElement("div");
            empty.textContent = "No conversations yet";
            empty.classList.add("empty-history");
            list.appendChild(empty);
            return;
        }

        conversations.forEach((c) => {
            const row = document.createElement("div");
            row.classList.add("history-row");
            row.dataset.id = c.id;

            const label = document.createElement("button");
            label.classList.add("history-label");
            label.textContent = c.title || "Untitled chat";

            const delBtn = document.createElement("button");
            delBtn.classList.add("delete-history-btn");
            delBtn.innerHTML = `<span class="material-icons">delete</span>`;

            row.addEventListener("click", () => {
                document
                    .querySelectorAll(".history-row")
                    .forEach((el) => el.classList.remove("active"));
                row.classList.add("active");

                loadConversation(c.id, c.title, {
                    addMessage,
                    showPage,
                    getChatHistory,
                    setCurrentConversationId,
                });
            });

            delBtn.addEventListener("click", async (e) => {
                e.stopPropagation();

                if (!confirm("Delete this conversation?")) return;

                try {
                    const res = await fetch(
                        `http://localhost:3001/api/conversations/${c.id}`,
                        { method: "DELETE" }
                    );

                    if (!res.ok && res.status !== 204) {
                        throw new Error("Failed to delete conversation");
                    }

                    if (getCurrentConversationId() === c.id) {
                        setCurrentConversationId(null);
                        getChatHistory().length = 0;
                        const msgs = document.getElementById("chat-messages");
                        if (msgs) msgs.innerHTML = "";
                    }

                    // Reload history after delete
                    loadChatHistory({
                        addMessage,
                        showPage,
                        getChatHistory,
                        getCurrentConversationId,
                        setCurrentConversationId,
                    });

                } catch (err) {
                    console.error("delete conversation error:", err);
                    alert("Sorry, something went wrong deleting this chat.");
                }

            });

            row.append(label, delBtn);
            list.appendChild(row);

        });

    } catch (err) {
        console.error("loadChatHistory error:", err);
    }
}



/* ------------------------------------------------------------------------------------------
/* LOADING SELECTED CHAT CONVERSTION */

export async function loadConversation( conversationId, title, { addMessage, showPage, getChatHistory, setCurrentConversationId }) {
  
    try {
        const res = await fetch(
            `http://localhost:3001/api/conversations/${conversationId}`
        );
        if (!res.ok) throw new Error("Failed to fetch conversation");

        const convo = await res.json();

        // Update current convo id
        setCurrentConversationId(convo.id);

        // Clear in-memory history
        const history = getChatHistory();
        history.length = 0;

        // Clear UI
        const container = document.getElementById("chat-messages");
        if (container) container.innerHTML = "";

        // Switch to chat page
        showPage("page-chat", title || "Chat");

        document
            .querySelectorAll(".nav-item[data-page]")
            .forEach((i) => i.classList.remove("active"));
        document
            .querySelector('.nav-item[data-page="page-chat"]')
            ?.classList.add("active");

        // Rebuild messages
        (convo.messages || []).forEach((m) => {
            addMessage(m.content, m.role === "assistant" ? "bot" : "user");
        });

    } catch (err) {
        console.error("loadConversation error:", err);
    }

}