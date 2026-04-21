// ── 챔피언 데이터 ──────────────────────────────────────────────
const CHAMPIONS = [
    { name: '아트록스', engName: 'Aatrox', role: '전사', lane: '탑', img: 'https://ddragon.leagueoflegends.com/cdn/15.24.1/img/champion/Aatrox.png', difficulty: '상', modal: 'modalAatrox' },
    { name: '사일러스', engName: 'Sylas', role: '마법사', lane: '정글/미드', img: 'https://ddragon.leagueoflegends.com/cdn/15.24.1/img/champion/Sylas.png', difficulty: '중', modal: 'modalSylas' },
    { name: '애니비아', engName: 'Anivia', role: '마법사', lane: '미드', img: 'https://ddragon.leagueoflegends.com/cdn/15.24.1/img/champion/Anivia.png', difficulty: '상', modal: 'modalAnivia' },
    { name: '브라이어', engName: 'Briar', role: '전사', lane: '정글', img: 'https://ddragon.leagueoflegends.com/cdn/15.24.1/img/champion/Briar.png', difficulty: '중', modal: 'modalBriar' },
    { name: '잭스', engName: 'Jax', role: '전사', lane: '탑', img: 'https://ddragon.leagueoflegends.com/cdn/15.24.1/img/champion/Jax.png', difficulty: '하', modal: 'modalJax' },
    { name: '징크스', engName: 'Jinx', role: '원거리딜러', lane: '원딜', img: 'https://ddragon.leagueoflegends.com/cdn/15.24.1/img/champion/Jinx.png', difficulty: '중', modal: 'modalJinx' },
];

// ── 뉴스 데이터 ──────────────────────────────────────────────
const NEWS = [
    { title: '새로운 챔피언 출시', desc: '2026 루나 레벨 이벤트! 신규 챔피언과 함께하는 특별한 시즌.', category: '게임 업데이트' },
    { title: '패치 노트 16.4', desc: '챔피언 밸런스 및 아이템 업데이트 내용을 확인하세요.', category: '패치 노트' },
];

// ── 메인화면으로 돌아가기 ──────────────────────────────────────
function showMainScreen() {
    // 히어로 섹션 다시 보임
    document.querySelector('.hero').classList.remove('d-none');
    // 카드와 뉴스 다시 보임
    document.getElementById('championCards').style.display = 'block';
    document.getElementById('newsSection').style.display = 'block';
    // 검색 결과 섹션 숨김
    document.getElementById('searchResults').style.display = 'none';
    // 검색창 초기화
    document.getElementById('searchInput').value = '';
}

// ── 카테고리 탭 전환 ──────────────────────────────────────────
function switchCategory(type, el) {
    document.querySelectorAll('.search-category-item').forEach(item => item.classList.remove('active'));
    el.classList.add('active');
    document.getElementById('resultChampion').style.display = (type === 'champion') ? 'block' : 'none';
    document.getElementById('resultNews').style.display = (type === 'news') ? 'block' : 'none';
}

// ── 검색 실행 ────────────────────────────────────────────────
function performSearch(query) {
    const q = query.trim().toLowerCase();

    // 검색어가 없거나 공백이면 메인화면으로
    if (!q) {
        showMainScreen();
        return;
    }

    // 검색어 출력
    document.getElementById('searchKeywordDisplay').textContent = `"${query}"`;

    // 챔피언 필터링
    const champResults = CHAMPIONS.filter(c =>
        c.name.includes(q) || c.engName.toLowerCase().includes(q) || c.role.includes(q) || c.lane.includes(q)
    );

    // 뉴스 필터링
    const newsResults = NEWS.filter(n =>
        n.title.toLowerCase().includes(q) || n.desc.toLowerCase().includes(q) || n.category.toLowerCase().includes(q)
    );

    // 카운트 표시
    document.getElementById('champCount').textContent = `(${champResults.length})`;
    document.getElementById('newsCount').textContent = `(${newsResults.length})`;

    // 챔피언 결과 출력
    const champList = document.getElementById('resultChampion');
    if (champResults.length === 0) {
        champList.innerHTML = `<div class="p-5 text-center text-muted">"${query}"에 해당하는 챔피언이 없습니다.</div>`;
    } else {
        champList.innerHTML = champResults.map(c => `
            <div class="d-flex align-items-center bg-white border rounded mb-3 overflow-hidden">
                <img src="${c.img}" alt="${c.name}" style="width:80px; height:80px; object-fit:cover;">
                <div class="p-3 flex-grow-1">
                    <div class="fw-bold">${c.name} <span class="text-muted small">(${c.engName})</span></div>
                    <div class="small text-secondary mt-1">역할: ${c.role} | 라인: ${c.lane} | 난이도: ${c.difficulty}</div>
                </div>
            </div>`).join('');
    }

    // 뉴스 결과 출력
    const newsList = document.getElementById('resultNews');
    if (newsResults.length === 0) {
        newsList.innerHTML = `<div class="p-5 text-center text-muted">"${query}"에 해당하는 뉴스가 없습니다.</div>`;
    } else {
        newsList.innerHTML = newsResults.map(n => `
            <div class="bg-white border rounded p-3 mb-3">
                <span class="badge bg-danger">${n.category}</span>
                <div class="fw-bold mt-2">${n.title}</div>
                <p class="small text-secondary mt-1 mb-0">${n.desc}</p>
            </div>`).join('');
    }

    // 챔피언 탭 먼저 보임
    switchCategory('champion', document.querySelector('.search-category-item'));

    // 메인 화면 콘텐츠 숨기기
    document.querySelector('.hero').classList.add('d-none');
    document.getElementById('championCards').style.display = 'none';
    document.getElementById('newsSection').style.display = 'none';
    
    // 검색 결과 섹션 표시
    document.getElementById('searchResults').style.display = 'block';
}

// ── 폼 이벤트 연결 ────────────────────────────────────────────
document.getElementById('searchForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const query = document.getElementById('searchInput').value;
    performSearch(query);
});