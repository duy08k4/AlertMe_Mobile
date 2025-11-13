export const routeConfig = {
    main: {
        root: "/main",
        map: "/main/map",
        news: "/main/news",
        moreInfo: "/main/more-info",
        user: {
            myReport: "/main/my-report",
        },
        
        staff: {
            myTask: "/main/my-task",
        },
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
    },
    unAuth: {
        root: "/un-auth"
    }
}