import Link from "next/link";

export function Footer() {
    return (
        <footer className="border-t bg-muted/40">
            <div className="container py-10 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <h4 className="text-lg font-bold">PicSel</h4>
                        <p className="text-sm text-muted-foreground">
                            쇼핑할 때 가장 유리한 결제수단을<br />
                            실시간으로 추천해드립니다.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">서비스</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-foreground">주요 기능</Link></li>
                            <li><Link href="#" className="hover:text-foreground">사용 방법</Link></li>
                            <li><Link href="#" className="hover:text-foreground">요금제</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">지원</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-foreground">고객센터</Link></li>
                            <li><Link href="#" className="hover:text-foreground">이용약관</Link></li>
                            <li><Link href="#" className="hover:text-foreground">개인정보처리방침</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">문의</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>contact@picsel.com</li>
                            <li>서울시 강남구 테헤란로</li>
                        </ul>
                    </div>
                </div>
                <div className="mt-10 pt-8 border-t text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} PicSel. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
