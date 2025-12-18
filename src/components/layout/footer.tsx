

import { Mail, Phone } from "lucide-react";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="relative border-t bg-linear-to-b from-muted/40 to-muted/80 dark:from-zinc-950 dark:to-zinc-900">
            
            <div className="container py-8 md:py-20">
                {/* Desktop Full Footer */}
                <div className="hidden md:grid grid-cols-4 gap-12">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <h4 className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                            PicSel
                        </h4>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            쇼핑할 때 가장 유리한 결제수단을<br />
                            실시간으로 추천해드립니다.
                        </p>
                    </div>

                    {/* Services Section */}
                    <div>
                        <h4 className="font-semibold mb-4 text-foreground">서비스</h4>
                        <ul className="space-y-3 text-sm text-zinc-700 dark:text-zinc-300">
                            <li>
                                <Link href="#features" className="hover:text-foreground transition-colors">
                                    주요 기능
                                </Link>
                            </li>
                            <li>
                                <Link href="#usage" className="hover:text-foreground transition-colors">
                                    사용 방법
                                </Link>
                            </li>
                            <li>
                                <Link href="#pricing" className="hover:text-foreground transition-colors">
                                    요금제
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support Section */}
                    <div>
                        <h4 className="font-semibold mb-4 text-foreground">지원</h4>
                        <ul className="space-y-3 text-sm text-zinc-700 dark:text-zinc-300">
                            <li>
                                <Link href="mailto:contact@picsel.com" className="hover:text-foreground transition-colors">
                                    고객센터
                                </Link>
                            </li>
                            <li>
                                <a href="/terms" className="hover:text-foreground transition-colors">
                                    이용약관
                                </a>
                            </li>
                            <li>
                                <a href="/privacy" className="hover:text-foreground transition-colors">
                                    개인정보처리방침
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Section */}
                    <div>
                        <h4 className="font-semibold mb-4 text-foreground">문의</h4>
                        <ul className="space-y-3 text-sm text-zinc-700 dark:text-zinc-300">
                            <li className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-blue-500" />
                                <a href="mailto:contact@picsel.com" className="hover:text-foreground transition-colors">
                                    sakills914@gmail.com
                                </a>
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-blue-500" />
                                <span>010-3145-9507</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Mobile Compact Footer */}
                <div className="md:hidden text-center space-y-6">
                    {/* Brand */}
                    <h4 className="text-lg font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                        PicSel
                    </h4>
                    
                    {/* Contact - Horizontal */}
                    <div className="flex justify-center gap-6 text-sm text-zinc-600 dark:text-zinc-400">
                        <a href="mailto:contact@picsel.com" className="flex items-center gap-1.5 hover:text-foreground transition-colors">
                            <Mail className="h-4 w-4 text-blue-500" />
                            이메일
                        </a>
                        <span className="flex items-center gap-1.5">
                            <Phone className="h-4 w-4 text-blue-500" />
                            02-1234-5678
                        </span>
                    </div>
                    
                    {/* Links */}
                    <div className="flex justify-center gap-4 text-xs text-zinc-500 dark:text-zinc-500">
                        <Link href="#terms" className="hover:text-foreground transition-colors">이용약관</Link>
                        <span>·</span>
                        <Link href="#privacy" className="hover:text-foreground transition-colors">개인정보처리방침</Link>
                    </div>
                </div>

                {/* Copyright - Both Desktop and Mobile */}
                <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-border/50">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-xs md:text-sm text-muted-foreground">
                        <p>© {new Date().getFullYear()} PicSel. All rights reserved.</p>
                        <div className="hidden md:flex gap-6">
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
