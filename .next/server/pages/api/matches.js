"use strict";
(() => {
var exports = {};
exports.id = 442;
exports.ids = [442];
exports.modules = {

/***/ 405:
/***/ ((module) => {

module.exports = import("langchain/embeddings/openai");;

/***/ }),

/***/ 230:
/***/ ((module) => {

module.exports = import("langchain/vectorstores/supabase");;

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
var __webpack_exports__ = (__webpack_exec__(52));
module.exports = __webpack_exports__;

})();