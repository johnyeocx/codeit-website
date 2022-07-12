import IvanJPG from '../../assets/Courses/Teachers/Ivan.jpg';
import ZahiriJPG from '../../assets/Courses/Teachers/Zahiri.jpg';
import ZumanaJPG from '../../assets/Courses/Teachers/Zumana.jpg';
import TimeIcon from '../../assets/Courses/Intro/TimeIcon.svg';
import ExpertIcon from '../../assets/Courses/Intro/ExpertIcon.svg';
import CheapIcon from '../../assets/Courses/Intro/CheapIcon.svg';
import uspStyles from '../../styles/Courses/CourseUSP.module.scss';
import introStyles from '../../styles/Courses/CourseIntro.module.scss';


import IntroSVG from '../../assets/Courses/IntroSVG.svg';
import EssentialsSVG from '../../assets/Courses/EssentialsSVG.svg';


import { breakpoints } from '../constants';

import IntroBrochure from '../../public/assets/brochures/IntroBrochure.pdf';
import EssentialsBrochure from '../../public/assets/brochures/EssentialsBrochure.pdf';


export const ciIntro = {
    coursePath: "intro",
    title: "Intro",
    landing: {
        title: "CodeIT Intro",
        info: "Online | 3 Weeks",
        description: () => <p>
            Afraid of those months long full time bootcamps?
            Want a hassle and commitment free entry into the world of programming?
            <span> CodeIT Intro</span> was made for you.
        </p>
    },
    overview: {
        text: (dimensions) => <p>
            <span>CodeIT Intro</span> is an introductory course to programming in the Python language.
            {
                dimensions.width < breakpoints.tablet ? (
                    <><br /> <br /></>
                ) : (<span> </span>)
            }
            Here, you will learn about principle methodologies that are universal to all
            programming languages and develop the necessary competencies
            to learn not just how to program, but how to engineer.
        </p>,
        graduates: 40,
        svg: () => <IntroSVG className={introStyles.introSvg} />
    },
    benefits: [
        {
            title: 'Duration',
            description: 'Time is money. In just three (short & sweet) weeks, you will gain the skills necessary to combine your programming skills with everyday life problems',
            icon: () => <TimeIcon className={uspStyles.benefitIcon} />,
        },
        {
            title: 'Expertise',
            description: 'Coming from both educational institutions and top tech firms, our teachers bring the best of both worlds to teach you the best knowledge, in the best way',
            icon: () => <ExpertIcon className={uspStyles.benefitIcon} />,
        },
        {
            title: 'Affordable',
            description: "Why pay 5 figures for a bootcamp when you aren't even sure of your interest for the subject? Start your journey cost free (nearly) that gets even better with our several subsidies!",
            icon: () => <CheapIcon className={uspStyles.benefitIcon} />,
        }
    ],
    prerequisites: [
        {
            title: "None. That's right, we welcome those with no experience!",
            topics: []
        }
    ],
    curriculum: [
        {
            title: "W1: Variables & Conditionals",
            description: "Ever wondered how when you login to Facebook, they know whether you’ve entered the correct password? That’s what you will learn here."
        },
        {
            title: "W2: Lists & Loops",
            description: "Organisation is king. Python lists are to computer data what files are to paper and bookshelves are to books. Here, you will learn how to properly structure data in your programs!"
        },
        {
            title: "W3: Functions & Files",
            description: "Don't repeat yourself! Dive into a core tenet of programming in this lesson and learn how to reuse code to increase readability / conciseness of your program."
        }
    ],
    brochure: IntroBrochure,
    signup: {
        nextRun: {
            date: "Aug 13 - Aug 27",
            time: "Sat 9:00am - 12:00pm"
        },
        pricing: {
            student: 250,
            public: 500
        }
    },
    teachers: [
        {
            name: "Ivan Chew",
            image: IvanJPG,
            company: "NUS Assistant Professor",
            degree: "BSc Information Systems, NUS",
        },
        {
            name: "Ahmad Zahiri",
            image: ZahiriJPG,
            company: "DBS Data Scientist",
            degree: "BSc Computer Science, NUS",
        },
        {
            name: "Zumana",
            image: ZumanaJPG,
            company: "DBS Data Scientist",
            degree: "BSc Computer Science, NUS",
        }
    ]
}

// CODEIT ESSENTIALS
export const ciEssentials = {
    coursePath: "essentials",
    title: "Essentials",
    landing: {
        title: "CodeIT Essentials",
        info: "Online | 6 Weeks",
        description: () => <p>
            Want to sharpen your programming skills and edge out your peers with algorithmic knowledge?
            <span> CodeIT Essentials</span> was made for you.
        </p>
    },
    overview: {
        text: (dimensions) => <p>
            <span>CodeIT Essentials</span> is a crucial checkpoint in every programmer's journey.
            {
                dimensions.width < breakpoints.tablet ? (
                    <><br /> <br /></>
                ) : (<span> </span>)
            }
            Here, you will be introduced and taught beginner to intermediate level algorithms & data structures
            that will take your computational thinking proficiency to the next level.
        </p>,
        graduates: 38,
        svg: () => <EssentialsSVG className={introStyles.introSvg} />
    },
    benefits: [
        {
            title: 'Essential',
            description: 'The name says it all. Whether you are new to algorithmic topics or are simply rusty, CodeIT Essentials offers the perfect learning journey to master this area.',
            icon: () => <TimeIcon className={uspStyles.benefitIcon} />,
        },
        ,
        {
            title: 'Detailed',
            description: "Afraid of algorithms? Scratching your head when trying to visualise them? Not to worry! With our extremely lesson plans and highly proficient teachers, mastering algorithms will never be easier!",
            icon: () => <CheapIcon className={uspStyles.benefitIcon} />,
        },
        {
            title: 'Applicability',
            description: "Coming from top tech firms and educational institutions in Singapore, our teachers bring this jar of, supposedly theoretical, topics to you in a practical fashion that allows you to make the bridge from abstraction to application!",
            icon: () => <ExpertIcon className={uspStyles.benefitIcon} />,
        }
    ],
    prerequisites: [
        {
            title: "1. Programming Fundamentals",
            topics: [
                `- Variables & Data Types`,
                `- Lists & Loops`,
                `- Functions & Modules`,
            ]
        },
        {
            title: "2. Basic knowledge of Python",
            topics: []
        }
    ],
    curriculum: [
        {
            title: "W1: 2D Lists & Loops",
            description: "Excel files, Tic Tac Toe, etc. Learn to handle these 2 dimensional structures in this lesson!"
        },
        {
            title: "W2: Search, Sort & Recursion",
            description: "Begin your journey into the world of algorithms with the most fundamental of them all: search & sort."
        },
        {
            title: "W3: Merge Sort",
            description: "Organisation? Inventory Management? These are all areas where sorting is essential, and you are about to learn the fastest way to do so."
        },
        {
            title: "W4: Object-Oriented Programming",
            description: "Organisation? Inventory Management? These are all areas where sorting is essential, and you are about to learn the fastest way to do so."
        },
        {
            title: "W5: Linked Lists",
            description: "Organisation? Inventory Management? These are all areas where sorting is essential, and you are about to learn the fastest way to do so."
        },
        {
            title: "W6: Binary Search Trees",
            description: "Organisation? Inventory Management? These are all areas where sorting is essential, and you are about to learn the fastest way to do so."
        }
    ],
    brochure: EssentialsBrochure,
    signup: {
        nextRun: {
            date: "Aug 13 - Aug 27",
            time: "Sat 3:00pm - 6:00pm"
        },
        pricing: {
            student: 250,
            public: 500
        }
    },
    teachers: [
        {
            name: "Ivan Chew",
            image: IvanJPG,
            company: "NUS Assistant Professor",
            degree: "BSc Information Systems, NUS",
        },
        {
            name: "Ahmad Zahiri",
            image: ZahiriJPG,
            company: "DBS Data Scientist",
            degree: "BSc Computer Science, NUS",
        },
        {
            name: "Zumana",
            image: ZumanaJPG,
            company: "DBS Data Scientist",
            degree: "BSc Computer Science, NUS",
        }
    ]
}