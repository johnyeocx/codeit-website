import React, { useState } from 'react';
import styles from '../../styles/Courses/Curriculum.module.scss'
import { TiChevronLeft } from 'react-icons/ti';
import { BiDownload } from 'react-icons/bi';
import IntroBrochure from '../../public/assets/IntroBrochure.pdf';

function Curriculum() {
    const prerequisites = [
        // {
        //     title: "None. That's right, we welcome those with no experience!",
        //     topics: []
        // }
        // ,
        {
            title: "1. Programming Fundamentals",
            topics: [
                `${`\u00a0\u00a0\u00a0`} - Variables & Data Types`,
                `${`\u00a0\u00a0\u00a0`} - Lists & Loops`,
                `${`\u00a0\u00a0\u00a0`} - Functions & Modules`,
            ]
        },
        {
            title: "2. Basic Data Structures & Algorithms",
            topics: [
                `${`\u00a0\u00a0\u00a0`} - Recursion`,
                `${`\u00a0\u00a0\u00a0`} - Linear & Binary Search`,
                `${`\u00a0\u00a0\u00a0`} - Insertion & Merge Sort`,
                `${`\u00a0\u00a0\u00a0`} - Linked Lists`,
                `${`\u00a0\u00a0\u00a0`} - Binary Search Trees`,
            ]
        }
    ]

    const curriculum = [
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
        },
    ]

    const [selected, setSelected] = useState(null);

    const handleLessonClicked = (index) => {
        if (selected == index) setSelected(null)
        else setSelected(index)
    }
    return (
        <div id="course-curriculum" className={styles.container}>
            <div className={styles.container1}>
                <h1>Curriculum</h1>
                <div />
            </div>

            <div className={styles.container2}>
                <button className={`${styles.lessonContainer} ${styles.prereqButton}`}
                    onClick={() => {
                        handleLessonClicked("prerequisite")
                    }}
                >
                    <div className={styles.lessonHeader}>
                        <h2>Prerequisites</h2>
                        <TiChevronLeft className={styles.chevron}
                            style={selected === 'prerequisite' ? {
                                transform: 'rotateZ(-90deg)'
                            } : {}}
                        />
                    </div>
                    <div style={
                        selected === 'prerequisite' ? {
                            maxHeight: '500px',
                            marginBottom: '10px',
                        } : {
                            maxHeight: '0px'
                        }

                    } className={styles.prereqContainer}>
                        {prerequisites.map((section, index) =>
                        (
                            <React.Fragment key={index}>
                                <p className={styles.sectionTitle}>
                                    {section.title}
                                </p>
                                {
                                    section.topics.map((topic, topicIndex) => (
                                        <p
                                            key={topicIndex}
                                        >{topic}</p>
                                    ))
                                }
                            </React.Fragment>

                        )
                        )}
                    </div>

                </button>
                {curriculum.map((lesson, index) => {
                    return (
                        <button
                            key={index}
                            className={styles.lessonContainer}
                            onClick={() => {
                                handleLessonClicked(index)
                            }}
                        >
                            <div className={styles.lessonHeader}>
                                <h2>{lesson.title}</h2>
                                <TiChevronLeft className={styles.chevron}
                                    style={selected === index ? {
                                        transform: 'rotateZ(-90deg)'
                                    } : {}}
                                />
                            </div>

                            <p
                                style={
                                    selected === index ? {
                                        maxHeight: '200px',
                                        marginBottom: '10px',
                                    } : {
                                        maxHeight: '0px'
                                    }
                                }
                            >
                                {lesson.description}
                            </p>


                        </button>
                    )
                })}

                <a className={styles.downloadContainer} href={IntroBrochure} target="_blank">
                    <BiDownload className={styles.downloadIcon} />
                    <p>Course Brochure</p>
                </a>
            </div>
        </div >
    )
}

export default Curriculum