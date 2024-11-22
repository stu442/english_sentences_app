import { useSentenceStore } from "@/store/sentence";
import { AddSentenceForm } from "../components/addSentenceForm";
import SentenceList from "../components/getSentences";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";


export default function ListPage() {
    const setFilter = useSentenceStore((state) => state.setFilter);

    return (
        <div className="flex flex-col gap-8 p-8">
            <h1 className="text-3xl font-bold">Sentence Management</h1>
            {/* 문장 추가 폼 */}
            <Card>
                <CardHeader className="text-lg font-bold">Add New Sentence</CardHeader>
                <CardContent>
                    <AddSentenceForm />
                </CardContent>
            </Card>
            {/* TODO : 필터 */}
            <div className="flex gap-2 w-1/4">
                <Select defaultValue="3" onValueChange={(value) => setFilter(parseInt(value))}>
                    <SelectTrigger>
                        <SelectValue placeholder="status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="3">All</SelectItem>
                        <SelectItem value="1">New</SelectItem>
                        <SelectItem value="2">Learning</SelectItem>
                        <SelectItem value="0">Completed</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            {/* 문장 리스트 */}
            <SentenceList />
        </div>
    )
}
