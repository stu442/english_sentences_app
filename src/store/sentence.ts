import { supabase } from "@/utils/supabase";
import { Sentence, SentenceUpdate } from "types/supabase";
import { create } from "zustand";

interface SentenceStore {
    sentences: Sentence[];
    filter: number;
    setFilter: (filter: number) => void;
    filterSentences: () => Sentence[];
    setSentences: (sentences: Sentence[]) => void;
    addSentence: (sentence: Sentence) => void;
    deleteSentence: (id: string) => Promise<void>;
    updateSentence: (sentence: SentenceUpdate) => Promise<void>;
    insertSentence: (sentence: Sentence) => Promise<void>;
    fetchSentences: () => Promise<void>;
}

export const useSentenceStore = create<SentenceStore>((set, get) => ({
    sentences: [],
    filter: 3,
    setFilter: (filter: number) => set({ filter }),
    filterSentences: () => {
        const { sentences, filter } = get();
        if (filter === 3) return sentences;
        return sentences.filter((sentence) => sentence.status === filter);
    },
    setSentences: (sentences: Sentence[]) => set({ sentences }),
    addSentence: (sentence: Sentence) => set((state) => ({ sentences: [...state.sentences, sentence] })),
    fetchSentences: async () => {
        try {
            const { data, error } = await supabase.from('sentences').select('*');
            if (error) throw error;
            set({ sentences: data });
        } catch (error) {
            console.error('문장 목록을 가져오는데 실패했습니다:', error);
            throw error;
        }
    },
    deleteSentence: async (id: string) => {
        try {
            const { error } = await supabase.from('sentences').delete().eq('id', id);
            if (error) throw error;
            set((state) => ({ sentences: state.sentences.filter((sentence) => sentence.id !== id) }));
        } catch (error) {
            console.error('문장을 삭제하는데 실패했습니다:', error);
            throw error;
        }
    },
    updateSentence: async (sentence: SentenceUpdate) => {
        try {
            if (!sentence.id) throw new Error('ID가 필요합니다');
            
            const { data, error } = await supabase
                .from('sentences')
                .update(sentence)
                .eq('id', sentence.id)
                .select();

            if (error) throw error;
            if (!data || data.length === 0) throw new Error('업데이트된 데이터를 찾을 수 없습니다');

            set((state) => ({
                sentences: state.sentences.map((s) => 
                    s.id === sentence.id ? {...s, ...data[0]} : s
                )
            }));
        } catch (error) {
            console.error('문장을 업데이트하는데 실패했습니다:', error);
            throw error;
        }
    },
    insertSentence: async (sentence: Sentence) => {
        try {
            const { data, error } = await supabase.from('sentences').insert(sentence).select();
            if (error) throw error;
            set((state) => ({ sentences: [...state.sentences, data[0]] }));
        } catch (error) {
            console.error('새로운 문장을 추가하는데 실패했습니다:', error);
            throw error;
        }
    },
}));