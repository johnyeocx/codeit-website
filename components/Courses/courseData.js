// TEACHER IMAGES
import IvanJPG from '../../assets/Courses/Teachers/Ivan.jpg';
import BenYapJPG from '../../assets/Courses/Teachers/BenYap.jpg';
import ZahiriJPG from '../../assets/Courses/Teachers/Zahiri.jpg';
import ZumanaJPG from '../../assets/Courses/Teachers/Zumana.jpg';
import TerenceImg from '../../assets/Courses/Teachers/Terence.png';

// COURSE USPs
import TimeIcon from '../../assets/Courses/Intro/TimeIcon.svg';
import ExpertIcon from '../../assets/Courses/Intro/ExpertIcon.svg';
import CheapIcon from '../../assets/Courses/Intro/CheapIcon.svg';
import EssentialIcon from '../../assets/Courses/Essentials/EssentialIcon.svg';
import DetailedIcon from '../../assets/Courses/Essentials/DetailedIcon.svg';
import ApplicableIcon from '../../assets/Courses/Essentials/ApplicableIcon.svg';

import uspStyles from '../../styles/Courses/CourseUSP.module.scss';
import introStyles from '../../styles/Courses/CourseIntro.module.scss';

import IntroSVG from '../../assets/Courses/IntroSVG.svg';
import EssentialsSVG from '../../assets/Courses/EssentialsSVG.svg';
import AdvancedSVG from '../../assets/Courses/AdvancedSVG.svg';


import { breakpoints } from '../constants';

import IntroBrochure from '../../public/assets/brochures/IntroBrochure.pdf';
import EssentialsBrochure from '../../public/assets/brochures/EssentialsBrochure.pdf';
import AdvancedBrochure from '../../public/assets/brochures/AdvancedBrochure.pdf';


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
            company: "NUS Adjunct Professor",
            degree: "BSc Information Systems,",
            school: "National University of Singapore"
        },
        {
            name: "Ben Yap",
            image: BenYapJPG,
            company: "SAP Asia AI Scientist",
            degree: "MSc Computer Science,",
            school: "National University of Singapore"
        },
        {
            name: "Zahiri",
            image: ZahiriJPG,
            company: "GovTech Software Engineer",
            degree: "BSc Engineering,",
            school: "University of Newcastle",
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
            <span>CodeIT Essentials</span> is a crucial checkpoint in every programmer&apos;s journey.
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
            icon: () => <EssentialIcon className={uspStyles.benefitIcon} />,
        },
        ,
        {
            title: 'Detailed',
            description: "Afraid of algorithms? Scratching your head when trying to visualise them? Not to worry! With our carefully curated lesson plans and highly proficient teachers, mastering algorithms will never be easier!",
            icon: () => <DetailedIcon className={uspStyles.benefitIcon} />,
        },
        {
            title: 'Applicability',
            description: "Coming from top tech firms and educational institutions in Singapore, our teachers bring this jar of, supposedly theoretical, topics to you in a practical fashion that allows you to make the bridge from abstraction to application!",
            icon: () => <ApplicableIcon className={uspStyles.benefitIcon} />,
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
            title: "W4: OOP",
            description: "Object-Oriented Programming. This is the life changing paradigm that will show you the power of capitalising on data behavior and generalisations."
        },
        {
            title: "W5: Linked Lists",
            description: "Tired of using arrays or python lists? Not to worry! The linked list is here as a refreshingly new linear structure, with some additional benefits!"
        },
        {
            title: "W6: Binary Search Trees",
            description: "Need to search for an item efficiently? Want to get a range of items? Binary Search Trees is your go to data structure for such tasks!"
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
            company: "NUS Adjunct Professor",
            degree: "BSc Information Systems,",
            school: "National University of Singapore"
        },
        {
            name: "Ben Yap",
            image: BenYapJPG,
            company: "SAP Asia AI Scientist",
            degree: "MSc Computer Science,",
            school: "National University of Singapore"
        },
        {
            name: "Zahiri",
            image: ZahiriJPG,
            company: "GovTech Software Engineer",
            degree: "BSc Engineering,",
            school: "University of Newcastle",
        }
    ]
}

// CODEIT ADVANCED
export const ciAdvanced = {
    coursePath: "advanced",
    title: "Advanced",
    landing: {
        title: "CodeIT Advanced",
        info: "Online | 6 Weeks",
        description: () => <p>
            Ready to <span>really</span> understand algorithms? Want to be the master the most complex of them?
            <span> CodeIT Advanced</span> was made for you.
        </p>
    },
    overview: {
        text: (dimensions) => <p>
            <span>CodeIT Advanced</span> is the passage every programmer must pass to truly be ready for the workforce.
            {
                dimensions.width < breakpoints.tablet ? (
                    <><br /> <br /></>
                ) : (<span> </span>)
            }
            Here, you will learn about advanced (and famous) data structures & algorithms like heaps and graphs that will culminate in a holistic and thorough knowledge on this area.
        </p>,
        graduates: 73,
        svg: () => <AdvancedSVG className={introStyles.introSvg} />
    },
    benefits: [
        {
            title: 'Job Ready',
            description: 'Want to be the best programmer you can be? CodeIT Advanced is the course to take if you want to master your algorithms and engineer solutions to software problems with the best efficiency possible.',
            icon: () => <EssentialIcon className={uspStyles.benefitIcon} />,
        },
        ,
        {
            title: 'Detailed',
            description: "Afraid of algorithms? Scratching your head when trying to visualise them? Not to worry! With our carefully curated lesson plans and highly proficient teachers, mastering algorithms will never be easier!",
            icon: () => <DetailedIcon className={uspStyles.benefitIcon} />,
        },
        {
            title: 'Applicability',
            description: "Coming from top tech firms and educational institutions in Singapore, our teachers bring this jar of, supposedly theoretical, topics to you in a practical fashion that allows you to make the bridge from abstraction to application!",
            icon: () => <ApplicableIcon className={uspStyles.benefitIcon} />,
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
            title: "2. Basic knowledge of Data Structures & Algorithms",
            topics: [
                `- Linear & Binary Search`,
                `- Insertion & Merge Sort`,
                `- Linked Lists`,
                `- Binary Search Trees`,
                `- Time complexity analysis and Big O notation`,
            ]
        },
        {
            title: "3. Object-Oriented Programming in Python",
            topics: [
                `- Classes`,
                `- Attributes & Methods`,
            ]
        }
    ],
    curriculum: [
        {
            title: "W1: Hash Tables",
            description: "Ever wondered how python dictionaries come about? Can we search for keys in constant time? The answer lies with hash tables."
        },
        {
            title: "W2: Priority Queues",
            description: "Max, min, rank, etc. These are merely the start of problems that we can solve with priority queues. Learn this fundamental data structure that opens a whole new avenue of efficiency to improve other algorithms!"
        },
        {
            title: "W3: Graphs 1",
            description: "Start your journey on an all important area in computing in this lesson. Learn how to traverse graphs and apply it in cool ways such as class scheduling!"
        },
        {
            title: "W4: Graphs 2",
            description: "Amazed at how google maps calculates the shortest paths between two points? Learn the primary algorithm used - Dijkstra's algorithm, along with other famous problems like the minimum spanning tree problem in this lesson!"
        },
        {
            title: "W5: Substring Search",
            description: "Command F, search. In this lesson, you will learn how popular text editors like Microsoft Word allow you to search for specific phrases in large texts efficiently. Hint: Knuth Morris Pratt."
        },
        {
            title: "W6: Dynamic Programming",
            description: "End this course with an essential lesson on dynamic programming and gain the computational thinking competency every programmer should have."
        }
    ],
    brochure: AdvancedBrochure,
    signup: {
        nextRun: null,
        pricing: {
            student: 250,
            public: 500
        }
    },
    teachers: [
        {
            name: "Ivan Chew",
            image: IvanJPG,
            company: "NUS Adjunct Professor",
            degree: "BSc Information Systems,",
            school: "National University of Singapore"
        },
        {
            name: "Ben Yap",
            image: BenYapJPG,
            company: "SAP Asia AI Scientist",
            degree: "MSc Computer Science,",
            school: "National University of Singapore"
        },
        {
            name: "Terence Chong",
            image: TerenceImg,
            company: "WizLearn Software Engineer",
            degree: "BSc Information Technology,",
            school: "Queensland University of Tech",
        }
    ]
}