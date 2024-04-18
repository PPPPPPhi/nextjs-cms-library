import {
    PAGE_AUTHORIZATION_MAP,
    ACTION_AUTHORIZATION_MAP,
    ACTION_TYPE
} from "../constants/Functions"

export const pageAuthorizationMap: Map<string, number> = new Map([
    ["/admin", PAGE_AUTHORIZATION_MAP.MULTI_SITE_CONTROL],
    ["/admin/user-management", PAGE_AUTHORIZATION_MAP.VIEW_USERS],
    [
        "/admin/user-management/[userId]",
        PAGE_AUTHORIZATION_MAP.VIEW_USER_DETAIL
    ],
    ["/admin/account", PAGE_AUTHORIZATION_MAP.VIEW_SELF_USER_PROFILE],
    ["/admin/role-management", PAGE_AUTHORIZATION_MAP.VIEW_ROLE_MANAGEMENT],
    ["/admin/[site]", -99],
    ["/admin/[site]/image-gallery", PAGE_AUTHORIZATION_MAP.VIEW_IMAGE_GALLERY],
    [
        "/admin/[site]/marginals/footer",
        PAGE_AUTHORIZATION_MAP.VIEW_FOOTER_SETTING
    ],
    [
        "/admin/[site]/marginals/header",
        PAGE_AUTHORIZATION_MAP.VIEW_HEADER_SETTING
    ],
    [
        "/admin/[site]/navigations",
        PAGE_AUTHORIZATION_MAP.VIEW_NAVIGATION_SETTING
    ],
    ["/admin/[site]/pages", PAGE_AUTHORIZATION_MAP.VIEW_PAGES],
    ["/admin/[site]/pages/[pageId]", PAGE_AUTHORIZATION_MAP.VIEW_PAGE],
    [
        "/admin/[site]/pages/[pageId]/[version]",
        PAGE_AUTHORIZATION_MAP.VIEW_PAGE
    ],
    [
        "/admin/[site]/pages/[pageId]/history",
        PAGE_AUTHORIZATION_MAP.VIEW_PAGE_HISTORY
    ],
    ["/admin/[site]/publications", PAGE_AUTHORIZATION_MAP.VIEW_PUBLICATIONS],
    [
        "/admin/[site]/publications/[publicationId]/history",
        PAGE_AUTHORIZATION_MAP.VIEW_PUBLICATION_HISTORY
    ],
    ["/admin/[site]/site-setting", PAGE_AUTHORIZATION_MAP.VIEW_SITE_SETTING],
    [
        "/admin/[site]/site-setting/[version]",
        PAGE_AUTHORIZATION_MAP.VIEW_SITE_SETTING_VERSION
    ],
    [
        "/admin/[site]/site-setting/history",
        PAGE_AUTHORIZATION_MAP.VIEW_SITE_SETTING_HISTORY
    ],
    [
        "/admin/[site]/site-setting/publication",
        PAGE_AUTHORIZATION_MAP.VIEW_SITE_SETTING_PUBLICATION
    ],
    ["/admin/[site]/words", PAGE_AUTHORIZATION_MAP.VIEW_TRANSLATION]
])

export const getPageAuthorization = (pathname: string) => {
    return pageAuthorizationMap.get(pathname) ?? -99
}

export const getActionAuthorization = (action: keyof ACTION_TYPE) => {
    return ACTION_AUTHORIZATION_MAP[action] ?? -99
}
