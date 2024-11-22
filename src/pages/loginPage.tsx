import { supabase } from "@/utils/supabase";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
    const [loading, setLoading] = useState(false);

    const handleGoogleLogin = async () => {
        setLoading(true);
        
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: 'http://localhost:5173/list'
                }
            });

            if (error) throw error;
        } catch (error) {
            alert("로그인 중 오류가 발생했습니다.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle className="text-center">구글 로그인</CardTitle>
                </CardHeader>
                <CardContent>
                    <Button 
                        onClick={handleGoogleLogin}
                        className="w-full"
                        disabled={loading}
                    >
                        {loading ? "처리중..." : "구글로 로그인"}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}