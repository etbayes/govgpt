"use strict";
(() => {
var exports = {};
exports.id = 170;
exports.ids = [170,983,442];
exports.modules = {

/***/ 1:
/***/ ((module) => {

module.exports = require("@supabase/auth-helpers-nextjs");

/***/ }),

/***/ 885:
/***/ ((module) => {

module.exports = require("@supabase/supabase-js");

/***/ }),

/***/ 886:
/***/ ((module) => {

module.exports = import("langchain/callbacks");;

/***/ }),

/***/ 360:
/***/ ((module) => {

module.exports = import("langchain/chains");;

/***/ }),

/***/ 490:
/***/ ((module) => {

module.exports = import("langchain/chat_models/openai");;

/***/ }),

/***/ 405:
/***/ ((module) => {

module.exports = import("langchain/embeddings/openai");;

/***/ }),

/***/ 561:
/***/ ((module) => {

module.exports = import("langchain/llms/openai");;

/***/ }),

/***/ 459:
/***/ ((module) => {

module.exports = import("langchain/prompts");;

/***/ }),

/***/ 230:
/***/ ((module) => {

module.exports = import("langchain/vectorstores/supabase");;

/***/ }),

/***/ 300:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var langchain_callbacks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(886);
/* harmony import */ var langchain_chains__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(360);
/* harmony import */ var langchain_chat_models_openai__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(490);
/* harmony import */ var langchain_llms_openai__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(561);
/* harmony import */ var langchain_prompts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(459);
/* harmony import */ var _supabase_auth_helpers_nextjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1);
/* harmony import */ var _supabase_auth_helpers_nextjs__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_supabase_auth_helpers_nextjs__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _conversationLog__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(367);
/* harmony import */ var _matches__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(52);
/* harmony import */ var _templates__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(22);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([langchain_callbacks__WEBPACK_IMPORTED_MODULE_0__, langchain_chains__WEBPACK_IMPORTED_MODULE_1__, langchain_chat_models_openai__WEBPACK_IMPORTED_MODULE_2__, langchain_llms_openai__WEBPACK_IMPORTED_MODULE_3__, langchain_prompts__WEBPACK_IMPORTED_MODULE_4__, _matches__WEBPACK_IMPORTED_MODULE_7__]);
([langchain_callbacks__WEBPACK_IMPORTED_MODULE_0__, langchain_chains__WEBPACK_IMPORTED_MODULE_1__, langchain_chat_models_openai__WEBPACK_IMPORTED_MODULE_2__, langchain_llms_openai__WEBPACK_IMPORTED_MODULE_3__, langchain_prompts__WEBPACK_IMPORTED_MODULE_4__, _matches__WEBPACK_IMPORTED_MODULE_7__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);









const llm = new langchain_llms_openai__WEBPACK_IMPORTED_MODULE_3__.OpenAI({});
const handleRequest = async ({ prompt , userId , supabaseAuthedClient  })=>{
    try {
        const channel = supabaseAuthedClient.channel(userId);
        const { data  } = await supabaseAuthedClient.from("conversations").insert({
            speaker: "ai",
            user_id: userId
        }).select().single().throwOnError();
        const interactionId = data?.id;
        // Retrieve the conversation log and save the user's prompt
        const conversationLog = new _conversationLog__WEBPACK_IMPORTED_MODULE_6__.ConversationLog(userId);
        const conversationHistory = await conversationLog.getConversation({
            limit: 5
        });
        await conversationLog.addEntry({
            entry: prompt,
            speaker: "user"
        });
        // Add logic for inquiryChain to improve the user prompt
        const inquiryChain = new langchain_chains__WEBPACK_IMPORTED_MODULE_1__.LLMChain({
            llm,
            prompt: new langchain_prompts__WEBPACK_IMPORTED_MODULE_4__.PromptTemplate({
                template: _templates__WEBPACK_IMPORTED_MODULE_8__.templates.inquiryTemplate,
                inputVariables: [
                    "userPrompt",
                    "conversationHistory"
                ]
            })
        });
        const inquiryChainResult = await inquiryChain.call({
            userPrompt: prompt,
            conversationHistory
        });
        const inquiry = inquiryChainResult.text;
        console.log("Here is the conversation history: " + JSON.stringify(conversationHistory, null, 2));
        // const inquiry = prompt;
        channel.subscribe(async (status)=>{
            if (status === "SUBSCRIBED") {
                await channel.send({
                    type: "broadcast",
                    event: "chat",
                    payload: {
                        event: "status",
                        message: "Finding matches..."
                    }
                });
                const matches = await (0,_matches__WEBPACK_IMPORTED_MODULE_7__.getMatchesFromEmbeddings)(inquiry, supabaseAuthedClient, 2);
                const urls = matches && Array.from(new Set(matches.map((match)=>{
                    const metadata = match.metadata;
                    const { url  } = metadata;
                    return url;
                })));
                const promptTemplate = new langchain_prompts__WEBPACK_IMPORTED_MODULE_4__.PromptTemplate({
                    template: _templates__WEBPACK_IMPORTED_MODULE_8__.templates.qaTemplate,
                    inputVariables: [
                        "summaries",
                        "question",
                        "conversationHistory"
                    ]
                });
                let i = 0;
                const chat = new langchain_chat_models_openai__WEBPACK_IMPORTED_MODULE_2__.ChatOpenAI({
                    streaming: true,
                    verbose: true,
                    modelName: "gpt-3.5-turbo-16k",
                    callbackManager: langchain_callbacks__WEBPACK_IMPORTED_MODULE_0__.CallbackManager.fromHandlers({
                        async handleLLMNewToken (token) {
                            const text = token || "";
                            if (![
                                "I don't know",
                                "sorry",
                                "Ask another question"
                            ].some((el)=>text.toLowerCase().includes(el.toLowerCase()))) {
                                await channel.send({
                                    type: "broadcast",
                                    event: "chat",
                                    payload: {
                                        event: "response",
                                        token,
                                        interactionId
                                    }
                                });
                            }
                        },
                        async handleLLMEnd (result) {
                            // Store answer in DB
                            await supabaseAuthedClient.from("conversations").update({
                                entry: result.generations[0][0].text
                            }).eq("id", interactionId);
                            const text = result.generations[0][0].text;
                            let urlsToReturn = urls;
                            if ([
                                "I don't know",
                                "sorry",
                                "Ask another question"
                            ].some((el)=>text.toLowerCase().includes(el.toLowerCase()))) {
                                urlsToReturn = [
                                    "https://www.gov.uk/"
                                ];
                            }
                            // Here the change is made to send the content instead of the token
                            await channel.send({
                                type: "broadcast",
                                event: "chat",
                                payload: {
                                    event: "responseEnd",
                                    token: text,
                                    interactionId,
                                    urls: urlsToReturn
                                }
                            });
                        }
                    })
                });
                const chain = new langchain_chains__WEBPACK_IMPORTED_MODULE_1__.LLMChain({
                    prompt: promptTemplate,
                    llm: chat
                });
                const summary = matches.map((match)=>match.pageContent ? match.pageContent : "").join("\n");
                await chain.call({
                    summaries: summary,
                    question: prompt,
                    conversationHistory: conversationHistory
                });
            }
        });
    } catch (error) {
        //@ts-ignore
        console.error(error);
    }
};
async function handler(req, res) {
    // Create authenticated Supabase Client
    const supabase = (0,_supabase_auth_helpers_nextjs__WEBPACK_IMPORTED_MODULE_5__.createPagesServerClient)({
        req,
        res
    }, {
        options: {
            realtime: {
                params: {
                    eventsPerSecond: -1
                }
            }
        }
    });
    const { data: { session  }  } = await supabase.auth.getSession();
    if (!session) return res.status(401).json({
        error: "not_authenticated",
        description: "The user does not have an active session or is not authenticated"
    });
    const { body  } = req;
    const { prompt  } = body;
    await handleRequest({
        prompt,
        userId: session.user.id,
        supabaseAuthedClient: supabase
    });
    res.status(200).json({
        message: "started"
    });
}
{}
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 52:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getMatchesFromEmbeddings": () => (/* binding */ getMatchesFromEmbeddings)
/* harmony export */ });
/* harmony import */ var langchain_embeddings_openai__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(405);
/* harmony import */ var langchain_vectorstores_supabase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(230);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([langchain_embeddings_openai__WEBPACK_IMPORTED_MODULE_0__, langchain_vectorstores_supabase__WEBPACK_IMPORTED_MODULE_1__]);
([langchain_embeddings_openai__WEBPACK_IMPORTED_MODULE_0__, langchain_vectorstores_supabase__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);


const getMatchesFromEmbeddings = async (inquiry, client, topK)=>{
    const embeddings = new langchain_embeddings_openai__WEBPACK_IMPORTED_MODULE_0__.OpenAIEmbeddings();
    const store = new langchain_vectorstores_supabase__WEBPACK_IMPORTED_MODULE_1__.SupabaseVectorStore(embeddings, {
        client,
        tableName: "documents"
    });
    try {
        const queryResult = await store.similaritySearch(inquiry, topK);
        return queryResult.map((match)=>({
                ...match,
                metadata: match.metadata
            })) || [];
    } catch (e) {
        console.log("Error querying embeddings: ", e);
        throw new Error(`Error querying embeddings: ${e}`);
    }
};


__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [22,367], () => (__webpack_exec__(300)));
module.exports = __webpack_exports__;

})();