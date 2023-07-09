"use strict";
exports.id = 367;
exports.ids = [367];
exports.modules = {

/***/ 367:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "ConversationLog": () => (/* binding */ ConversationLog)
});

// EXTERNAL MODULE: external "@supabase/supabase-js"
var supabase_js_ = __webpack_require__(885);
;// CONCATENATED MODULE: ./src/utils/supabaseAdmin.ts

const supabasePrivateKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!supabasePrivateKey) throw new Error(`Expected env var SUPABASE_SERVICE_ROLE_KEY`);
const supabaseUrl = "https://mkwzpoqtzlftnpfctbsh.supabase.co";
if (!supabaseUrl) throw new Error(`Expected env var NEXT_PUBLIC_SUPABASE_URL`);
const supabaseAdminClient = (0,supabase_js_.createClient)(supabaseUrl, supabasePrivateKey, {
    auth: {
        persistSession: false
    },
    realtime: {
        params: {
            eventsPerSecond: -1
        }
    }
});


;// CONCATENATED MODULE: ./src/pages/api/conversationLog.ts

class ConversationLog {
    constructor(userId){
        this.userId = userId;
        this.userId = userId;
    }
    async addEntry({ entry , speaker  }) {
        try {
            await supabaseAdminClient.from("conversations").insert({
                user_id: this.userId,
                entry,
                speaker
            }).throwOnError();
        } catch (e) {
            console.log(`Error adding entry: ${e}`);
        }
    }
    async getConversation({ limit  }) {
        const { data: history  } = await supabaseAdminClient.from("conversations").select("entry, speaker, created_at").eq("user_id", this.userId).order("created_at", {
            ascending: false
        }).limit(limit).throwOnError();
        const response = history ? history.map((entry)=>{
            return `${entry.speaker.toUpperCase()}: ${entry.entry}`;
        }).reverse() : [];
        return response;
    }
    async clearConversation() {
        await supabaseAdminClient.from("conversations").delete().eq("user_id", this.userId).throwOnError();
    }
}



/***/ })

};
;