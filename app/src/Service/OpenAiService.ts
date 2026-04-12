import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OpenApi
});

export class OpenAiService {
    async analyseResume(resumetext: string, description: string) {
        const response = await openai.chat.completions.create({
            model: "gpt-4.1-mini",
            response_format: { type: "json_object" },
            messages: [
                {
                    role: "system",
                    content: "You are a professional ATS system."
                },
                {
                    role: "user",
                    content: `
    Analyze resume vs job.

    Resume:
    ${resumetext}

    Job:
    ${description}

    Return JSON:
    {
    "totalScore": number,
    "skillsScore": number,
    "projectsScore": number,
    "educationScore": number,
    "experienceScore": number,
    "feedback": "short summary"
    }
    `
                }
            ]
        });

        const text = response.choices[0]?.message?.content ?? "{}";
        return JSON.parse(text);
    }
}

