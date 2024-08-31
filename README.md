# 📝 To_Do_Tasks 

## ✔️ 요구사항

- [ ] 웹 표준에 맞는 정확한 태그와 속성을 사용합니다.
- [ ] 회원 기능을 적용합니다.
- [ ] 소셜 로그인 기능을 적용합니다.
- [ ] 태스크의 CRUD 기능이 정상적으로 작동하도록 합니다.
- [ ] Calendar의 태스크와 Todolist의 태스크가 연동되도록 합니다.
- [ ] 반응형을 고려하여 모바일 화면을 지원하게 합니다.

### 👩‍💻 Tech stack

- Design : Figma
- Front-end : Next.js 13, TypeScript
- Back-end : Supabase
- Deploy : AWS Amplify

## 🎢 Plan

### - Have to do !!

- [ ] calendar 페이지에 ~~C~~RUD 기능 구현
- [ ] today 페이지 페이지네이션 관련 기능 구현
- [ ] Tag 기능 구현
  
### - Complete

- [x] 회원 기능 구현 (기본, OAuth)
- [x] Todotask 모달로 CRUD 기능 구현 [🖇️](https://nuew.tistory.com/entry/modal-global-state-management-using-zustand)
- [x] 인증 상태에 따른 페이지 접근 제한 [🖇️](https://nuew.tistory.com/entry/page-protect-using-middleware)
- [x] calendar에서 작성한 task가 today의 task로 연동되도록 구현 [🖇️](https://nuew.tistory.com/entry/WIL-DatetoISOString)

## 🗒️ 페이지

### '/signin'
![signin_motion](https://github.com/user-attachments/assets/07d87df4-3568-4358-9994-fa2d4bbe8ea1)

### '/'
![today_crud](https://github.com/user-attachments/assets/14c35078-15be-453b-b689-01a04b6d2b29)

### '/calendar'