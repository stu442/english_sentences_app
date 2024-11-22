import { useSentenceStore } from "@/store/sentence";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useState } from "react"

interface SentenceCardProps {
    key: string;
    sentence: string;
    translation: string | null;
    createdAt: Date;
    dueDate: Date;
    status: number;
    id: string;
}

export enum SentenceCardStatus {
    NEW = "new",
    COMPLETED = "completed",
    LEARNING = "learning",
}

export function getSentenceCardStatus(status: number): SentenceCardStatus {
    switch (status) {
        case 0: return SentenceCardStatus.NEW;
        case 1: return SentenceCardStatus.LEARNING;
        case 2: return SentenceCardStatus.COMPLETED;
        default: return SentenceCardStatus.NEW;
    }
}

export default function SentenceCard({ sentence, translation, createdAt, dueDate, status, id }: SentenceCardProps) {
    const [editedSentence, setEditedSentence] = useState(sentence);
    const [editedTranslation, setEditedTranslation] = useState(translation);
    const deleteSentence = useSentenceStore((state) => state.deleteSentence);
    const updateSentence = useSentenceStore((state) => state.updateSentence);

    const handleDelete = async () => {
        await deleteSentence(id);
    }

    const handleUpdate = async () => {
        await updateSentence({
            id,
            content: editedSentence,
            translation: editedTranslation,
        });
    }

    return (
        <Card key={id}>
            <CardHeader>
                <CardTitle>{sentence}</CardTitle>
                <CardDescription>{translation}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between">
                    <div>
                        <p>Due date: {dueDate.toLocaleDateString()}</p>
                        <p>Status: {getSentenceCardStatus(status)}</p>
                    </div>
                    {/* 카드 설정  */}
                    <DropdownMenu>
                        <DropdownMenuTrigger className="h-10">
                            <EllipsisVertical />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                        수정
                                    </DropdownMenuItem>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>문장 수정</DialogTitle>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-sm font-medium">문장</label>
                                            <Input 
                                                value={editedSentence} 
                                                onChange={(e) => setEditedSentence(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium">번역</label>
                                            <Input 
                                                value={editedTranslation || ''} 
                                                onChange={(e) => setEditedTranslation(e.target.value)}
                                            />
                                        </div>
                                        <Button onClick={handleUpdate}>저장</Button>
                                    </div>
                                </DialogContent>
                            </Dialog>
                            <DropdownMenuItem onClick={handleDelete}>삭제</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardContent>
        </Card>
    )
}
