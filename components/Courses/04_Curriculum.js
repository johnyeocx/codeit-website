import React, { useState } from 'react';
import styles from '../../styles/Courses/Curriculum.module.scss'
import { TiChevronLeft } from 'react-icons/ti';
import { BiDownload } from 'react-icons/bi';

function Curriculum({ prerequisites, curriculum, brochure }) {
    // const prerequisites = [
    //     // {
    //     //     title: "None. That's right, we welcome those with no experience!",
    //     //     topics: []
    //     // }
    //     // ,
    //     {

    // ]

    // const curriculum = [

    // ]

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
                                            style={{ paddingLeft: 30 }}
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

                <a
                    className={styles.downloadContainer}
                    href={brochure}
                    rel="noreferrer"
                    target="_blank"
                >
                    <BiDownload className={styles.downloadIcon} />
                    <p>Course Brochure</p>
                </a>
            </div>
        </div >
    )
}

export default Curriculum