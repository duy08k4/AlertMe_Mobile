export const routeConfig = {
    intro: {
        root: "/"
    },
    main: {
        root: "/main",
        map: "/main/map",
        report: "/main/discover",
        moreInfo: "/main/more-info",
    },
    mainSlug: {
        map: {
            getPosition: "/main/map/:id"
        },
        report: {

        },
    },
    login: {
        root: "/login"
    },
    register: {
        root: "/register"
    }
}