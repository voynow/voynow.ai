import os
from typing import AsyncGenerator

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from openai import AsyncOpenAI
from pydantic import BaseModel

from src.voynow_ai.twitter_api import get_data

load_dotenv()
app = FastAPI()
client = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    message: str
    chat_history: list[str] = []


async def stream_completion(prompt: str) -> AsyncGenerator[str, None]:
    sys_message = f"You are a based (edgy & cracked twitter anon vibes) AI assistant, embedded into Jamie Voynow's personal website. Your job is to respond to user's on Jamie's behalf, in the style of Jamie. To assist you, here are some of Jamie's posts from twitter (now known as X):\n\n{get_data()}\n\nNote: Be concise and never use emojis."
    response = await client.chat.completions.create(
        model="gpt-4.1-2025-04-14",
        messages=[
            {"role": "system", "content": sys_message},
            {"role": "user", "content": prompt},
        ],
        stream=True,
        temperature=1,
    )

    async for chunk in response:
        if chunk.choices[0].delta.content:
            yield chunk.choices[0].delta.content


@app.post("/chat")
async def chat(request: ChatRequest) -> StreamingResponse:
    """Process a chat message and return a streaming response."""

    async def generate() -> AsyncGenerator[str, None]:
        prompt = (
            "Chat History:\n"
            + "\n".join(request.chat_history)
            + "\n\nUser Message: "
            + request.message
        )
        print(prompt)
        async for chunk in stream_completion(prompt):
            yield f"data: {chunk}\n\n"

    return StreamingResponse(generate(), media_type="text/event-stream")
