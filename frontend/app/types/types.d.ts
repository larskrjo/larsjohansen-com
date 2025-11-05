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
    title: string,
    subtitle: string,
    image: string,
    href: string,
}

type ContactItem = {
    label: string;
    value: string;
    href?: string;
};