"use client";

import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { usePathname } from "next/navigation";

export function Footer() {
    const pathname = usePathname();

    if (pathname?.startsWith("/dashboard")) {
        return null;
    }

    return (
        <footer className="relative border-t bg-gradient-to-b from-muted/40 to-muted/80 dark:from-zinc-950 dark:to-zinc-900">
            
            <div className="container mx-auto px-6 md:px-12 py-12 md:py-20 max-w-screen-2xl">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-12">
                    {/* Brand Section */}
                    <div className="space-y-4 md:col-span-1">
                        <h4 className="text-[clamp(1.25rem,0.875rem+0.5vw,1.5rem)] font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                            PicSel
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            쇼핑할 때 가장 유리한 결제수단을<br />
                            실시간으로 추천해드립니다.
                        </p>
                        <div className="flex gap-3 pt-2">
                            {/* Social Icons Placeholder */}
                            <div className="w-9 h-9 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors cursor-pointer" />
                            <div className="w-9 h-9 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors cursor-pointer" />
                            <div className="w-9 h-9 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors cursor-pointer" />
                        </div>
                    </div>

                    {/* Services Section */}
                    <div>
                        <h4 className="font-semibold mb-4 text-foreground">서비스</h4>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li>
                                <Link href="#features" className="hover:text-foreground transition-colors hover:translate-x-1 inline-block">
                                    주요 기능
                                </Link>
                            </li>
                            <li>
                                <Link href="#usage" className="hover:text-foreground transition-colors hover:translate-x-1 inline-block">
                                    사용 방법
                                </Link>
                            </li>
                            <li>
                                <Link href="#pricing" className="hover:text-foreground transition-colors hover:translate-x-1 inline-block">
                                    요금제
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support Section */}
                    <div>
                        <h4 className="font-semibold mb-4 text-foreground">지원</h4>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li>
                                <Link href="#support" className="hover:text-foreground transition-colors hover:translate-x-1 inline-block">
                                    고객센터
                                </Link>
                            </li>
                            <li>
                                <Link href="#terms" className="hover:text-foreground transition-colors hover:translate-x-1 inline-block">
                                    이용약관
                                </Link>
                            </li>
                            <li>
                                <Link href="#privacy" className="hover:text-foreground transition-colors hover:translate-x-1 inline-block">
                                    개인정보처리방침
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Section */}
                    <div>
                        <h4 className="font-semibold mb-4 text-foreground">문의</h4>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-blue-500" />
                                <a href="mailto:contact@picsel.com" className="hover:text-foreground transition-colors">
                                    contact@picsel.com
                                </a>
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-blue-500" />
                                <span>02-1234-5678</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <MapPin className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                                <span>서울시 강남구 테헤란로</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Divider with gradient */}
                <div className="relative mt-12 pt-8">
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                        <p>© {new Date().getFullYear()} PicSel. All rights reserved.</p>
                        <div className="flex gap-6">
                            <Link href="#" className="hover:text-foreground transition-colors">
                                서비스 약관
                            </Link>
                            <Link href="#" className="hover:text-foreground transition-colors">
                                개인정보처리방침
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
