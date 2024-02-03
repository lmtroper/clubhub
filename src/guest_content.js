const { parseISO, addDays, subDays, format } = require('date-fns');

const datetimeTextFormat = (dateString) => {
    const date = parseISO(dateString);
    const formattedDate = format(date, "EEE MMMM dd yyyy h:mm a");
    return formattedDate
}

export const guestClubs = [
    {
        "id": 2,
        "name": "ACE - A Cappella Affiliate",
        "description": "ACE is a mixed-voice, open a cappella group in the UW A Cappella Club running both in Waterloo and online remotely! We accept all members of all levels of musical experience. We provide musical development workshops and guide members through learning how to sing in an a cappella group, culminating in several gigs and online song productions at the end of each term! Find out more by visiting our Instagram (@uw_ace) and joining our discord server (DM us on instagram for the link)!",
        "categories": "creative-arts-dance-and-music"
    },
    {
      "id": 30,
      "name": 'Cooking Club, UW',
      "description": 'The Cooking Club serves up cooking classes, bake sales, barbeques, and other food related adventures. We cover the full spectrum of foods from fancy sushi rolling classes to quick and dirty tips to help you manage the necessary evil known as ‘cooking during midterms’.  When we’re not in the kitchen or hosting our famous classes, we occasionally venture out to the real world to visit coffee roasters, picnic areas, strawberry fields, or bonfire pits. If we’re not doing any of the above, our members are usually busy trying to craft an amazing burger or a cupcake to sell at one of our barbeques or bake sales to help fuel the culinary debauchery.',
      "categories": 'games-recreational-and-social'
  
    },
    {
        "id": 143,
        "name":'UW Operation Smile',
        "description": 'UW Operation Smile is a club affiliated with Operation Smile Canada, an organization that aims to raise awareness and provide medical assistance and surgeries to countries around the world for cleft lip and cleft palate. UW Operation Smile works to raise awareness of these conditions in the Kitchener-Waterloo region, and hosts a variety of fundraising events to help raise donations toward this cause.',
        "categories": 'charitable-community-service-international-development,health-promotion'
    },
];
  
export const announcements = {
    2: [ 
            {
            id: "1",
            dashboard: false,
            name:"ACE - A Cappella Affiliate",
            club_id: "2",
            guest: true,
            title:'AUDITIONS!!!',
            body: 'Have you always wanted to be a Bella? Now is your chance! The AcaBellas are auditioning RIGHT NOW and we want to hear all your lovely voices!! Submit your audition through test.io, and check out all the other UWACC groups which are accepting members for S`24!',
            time_posted: `${format(subDays(new Date(), 12), 'yyyy-MM-dd')} 13:30:30`,
            visibility: 'public',
            placeholder_photo: "5",
            time_posted_text: datetimeTextFormat(`${format(subDays(new Date(), 12), 'yyyy-MM-dd')} 13:30:30`
            ),
        },
        {
            id: "2",
            dashboard: true,
            name:"ACE - A Cappella Affiliate",
            club_id: "2",
            guest: true,
            title:'End Of Term concert coming up!',
            body: `Our End Of Term concerts are just around the corner, and The AcaBellas are warming up for a fantastic set! Come see these sopranos, altos, and lady-basses in action next Tuesday, where they''ll blow you away with the pure energy of their voices.`,
            time_posted: `${format(subDays(new Date(), 2), 'yyyy-MM-dd')} 19:13:30`,
            visibility: 'public',
            placeholder_photo: "6",
            time_posted_text: datetimeTextFormat(`${format(subDays(new Date(), 2), 'yyyy-MM-dd')} 19:13:30`),
        },
        {
            id: "3",
            dashboard: true,
            name:"ACE - A Cappella Affiliate",
            club_id: "2",
            guest: true,
            title:'CLUB INFO SESSION',
            body: "Interested in A Cappella? Find out everything you want to know and more at our info session, tomorrow @ 6:30PM in MC 2065!! If you can''t make it for 6:30pm, feel free to come any time before 8:00pm and we will be here to fill you in!",
            time_posted: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 10:06:30`,
            visibility: 'public',
            placeholder_photo: "10",
            time_posted_text: datetimeTextFormat(`${format(subDays(new Date(), 0), 'yyyy-MM-dd')} 10:06:30`),
        },
    ],
    30: [
        {
            id: "1",
            dashboard: true,
            name:"Cooking Club, UW",
            club_id: "30",
            guest: true,
            title: "Come see us at Clubs and Societies Day!",
            body:"Calling all Warriors, it’s time to spice up your campus life! Come visit us on Clubs and Societies Day (next Monday) @ SLC to learn more about our club and how you can unleash your inner chef this semester! \nWe are located at BOOTH #22!!",
            time_posted: `${format(subDays(new Date(), 1), 'yyyy-MM-dd')} 14:28:30`,
            visibility: 'public',
            placeholder_photo: "1",
            time_posted_text: datetimeTextFormat(`${format(subDays(new Date(), 1), 'yyyy-MM-dd')} 14:28:30`),
        },
        {
            id: "2",
            dashboard: false,
            name:"Cooking Club, UW",
            club_id: "30",
            guest: true,
            title: "COOKING CHALLENGE",
            body:"Dear members of UW Cooking Club. We are thrilled to announce our Cultural Dish Cooking Challenge! Choose a cultural dish that holds a special place in your heart or sparks your culinary curiosity. More details coming soon...",
            time_posted: `${format(subDays(new Date(), 0), 'yyyy-MM-dd')} 09:21:30`,
            visibility: 'public',
            placeholder_photo: "11",
            time_posted_text: datetimeTextFormat(`${format(subDays(new Date(), 0), 'yyyy-MM-dd')} 09:21:30`),
        },
    ],
    143: [
        {
            id: "1",
            dashboard: true,
            name:"UW Operation Smile",
            club_id: "143",
            guest: true,
            title: "Thank you for your support!",
            body:"Thank you to everyone who showed up to our Besties & Bracelets event yesterday!! We hope you had lots of fun creating friendship bracelets with your besties and enjoyed the sweet treats!",
            time_posted: `${format(subDays(new Date(), 2), 'yyyy-MM-dd')} 11:03:00`,
            visibility: 'public',
            placeholder_photo: "9",
            time_posted_text: datetimeTextFormat(`${format(subDays(new Date(), 2), 'yyyy-MM-dd')} 11:03:00`),
        },
        {
            id: "2",
            dashboard: true,
            name:"UW Operation Smile",
            club_id: "143",
            guest: true,
            title: "WE ARE HIRING!!",
            body:"If you are passionate about raising awareness for a Global Health Concern, raising funds to provide new smiles to children around the world, and want to gain valuable experience on how a club operates, we got you covered! MORE DETAILS COMING SOON...",
            time_posted: `${format(subDays(new Date(), 4), 'yyyy-MM-dd')} 15:47:00`,
            visibility: 'public',
            placeholder_photo: "12",
            time_posted_text: datetimeTextFormat(`${format(subDays(new Date(), 4), 'yyyy-MM-dd')} 15:47:00`),
        }

    ],
};
  
export const upcomingEvents = {
    30:[
        {
            id: "2",
            name:"Cooking Club, UW",
            club_id: "30",
            title: "Brunch Bonanza",
            body:"Ready to elevate your culinary skills? Join us for our Brunch Bonanza; our very FIRST cooking class of the semester at the Culinary Studio!",
            location:"Culinary Studio",
            start_time: `${format(addDays(new Date(), 5), 'yyyy-MM-dd')} 11:00:00`,
            end_time: `${format(addDays(new Date(), 5), 'yyyy-MM-dd')} 13:00:00`,
            allDay: "0",
            time_posted: `${format(subDays(new Date(), 2), 'yyyy-MM-dd')} 19:13:30`,
            price: "25.00",
            location_type: "in-person",
            additional_details: "Get hands-on experience with our expert instructors and learn to whip up delicious omelettes, banana foster french toast, and refreshing salads.",
            placeholder_photo: "3",
            start_time_text: datetimeTextFormat(`${format(addDays(new Date(), 5), 'yyyy-MM-dd')} 11:00:00`),
            end_time_text: datetimeTextFormat(`${format(addDays(new Date(), 5), 'yyyy-MM-dd')} 13:00:00`),
        }
    ],
    143: [
        {
            id:"2",
            name:"UW Operation Smile",
            club_id: "143",
            title: "The Making Faces Workshop",
            body: "Sign-up today for the Operation Smile Canada Making Faces Workshop on July 4th and get involved in making a difference by providing new smiles to children around the world!",
            location: "STC 1012",
            start_time: `${format(addDays(new Date(), 6), 'yyyy-MM-dd')} 16:00:00`,
            end_time: `${format(addDays(new Date(), 6), 'yyyy-MM-dd')} 19:00:00`,
            allDay: "0",
            time_posted: `${format(subDays(new Date(), 2), 'yyyy-MM-dd')} 11:03:00`,
            price: "5.00",
            location_type: "in-person",
            additional_details: "Tickets are now being sold as donations of $5+. All proceeds go towards Operation Smile Canada and helping provide children with the smiles they’ve been waiting for! Ticket sold at test.io",
            placeholder_photo: "7",
            start_time_text: datetimeTextFormat(`${format(addDays(new Date(), 6), 'yyyy-MM-dd')} 16:00:00`),
            end_time_text: datetimeTextFormat(`${format(addDays(new Date(), 6), 'yyyy-MM-dd')} 19:00:00`),
        }
    ]
}

export const pastEvents = {
    2: [
        {
            id: "1",
            name:"ACE - A Cappella Affiliate",
            club_id: "2",
            title: "ICCA QUARTER FINALS COMING TO WATERLOO",
            body: "The University of Waterloo A Capella Club is proud to be hosting the #ICCA Central Quarter Finals! Come watch these groups perform on January 20, 2024, at 7PM in the Hagey Hall Humanities Theatre for a real-life Pitch Perfect experience!",
            location: "Hagey Hall Humanities Theatre",
            start_time: `${format(subDays(new Date(), 5), 'yyyy-MM-dd')} 19:00:00`,
            end_time: `${format(subDays(new Date(), 5), 'yyyy-MM-dd')} 21:00:00`,
            allDay: "0",
            time_posted: '2024-01-24 19:51:30',
            price: '15.00',
            location_type: 'in-person',
            additional_details: "Here are the list of competitors! \nFeaturing: On That Note | Toronto Metropolitan University - Resonate | Toronto Metropolitan University - Surround Sound | University of Toronto - In Full Colour | University of Waterloo - The Musical InterDudes | University of Waterloo - The AcaBellas | University of Waterloo - The Unaccompanied Minors | University of Waterloo - The Water Boys | University of Waterloo - Hawkapella | Wilfrid Laurier University - WIBI A Cappella | York University",
            placeholder_photo: "5",
            start_time_text: datetimeTextFormat(`${format(subDays(new Date(), 5), 'yyyy-MM-dd')} 19:00:00`),
            end_time_text: datetimeTextFormat(`${format(subDays(new Date(), 5), 'yyyy-MM-dd')} 21:00:00`),
        }
    ],
    30: [
        {
            id: "1",
            name:"Cooking Club, UW",
            club_id: "30",
            title: "BOT Game Night",
            body: "Roll into the new term with fun and games at our BOT Game Night! Whether you’re a seasoned strategist or a casual player, join us for an evening filled with laughter, team strategy, and friendly competition.",
            location: "SLC Black and Gold Room",
            start_time: `${format(subDays(new Date(), 15), 'yyyy-MM-dd')} 17:30:00`,
            end_time: `${format(subDays(new Date(), 15), 'yyyy-MM-dd')} 20:30:00`,
            allDay: "0",
            time_posted: '2024-01-24 19:51:30',
            price: null,
            location_type: 'in-person',
            additional_details: "Pizza, board games and Nintendo switches will be available! Dive into the excitement as we roll the dice, draw the cards, and start a new term with Cooking Club!",
            placeholder_photo: "4",
            start_time_text: datetimeTextFormat(`${format(subDays(new Date(), 15), 'yyyy-MM-dd')} 17:30:00`),
            end_time_text: datetimeTextFormat(`${format(subDays(new Date(), 15), 'yyyy-MM-dd')} 20:30:00`),
        },
    ],
    143: [
        {
            id:"1",
            name:"UW Operation Smile",
            club_id: "143",
            title: "Boba with Bob Ross",
            body: "Hello warriors! The details for our upcoming event have been finalized and we are so excited for you to join us for a chill painting night",
            location: "STC 1012",
            start_time: `${format(subDays(new Date(), 11), 'yyyy-MM-dd')} 18:30:00`,
            end_time: `${format(subDays(new Date(), 11), 'yyyy-MM-dd')} 20:30:00`,
            allDay: "0",
            time_posted: '2024-01-24 19:51:30',
            price: 3.00,
            location_type: 'in-person',
            additional_details: "There are only 3 quick steps to sign up: \n\n 1. Fill out the event sign-up form at test.io!\n\n2. Pay the $3 painting supplies fee online through our shops.wusa page or pay in-person at the event. The link will be emailed to those who fill out the form.\n\n3. You have officially signed up! We can’t wait to see you this Thursday for a Tea-rrific event!!",
            placeholder_photo: "6",
            start_time_text: datetimeTextFormat(`${format(subDays(new Date(), 11), 'yyyy-MM-dd')} 18:30:00`),
            end_time_text: datetimeTextFormat(`${format(subDays(new Date(), 11), 'yyyy-MM-dd')} 20:30:00`),
        }
    ]
};


export const attendance = {
    2: {
            1: [
                {
                    "event_id": 2,
                    "uid": "0tI5fH3uo7S2pnI0OqH5r2mPUu23",
                    "status": "going",
                    "name": "Larissa Troper"
                },
                {
                    "event_id": 2,
                    "uid": "1",
                    "status": "going",
                    "name": "Romána Bahadur"
                },
                {
                    "event_id": 2,
                    "uid": "10",
                    "status": "maybe",
                    "name": "Adolfo Harrell"
                },
                {
                    "event_id": 2,
                    "uid": "12",
                    "status": "going",
                    "name": "Franklin Fernandez"
                },
                {
                    "event_id": 2,
                    "uid": "13",
                    "status": "going",
                    "name": "Brianna Heath"
                },
                {
                    "event_id": 2,
                    "uid": "14",
                    "status": "going",
                    "name": "Raymond Flores"
                },
                {
                    "event_id": 2,
                    "uid": "15",
                    "status": "going",
                    "name": "Junhong Xue"
                },
                {
                    "event_id": 2,
                    "uid": "16",
                    "status": "going",
                    "name": "Yiwen Zhang"
                },
                {
                    "event_id": 2,
                    "uid": "17",
                    "status": "going",
                    "name": "Marco Faria"
                },
                {
                    "event_id": 2,
                    "uid": "18",
                    "status": "not going",
                    "name": "Jingyi Li"
                },
                {
                    "event_id": 2,
                    "uid": "19",
                    "status": "maybe",
                    "name": "Marie-José Barten"
                },
                {
                    "event_id": 2,
                    "uid": "2",
                    "status": "not going",
                    "name": "Shelton Vazquez"
                },
                {
                    "event_id": 2,
                    "uid": "20",
                    "status": "not going",
                    "name": "Ben Hoekman"
                },
                {
                    "event_id": 2,
                    "uid": "27",
                    "status": "going",
                    "name": "Bernadette Scheel"
                },
                {
                    "event_id": 2,
                    "uid": "4",
                    "status": "not going",
                    "name": "Geoffrey Hinton"
                },
                {
                    "event_id": 2,
                    "uid": "40",
                    "status": "maybe",
                    "name": "Mohammed Jordan"
                },
                {
                    "event_id": 2,
                    "uid": "41",
                    "status": "not going",
                    "name": "Tyrone Harvey"
                },
                {
                    "event_id": 2,
                    "uid": "G",
                    "name": "Guest/Demo",
                    "status": "going"
                }
            ]
    },
    30: {
        1:[
            {
                "event_id": 1,
                "uid":"10",
                "name":"Adolfo Harrell",
                "status":"going"
            },
            {
                "event_id": 1,
                "uid":"11",
                "name": "Lynne Mccormick",
                "status":"going"
            },
            {
                "event_id": 1,
                "uid":"13",
                "name":"Brianna Heath",
                "status":"going"
            },
            {
                "event_id": 1,
                "uid":"14",
                "name":"Raymond Flores",
                "status":"not going"
            },
            {
                "event_id":1,
                "uid":"16",
                "name":"Yiwen Zhang",
                "status":"maybe"
            },
            {
                "event_id":1,
                "uid":"17",
                "name":"Marco Faria",
                "status":"going"
            },
            {
                "event_id":1,
                "uid":"21",
                "name":"Jeroen van der Velden",
                "status":"maybe"
            },
            {
                "event_id":1,
                "uid":"22",
                "name":"Fiona Vervoort",
                "status":"going"
            },
            {
                "event_id":1,
                "uid":"23",
                "name":"Ryozo Adachi",
                "status":"going"
            },
            {
                "event_id":1,
                "uid":"24",
                "name":"Kazuo Aoki",
                "status":"not going"
            },
            {
                "event_id":1,
                "uid":"26",
                "name":"Kostas Floros",
                "status":"not going"
            },
            {
                "event_id":1,
                "uid":"G",
                "name":"Guest Demo",
                "status":"going"
            }
        ],
        2:[
            {
                "event_id": 1,
                "uid":"10",
                "name":"Adolfo Harrell",
                "status":"going"
            },
            {
                "event_id": 1,
                "uid":"11",
                "name": "Lynne Mccormick",
                "status":"going"
            },
            {
                "event_id": 1,
                "uid":"13",
                "name":"Brianna Heath",
                "status":"going"
            },
            {
                "event_id": 1,
                "uid":"14",
                "name":"Raymond Flores",
                "status":"not going"
            },
            {
                "event_id":1,
                "uid":"16",
                "name":"Yiwen Zhang",
                "status":"maybe"
            },
        ]

    },
    143: {
        1:[
            {
                "event_id":1,
                "uid":"8",
                "name":"Linda Mccoy",
                "status":"maybe"
            },
            {
                "event_id":1,
                "uid":"G",
                "name":"Guest Demo",
                "status":"going"
            },
            {
                "event_id":1,
                "uid":"9",
                "name":"Ernie Juarez",
                "status":"not going"
            },
            {
                "event_id":1,
                "uid":"5",
                "name":"Yann LeCun",
                "status":"going"
            },
            {
                "event_id":1,
                "uid":"6",
                "name":"Yoshua Bengio",
                "status":"going"
            },
            {
                "event_id":1,
                "uid":"49",
                "name":"Pearl Perez",
                "status":"not going"
            },
            {
                "event_id":1,
                "uid":"G",
                "name":"Guest Demo",
                "status":"not going"
            },
            {
                "event_id":1,
                "uid":"48",
                "name":"Nichole Michael",
                "status":"going"
            },
            {
                "event_id":1,
                "uid":"47",
                "name":"Lana Gallagher",
                "status":"going"
            },
            {
                "event_id":1,
                "uid":"44",
                "name":"Thomas Knight",
                "status":"maybe"
            },
            {
                "event_id":1,
                "uid":"43",
                "name":"Janie Conrad",
                "status":"going"
            },
            {
                "event_id":1,
                "uid":"41",
                "name":"Tyrone Harvey",
                "status":"going"
            },
            {
                "event_id":1,
                "uid":"40",
                "name":"Mohammed Jordan",
                "status":"going"
            },
            {
                "event_id":1,
                "uid":"4",
                "name":"Geoffrey Hinton",
                "status":"maybe"
            },
            {
                "event_id":1,
                "uid":"39",
                "name":"Keri Burns",
                "status":"not going"
            },
            {
                "event_id":1,
                "uid":"38",
                "name":"Isaias Hudson",
                "status":"not going"
            },



        ],
        2:[{
            "event_id":1,
            "uid":"5",
            "name":"Yann LeCun",
            "status":"going"
        },
        {
            "event_id":1,
            "uid":"6",
            "name":"Yoshua Bengio",
            "status":"going"
        },
        {
            "event_id":1,
            "uid":"49",
            "name":"Pearl Perez",
            "status":"not going"
        },
        {
            "event_id":1,
            "uid":"48",
            "name":"Nichole Michael",
            "status":"going"
        },
        {
            "event_id":1,
            "uid":"47",
            "name":"Lana Gallagher",
            "status":"going"
        },
        {
            "event_id":1,
            "uid":"44",
            "name":"Thomas Knight",
            "status":"maybe"
        },
        {
            "event_id":1,
            "uid":"43",
            "name":"Janie Conrad",
            "status":"going"
        },
    ]

    }
}


export const transformEvents = (events) => {
    const transformedEvents = [];
  
    for (const clubId in events) {
        const clubEvents = events[clubId];
  
        for (const event of clubEvents) {
          transformedEvents.push({
            name: event.name,
            club_id: event.club_id,
            title: event.title,
            id: event.id,
            location: event.location,
            location_type: event.location_type,
            start_time: event.start_time,
            end_time: event.end_time,
            additional_details: event.additional_details,
            body: event.body,
            price: event.price,
            allDay: event.allDay,
            placeholder_photo: event.placeholder_photo,
            start_time_text: event.start_time_text,
            end_time_text: event.end_time_text,
          });
        }
    }
    return transformedEvents;
};

export const transformAnnouncements = (announcements) => {
    const transformedAnnouncements = [];
  
    for (const clubId in announcements) {
        const clubAnnouncements = announcements[clubId];
  
        for (const a of clubAnnouncements) {
            if (a.dashboard){
                transformedAnnouncements.push({
                    id: a.id,
                    name: a.name,
                    club_id: a.club_id,
                    guestMode: a.guestMode,
                    title: a.title,
                    body: a.body,
                    time_posted: a.time_posted,
                    visibility: a.visibility,
                    placeholder_photo: a.placeholder_photo,
                    time_posted_text: a.time_posted_text,
            });
            }
        }
    }
    return transformedAnnouncements;
};
