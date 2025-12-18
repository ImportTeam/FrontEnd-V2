export function TermsPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950">
      <div className="max-w-5xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold mb-8 text-zinc-900 dark:text-zinc-50">이용약관</h1>
        
        <div className="text-sm text-zinc-500 dark:text-zinc-400 mb-8">
          <p>최종 수정일: 2025년 12월 18일</p>
          <p>시행일: 2025년 12월 18일</p>
        </div>

        <div className="space-y-8 text-zinc-700 dark:text-zinc-300 text-base leading-7">
          {/* 1. 총칙 */}
          <section>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">제1장 총칙</h2>
            
            <article className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-3">제1조 목적</h3>
                <p className="leading-relaxed">
                  본 약관은 PicSel(이하 &quot;회사&quot;라 함)이 제공하는 가격 비교 및 결제수단 추천 서비스(이하 &quot;서비스&quot;라 함)의 이용과 
                  관련하여 회사와 이용자(이하 &quot;사용자&quot;라 함)의 권리, 의무 및 책임 사항을 규정하는 것을 목적으로 합니다.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-3">제2조 정의</h3>
                <ul className="list-disc list-inside space-y-2 ml-4 leading-relaxed">
                  <li><strong>&quot;서비스&quot;</strong>: 회사가 제공하는 웹사이트, 모바일 애플리케이션 및 확장 프로그램을 통한 가격 비교, 상품 정보 제공 및 결제수단 추천 서비스</li>
                  <li><strong>&quot;이용자&quot;</strong>: 본 약관에 동의하여 회사가 제공하는 서비스를 받는 개인, 법인 또는 단체</li>
                  <li><strong>&quot;가입&quot;</strong>: 본 약관에 동의하고 회원가입 절차를 완료하는 행위</li>
                  <li><strong>&quot;회원&quot;</strong>: 본 약관에 동의하여 가입한 이용자</li>
                  <li><strong>&quot;콘텐츠&quot;</strong>: 서비스 내에서 제공되는 상품 정보, 가격, 이미지, 리뷰 등의 정보</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">제3조 약관의 명시 및 개정</h3>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li>회사는 본 약관을 이용자가 쉽게 알 수 있도록 서비스의 초기 화면에 게시합니다.</li>
                  <li>회사는 필요한 경우 법령을 위반하지 않는 범위 내에서 본 약관을 개정할 수 있습니다.</li>
                  <li>약관 개정 시 개정 사유, 개정 전&middot;후 내용을 명시하여 현재 적용 중인 약관과 함께 해당 서비스 화면에 그 적용일자 30일 이전부터 공지합니다.</li>
                  <li>이용자가 개정된 약관에 동의하지 않을 경우 서비스 이용을 중단하고 회원탈퇴를 할 수 있습니다.</li>
                </ol>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">제4조 약관의 효력 및 적용</h3>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li>본 약관은 회원이 &quot;동의&quot; 버튼을 클릭한 때부터 효력이 발생합니다.</li>
                  <li>회사는 필요한 경우 사전 공지 없이 서비스 일부 또는 전부를 변경할 수 있습니다.</li>
                  <li>본 약관에 명시되지 않은 사항에 대해서는 「전자상거래 등에서의 소비자보호에 관한 법률」, 「개인정보보호법」 등 관련 법령을 따릅니다.</li>
                </ol>
              </div>
            </article>
          </section>

          {/* 2. 회원 */}
          <section>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">제2장 회원</h2>
            
            <article className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-3">제5조 회원가입</h3>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li>회원가입은 이용자가 본 약관 및 개인정보처리방침에 동의하고 회사 양식에 따라 필요한 정보를 입력하는 것으로 완성됩니다.</li>
                  <li>회사는 다음의 경우에 회원가입을 거절할 수 있습니다:
                    <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                      <li>등록 내용에 허위, 기재 누락, 오기가 있는 경우</li>
                      <li>이용자가 과거에 본 서비스 이용약관을 위반하여 회원자격이 박탈된 경우</li>
                      <li>기타 회사가 필요하다고 인정하는 경우</li>
                    </ul>
                  </li>
                </ol>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-3">제6조 이메일 및 비밀번호</h3>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li>회원은 가입 시 기재한 정보가 정확함을 보증합니다.</li>
                  <li>회원은 자신의 비밀번호를 관리할 책임이 있으며, 제3자에게 양도하거나 공개할 수 없습니다.</li>
                  <li>회원이 비밀번호 유출로 인한 피해에 대해 회사는 책임을 지지 않습니다.</li>
                  <li>회원은 본인이 아닌 자가 비밀번호를 사용하거나 이용자 정보가 도용된 사실을 인지한 경우 즉시 회사에 통보해야 합니다.</li>
                </ol>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-3">제7조 회원탈퇴 및 자격 박탈</h3>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li>회원은 언제든지 서비스 내 설정 메뉴를 통해 회원탈퇴를 신청할 수 있습니다.</li>
                  <li>회사는 회원이 다음에 해당하는 경우 사전 통보 없이 회원자격을 박탈할 수 있습니다:
                    <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                      <li>본 약관을 반복적으로 위반하는 경우</li>
                      <li>타인의 명의를 사용하여 가입한 경우</li>
                      <li>불건전한 목적으로 서비스를 이용하는 경우</li>
                      <li>기타 법령이나 공서양속에 위배되는 행위를 하는 경우</li>
                    </ul>
                  </li>
                  <li>회원탈퇴 시 저장된 검색 이력, 선호도 등의 개인 데이터는 삭제됩니다.</li>
                </ol>
              </div>
            </article>
          </section>

          {/* 3. 서비스 이용 */}
          <section>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">제3장 서비스 이용</h2>
            
            <article className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">제8조 서비스 제공</h3>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li>회사는 다음의 서비스를 제공합니다:
                    <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                      <li>상품 정보 및 가격 비교 서비스</li>
                      <li>최저가 상품 및 판매처 정보 제공</li>
                      <li>사용자 맞춤형 결제수단 추천</li>
                      <li>검색 이력 및 가격 변동 추적</li>
                    </ul>
                  </li>
                  <li>회사는 기술적 문제 등의 사유로 서비스를 일시적으로 중단할 수 있으며, 이 경우 서비스 화면에 공지합니다.</li>
                  <li>유지보수, 업그레이드 등의 사유로 서비스를 중단할 때는 7일 이전에 공지합니다.</li>
                </ol>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">제9조 서비스 이용 제한</h3>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li>회원은 서비스 이용 중에 다음 행위를 하면 안 됩니다:
                    <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                      <li>타인의 명의, 이메일, 개인정보를 도용하는 행위</li>
                      <li>서비스의 운영을 방해하는 행위 (불법 프로그램 사용, 과도한 요청 등)</li>
                      <li>타인의 저작권, 지적재산권을 침해하는 행위</li>
                      <li>음란, 불건전, 폭력적인 콘텐츠를 게재하는 행위</li>
                      <li>광고성 정보, 스팸을 게재하는 행위</li>
                      <li>기타 법령이나 공서양속에 위배되는 행위</li>
                    </ul>
                  </li>
                  <li>회사는 위 행위를 한 회원에 대해 서비스 이용을 제한할 수 있습니다.</li>
                </ol>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">제10조 정보의 정확성</h3>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li>서비스에 제공되는 상품 정보, 가격, 이미지 등은 정보 제공처(다나와, 11번가, 쿠팡 등)에서 수집한 것입니다.</li>
                  <li>회사는 정보 제공처 변경 또는 업데이트 지연으로 인한 오류를 책임지지 않습니다.</li>
                  <li>가격 및 상품 정보의 최종 확인은 해당 쇼핑몰에서 직접 하시기 바랍니다.</li>
                </ol>
              </div>
            </article>
          </section>

          {/* 4. 책임 및 의무 */}
          <section>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">제4장 회사와 회원의 책임 및 의무</h2>
            
            <article className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">제11조 회사의 의무</h3>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li>회사는 관련 법령을 준수하며 안정적인 서비스 제공을 위해 노력합니다.</li>
                  <li>회사는 개인정보 보호를 위해 필요한 조치를 취합니다.</li>
                  <li>회사는 서비스 운영 중 발생한 문제에 대해 성실하게 처리합니다.</li>
                </ol>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">제12조 회원의 의무</h3>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li>회원은 본 약관에 명시된 사항 및 관련 법령을 준수해야 합니다.</li>
                  <li>회원은 서비스 이용 시 정확한 정보를 제공해야 합니다.</li>
                  <li>회원은 서비스를 통해 이익을 얻을 목적으로 정보를 상업적으로 수집하는 등의 부정한 이용을 하면 안 됩니다.</li>
                </ol>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">제13조 면책조항</h3>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li>회사는 다음의 경우에 대해 책임을 지지 않습니다:
                    <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                      <li>천재지변, 전쟁, 테러 등 불가항력적 사유</li>
                      <li>회원의 귀책 사유로 인한 피해</li>
                      <li>정보 제공처의 오류로 인한 정보 오류</li>
                      <li>제3자의 불법적 행위로 인한 피해</li>
                      <li>회원의 부주의로 인한 기기 손상 또는 데이터 손실</li>
                    </ul>
                  </li>
                  <li>회사는 이용자가 본 서비스에서 얻은 정보 또는 거래로 인한 손해가 아닌 관계로 직접적, 간접적, 부수적 손해에 대해 책임을 지지 않습니다.</li>
                </ol>
              </div>
            </article>
          </section>

          {/* 5. 분쟁해결 */}
          <section>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">제5장 분쟁해결</h2>
            
            <article className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">제14조 준거법 및 관할</h3>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li>본 약관 및 회사와 회원 간의 관계에는 대한민국 법이 적용됩니다.</li>
                  <li>본 약관으로부터 발생하는 모든 분쟁에 대해서는 대한민국 법원의 관할을 인정합니다.</li>
                </ol>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">제15조 분쟁해결</h3>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li>서비스와 관련하여 분쟁이 발생한 경우, 회사와 회원은 상호 성실한 태도로 해결하기 위해 노력합니다.</li>
                  <li>소비자 분쟁 조정을 받으려면 한국소비자원(www.kca.go.kr) 에 신청할 수 있습니다.</li>
                  <li>부정당한 이용 요금이 청구된 경우, 「통신요금분쟁조정규칙」에 따라 한국인터넷진흥원에 분쟁조정을 신청할 수 있습니다.</li>
                </ol>
              </div>
            </article>
          </section>

          {/* 6. 기타 */}
          <section>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">제6장 기타</h2>
            
            <article className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">제16조 예약 및 취소</h3>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li>현재 서비스는 예약 기능을 제공하지 않습니다.</li>
                  <li>향후 예약 기능 추가 시 별도의 약관을 공지합니다.</li>
                </ol>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">제17조 권리 양도</h3>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li>회사는 본 약관상의 권리 및 의무를 제3자에게 양도할 수 있습니다.</li>
                  <li>회원은 본 약관상의 권리 및 의무를 회사의 동의 없이 제3자에게 양도할 수 없습니다.</li>
                </ol>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">제18조 약관 조항의 분리</h3>
                <p>
                  본 약관의 어떤 조항이 무효 또는 집행불가능한 것으로 판단되더라도, 다른 조항의 효력에는 영향을 미치지 않습니다.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">제19조 연락처</h3>
                <p>
                  본 약관에 대한 문의 및 기타 사항은 다음의 연락처로 문의하시기 바랍니다:
                </p>
                <ul className="list-none space-y-1 ml-4 mt-2">
                  <li>이메일: sakills914@gmail.com</li>
                  <li>전화: 010-3145-9507</li>
                  <li>주소: 봉호로 14 경북소프트웨어마이스터고)</li>
                </ul>
              </div>
            </article>
          </section>

          <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800">
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              본 약관은 2025년 12월 18일부터 시행되며, 개정 시에는 최소 30일 전에 공지됩니다.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default TermsPage;
