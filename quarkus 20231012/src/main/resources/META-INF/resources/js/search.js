    const CHAMPIONS = [ 
        { name: '아트록스', engName: 'Aatrox', role: '전사', lane: '탑', img: 'https://ddragon.leagueoflegends.com/cdn/15.24.1/img/champion/Aatrox.png', difficulty: '상' }, 
        { name: '사일러스', engName: 'Sylas', role: '마법사', lane: '정글/미드', img: 'https://ddragon.leagueoflegends.com/cdn/15.24.1/img/champion/Sylas.png', difficulty: '중' },
        { name: '애니비아', engName: 'Anivia', role: '마법사', lane: '미드', img: 'https://ddragon.leagueoflegends.com/cdn/15.24.1/img/champion/Anivia.png', difficulty: '상' }, 
        { name: '브라이어', engName: 'Briar', role: '전사', lane: '정글', img: 'https://ddragon.leagueoflegends.com/cdn/15.24.1/img/champion/Briar.png', difficulty: '중' }, 
        { name: '잭스', engName: 'Jax', role: '전사', lane: '탑', img: 'https://ddragon.leagueoflegends.com/cdn/15.24.1/img/champion/Jax.png', difficulty: '하' }, 
        { name: '징크스', engName: 'Jinx', role: '원거리딜러', lane: '원딜', img: 'https://ddragon.leagueoflegends.com/cdn/15.24.1/img/champion/Jinx.png', difficulty: '중' }, ];

        // ── 뉴스 데이터 ────────────────────────────────────────────── 
        const NEWS = [ { title: '새로운 챔피언 출시', desc: '2026 루나 레벨 이벤트! 신규 챔피언과 함께하는 특별한 시즌.', category: '게임 업데이트' }, 
            { title: '패치 노트 16.4', desc: '챔피언 밸런스 및 아이템 업데이트 내용을 확인하세요.', category: '패치 노트' }, ];
        // ── 검색 실행 ──────────────────────────────────────────────── 
        function performSearch(query) {

            const lowerQuery = query.toLowerCase();

            const champResults = CHAMPIONS.filter(c =>
                c.name.toLowerCase().includes(lowerQuery)
            );

            const newsResults = NEWS.filter(n =>
                n.title.toLowerCase().includes(lowerQuery)
            );

            // ✅ 모달 제목 변경
            document.getElementById("modalTitle").textContent =
                `"${query}" 검색 결과`;

            // ✅ 챔피언 결과 출력
            document.getElementById("modalChampResults").innerHTML =
                champResults.length > 0
                ? `
                    <h5 class="mb-3">챔피언 (${champResults.length})</h5>
                    ${champResults.map(c => `
                        <div class="card bg-secondary text-white mb-2">
                            <div class="card-body d-flex align-items-center">
                                <img src="${c.img}" width="50" class="me-3">
                                <div>
                                    <h6 class="mb-1">${c.name} (${c.engName})</h6>
                                    <small>역할: ${c.role} / 라인: ${c.lane} / 난이도: ${c.difficulty}</small>
                                </div>
                            </div>
                        </div>
                    `).join("")}
                `
                : "<p class='text-muted'>챔피언 검색 결과 없음</p>";

            // ✅ 뉴스 결과 출력
            document.getElementById("modalNewsResults").innerHTML =
                newsResults.length > 0
                ? `
                    <h5 class="mb-3">뉴스 (${newsResults.length})</h5>
                ${newsResults.map(n => `
                        <div class="card bg-secondary text-white mb-2">
                           <div class="card-body">
                                <h6>${n.title}</h6>
                                <small class="text-warning">${n.category}</small>
                                <p class="mb-0 mt-2">${n.desc}</p>
                            </div>
                        </div>
                    `).join("")}
                `
                : "<p class='text-muted'>뉴스 검색 결과 없음</p>";

            // ✅ Bootstrap 모달 열기
            const modal = new bootstrap.Modal(
                document.getElementById('searchResultModal')
            );
            modal.show();
        }
            // ── 카테고리 전환 ────────────────────────────────────────────
            function switchCategory(type, el) {
                document.querySelectorAll('.search-category-item').forEach(i => i.classList.remove('active'));
                el.classList.add('active');
                document.getElementById('resultChampion').style.display = type === 'champion' ? 'block' : 'none';
                document.getElementById('resultNews').style.display = type === 'news' ? 'block' : 'none';
            }

           document.getElementById("searchForm").addEventListener("submit", function(e) {

                e.preventDefault();

                const query = document.getElementById("searchInput").value.trim();

            if (!query) return;

            performSearch(query);
        });

        function closeSearchPage() {

            // ✅ 검색결과 화면 숨기기
            document.getElementById("searchPage").style.display = "none";

            // ✅ 메인 화면 다시 보이기
            document.querySelector(".container").style.display = "block";

            // ✅ 검색창 초기화 (선택사항)
            document.getElementById("searchInput").value = "";
        }



