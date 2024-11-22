import { useEffect } from "react";
import SentenceCard from "./sentenceCard";
import { Sentence } from "types/supabase";
import { useSentenceStore } from "@/store/sentence";

export default function SentenceList() {
    const sentences = useSentenceStore((state) => state.filterSentences());
    const fetchSentences = useSentenceStore((state) => state.fetchSentences);

    useEffect(() => {
        fetchSentences();
    }, []);

    return (
        <>
            {sentences.map((sentenceData: Sentence) => (
                <SentenceCard
                    key={sentenceData.id}
                    id={sentenceData.id}
                    sentence={sentenceData.content}
                    translation={sentenceData.translation}
                    createdAt={sentenceData.created_at ? new Date(sentenceData.created_at) : new Date()}
                    dueDate={sentenceData.next_review_at ? new Date(sentenceData.next_review_at) : new Date()}
                    status={sentenceData.status}
                />
            ))}
        </>
    );
}
