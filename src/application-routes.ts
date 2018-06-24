type RouteObj = {
    Index: string,
    About: string
} & string[];

export const Routes: RouteObj = <RouteObj>{
    Index: "/",
    About: "/about",
};