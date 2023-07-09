import { CallbackManager } from "langchain/callbacks";
import { LLMChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  createPagesServerClient,
  SupabaseClient,
} from "@supabase/auth-helpers-nextjs";

import { ConversationLog } from "./conversationLog";
import { Metadata, getMatchesFromEmbeddings } from "./matches";
import { templates } from "./templates";

const llm = new OpenAI({});

const handleRequest = async ({
  prompt,
  userId,
  supabaseAuthedClient,
}: {
  prompt: string;
  userId: string;
  supabaseAuthedClient: SupabaseClient;
}) => {
  try {
    const channel = supabaseAuthedClient.channel(userId);
    const { data } = await supabaseAuthedClient
      .from("conversations")
      .insert({ speaker: "ai", user_id: userId })
      .select()
      .single()
      .throwOnError();
    const interactionId = data?.id;

    // Retrieve the conversation log and save the user's prompt
    const conversationLog = new ConversationLog(userId);
    const conversationHistory = await conversationLog.getConversation({
      limit: 5,
    });
    await conversationLog.addEntry({ entry: prompt, speaker: "user" });
    
    // Add logic for inquiryChain to improve the user prompt
const inquiryChain = new LLMChain({
  llm,
  prompt: new PromptTemplate({
    template: templates.inquiryTemplate,
    inputVariables: ["userPrompt", "conversationHistory"],
  }),
});
const inquiryChainResult = await inquiryChain.call({
  userPrompt: prompt,
  conversationHistory,
});
const inquiry: string = inquiryChainResult.text;

    console.log("Here is the conversation history: " + JSON.stringify(conversationHistory, null, 2));

    // const inquiry = prompt;

    channel.subscribe(async (status) => {
      if (status === "SUBSCRIBED") {
        await channel.send({
          type: "broadcast",
          event: "chat",
          payload: {
            event: "status",
            message: "Finding matches...",
          },
        });

        const matches = await getMatchesFromEmbeddings(
          inquiry,
          supabaseAuthedClient,
          2
        );

        

        const urls =
          matches &&
          Array.from(
            new Set(
              matches.map((match) => {
                const metadata = match.metadata as Metadata;
                const { url } = metadata;
                return url;
              })
            )
          );

       

        const promptTemplate = new PromptTemplate({
          template: templates.qaTemplate,
          inputVariables: [
            "summaries",
            "question",
            "conversationHistory",
          ],
        });

        let i = 0;
        const chat = new ChatOpenAI({
          streaming: true,
          verbose: true,
          modelName: "gpt-3.5-turbo-16k",
          callbackManager: CallbackManager.fromHandlers({
            async handleLLMNewToken(token) {
              const text = token || "";
              if (!["I don't know", "sorry", "Ask another question"].some(el => text.toLowerCase().includes(el.toLowerCase()))) {
                await channel.send({
                  type: "broadcast",
                  event: "chat",
                  payload: {
                    event: "response",
                    token,
                    interactionId,
                  },
                });
              }
            },
            async handleLLMEnd(result) {
              // Store answer in DB
              await supabaseAuthedClient
                .from("conversations")
                .update({ entry: result.generations[0][0].text })
                .eq("id", interactionId);
        
              const text = result.generations[0][0].text;
              let urlsToReturn = urls;
        
              if (["I don't know", "sorry", "Ask another question"].some(el => text.toLowerCase().includes(el.toLowerCase()))) {
                urlsToReturn = ["https://www.gov.uk/"];
              }              
              
              // Here the change is made to send the content instead of the token
              await channel.send({
                type: "broadcast",
                event: "chat",
                payload: {
                  event: "responseEnd",
                  token: text,
                  interactionId,
                  urls: urlsToReturn,
                },
              });
            },
          }),
        });
        

        const chain = new LLMChain({
          prompt: promptTemplate,
          llm: chat,
        });

        const summary = matches.map(match => match.pageContent ? match.pageContent : '').join("\n");

        await chain.call({
          summaries: summary,
          question: prompt,
          conversationHistory: conversationHistory,
        });
      }
    });
  } catch (error) {
    //@ts-ignore
    console.error(error);
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Create authenticated Supabase Client
  const supabase = createPagesServerClient(
    { req, res },
    {
      options: {
        realtime: {
          params: {
            eventsPerSecond: -1,
          },
        },
      },
    }
  );
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return res.status(401).json({
      error: "not_authenticated",
      description:
        "The user does not have an active session or is not authenticated",
    });

  const { body } = req;
  const { prompt } = body;
  await handleRequest({
    prompt,
    userId: session.user.id,
    supabaseAuthedClient: supabase,
  });
  res.status(200).json({ message: "started" });
}

{/* 

Here's an example of how to fix this:

const inquiryChainResult = await inquiryChain.call({
  userPrompt: prompt,
  conversationHistory,
});
const inquiry: string = inquiryChainResult.text;

console.log("Here is the conversation history: " + JSON.stringify(conversationHistory, null, 2));
// Removed the line: const inquiry = prompt;

Or:

const inquiryChainResult = await inquiryChain.call({
  userPrompt: prompt,
  conversationHistory,
});
// Removed the line: const inquiry: string = inquiryChainResult.text;

console.log("Here is the conversation history: " + JSON.stringify(conversationHistory, null, 2));

const inquiry = prompt;
You can pick either of these solutions based on whether you want inquiry to hold the value of inquiryChainResult.text or prompt.

*/}