import { EProjectSort } from "@/enum/project";
import { ECategorySort } from "../../enum/category";
import { EVideoSort } from "@/enum/video";
import { EWriterSort } from "@/enum/writer";
import { EUserSort } from "@/enum/user";
import { EMultipleResourcesSort } from "@/enum/home";

export const menuItemData: TMenu[] = [
  {
    Id: 1,
    Name: "About Us",
    Path: "/about-us",
  },
  {
    Id: 2,
    Name: "Volunteer",
    Path: "/volunteers",
  },
  {
    Id: 3,
    Name: "Eco-Films",
    Path: "/eco-films",
  },
  {
    Id: 4,
    Name: "Eco-Stories",
    Path: "/eco-stories",
  },
];

export const followData = [
  {
    Id: 1,
    Name: "Facebook",
    Path: "https://www.facebook.com/EcoCupid",
    Color: "#105C9F",
    Icon: "/icon/follow-facebook.png",
  },
  {
    Id: 2,
    Name: "Instagram",
    Path: "https://www.instagram.com/ecocupid",
    Color: "#C35081",
    Icon: "/icon/follow-instagram.png",
  },
  {
    Id: 3,
    Name: "Youtube",
    Path: "https://youtube.com/@ecocupid",
    Color: "#EC3644",
    Icon: "/icon/follow-youtube.png",
  },
  {
    Id: 4,
    Name: "Tiktok",
    Path: "https://www.tiktok.com/@ecocupid",
    Color: "#484848",
    Icon: "/icon/follow-tiktok.png",
  },
  {
    Id: 5,
    Name: "LinkedIn",
    Path: "https://www.linkedin.com/company/86826173",
    Color: "#0078D4",
    Icon: "/icon/follow-linkedin.png",
  },
  {
    Id: 6,
    Name: "Twitter",
    Path: "https://twitter.com/EcoCupidASEAN",
    Color: "#1A94EA",
    Icon: "/icon/follow-twitter.png",
  },
];

export const enum ECountry {
  None = 0,
  Brunei = 1,
  Cambodia = 2,
  EastTimor = 3,
  Indonesia = 4,
  Laos = 5,
  Malaysia = 6,
  Myanmar = 7,
  Philippines = 8,
  Singapore = 9,
  Thailand = 10,
  Vietnam = 11,
}

export const countryList = [
  {
    Id: ECountry.None,
    Name: "None",
    FlagImage: "",
  },
  {
    Id: ECountry.Brunei,
    Name: "Brunei",
    FlagImage: "/flags/Brunei.webp",
  },
  {
    Id: ECountry.Cambodia,
    Name: "Cambodia",
    FlagImage: "/flags/Cambodia.webp",
  },
  {
    Id: ECountry.EastTimor,
    Name: "East Timor",
    FlagImage: "/flags/East-Timor.webp",
  },
  {
    Id: ECountry.Indonesia,
    Name: "Indonesia",
    FlagImage: "/flags/Indonesia.webp",
  },
  {
    Id: ECountry.Laos,
    Name: "Laos",
    FlagImage: "/flags/Laos.webp",
  },
  {
    Id: ECountry.Malaysia,
    Name: "Malaysia",
    FlagImage: "/flags/Malaysia.webp",
  },
  {
    Id: ECountry.Myanmar,
    Name: "Myanmar",
    FlagImage: "/flags/Myanmar.webp",
  },
  {
    Id: ECountry.Philippines,
    Name: "Philippines",
    FlagImage: "/flags/Philippines.webp",
  },
  {
    Id: ECountry.Singapore,
    Name: "Singapore",
    FlagImage: "/flags/Singapore.webp",
  },
  {
    Id: ECountry.Thailand,
    Name: "Thailand",
    FlagImage: "/flags/Thailand.webp",
  },
  {
    Id: ECountry.Vietnam,
    Name: "Vietnam",
    FlagImage: "/flags/Vietnam.webp",
  },
];

export let initialFlags = [
  {
    Id: ECountry.Brunei,
    Name: "Brunei",
    Count: 0,
    Popover: [],
    Image: "/flags/Brunei.webp",
    Alt: "eco-map-flags-brunei",
    Path: "/",
  },
  {
    Id: ECountry.Cambodia,
    Name: "Cambodia",
    Count: 0,
    Popover: [],
    Image: "/flags/Cambodia.webp",
    Alt: "eco-map-flags-Cambodia",
    Path: "/",
  },
  {
    Id: ECountry.EastTimor,
    Name: "East-Timor",
    Count: 0,
    Popover: [],
    Image: "/flags/East-Timor.webp",
    Alt: "eco-map-flags-East-Timor",
    Path: "/",
  },
  {
    Id: ECountry.Indonesia,
    Name: "Indonesia",
    Count: 0,
    Popover: [],
    Image: "/flags/Indonesia.webp",
    Alt: "eco-map-flags-Indonesia",
    Path: "/",
  },
  {
    Id: ECountry.Laos,
    Name: "Laos",
    Count: 0,
    Popover: [],
    Image: "/flags/Laos.webp",
    Alt: "eco-map-flags-Laos",
    Path: "/",
  },
  {
    Id: ECountry.Malaysia,
    Name: "Malaysia",
    Count: 0,
    Popover: [],
    Image: "/flags/Malaysia.webp",
    Alt: "eco-map-flags-Malaysia",
    Path: "/",
  },
  {
    Id: ECountry.Myanmar,
    Name: "Myanmar",
    Count: 0,
    Popover: [],
    Image: "/flags/Myanmar.webp",
    Alt: "eco-map-flags-Myanmar",
    Path: "/",
  },
  {
    Id: ECountry.Philippines,
    Name: "Philippines",
    Count: 0,
    Popover: [],
    Image: "/flags/Philippines.webp",
    Alt: "eco-map-flags-Philippines",
    Path: "/",
  },
  {
    Id: ECountry.Singapore,
    Name: "Singapore",
    Count: 0,
    Popover: [],
    Image: "/flags/Singapore.webp",
    Alt: "eco-map-flags-Singapore",
    Path: "/",
  },
  {
    Id: ECountry.Thailand,
    Name: "Thailand",
    Count: 0,
    Popover: [],
    Image: "/flags/Thailand.webp",
    Alt: "eco-map-flags-Thailand",
    Path: "/",
  },
  {
    Id: ECountry.Vietnam,
    Name: "Vietnam",
    Count: 0,
    Popover: [],
    Image: "/flags/Vietnam.webp",
    Alt: "eco-map-flags-Vietnam",
    Path: "/",
  },
];


export const ourTeam = [
  {
    Id: 1,
    Name: "Bryan Yong - Malaysia",
    Avatar: "/image/aboutus/ourTeam-01.png",
    Position: "EDITOR IN CHIEF AND VIDEOGRAPHER",
    LinkedIn: "https://www.linkedin.com/in/bryanyongboou/",
    Des: "Bryan is environmental journalist and researcher with a background in oceanography and experience volunteering with youth environmental NGOs in Malaysia, he brings curiosity and enthusiasm to discover Southeast Asia's environmental movement through his stories. Bryan is an avid traveller and loves local food the most.",
  },
  {
    Id: 2,
    Name: "Weeraya Vichayaprasertkul (Min) - Thailand",
    Avatar: "/image/aboutus/ourTeam-02.png",
    Position: "CONTENT MARKETING MANAGER AND VIDEO PRODUCER",
    LinkedIn: "https://www.linkedin.com/in/wewemin/",
    Des: "Within 4 years since she’s started her career, Min had won global awards for her documentary work. She is currently a documentary film mentor for EJN grantees at Internews. Min also works on media campaigns with Siriraj Hospital, the oldest hospital in Thailand, to push for health policy movements. She was a producer, creative, and social media admin of the Thailand Education Partnership Facebook Page that drives the education movement in Thailand. She believes that communicating environmental stories through fun and love is a powerful tool that drives the environmental movement. She is a cat and food lover.",
  },
  {
    Id: 3,
    Name: "Pranav Krishna Prasad- Singapore",
    Avatar: "/image/aboutus/ourTeam-03.png",
    Position: "BUSINESS DEVELOPMENT",
    LinkedIn: "https://www.linkedin.com/in/pranavkrishnaprasad/",
    Des: "Pranav is a multi talented entrepreneur and environmentalist. He is the founder and CEO of ShareRight and the Chief Growth Officer of Flint.",
  },
  {
    Id: 4,
    Name: "Huy",
    Avatar: "/image/aboutus/ourTeam-04.png",
    Position: "WEB DEVELOPER & STORYTELLER",
    LinkedIn: "https://www.linkedin.com/in/nguyen-thanh-huy-huynh/",
    Des: "Huy always keeps moving around, he is cycling all around South East Asia to search and feature hidden environmental projects. For 6 years, he has been acting as the founder and co-founder of 5 social projects and participating in many others. His 7 years of experience in programming also allows him to support EcoCupid as the Web Developer. During his endless journeys, he is a vagabond artist, a metal vocalist, a curious learner and a crazy hiker. ",
  },
  {
    Id: 5,
    Name: "Jim",
    Avatar: "/image/aboutus/ourTeam-05.png",
    Position: "Cat Environmental Officer (CEO)",
    LinkedIn: "",
    Des: "Born in 2020, Thailand. Jim has always attended every EcoCupid meeting. If there is a typo on the EcoCupid website, blame it on her.",
  },
];


export const communityData = [
  {
    Id: 1,
    Name: "Elvian Masli",
    Avatar: "/image/aboutus/community-01.jpg",
    Place: "SOAMyOceanHope, Malaysia",
    Des: "We’re eyeing to provide another upcycling machine for one of the communities in the east coast, where we will run our upcycling center. We look forward to collaborating with other brands to promote the upcycling initiative and reach more people."
  },
  {
    Id: 2,
    Name: "Jhonatan Yuditya Pratama",
    Avatar: "/image/aboutus/community-02.jpg",
    Place: "Sakolah Budaya Patamuan Talino, Indonesia",
    Des: "We realize that, as [humans], we cannot live alone. We need people, we need the environment, we need anything to help us to be strong to continue our lives in this world. So, I want to say to you to believe in yourself and to believe in your potential. To become an inspiration and to work and save this planet through your actions."
  },
  {
    Id: 3,
    Name: "Ms Nga",
    Avatar: "/image/aboutus/community-03.jpg",
    Place: "NNC - Recycle Garden, Vietnam",
    Des: "If a disabled child can protect the environment, why can’t you?"
  },
  {
    Id: 4,
    Name: "Sakurako Masuda",
    Avatar: "/image/aboutus/community-04.jpg",
    Place: "Forest Fire Fighters, Thailand",
    Des: "I strongly believe that small actions every day, consistently over a long period of time, especially when we start together, will definitely make an impact."
  },
  {
    Id: 5,
    Name: "Thae Su Aye",
    Avatar: "/image/aboutus/community-05.jpg",
    Place: "Thant Myanmar, Myanmar",
    Des: "I can see that there are some youths who are interested in the environmental issue or environmental impact but they are still not touching the ground yet. So, if you want to understand what is really happening in reality, they need to also touch the ground."
  },
]

export const roleData = [
  {
    RoleID: 1,
    RoleName: "Admin"
  },
  { 
    RoleID: 2,
    RoleName: "Editor"
  },
  {
    RoleID: 3,
    RoleName: "Content"
  }
]

export const categorySortOptions = [
  {
    label: "Newest",
    value: ECategorySort.Newest,
  },
  {
    label: "Oldest",
    value: ECategorySort.Oldest
  },
]

export const projectSortOptions = [
  {
    label: "Newest",
    value: EProjectSort.Newest,
  },
  {
    label: "Oldest",
    value: EProjectSort.Oldest
  },
]

export const videoSortOptions = [
  {
    label: "Newest",
    value: EVideoSort.Newest,
  },
  {
    label: "Oldest",
    value: EVideoSort.Oldest
  },
  {
    label: "Most Viewed",
    value: EVideoSort.MostViewed
  },
]

export const writerSortOptions = [
  {
    label: "Newest",
    value: EWriterSort.Newest,
  },
  {
    label: "Oldest",
    value: EWriterSort.Oldest
  },
]

export const userSortOptions = [
  {
    label: "Newest",
    value: EUserSort.Newest,
  },
  {
    label: "Oldest",
    value: EUserSort.Oldest
  },
]

export const multipleResourcesSortOptions = [
  {
    label: "Newest",
    value: EMultipleResourcesSort.Newest,
  },
  {
    label: "Oldest",
    value: EMultipleResourcesSort.Oldest
  },
  {
    label: "Most Viewed",
    value: EMultipleResourcesSort.MostViewed
  },
]