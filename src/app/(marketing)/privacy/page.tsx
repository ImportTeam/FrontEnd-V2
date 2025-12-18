export function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950">
      <div className="max-w-5xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold mb-8 text-zinc-900 dark:text-zinc-50">개인정보처리방침</h1>
        
        <div className="text-sm text-zinc-500 dark:text-zinc-400 mb-8">
          <p>최종 수정일: 2025년 12월 18일</p>
          <p>시행일: 2025년 12월 18일</p>
        </div>

        <div className="space-y-8 text-zinc-700 dark:text-zinc-300 text-base leading-7">
          {/* 개요 */}
          <section>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">개요</h2>
            <p className="leading-relaxed">
              PicSel(이하 &quot;회사&quot;라 함)는 「개인정보보호법」, 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」 등 개인정보 보호 관련 법령을 
              준수하며, 이용자의 개인정보를 안전하게 관리합니다. 본 방침은 회사가 수집하는 개인정보의 항목, 수집 및 이용 목적, 
              보유 및 이용 기간, 개인정보 처리 방법 등을 설명합니다.
            </p>
          </section>

          {/* 1. 개인정보 수집 */}
          <section>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">1. 개인정보의 수집</h2>
            
            <article className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-3">1-1. 수집하는 개인정보 항목</h3>
                
                <table className="w-full border-collapse border border-zinc-300 dark:border-zinc-700 text-sm">
                  <thead>
                    <tr className="bg-zinc-100 dark:bg-zinc-900">
                      <th className="border border-zinc-300 dark:border-zinc-700 p-3 text-left font-semibold">구분</th>
                      <th className="border border-zinc-300 dark:border-zinc-700 p-3 text-left font-semibold">수집 항목</th>
                      <th className="border border-zinc-300 dark:border-zinc-700 p-3 text-left font-semibold">수집 방법</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-zinc-300 dark:border-zinc-700 p-3"><strong>필수</strong></td>
                      <td className="border border-zinc-300 dark:border-zinc-700 p-3">
                        이메일, 이름, 가입 시간, 마지막 로그인 시간
                      </td>
                      <td className="border border-zinc-300 dark:border-zinc-700 p-3">회원가입 양식</td>
                    </tr>
                    <tr className="bg-zinc-50 dark:bg-zinc-900/50">
                      <td className="border border-zinc-300 dark:border-zinc-700 p-3"><strong>선택</strong></td>
                      <td className="border border-zinc-300 dark:border-zinc-700 p-3">
                        프로필 사진, 휴대폰번호, 통화 선호도, 비교 모드 설정
                      </td>
                      <td className="border border-zinc-300 dark:border-zinc-700 p-3">프로필 설정 화면</td>
                    </tr>
                    <tr>
                      <td className="border border-zinc-300 dark:border-zinc-700 p-3"><strong>자동수집</strong></td>
                      <td className="border border-zinc-300 dark:border-zinc-700 p-3">
                        검색 이력, 조회한 상품, 조회 시간, 기기 정보(User-Agent), IP 주소 (로그 목적)
                      </td>
                      <td className="border border-zinc-300 dark:border-zinc-700 p-3">서비스 이용 시 자동 수집</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-3">1-2. 수집하지 않는 정보</h3>
                <p>회사는 다음 정보를 절대 수집하지 않습니다:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>비밀번호 (암호화되어 저장되며, 회사도 열람 불가)</li>
                  <li>신용카드 번호, 계좌번호 등 결제 정보</li>
                  <li>주민등록번호, 여권번호 등 고유식별정보</li>
                  <li>생체 정보 (지문, 홍채 등)</li>
                  <li>쿠키, 세션 토큰, 인증 정보</li>
                  <li>위치 정보</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">1-3. 수집 및 이용 목적</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>회원 관리:</strong> 이용자 인증, 개인 계정 관리, 비밀번호 변경, 회원탈퇴 처리</li>
                  <li><strong>서비스 제공:</strong> 가격 비교, 상품 정보 제공, 결제수단 추천</li>
                  <li><strong>개인화:</strong> 검색 이력 기반 추천, 통화/비교 모드 설정값 저장</li>
                  <li><strong>고객지원:</strong> 문의 응답, 기술 지원, 오류 해결</li>
                  <li><strong>통계 및 분석:</strong> 서비스 이용 현황 분석, 기능 개선 연구 (집계 데이터 기반)</li>
                  <li><strong>보안:</strong> 부정 이용 방지, 법령 위반 행위 탐지, 서비스 보호</li>
                </ul>
              </div>
            </article>
          </section>

          {/* 2. 개인정보 보유 및 이용 기간 */}
          <section>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">2. 개인정보의 보유 및 이용 기간</h2>
            
            <table className="w-full border-collapse border border-zinc-300 dark:border-zinc-700 text-sm">
              <thead>
                <tr className="bg-zinc-100 dark:bg-zinc-900">
                  <th className="border border-zinc-300 dark:border-zinc-700 p-3 text-left font-semibold">항목</th>
                  <th className="border border-zinc-300 dark:border-zinc-700 p-3 text-left font-semibold">보유 기간</th>
                  <th className="border border-zinc-300 dark:border-zinc-700 p-3 text-left font-semibold">근거</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-zinc-300 dark:border-zinc-700 p-3">이메일, 이름, 가입정보</td>
                  <td className="border border-zinc-300 dark:border-zinc-700 p-3">회원탈퇴 시까지</td>
                  <td className="border border-zinc-300 dark:border-zinc-700 p-3">회원 관리</td>
                </tr>
                <tr className="bg-zinc-50 dark:bg-zinc-900/50">
                  <td className="border border-zinc-300 dark:border-zinc-700 p-3">검색 이력, 조회 기록</td>
                  <td className="border border-zinc-300 dark:border-zinc-700 p-3">사용자 선택 삭제 또는 회원탈퇴 시</td>
                  <td className="border border-zinc-300 dark:border-zinc-700 p-3">개인화 제공</td>
                </tr>
                <tr>
                  <td className="border border-zinc-300 dark:border-zinc-700 p-3">로그 데이터 (IP, User-Agent)</td>
                  <td className="border border-zinc-300 dark:border-zinc-700 p-3">1년</td>
                  <td className="border border-zinc-300 dark:border-zinc-700 p-3">보안, 부정 이용 방지</td>
                </tr>
                <tr className="bg-zinc-50 dark:bg-zinc-900/50">
                  <td className="border border-zinc-300 dark:border-zinc-700 p-3">회원탈퇴 후 개인정보</td>
                  <td className="border border-zinc-300 dark:border-zinc-700 p-3">30일 이후 완전 삭제</td>
                  <td className="border border-zinc-300 dark:border-zinc-700 p-3">법정 분쟁 해결</td>
                </tr>
              </tbody>
            </table>

            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <p className="text-sm">
                <strong>주의:</strong> 이용자가 삭제 또는 수정을 요청한 개인정보는 정보 보호 및 분쟁 해결 등을 위해 
                30일간 별도로 보관되며, 이후 삭제됩니다.
              </p>
            </div>
          </section>

          {/* 3. 개인정보 처리 및 보안 */}
          <section>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">3. 개인정보의 처리 및 보안</h2>
            
            <article className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">3-1. 개인정보 보호 조치</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>암호화:</strong> 통신 데이터는 SSL/TLS 프로토콜로 암호화하여 전송되며, 민감한 데이터(이메일, 기기정보 등)는 SHA-256 이상의 해시 함수로 암호화됩니다.</li>
                  <li><strong>접근 제어:</strong> 개인정보에 접근 가능한 직원을 제한하며, 정기적인 보안 교육을 실시합니다.</li>
                  <li><strong>방화벽:</strong> 외부 침입으로부터 보호하기 위해 방화벽을 구축하고 모니터링합니다.</li>
                  <li><strong>정기 점검:</strong> 보안 취약점 점검 및 개선을 정기적으로 실시합니다.</li>
                  <li><strong>백업:</strong> 데이터 손실을 방지하기 위해 정기적인 백업을 수행합니다.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">3-2. 개인정보 처리 제한</h3>
                <p>
                  회사는 이용자의 동의 없이 개인정보를 수집 목적 이외의 다른 용도로 이용하지 않습니다. 
                  단, 다음의 경우는 예외로 합니다:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                  <li>법원의 명령이나 조사기관의 정식 의뢰가 있는 경우</li>
                  <li>범죄 수사 협력을 위해 필요한 경우</li>
                  <li>「개인정보보호법」 제17조 또는 제18조가 정하는 경우</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">3-3. 개인정보 침해 대응</h3>
                <p>
                  개인정보 침해 사건이 발생할 경우, 회사는 이용자에게 다음 정보를 지체 없이 통지합니다:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                  <li>침해 사실 및 범위</li>
                  <li>침해로 인한 피해를 줄이기 위한 조치</li>
                  <li>전담 부서의 연락처</li>
                  <li>기타 필요한 정보</li>
                </ul>
              </div>
            </article>
          </section>

          {/* 4. 개인정보의 제3자 공개 */}
          <section>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">4. 개인정보의 제3자 공개</h2>
            
            <div className="space-y-4">
              <p>
                회사는 이용자의 개인정보를 본인의 동의 없이 제3자에게 공개하지 않습니다. 다만, 다음의 경우에는 예외로 합니다:
              </p>

              <div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">4-1. 법적 근거가 있는 경우</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>법원의 명령</li>
                  <li>수사 기관의 정식 의뢰 또는 수사 협력</li>
                  <li>법령에서 특정 정보 공개를 의무화하는 경우</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">4-2. 업무 위탁</h3>
                <p>회사는 서비스 제공을 위해 다음의 업체에 개인정보를 위탁할 수 있습니다:</p>
                <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                  <li>클라우드 호스팅 서비스 제공자 (데이터 저장 및 백업)</li>
                  <li>이메일 발송 서비스 제공자 (공지사항 전송)</li>
                  <li>고객 지원 플랫폼 (기술 지원)</li>
                </ul>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
                  위탁 시 이용자에게 사전 고지하며, 위탁받는 자는 본 방침과 동등 수준의 보안 의무를 지닙니다.
                </p>
              </div>
            </div>
          </section>

          {/* 5. 쿠키 및 추적 */}
          <section>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">5. 쿠키 및 기술적 추적</h2>
            
            <article className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">5-1. 쿠키 사용</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>필수 쿠키:</strong> 로그인 유지, 보안 (CSRF 토큰) - 삭제하면 서비스 이용 불가</li>
                  <li><strong>기능 쿠키:</strong> 사용자 선호도 저장 (언어, 테마, 설정) - 사용자가 삭제 가능</li>
                  <li><strong>분석 쿠키:</strong> 서비스 이용 현황 분석 (Google Analytics 포함) - 사용자가 거부 가능</li>
                </ul>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
                  쿠키는 브라우저 설정에서 거부할 수 있으며, 거부 시 일부 서비스 기능이 제한될 수 있습니다.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">5-2. 분석 도구</h3>
                <p>
                  회사는 서비스 개선을 위해 Google Analytics를 사용합니다. Google Analytics는 쿠키를 사용하여 
                  사용자의 이용 패턴을 분석하지만, 개인을 식별하지 않습니다.
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
                  자세한 내용: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                    Google 개인정보 처리방침
                  </a>
                </p>
              </div>
            </article>
          </section>

          {/* 6. 개인정보주체의 권리 */}
          <section>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">6. 개인정보주체의 권리</h2>
            
            <article className="space-y-4">
              <p>
                개인정보주체(이용자)는 다음의 권리를 가지며, 언제든지 회사에 요청할 수 있습니다:
              </p>

              <div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">6-1. 권리 목록</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>접근권:</strong> 자신의 개인정보 열람 요청</li>
                  <li><strong>수정권:</strong> 오류가 있는 개인정보 수정 요청</li>
                  <li><strong>삭제권(잊을 권리):</strong> 개인정보 삭제 요청 (다만, 법령에서 보존을 의무화하는 정보는 제외)</li>
                  <li><strong>처리 정지권:</strong> 개인정보 처리 중단 요청</li>
                  <li><strong>이전권:</strong> 개인정보를 다른 기업으로 이전 요청 (기술적으로 가능한 범위 내)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">6-2. 권리 행사 방법</h3>
                <p>
                  다음 연락처로 개인정보 열람, 수정, 삭제, 처리 정지 등의 요청을 할 수 있습니다:
                </p>
                <ul className="list-none space-y-1 ml-4 mt-2">
                  <li>이메일: sakills914@gmail.com</li>
                  <li>전화: 010-3145-9507</li>
                  <li>우편: 봉호로 14 경북소프트웨어마이스터고</li>
                </ul>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
                  회사는 요청 후 30일 이내에 처리 결과를 통지합니다.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">6-3. 거부 및 제한</h3>
                <p>
                  다음의 경우 요청을 거부하거나 제한할 수 있습니다:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                  <li>본인인지 확인할 수 없는 경우</li>
                  <li>법령에서 보존을 의무화하는 경우</li>
                  <li>타인의 생명, 신체, 재산을 해할 우려가 있는 경우</li>
                  <li>범죄 수사 및 기타 공익 사업의 방해</li>
                </ul>
              </div>
            </article>
          </section>

          {/* 7. 개인정보 담당자 */}
          <section>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">7. 개인정보 담당부서 및 책임자</h2>
            
            <div className="space-y-4">
              <div className="p-4 bg-zinc-100 dark:bg-zinc-900 rounded-lg">
                <p className="text-sm"><strong>개인정보보호 책임자</strong></p>
                <ul className="list-none text-sm space-y-1 mt-2">
                  <li>이름: 임세훈</li>
                  <li>직책: 개인정보보호 책임자</li>
                  <li>이메일: sakills914@gmail.com</li>
                  <li>전화: 010-3145-9507</li>
                </ul>
              </div>

              <div className="p-4 bg-zinc-100 dark:bg-zinc-900 rounded-lg">
                <p className="text-sm"><strong>개인정보처리 담당부서</strong></p>
                <ul className="list-none text-sm space-y-1 mt-2">
                  <li>부서: 고객지원팀</li>
                  <li>이메일: sakills914@gmail.com</li>
                  <li>전화: 010-3145-9507</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">외부 연락처</h3>
                <p>개인정보 침해 신고 및 상담:</p>
                <ul className="list-none space-y-1 ml-4 mt-2">
                  <li>
                    <strong>개인정보보호위원회:</strong> 
                    <a href="https://www.privacy.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                      www.privacy.go.kr
                    </a>
                    (1833-6958)
                  </li>
                  <li>
                    <strong>대검찰청 사이버수사과:</strong> 
                    <a href="https://www.spo.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                      www.spo.go.kr
                    </a>
                    (02-3480-3373)
                  </li>
                  <li>
                    <strong>경찰청 사이버안전과:</strong> 
                    <a href="https://cyberbureau.police.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                      cyberbureau.police.go.kr
                    </a>
                    (1212)
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* 8. 개인정보처리방침 변경 */}
          <section>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">8. 개인정보처리방침의 변경</h2>
            
            <div className="space-y-4">
              <p>
                본 방침은 법령, 정책 변화 또는 보안 강화 등의 사유로 변경될 수 있습니다. 
                변경 시 회사는 최소 30일 전에 공지하고, 중대한 변경의 경우 이용자의 동의를 다시 받습니다.
              </p>

              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <h3 className="text-sm font-semibold mb-2">변경 이력</h3>
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-blue-200 dark:border-blue-800">
                      <th className="text-left p-2">변경일</th>
                      <th className="text-left p-2">주요 내용</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-blue-200 dark:border-blue-800">
                      <td className="p-2">2025-12-18</td>
                      <td className="p-2">개인정보처리방침 최초 공시</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* 부록 */}
          <section>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">부록: 국내법 준수 사항</h2>
            
            <div className="space-y-4">
              <p>
                본 개인정보처리방침은 다음의 대한민국 법령을 준수하며 작성되었습니다:
              </p>

              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>개인정보보호법:</strong> 개인정보의 수집, 이용, 제공, 보유, 처리에 관한 기준
                </li>
                <li>
                  <strong>정보통신망 이용촉진 및 정보보호 등에 관한 법률:</strong> 온라인 개인정보보호 규정
                </li>
                <li>
                  <strong>전자상거래 등에서의 소비자보호에 관한 법률:</strong> 전자상거래 사업자의 개인정보 보호 의무
                </li>
                <li>
                  <strong>통신비밀보호법:</strong> 통신 중 개인정보 보호
                </li>
              </ul>

              <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg">
              </div>
            </div>
          </section>

          <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800">
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              본 개인정보처리방침은 2025년 12월 18일부터 시행되며, 법령 변경 시 자동으로 업데이트됩니다.
              마지막 업데이트: 2025년 12월 18일
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default PrivacyPage;
