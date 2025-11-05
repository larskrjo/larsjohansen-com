import type {Card, ContactItem} from "~/types/types";

export const HOME_PAGE_POST = {
    category: "Biography",
    title: "First post – Welcome!",
    date: "February 6, 2020",
    author: "Lars K. Johansen",
    commentsCount: 0,
    content: `I’ve finally launched my new website, where you can read, contact, and be inspired by the information you read. Maybe you can suggest things that I’m interested in or challenge some of my thoughts on them.
    
     I look forward to hearing from anyone that takes an interest in this!`,
    readingTime: "1 min"
}

export const INTEREST_PAGE_CATEGORIES: Card[] = [
    {
        title: 'Technology',
        subtitle: 'Programming and Innovation',
        image: '/images/interests/technology.png',
        href: '/interests/technology',
    },
    {
        title: 'Food',
        subtitle: 'Food from around the world',
        image: '/images/interests/food.png',
        href: '/interests/food',
    },
    {
        title: 'Sports',
        subtitle: 'Running on tracks and trails',
        image: '/images/interests/sports.png',
        href: '/interests/sports',
    },
    {
        title: 'DIY Projects',
        subtitle: 'Making something new',
        image: '/images/interests/diy-projects.png',
        href: '/interests/diy-projects',
    },
    {
        title: 'Music',
        subtitle: 'Listening and Playing',
        image: '/images/interests/music.png',
        href: '/interests/music',
    },
];

export const TECHNOLOGY_PAGE = {
    title: "Technology",
    paragraphs: [
        "Information about my interest in technology will come soon! Stay tuned..."
    ],
    image: "/images/interests/technology.png",
    altText: "Image of technology"
}

export const FOOD_PAGE = {
    title: "Food",
    paragraphs: [
        "Information about my interest in food will come soon! Stay tuned..."
    ],
    image: "/images/interests/food.png",
    altText: "Image of food"
}

export const SPORTS_PAGE = {
    title: "Sports",
    paragraphs: [
        "Information about my interest in sports will come soon! Stay tuned..."
    ],
    image: "/images/interests/sports.png",
    altText: "Image of sports"
}

export const DIY_PROJECTS_PAGE = {
    title: "DIY Projects",
    paragraphs: [
        "Information about my interest in DIY projects will come soon! Stay tuned..."
    ],
    image: "/images/interests/diy-projects.png",
    altText: "Image of DIY Projects"
}

export const MUSIC_PAGE = {
    title: "Music",
    paragraphs: [
        "Information about my interest in music will come soon! Stay tuned..."
    ],
    image: "/images/interests/music.png",
    altText: "Image of music"
}

export const CV_PAGE = {
    title: "CV",
    paragraphs: [
        "Please click <a href=\"/docs/CV.pdf\" target=\"_blank\">here</a> to download my CV"
    ],
    image: "/images/cv.png",
    altText: "Image of a CV"
}

export const UNKNOWN_PAGE = {
    title: "Unknown Page",
    paragraphs: [
        "You've ended up at an unknown page..."
    ]
}

export const CONTACTS: ContactItem[] = [
    { label: "Email", value: "larskrjo@gmail.com", href: "mailto:larskrjo@gmail.com" },
    { label: "Facebook", value: "https://facebook.com/larskrjo" },
    { label: "Instagram", value: "https://instagram.com/larskrjo" },
    { label: "X", value: "https://x.com/larskrjo" },
    { label: "Github", value: "https://github.com/larskrjo" },
];

export const OSLO_COORDINATES = { lat: 59.9139, lng: 10.7522 };
export const BAY_AREA_COORDINATES = { lat: 37.5189, lng: -122.1511 };

export const INSTAGRAM_MEDIA_IDS: string[] = [
    '18031065778016013',
    '18031232098012345',
    '18007683643093084',
    '17968990717203600'
]