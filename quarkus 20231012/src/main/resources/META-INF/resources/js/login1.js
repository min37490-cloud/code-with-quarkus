function validateAndLogin() {
    async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
  let valid = true;

  const username = document.getElementById('usernameInput').value.trim();
  const password = document.getElementById('passwordInput').value;

  // ① 아이디 유효성 검사
  const usernameRegex = /^[a-zA-Z0-9]{4,20}$/;

  if (!usernameRegex.test(username)) {
    showError('usernameInput', 'usernameMsg', 
      '아이디는 4~20자의 영문 또는 숫자만 입력 가능합니다.');
    valid = false;
  } else {
    clearError('usernameInput');
  }

  // ② 패스워드 유효성 검사
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

  if (!passwordRegex.test(password)) {
    showError('passwordInput', 'passwordMsg',
      '비밀번호는 8자 이상이며 영문, 숫자, 특수문자(!@#$%^&*)를 포함해야 합니다.');
    valid = false;
  } else {
    clearError('passwordInput');
  }

  // ③ 유효성 검사 통과 시 로그인 처리 함수 호출
  if (valid) {
    submitLogin(); 
  }
}

async function submitLogin() {
    const password = document.getElementById('passwordInput').value;
    
    // ※ hashPassword 함수가 없으면 아래 줄을 주석 처리하고 대체 코드 사용
    // const hashed = await hashPassword(password);  // (원래 코드)
    const hashed = password;  // ⚠️ 임시 대체 (실제 암호화 필요 시 hashPassword 구현)
    
    document.getElementById('password').value = hashed;
    document.getElementById('loginForm').submit();
}