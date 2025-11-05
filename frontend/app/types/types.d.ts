export type StravaActivity = {
    id: number,
    activity_id: number
    polyline: string
};

export type InstagramMedia = {
    media_id: string,
    url: string
    timestamp: string
};

export type PictureMedia = {
    image_src: string,
    url_link: string
};

export type Card = {
    id: number,
    title: string,
    subtitle: string,
    image: string,
    href: string,
}

type ContactItem = {
    id: number;
    label: string;
    value: string;
    href?: string;
};