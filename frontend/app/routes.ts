import {index, prefix, route, type RouteConfig} from "@react-router/dev/routes";

export default [
    index("routes/home-page.tsx"),
    route("/about", "routes/about-page.tsx"),
    route("/cv", "routes/cv-page.tsx"),
    route("/contact", "routes/contact-page.tsx"),
    route("*", "routes/unknown-page.tsx"),
    ...prefix("interests", [
        index("routes/interests/interests-page.tsx"),
        route("technology", "routes/interests/technology-page.tsx"),
        route("food", "routes/interests/food-page.tsx"),
        route("sports", "routes/interests/sports-page.tsx"),
        route("diy-projects", "routes/interests/diy-projects-page.tsx"),
        route("music", "routes/interests/music-page.tsx"),
    ]),
] satisfies RouteConfig;
