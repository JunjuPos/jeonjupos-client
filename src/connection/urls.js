let ADDRESS = "http://api.jeonjupos.kr";

export const __DEV__ = true;

if (__DEV__) {
    ADDRESS = "http://api.jeonjupos.kr/test";
}

// ADDRESS = 'http://127.0.0.1:8000'

export const URL_POST_LOGIN = `${ADDRESS}/user/login`;   // 로그인

export const URL_POST_JWT_LOGIN = `${ADDRESS}/user/jwt/login`;  // jwt 로그인

export const URL_GET_TABLE_LIST = `${ADDRESS}/table/list`;   // 테이블 리스트 조회

export const URL_GET_TABLE_ORDER_LIST = `${ADDRESS}/table/order/list`;   // 테이블 주문내역 조회

export const URL_GET_MENU_LIST = `${ADDRESS}/menu/list`;  //  주문페이지 메뉴 리스트 조회

export const URL_POST_ORDER = `${ADDRESS}/order`;   // 주문

export const URL_POST_PAY = `${ADDRESS}/payment`; // 결제

export const URL_GET_MANAGE_MENU_LIST = `${ADDRESS}/manage/menu/list`; //  메뉴 관리 메뉴 리스트 조회

export const URL_POST_MENU_USE_YN_MODIFY = `${ADDRESS}/manage/menu/useyn/modify`;  // 메뉴 관리 판매여부 변경

export const URL_POST_TAKEOUT_YN_MODIFY = `${ADDRESS}/manage/menu/takeout/modify`;   // 메뉴 관리 포장여부 변경

export const URL_POST_TAKEIN_YN_MODIFY = `${ADDRESS}/manage/menu/takeinyn/modify`;    // 메뉴 관리 매장식사 여부 변경

export const URL_GET_SALE_LIST = `${ADDRESS}/manage/sale/list`;    // 매출현황 리스트 조회

export const URL_GET_POSTPAID_GROUP_LIST = `${ADDRESS}/user/postpaid-group/list` // 후불 명부 리스트 조회

export const URL_GET_MENU = `${ADDRESS}/manage/menu`   // 메뉴 상세조회

export const URL_POST_MENU_MODIFY = `${ADDRESS}/manage/menu/modify` // 메뉴 수정
